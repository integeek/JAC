import Footer from "../footer/Footer"
import { Link } from "react-router-dom"

function Connexion() {
  return (
    <div>
      <br /> <br />
      <section className="bg-white max-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="w-32 h-8 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          Les ailes déployées    
          </a>
          <div className="w-1/3 bg-white rounded-lg shadow dark:border md:mt-4 sm:max-w-md xl:p-0 bg-white mt-4 mx-16 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl">
                  Connexion
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                  <input type="email" name="email" id="email" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com" required/>
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Votre mot de passe</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5" required/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required/>
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-black">Se souvenir de moi</label>
                    </div>
                  </div>
                  <Link to="/mdpoublie" className="text-sm font-medium text-primary-600 hover:underline">Mot de passe oublié ?</Link>
                </div>
                <button type="submit" className="w-full text-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se connecter</button>
                <p className="text-sm font-light text-black">
                      Pas encore de compte ? <Link to="/inscription" className="font-medium text-primary-600 text-black hover:underline">S'inscrire</Link>
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

export default Connexion




