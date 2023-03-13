import Footer from "../footer/Footer"
import { Link } from "react-router-dom"
import "./Accueil.css"


function Accueil() {
  return (
    <div>
      <section className="px-2 py-32 bg-white">
        <div className="container items-center max-w-6xl px-8 mx-auto">
          <div className="flex flex-wrap items-center sm:-mx-3">
            <div className=" md:w-1/2 justify-left col-span-1" id="texte">
              <div className="pb-6">
                <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-4 sm:text-5xl md:text-4xl lg:text-5xl xl:text-6xl">
                  <span className="inline-block xl:inline">Un site pour pouvoir réserver ses repas</span>
                </h1>
                <p className="mx-auto text-base text-gray-500 mb-8">Cela n'a jamais été aussi facile de réserver ses repas</p>
                <div className="relative flex flex-row ">
                  <Link to="/connexion" className="flex items-center m-5 px-6 py-3 mb-3 text-lg text-white bg-indigo-600 rounded-md sm:mb-0 hover:bg-indigo-700 sm:w-auto">
                    Se connecter 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                  <Link to="/inscription" className="flex items-center m-5 px-6 py-3 mb-3 text-lg text-white bg-gray-400 rounded-md hover:bg-black hover:bg-opacity-75">
                    Créer un compte 
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 ml-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
            <div className="justify-end col-span-1 md:w-1/2 " id="image">
              <div className="h-auto overflow-hidden rounded-md shadow-xl  md:justify-end sm:rounded-xl">
                <img src="https://lepetitjournal.com/sites/default/files/styles/main_article/public/2022-04/Farandole-plat-restaurant-francais-Le-Crystal.jpg?itok=NluTgo1V" alt="" className="w-full h-full object-cover"/>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  )
}

export default Accueil