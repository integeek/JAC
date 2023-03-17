

function New_mdp() {  
  return (
    <div>
      <section className="bg-white">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="w-30 h-20 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          </a>
          <div className="w-1/3 p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md">
            <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
               Nouveau mot de passe
            </h2>
            <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" action="#">
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Nouveau mot de passe</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
              </div>
              <div>
                <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black">Confirmer le mot de passe</label>
                <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required/>
              </div>
              <div className="flex items-start">
              </div>
              <button type="submit" className="w-full text-white bg-blue-400 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Réinitialiser le mot de passe</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
  
  
export default New_mdp
  