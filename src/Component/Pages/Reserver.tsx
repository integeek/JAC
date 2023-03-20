import Navigation from "../navigation/Navigation"
import { HiLocationMarker} from "react-icons/hi"
import Footer from "../footer/Footer"

function Reserver() {
  document.body.classList.add("theme-light")

  // Problème d'alignement entre le pin de localisation et le texte, couleur du bouton qui va pas 
  return (
    <div>
      <Navigation />
      <title>Réserver</title>
      <br />
      <p className="text-4xl md:text-lg">Réserver un Restaurant</p>     
      <div className="grid grid-cols-3 gap-4 my-16 sm:gird-cols-4 lg:grid-cols-8 m-16 ">
        <div className="card w-96 bg-base-100 shadow-2xl hover:scale-105 transition transform duration-700">
          <figure className="mt-4"><img src="https://via.placeholder.com/150" alt="Restaurant 1" /></figure>
          <div className="card-body">
            <h2 className="card-title">1er Restaurant</h2>
            <div className="flex flex-row  space-x-2">
              <HiLocationMarker className="mr-2" />
              <p>4 allée des lilas, 75019 Paris</p>
            </div>
            <div className="card-actions justify-end">
              <button className="btn btn-info  btn-active">Voir plus</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition transform duration-700">
          <figure className="mt-4"><img src="https://via.placeholder.com/150" alt="Restaurant 2" /></figure>
          <div className="card-body">
            <h2 className="card-title">2eme Restaurant</h2>
            <p>1 allee de la plaine, 75006 Paris</p>
            <div className="card-actions justify-end">
              <button className="btn btn-info  btn-active">Voir plus</button>
            </div>
          </div>
        </div>

        <div className="card w-96 bg-base-100 shadow-xl hover:scale-105 transition transform duration-700">
          <figure className="mt-4 rounded-lg"><img src="https://via.placeholder.com/150" alt="Restaurant 3" /></figure>
          <div className="card-body">
            <h2 className="card-title">3eme Restaurant</h2>
            <p>93 Rue des Martyrs, 75002 Paris</p>
            <div className="card-actions justify-end">
              <button className="btn btn-info  btn-active">Voir plus</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />

    </div>
  )
}
  
export default Reserver
  