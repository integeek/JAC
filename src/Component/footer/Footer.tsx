import React from "react"
import { Link } from "react-router-dom"

// créer une nav bar
function Footer() {
  return (
    <footer className="footer fixed bottom-0 footer-center p-4 bg-base-300 text-base-content">
      <div>
        <p>Copyright © 2023 - All right reserved by Les ailes deployées</p>
      </div>
    </footer>
  )
}

export default Footer
<Link to="/reserver" className="text-white hover:bg-blue-300">Réserver</Link>