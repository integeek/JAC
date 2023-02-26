import "./App.css"
import Home from "./Component/Home"
import React from "react"
import ReactDOM from "react-dom"

function App() {
  return (
    <div>
      <Home/>
    </div>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App/>
  </React.StrictMode>,
  document.getElementById("root")
)
export default App