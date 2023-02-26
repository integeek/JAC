import "./App.css"
import Home from "./Component/Home"
import React from "react"
import ReactDOM from "react-dom"
import Navigation from "./Component/navigation/Navigation"
function App() {
  return (
    <div>
      <Navigation/>
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