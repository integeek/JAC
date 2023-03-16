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
          <label htmlFor="annuler" className="btn ml-4 bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">Annuler</label>
        </div>
        <input type="checkbox" id="annuler" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Congratulations random Internet user!</h3>
            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div className="modal-action">
              <label htmlFor="annuler" className="btn">Yay!</label>
            </div>
          </div>
        </div>


      </div>

      <div className="border border-gray-300 p-4 mx-24 rounded-lg flex items-center mb-8">
        <div>
          <p className="text-xl">Restaurant 2</p>
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
          <p className="text-xl">Restaurant 3</p>
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


       
