import * as ReactDOM from "react-dom"
import React from "react"
import {App} from "./App"

const root = document.createElement('div')
root.id = 'root'
document.body.appendChild(root)

ReactDOM.render(<App name={'Mike'}/>, root)
