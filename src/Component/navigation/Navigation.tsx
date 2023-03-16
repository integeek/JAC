import { Link } from "react-router-dom"

// créer une nav bar
function Navigation() {
  return (
    <nav className="bg-blue-400 py-4">
      <div className="container mx-auto flex items-center justify-between sm:text-left">
        <h1 className="text-white font-bold text-lg">Les ailes déployées</h1>
        <ul className="flex justify fill-current hover:bg-blue-400 left menu menu-horizontal">
          <li className="px-4"><Link to="/reserver" className="text-white hover:bg-blue-300">Réserver</Link></li>
          <li className="px-4"><Link to="/reservation" className="text-white hover:bg-blue-300">Mes réservations</Link></li>
          <li className="px-4"><Link to="/faq" className="text-white hover:bg-blue-300">FAQ</Link></li>
          <li className="px-4"><Link to="/contact" className="text-white hover:bg-blue-300">Contact</Link></li>
          <li tabIndex={0}>
            <a className="text-white">
              Compte
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="p-2 bg-base-100">
              <li><a>Mon compte</a></li>
              <li><a>Se déconnecter</a></li>
            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

