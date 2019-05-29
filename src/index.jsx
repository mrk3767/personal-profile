import * as ReactDOM from "react-dom";
import React from "react";

const root = document.createElement('div');
root.id = 'root';
document.body.appendChild(root);

const App = ({name}) => (<div>Hello {name}!</div>);

ReactDOM.render(<App name={'Mike'}/>, root);
