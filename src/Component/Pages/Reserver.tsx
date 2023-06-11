import Navigation from "../Navigation/Navigation"
import { HiLocationMarker } from "react-icons/hi"
import AccessTimeIcon from "@mui/icons-material/AccessTime"
import DescriptionIcon from "@mui/icons-material/Description"
import CallIcon from "@mui/icons-material/Call"
import LocalParkingIcon from "@mui/icons-material/LocalParking"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Axios from "../../Axios"

interface Restaurant {
  id: string;
  name: string;
  address: string;
  horaire: string;
  description: string;
  contact: string;
  equipement: string;
}

function Reserver() {
  document.body.classList.add("theme-light")

  const [restaurants, setRestaurants] = useState<Restaurant[]>([])
  const [showModalInfo, setShowModalInfo] = useState(false)
  const [restaurantSelection, setRestaurantSelection] = useState<Restaurant | null>(null)
 

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

  const handleInfo = (id: string) => {
    const selectedRestaurant = restaurants.find((restaurant) => restaurant.id === id)
    setRestaurantSelection(selectedRestaurant || null)
    setShowModalInfo(true)
  }
  

  console.log(restaurantSelection)
  return (
    <div>
      <Navigation />
      <title>Réserver</title>
      <Link to="/editrestaurant" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
        Éditer
      </Link>

      <br />
      <p className="text-4xl">Reserver un restaurant</p>
      <div className="flex flex-col items-center gap-4 p-8 m-8 mx-auto my-16 justify-center justify-center place-content-center lg:grid-cols-3 lg:grid">
        {restaurants.map((restaurant) => (
          <div
            key={restaurant.id}
            className="w-full transition duration-700 transform shadow-2xl lg:flex-col card w-96 bg-base-100 hover:scale-105"
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
                <div className="flex justify-center items-center  justify-self-center "> 
                  <button onClick={() => handleInfo(restaurant.id)} className="bg-gray-400 border-gray-400 btn hover:bg-gray-600 btn-active mr-10">
              Info
                  </button>
                  <Link
                    to="/menu1"
                    className="bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active"
                  >
              Voir plus
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {showModalInfo && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block w-full max-w-lg overflow-hidden text-left align-middle transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:p-6">
              {restaurantSelection ? (
                <div>
                  <h2 className="text-2xl font-bold mb-4">{restaurantSelection.name}</h2>
                  <div className="flex items-center mb-2">
                    <AccessTimeIcon className="mr-2" />
                    <p>Horaires : {restaurantSelection.horaire}</p>
                  </div>
                  <div className="flex items-center mb-2">
                    <DescriptionIcon className="mr-2" />
                    <p>Description : {restaurantSelection.description}</p>
                  </div>
                  <div className="flex items-center">
                    <CallIcon className="mr-2" />
                    <p>Contact : {restaurantSelection.contact}</p>
                  </div>
                  <div className="flex items-center mt-2">
                    <LocalParkingIcon className="mr-2" />
                    <p>Équipements : {restaurantSelection.equipement}</p>
                  </div>
                </div>
              ) : (
                <div className="text-center">Pas de restaurant séléctionné</div>
              )}

              <div className="mt-6 flex justify-end">
                <button className="px-4 py-2 text-base font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:text-sm" onClick={() => setShowModalInfo(false)}>
            Fermer
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  )
}

export default Reserver
