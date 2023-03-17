

function New_mdp() {  
  return (
    <div>
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="w-32 h-8 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          Les ailes déployées    
          </a>
          <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
               Nouveau mot de passe
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Nouveau mot de passe</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirmer le mot de passe</label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input id="newsletter" aria-describedby="newsletter" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required/>
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="newsletter" className="font-light text-gray-500 dark:text-gray-300">J'accepte les<a className="font-medium text-primary-600 hover:underline" href="#">Termes et Conditions</a></label>
                </div>
              </div>
              <button type="submit" className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600">Réinitialiser le mot de passe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
  
  
export default New_mdp
  