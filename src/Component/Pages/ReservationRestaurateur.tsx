import { useState, useEffect } from "react"
import Axios from "../../Axios"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"

function ReservationRestaurateur() {
  interface Reservation {
    id: string;
    commentaire: string;
    nbPersonne: number;
    menusId: string;
    menuName?: string;
    date?: Date
  }
  
  
  interface Menu {
    id: string;
    mainDish: string;
  }

  const [reservations, setReservations] = useState<Reservation[]>([])
  const [menus, setMenus] = useState<Menu[]>([])

  // Fonction pour récupérer le nom du menu associé à chaque réservation
  const getMenuName = (menusId: string) => {
    const menu = menus.find(menu => menu.id === menusId)
    return menu ? menu.mainDish : "Menu introuvable"
  }

  

  useEffect(() => {
    Axios.get("/reservation")
      .then((response) => {
        setReservations(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    Axios.get("/menus")
      .then((response) => {
        setMenus(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div className="flex flex-col h-screen">
      <Navigation />
      <div className="flex-grow">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-4 py-4">Les réservations</h2>
          <div className="overflow-x-auto">
            <table className="table-auto w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">
                    Client
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">
                    Date
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">
                    Nombre de personnes
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">
                    Menus
                  </th>
                  <th className="px-4 py-2 border-b-2 border-gray-300 text-left">
                    Commentaire
                  </th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((reservation) => (
                  <tr key={reservation.id}>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {"nom du client"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {"date de la réservation"}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {reservation.nbPersonne}
                    </td>
                    <td className="px-4 py-2 border-b border-gray-300">{getMenuName(reservation.menusId)}</td>
                    <td className="px-4 py-2 border-b border-gray-300">
                      {reservation.commentaire}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ReservationRestaurateur
