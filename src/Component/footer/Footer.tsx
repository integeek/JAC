import React from "react"
import { Link } from "react-router-dom"

function Footer() {
  return (
    <footer className="footer fixed bottom-0 footer-center p-4 text-base-content none:bg-green-700:tel tel:px-8 bg-base-300 ">
      <div className="flex justify-between ">
        <p className="text-black">Copyright © 2023 - All right reserved by Les ailes déployées -</p>
        <Link to="/mentions" className="text-black hover:underline">Mentions légales</Link>
      </div>
    </footer>
  )
}

export default Footer
