import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import Axios from "../../../Axios"



function Connexion() {

  const navigate = useNavigate()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs


  const handleEmailChange = (e :React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value)
  }

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }

  const handleSubmit = async (e :React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      console.log("test")
      const response = await Axios.post("authentication/log-in", {
        email: email,
        password: password,
      })
      console.log("envoie réussi")
      // Authentification réussie
      console.log(response.data)
      navigate("/reserver")
    } catch (error) {
      console.log(error)
      const errorMessage =
        "La combinaison email/mot de passe est incorrecte."
      setErrorMessage(errorMessage)  
      // Masquer le message d'erreur après 2 secondes
      setTimeout(() => {
        setErrorMessage("")
      }, 2000)
    }
  }

  return (
    <div>
      <br /> <br />
      <section className="max-h-screen bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="h-20 mr-2 w-30" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          </a>
          <div className="w-full mx-16 mt-4 bg-white rounded-lg shadow lg:w-1/3 dark:border md:mt-4 sm:max-w-md xl:p-0 ">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-dark md:text-2xl">
                  Connexion
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                  <input type="email" name="email" id="email" className=" peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com"  pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" value={email} onChange={handleEmailChange} required/>
                  <p className="mt-2 invisible peer-placeholder-shown:!invisible peer-invalid:visible text-pink-600 text-sm">Le format de votre adresse mail n'est pas valide</p>                
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Votre mot de passe</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"  value={password} onChange={handlePasswordChange} required/>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-black">Se souvenir de moi</label>
                    </div>
                  </div>
                  <Link to="/mdpoublie" className="text-sm font-medium text-primary-600 hover:underline">Mot de passe oublié ?</Link>
                </div>
                <button type="submit" className="w-full text-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 bg-blue-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center">Se connecter</button>
                <p className="text-sm font-light text-black">
                      Pas encore de compte ? <Link to="/inscription" className="font-medium text-black text-primary-600 hover:underline">S'inscrire</Link>
                </p>
              </form>
            </div>
          </div>
          {errorMessage && (
            <div className="alert alert-error shadow-lg w-1/2 mx-auto flex justify-center items-center transition-opacity duration-500">
              <div>
                <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>{errorMessage}</span>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Connexion




