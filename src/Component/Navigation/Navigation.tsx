import { Link } from "react-router-dom"

// créer une nav bar
function Navigation() {
  return (
    <nav className="py-4 bg-blue-400 desktop:bg-blue-400 tablet:bg-red-700 tel:bg-green-700">
      <div className="container flex items-center justify-between mx-auto tel:text-left">
        <h1 className="text-lg font-bold text-white">Les ailes déployées</h1>
        <ul className="flex fill-current justify hover:bg-blue-400 left menu menu-horizontal">
          <li className="px-4"><Link to="/reserver" className="text-white hover:bg-blue-300">Réserver</Link></li>
          <li className="px-4"><Link to="/reservation" className="text-white hover:bg-blue-300">Mes réservations</Link></li>
          <li className="px-4"><Link to="/faq" className="text-white hover:bg-blue-300">FAQ</Link></li>
          <li className="px-4"><Link to="/contact" className="text-white hover:bg-blue-300">Contact</Link></li>
          <li tabIndex={0}>
            <a className="text-white hover:bg-blue-300 active:bg-blue-400">
              Compte
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="z-50 p-2 rounded shadow-xl bg-base-100">
              <li><Link to="/compte" className="active:bg-gray-200">Mon compte</Link></li>
              <li><a className="active:bg-gray-200">Se déconnecter</a></li>
            </ul>
          </li>

          <li tabIndex={0}>
            <a className="text-white hover:bg-blue-300 active:bg-blue-400">
              Edition
              <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"/></svg>
            </a>
            <ul className="z-50 p-2 rounded shadow-xl bg-base-100">
              <li><Link to="/editmenus" className="active:bg-gray-200">Menus</Link></li>
              <li><Link to="/editfaq" className="active:bg-gray-200">Faq</Link></li>
              <li><Link to="/editrestaurant" className="active:bg-gray-200">Restaurant</Link></li>
              <li><Link to="/edituser" className="active:bg-gray-200">Utilisateur</Link></li>
              <li><Link to="/reservationrestaurateur" className="active:bg-gray-200">Réservation</Link></li>
              <li><Link to="/editcontact" className="active:bg-gray-200">Contact</Link></li>
            </ul>
          </li>
          
        </ul>
      </div>
    </nav>
  )
}

export default Navigation

