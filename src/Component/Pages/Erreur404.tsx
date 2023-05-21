import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function Erreur404() {

  return (
    <div>
      <Navigation />
      <br />
      <title>404</title>
      <br /><br />
      <section className="bg-white">
        <div className="h-screen max-w-screen-xl px-4 py-8 mx-auto">
          <div className="max-w-screen-sm mx-auto text-center">
            <h1 className="mb-4 font-extrabold tracking-tight text-7xl text-primary-600">404</h1>
            <p className="mb-4 text-3xl font-bold tracking-tight text-gray-900">Il manque quelque chose</p>
            <p className="mb-4 text-lg font-light text-black">Désolé, nous ne trouvons pas cette page, mais vous pouvez retourner sur la page de réservation ou bien nous contacter</p>
            <Link to="/reserver" className="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 mx-10">Page de réservation</Link>
            <Link to="/contact" className="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 mx-10">Page de contact</Link>

          </div>   
        </div>
      </section>
      
      <br />     
      <Footer /> 
    </div>
  )
}
  
export default Erreur404
  