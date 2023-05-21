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
        <div className="px-4 mx-auto max-w-7xl">
          <h2 className="py-4 mb-4 text-3xl font-bold">Les réservations</h2>
          <div className="overflow-x-auto">
            <table className="w-full border border-gray-300 table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Client
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Date
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Nombre de personnes
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
                    Menus
                  </th>
                  <th className="px-4 py-2 text-left border-b-2 border-gray-300">
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
