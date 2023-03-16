import Footer from "../footer/Footer"
import { Link } from "react-router-dom"

function Inscription() {
  return (
    <div>
      <br /> <br />
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="w-32 h-8 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          Les ailes déployées    
          </a>
          <div className="w-2/3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mx-16 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Inscription
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                  <input type="email" name="email" id="email" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Mot de passe</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
                </div>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black">Confirmer votre mot de passe</label>
                  <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
                </div>
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required/>
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="font-medium text-black">J'accepte les <Link to="/mentions" className="font-medium text-black text-primary-600 hover:underline">termes et conditions d'utilisation générale</Link></label>
                  </div>
                </div>
                <button type="submit" className="w-full text-black bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire</button>
                <p className="text-sm font-light text-black">
                      Déja un compte ? <Link to="/connexion" className="font-medium text-primary-600 hover:underline">Se connecter</Link>
                      
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Inscription
