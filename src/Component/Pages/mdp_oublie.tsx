import { Link } from "react-router-dom" 
  
function Mdp_oublie() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
          <img className="w-30 h-20 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
        </a>
        <div className="max-w-lg  items-center center mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-dark mb-2 md:text-2xl">
              Nouveau mot de passe 
          </h1>
          <p className="text-slate-500">Remplissez le formulaire pour réinitialiser votre mot de passe</p>

          <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                <input type="email" name="email" id="email" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com" required/>
              </div>
               
              <button className="w-full py-3 font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg border-indigo-500 hover:shadow inline-flex space-x-2 items-center justify-center">          
                <span>Réinitialiser le mot de passe</span>
              </button>
              <p className="text-sm font-light text-black">
                      Pas encore de compte ? <Link to="/inscription" className="font-medium text-primary-600 text-black hover:underline">S'inscrire</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default Mdp_oublie
