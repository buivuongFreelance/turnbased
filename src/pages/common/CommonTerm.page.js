import React, { Component } from "react";
import withApp from "../../hoc/withApp.hoc";

class CommonTerm extends Component {
  render() {
    return (
      <div>
        <div className="uk-background-cover uk-height-large uk-panel uk-flex uk-flex-center uk-flex-middle uk-light"
          style={{ backgroundImage: 'url(../images/banner.jpg)' }}>
          <p className="uk-h1">Terms of Use</p>
        </div>
        <div className="uk-container uk-padding-large">
          <h2>Terms of Use</h2>
          <p>Dingtoi reserves the right, at its sole discretion, to change, modify, add or remove portions of these Terms of Use, at any time. It is your responsibility to check these Terms of Use periodically for changes. Your continued use of the Site following the posting of changes will mean that you accept and agree to the changes. As long as you comply with these Terms of Use, Swap-ez grants you a personal, non-exclusive, non-transferable, limited privilege to enter and use the Site.</p>
          <h2>Content</h2>
          <p>All text, graphics, user interfaces, visual interfaces, photographs, trademarks, logos, sounds, music, artwork and computer code (collectively, &quot;Content&quot;), including but not limited to the design, structure, selection, coordination, expression, &quot;look and feel&quot; and arrangement of such Content, contained on the Site is owned, controlled or licensed by or to Swap-ez, and is protected by trade dress, copyright, patent and trademark laws, and various other intellectual property rights and unfair competition laws.</p>
          <h2>Your Use of the Site</h2>
          <p>
            You may not use any &quot;deep-link&quot;, &quot;page-scrape&quot;, &quot;robot&quot;, &quot;spider&quot; or other automatic device, program, algorithm or methodology, or any similar or equivalent manual process, to access, acquire, copy or monitor any portion of the Site or any Content, or in any way reproduce or circumvent the navigational structure or presentation of the Site or any Content, to obtain or attempt to obtain any materials, documents or information through any means not purposely made available through the Site. Swap-ez reserves the right to bar any such activity.
          </p>
          <p>
            You may not attempt to gain unauthorized access to any portion or feature of the Site, or any other systems or networks connected to the Site or to any Swap-ez server, or to any of the services offered on or through the Site, by hacking, password &quot;mining&quot; or any other illegitimate means.
          </p>
        </div>
      </div >
    )
  }
}

export default withApp(CommonTerm);
