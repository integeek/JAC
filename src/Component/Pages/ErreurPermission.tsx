import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function ErreurPermission() {

  return (
    <div>
      <Navigation />
      <br />
      <title>Erreur permission</title>
      <br /><br />
      <section className="bg-white">
        <div className="h-screen max-w-screen-xl px-4 py-8 mx-auto">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 font-extrabold tracking-tight text-7xl text-primary-600">Erreur de permissions</h1>
            <p className="mb-4 text-lg font-light text-black">Désolé, vous n'avez pas les permissions nécessaire pour accéder à cette page, mais vous pouvez retourner sur la page de réservation ou bien nous contacter</p>
            <Link to="/reserver" className="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 mx-10">Page de réservation</Link>
            <Link to="/contact" className="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 mx-10">Page de contact</Link>
          </div>   
        </div>
      </section>
      <Footer /> 
    </div>
  )
}
  
export default ErreurPermission
  