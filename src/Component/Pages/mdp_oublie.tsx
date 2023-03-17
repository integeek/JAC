import { Link } from "react-router-dom" 
  
function Mdp_oublie() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="max-w-lg  items-center center mx-auto bg-white p-8 rounded-xl shadow shadow-slate-300">
          <h1 className="text-4xl mb-2 font-medium">Nouveau mot de passe</h1>
          <p className="text-slate-500">Remplissez le formulaire pour réinitialiser votre mot de passe</p>

          <form action="" className="my-10">
            <div className="flex flex-col space-y-5">
              <label htmlFor="email">
                <p className="font-medium mb-2 text-slate-700 pb-2">Adresse email</p>
                <input id="email" name="email" type="email" className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow" placeholder="nom@mail.com"/>
              </label>
               
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
