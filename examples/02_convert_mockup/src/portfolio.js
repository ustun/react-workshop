var Portfolio = React.createClass({
  render: function() {
    return (
      <div>
        <div className="row">
          <div className="small-12 medium-4 large-6 columns namelogo">
            <h1>Name/Logo/Brand</h1>
          </div>
          <div className="small-12 medium-8 large-6 columns">
            <div className="nav-bar">
              <ul className="button-group">
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#" className="button">About</a></li>
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#" className="button">Work</a></li>
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#" className="button">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="hero">
          <div className="row">
            <div className="large-12 columns intro-text">
              <p>Hi there!<br />I take outdoor pictures.</p>
            </div>
          </div>
        </div>
        <div className="row about">
          <div className="medium-6 large-8 columns">
            <h4>About</h4>
            <p>Bacon ipsum dolor sit amet nulla ham qui sint exercitation eiusmod commodo, chuck duis velit. Aute in reprehenderit, dolore aliqua non est magna in labore pig pork biltong. Eiusmod swine spare ribs reprehenderit culpa. Boudin aliqua adipisicing rump corned beef.</p>
          </div>
          <div className="medium-6 large-4 columns">
            <img src="./mockup_files/portfolio5.png" />
          </div>
        </div>
        <div className="row work">
          <hr />
          <div className="large-12 columns">
            <h4>Work</h4>
            <p>Click on each image to view my work!</p>
            <ul className="clearing-thumbs small-block-grid-1 medium-block-grid-2 large-block-grid-4" data-clearing>
              <li>
                <a href="./mockup_files/portfolio1.jpg">
                  <img data-caption="caption here" src="./mockup_files/portfolio1.jpg" /></a>
              </li>
              <li>
                <a href="./mockup_files/portfolio2.jpg"><img data-caption="caption 2 here..." src="./mockup_files/portfolio2.jpg" /></a>
              </li>
              <li>
                <a href="./mockup_files/portfolio3.jpg"><img data-caption="caption 3 here..." src="./mockup_files/portfolio3.jpg" /></a>
              </li>
              <li>
                <a href="./mockup_files/portfolio4.jpg"><img data-caption="caption 4 here..." src="./mockup_files/portfolio4.jpg" /></a>
              </li>
            </ul>
          </div>
        </div>
        <div className="row contact">
          <hr />
          <div className="large-12 columns">
            <h4>Contact Me</h4>
            <div className="large-4 columns">
              <strong>Email</strong>: <a href="http://foundation.zurb.com/templates/portfolio-theme.html#">me@myportfolio.com</a>
            </div>
            <div className="large-4 columns">
              <strong>Twitter</strong>: @twitterhandle
            </div>
            <div className="large-4 columns">
              <strong>Phone</strong>: 555-555-1234
            </div>
          </div>
        </div>
        <footer className="row">
          <div className="large-12 columns">
            <div className="row">
              <div className="large-6 columns">
                <p>© Copyright no one at all. Go to town.</p>
              </div>
            </div></div></footer></div>
    );
  }
});

var Footer = React.createClass({
  render: function() {
    return (

      <footer className="row">
        <div className="large-12 columns">
          <div className="row">
            <div className="large-6 columns">
              <p>© Copyright no one at all. Go to town.</p>
            </div>
            <div className="large-6 columns">
              <ul className="inline-list right">
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#">FAQ</a></li>
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#">Privacy</a></li>
                <li><a href="http://foundation.zurb.com/templates/portfolio-theme.html#">Suscribe</a></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
});

React.render(<Portfolio/>, document.getElementById('main'));

React.render(<Footer/>, document.getElementById('footer'));
