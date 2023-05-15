import { Link } from "react-router-dom" 
  
function MdpOublie() {
  return (
    <div>
      <title>Mot de passe oublié</title>
      <div className="flex flex-col items-center justify-center h-screen">
        <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
          <img className="h-20 mr-2 w-30" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo LAD"/>
        </a>
        <div className="items-center max-w-lg p-8 mx-auto bg-white shadow center rounded-xl shadow-slate-300">
          <h1 className="mb-2 text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl">
              Nouveau mot de passe 
          </h1>
          <p className="text-slate-500">Remplissez le formulaire pour réinitialiser votre mot de passe</p>

          <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                <input type="email" name="email" id="email" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com" required/>
                <p className="mt-2 invisible peer-placeholder-shown:!invisible peer-invalid:visible text-pink-600 text-sm">Le format de votre adresse mail n'est pas valide</p>                
              </div>
               
              <button className="inline-flex items-center justify-center w-full py-3 space-x-2 font-medium text-white bg-blue-500 border-indigo-500 rounded-lg hover:bg-blue-600 hover:shadow">          
                <span>Réinitialiser le mot de passe</span>
              </button>
              <p className="text-sm font-light text-black">
                      Pas encore de compte ? <Link to="/inscription" className="font-medium text-black text-primary-600 hover:underline">S'inscrire</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default MdpOublie
