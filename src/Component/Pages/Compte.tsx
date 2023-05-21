import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function Compte() {
  return (
    <div>
      <Navigation />
      <div className="flex flex-col items-center justify-center min-h-full">
        <title>Mon compte</title>
        <Link to="/edituser" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">Éditer</Link>
        <p className="p-6 text-4xl md:text-lg">Mon compte</p>
        <div className="w-1/3">
          <div className="avatar">
            <div className="w-24 rounded-full">
              <img src="https://via.placeholder.com/100" alt="Avatar" />
            </div>
          </div>
      
          <div className="mb-4">
            <label htmlFor="nom" className="block mb-2 font-medium">Nom</label>
            <p id="nom" className="p-2 border border-2 border-gray-300 border-solid rounded-md">Doe</p>
          </div>
      
          <div className="mb-4">
            <label htmlFor="prenom" className="block mb-2 font-medium">Prenom</label>
            <p id="prenom" className="p-2 border border-2 border-gray-300 border-solid rounded-md">John</p>
          </div>
      
          <div className="mb-4">
            <label htmlFor="email" className="block mb-2 font-medium">Email</label>
            <p id="email" className="p-2 border border-2 border-gray-300 border-solid rounded-md">Test@gmail.com</p>
          </div>
      
          <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Modifier mes informations</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default Compte
