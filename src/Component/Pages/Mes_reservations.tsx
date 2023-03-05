import Navigation from "../navigation/Navigation"
import Footer from "../footer/Footer"


function Mes_reservations() {
  return (
    <div>
      <Navigation />
      <br />
      <title>Réservations</title>
      <p className="text-4xl md:text-lg">Mes réservations</p>
      <br />

      <div className="border border-gray-300 p-4 mx-24 rounded-lg flex items-center mb-8">
        <div>
          <p className="text-xl">Restaurant 1</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="ml-auto flex items-center">
          <p className="text-xl">12/12/2020</p>
          <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => console.log("Annuler")}>
            Annuler
          </button>
        </div>
      </div>

      <div className="border border-gray-300 p-4 mx-24 rounded-lg flex items-center mb-8">
        <div>
          <p className="text-xl">Restaurant 1</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="ml-auto flex items-center">
          <p className="text-xl">12/12/2020</p>
          <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => console.log("Annuler")}>
            Annuler
          </button>
        </div>
      </div>


      <div className="border border-gray-300 p-4 mx-24 rounded-lg flex items-center mb-8">
        <div>
          <p className="text-xl">Restaurant 1</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="ml-auto flex items-center">
          <p className="text-xl">12/12/2020</p>
          <button className="ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => console.log("Annuler")}>
            Annuler
          </button>
        </div>
      </div>


      <Footer />
    </div>
  )
}


export default Mes_reservations


       
