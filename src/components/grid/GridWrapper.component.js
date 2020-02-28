import React, { Component, Fragment } from "react";
import CommonStage from "../common/CommonStage.component";
import CommonLayer from "../common/CommonLayer.component";
import WorldSelect from "../world/WorldSelect.component";

class GridWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  componentDidMount() {

  }
  render() {
    return (
      <div style={{ border: '1px solid red', position: 'relative' }}>
        <CommonStage width={1100} height={750}>
          {
            (stageAttrs) => (
              <CommonLayer {...stageAttrs}>
                {
                  () => (
                    <Fragment>
                      <div className="uk-position-absolute" style={{ top: '15px', left: '15px', width: '200px' }}>
                        <WorldSelect />
                      </div>
                      <div className="uk-position-absolute" style={{ top: '15px', left: '230px', width: '200px' }}>

                      </div>
                      {/*<CommonCharacter {...layerAttrs}
                        x={50} y={50}
                        character={{
                          url: 'https://react-d3-library.github.io/static/react-d3-library-logo_720.png',
                          scale: 0.1
                        }}
                        left={{
                          url: 'https://freesvg.org/img/Sword-by-Rones.png',
                          scale: 0.15
                        }}
                        right={{
                          url: 'https://freesvg.org/img/Sword-by-Rones.png',
                          scale: 0.15
                        }}
                      draggable />*/}
                    </Fragment>
                  )
                }
              </CommonLayer>
            )
          }
        </CommonStage>
      </div>
    )
  }
}

export default GridWrapper;
