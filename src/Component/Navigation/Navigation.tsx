import React, { useState } from "react"
import { Link } from "react-router-dom"

function Navigation() {
  const [isOpen, setIsOpen] = useState(false)

  const handleMenuToggle = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className="flex flex-wrap items-center justify-between p-4 bg-blue-400 ">
      <div className="block lg:hidden">
        <button
          onClick={handleMenuToggle}
          className="flex items-center px-3 py-2 rounded text-black-500 hover:text-black-400"
        >
          <svg
            className={`fill-current h-3 w-3 ${
              isOpen ? "hidden" : "block"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
          <svg
            className={`fill-current h-3 w-3 ${
              isOpen ? "block" : "hidden"
            }`}
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z" />
          </svg>
        </button>
      </div>

      <div
        className={`${
          isOpen ? "block" : "hidden"
        } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}
      >
        <div className="text-base lg:flex-grow">
          <div className="container flex items-center justify-between mx-auto tel:text-left">
            <h1 className="hidden text-lg font-bold text-white lg:block">Les ailes déployées</h1>
            <ul className={`flex fill-current justify ${ isOpen ? "flex-col" : "menu-horizontal"} hover:bg-blue-400 left menu`}>
              <li className="px-4">
                <Link to="/reserver" className="text-white hover:bg-blue-300"> Réserver </Link>
              </li>
              <li className="px-4">
                <Link to="/reservation" className="text-white hover:bg-blue-300"> Mes réservations</Link>
              </li>
              <li className="px-4">
                <Link to="/faq" className="text-white hover:bg-blue-300"> FAQ </Link>
              </li>
              <li className="px-4">
                <Link to="/contact" className="text-white hover:bg-blue-300"> Contact</Link>
              </li>
              <li tabIndex={0}>
                <a className="text-white hover:bg-blue-300 active:bg-blue-400">
                  Compte
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="z-50 p-2 rounded shadow-xl bg-base-100">
                  <li>
                    <Link to="/compte" className="active:bg-gray-200"> Mon compte </Link>
                  </li>
                  <li>
                    <a className="active:bg-gray-200">Se déconnecter</a>
                  </li>
                </ul>
              </li>

              <li tabIndex={0}>
                <a className="text-white hover:bg-blue-300 active:bg-blue-400">
                  Edition
                  <svg className="fill-current" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                    <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
                  </svg>
                </a>
                <ul className="z-50 p-2 rounded shadow-xl bg-base-100">
                  <li>
                    <Link to="/editmenus" className="active:bg-gray-200"> Menus </Link>
                  </li>
                  <li>
                    <Link to="/editfaq" className="active:bg-gray-200"> Faq </Link>
                  </li>
                  <li>
                    <Link to="/editrestaurant" className="active:bg-gray-200"> Restaurant </Link>
                  </li>
                  <li>
                    <Link to="/edituser" className="active:bg-gray-200"> Utilisateur</Link>
                  </li>
                  <li>
                    <Link to="/reservationrestaurateur" className="active:bg-gray-200"> Réservation</Link>
                  </li>
                  <li>
                    <Link to="/editcontact" className="active:bg-gray-200"> Contact </Link>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
