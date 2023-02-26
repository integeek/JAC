import React from "react"

function Navigation() {
  return (
    <nav className="bg-blue-300 py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white font-bold text-lg">Les ailes déployées</h1>
        <ul className="flex">
          <li className="px-4"><a href="#" className="text-white hover:bg-blue-600">Réserver</a></li>
          <li className="px-4"><a href="#" className="text-white hover:bg-blue-600">Mes réservations</a></li>
          <li className="px-4"><a href="#" className="text-white hover:bg-blue-600">FAQ</a></li>
          <li className="px-4"><a href="#" className="text-white hover:bg-blue-600">Contact</a></li>
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
