import { Link } from "react-router-dom"
import ReCAPTCHA from "react-google-recaptcha"
import React, { useRef } from "react"
import Axios from "../../../Axios"

interface CaptchaRefObject {
  getValue: () => string;
  reset: () => void;
}

function Inscription() {
  
  const captchaRef = useRef<ReCAPTCHA>(null)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const inputVal = (e.currentTarget.querySelector("input[name=\"inputVal\"]") as HTMLInputElement).value
    const token = captchaRef.current?.getValue()
    captchaRef.current?.reset()
  
    await Axios.post(inputVal, token)
      .then((res) => console.log(res))
      .catch((error) => {
        console.log(error)
      })
  }
  

  return (
    <div>
      <title>Inscription</title>
      <br /> <br />
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="w-30 h-20 mr-2" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          </a>
          <div className="w-1/3 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 mx-16 bg-white">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Inscription
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-black">Prénom</label>
                  <input type="text" name="prenom" id="prenom" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Votre prénom" required/>
                </div>
                <div>
                  <label htmlFor="nom" className="block mb-2 text-sm font-medium text-black">Nom</label>
                  <input type="text" name="nom" id="nom" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Votre nom" required/>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                  <input type="email" name="email" id="email" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com" required/>
                  <p className="mt-2 invisible peer-placeholder-shown:!invisible peer-invalid:visible text-pink-600 text-sm">Le format de votre adresse mail n'est pas valide</p>                

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
                    <label htmlFor="terms" className="font-medium text-black">J'accepte les <Link to="/mentions" className="font-medium underline text-black text-primary-600 hover:underline">termes et conditions d'utilisation générale</Link></label>
                  </div>
                </div>
                <input type="text" name="inputVal" />
                <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY || ""}
                  ref={captchaRef}
                />
                <button type="submit" className="w-full text-black bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire</button>
                <p className="text-sm font-light text-black">
                      Déja un compte ? <Link to="/connexion" className="font-medium text-primary-600 hover:underline">Se connecter</Link>
                      
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Inscription
