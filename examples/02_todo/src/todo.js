
var App = React.createClass({
  render: function() {
    return (

      <section id="todoapp">
        <header id="header">
          <h1>todos</h1>
          <input id="new-todo" placeholder="What needs to be done?" autofocus />
        </header>
        <section id="main" style={{display: 'block'}}>
          <input id="toggle-all" type="checkbox" />
          <label htmlFor="toggle-all">Mark all as complete</label>
          <ul id="todo-list"><li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Buy tomatos</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Buy tomatos" />
            </li><li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Buy potatoes</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Buy potatoes" />
            </li><li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Write the report</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Write the report" />
            </li><li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Call Mom</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Call Mom" />
            </li><li>
              <div className="view">
                <input className="toggle" type="checkbox" />
                <label>Have a haircut</label>
                <button className="destroy" />
              </div>
              <input className="edit" defaultValue="Have a haircut" />
            </li></ul>
        </section>
        <footer id="footer" style={{display: 'block'}}>
          <span id="todo-count"><strong>5</strong> items left</span>
          <ul id="filters">
            <li>
              <a className="selected" href="#/">All</a>
            </li>
            <li>
              <a href="#/active">Active</a>
            </li>
            <li>
              <a href="#/completed">Completed</a>
            </li>
          </ul>
        </footer>
      </section>
    );
  }
});


React.render(<App/>, document.getElementById('app'));
