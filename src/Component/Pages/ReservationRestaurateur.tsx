import { useState, useEffect } from "react"
import Axios from "../../Axios"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"

function ReservationRestaurateur() {

    interface Reservation{
        id: string;
        commentaire: string;
        nbPersonne: number;
        menusId: string;
    }



    const [reservations, setReservations] = useState<Reservation[]>([])

    useEffect(() => {
      Axios.get("/reservation")
        .then((response) => {
          setReservations(response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }, [])

    return (
      <div>
        <title>Les réservations</title>
        <Navigation />
        <p className="text-4xl md:text-lg">Voir ses réservations</p>
      
        {reservations.map((reservation) => (
          <div key={reservation.id}>
            <h2>Reservation</h2>
            <p><strong>Nombre de personnes :</strong> {reservation.nbPersonne}</p>
            <p><strong>Commentaire :</strong> {reservation.commentaire}</p>
            <hr />
          </div>
        ))}


        <Footer />
      </div>
    )
}

export default ReservationRestaurateur
