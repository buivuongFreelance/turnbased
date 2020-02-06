const dotenv = require('dotenv');
dotenv.config();

import express from 'express';
import compression from 'compression';
import fs from 'fs';
import cors from 'cors';
import path from 'path';
import serialize from 'serialize-javascript';

import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter, matchPath } from 'react-router-dom';
import App from '../src/app';
import Routes from '../src/routes';

const app = express();
app.use(compression());
app.use(cors());
app.use(express.static(path.join(__dirname, '..', '/dist'), { index: false }));
app.use(express.static(path.join(__dirname, '..', '/public'), { index: false }));
const port = process.env.SERVER_PORT;

app.get('/favicon.ico', (req, res) => res.status(204));

app.get('/*', (req, res) => {
  const currentRoute = Routes.find(route => matchPath(req.url, route) || {});

  let promise;
  if (currentRoute.loadData)
    promise = currentRoute.loadData();
  else promise = Promise.resolve(null);

  promise.then(data => {
    const context = { data };

    try {
      const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
          <App />
        </StaticRouter>
      );

      const indexFile = path.resolve('./dist/index.html');

      fs.readFile(indexFile, 'utf8', (err, indexData) => {
        if (err) {
          console.log('Something went wrong: ', err);
          return res.status(500).send('Oops, better luck next time!');
        }

        if (context.status === 404) {
          res.status(404);
        }
        if (context.url) {
          return res.redirect(301, context.url);
        }

        return res.send(
          indexData
            .replace('<div id="root"></div>', `<div id="root">${app}</div>`)
            .replace(
              '</body>',
              `<script>window.__ROUTE_DATA__ = ${serialize(data)}</script></body>`
            )
        );
      });
    }
    catch (error) {
      console.log('error', error);
    }
  });
});
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
