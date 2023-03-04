import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer fixed bottom-0 footer-center p-4 bg-base-300 text-base-content">
      <div className="flex justify-between">
        <p className="text-black">Copyright © 2023 - All right reserved by Les ailes deployées -</p>
        <Link to="/mentions" className="text-black">Mentions légales</Link>
      </div>
    </footer>
  )
}

export default Footer
