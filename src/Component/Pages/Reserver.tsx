import Navigation from "../Navigation/Navigation"
import { HiLocationMarker } from "react-icons/hi"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "../../Axios"

interface Restaurant {
  id: string;
  name: string;
  address: string; // Ajout de la propriété address
}

function Reserver() {
  document.body.classList.add("theme-light")

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])

  useEffect(() => {
    // Charger les restaurants depuis l'API
    Axios
      .get("restaurant")
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
      <Link to="/editrestaurant" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Éditer
      </Link>

      <br />
      <p className="text-4xl md:text-lg">Réserver un Restaurant</p>
      <div className="grid grid-cols-3 gap-4 p-8 m-8 mx-auto my-16 sm:gird-cols-4 lg:grid-cols-8">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="transition duration-700 transform shadow-2xl card w-96 bg-base-100 hover:scale-105"
          >
            <figure className="mt-4">
              <img src={"https://via.placeholder.com/150"} alt={restaurant.name} />
            </figure>
            <div className="card-body">
              <h2 className="card-title">{restaurant.name}</h2>
              <div className="flex flex-row space-x-2">
                <HiLocationMarker className="mr-2" />
                <p>{restaurant.address}</p>
              </div>
              <div className="justify-end card-actions">
                <Link to="/menu1" className="bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">
                  Voir plus
                </Link>

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
