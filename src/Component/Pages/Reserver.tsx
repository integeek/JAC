import Navigation from "../Navigation/Navigation"
import { HiLocationMarker } from "react-icons/hi"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import axios from "axios"

interface Restaurant {
  id: string;
  name: string;
  // Ajoutez d'autres propriétés si nécessaire
}

function Reserver() {
  document.body.classList.add("theme-light")

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    // Charger les restaurants depuis l'API
    axios
      .get("http://localhost:8000/restaurant")
      .then((response) => {
        setRestaurants(response.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  return (
    <div>
      <Navigation />
      <title>Réserver</title>
      <br />
      <p className="text-4xl md:text-lg">Réserver un Restaurant</p>
      <div className="grid grid-cols-3 gap-4 my-16 sm:gird-cols-4 lg:grid-cols-8 m-8 p-8 mx-auto">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="card w-96 bg-base-100 shadow-2xl hover:scale-105 transition transform duration-700"
          >
            <figure className="mt-4">
              <img src={"https://via.placeholder.com/150"} alt={restaurant.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{restaurant.name}</h2>
              <div className="flex flex-row space-x-2">
                <HiLocationMarker className="mr-2" />
                <p>Test de l'adresse</p>
              </div>
              <div className="card-actions justify-end">
                <button className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 btn-active">
                  Voir plus
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Reserver
