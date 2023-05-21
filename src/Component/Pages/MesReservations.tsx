import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"

function MesReservations() {

  
  return (
    <div>
      <Navigation />
      <br />
      <title>Réservations</title>
      <p className="text-4xl">Mes réservations</p>
      <br />

      <div className="flex items-center p-4 mx-24 mb-8 border border-gray-300 rounded-lg">
        <div>
          <p className="text-xl">Restaurant 1</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="flex items-center ml-auto">
          <p className="text-xl">12/12/2020</p>
          <label htmlFor="annuler" className="px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded btn hover:bg-red-600">Annuler</label>
        </div>
        <input type="checkbox" id="annuler" className="modal-toggle" />
        <div className="modal">
          <div className="modal-box">
            <h3 className="text-lg font-bold">Congratulations random Internet user!</h3>
            <p className="py-4">You've been selected for a chance to get one year of subscription to use Wikipedia for free!</p>
            <div className="modal-action">
              <label htmlFor="annuler" className="btn">Yay!</label>
            </div>
          </div>
        </div>


      </div>

      <div className="flex items-center p-4 mx-24 mb-8 border border-gray-300 rounded-lg">
        <div>
          <p className="text-xl">Restaurant 2</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="flex items-center ml-auto">
          <p className="text-xl">12/12/2020</p>
          <button className="px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded hover:bg-red-600" onClick={() => console.log("Annuler")}>
            Annuler
          </button>
        </div>
      </div>


      <div className="flex items-center p-4 mx-24 mb-8 border border-gray-300 rounded-lg">
        <div>
          <p className="text-xl">Restaurant 3</p>
          <span>1 allée des lilas</span>
        </div>
        <div className="flex items-center ml-auto">
          <p className="text-xl">12/12/2020</p>
          <button className="px-4 py-2 ml-4 font-bold text-white bg-red-500 rounded hover:bg-red-600" onClick={() => console.log("Annuler")}>
            Annuler
          </button>
        </div>
      </div>


      <Footer />
    </div>
  )
}


export default MesReservations


       
