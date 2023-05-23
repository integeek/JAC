import { Link } from "react-router-dom"
//import ReCAPTCHA from "react-google-recaptcha"
import React from "react"
import Axios from "../../../Axios"
import { useState } from "react"

/*
interface CaptchaRefObject {
  getValue: () => string;
  reset: () => void;
}
*/
function Inscription() {
  /*

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
*/
  const [prenom, setPrenom] = useState("")
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    //Toutes les recommandations de la CNIL
    if (password.length < 12) {
      alert("Le mot de passe doit contenir au moins 8 caractères")
      return 
    }
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas")
      return 
    }
    if (!/\d/.test(password)) {
      alert("Le mot de passe doit contenir au moins un chiffre")
      return 
    }
    if (!/[A-Z]/.test(password)) {
      alert("Le mot de passe doit contenir au moins une majuscule")
      return 
    }
    if (!/[a-z]/.test(password)) {
      alert("Le mot de passe doit contenir au moins une minuscule")
      return 
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      alert("Le mot de passe doit contenir au moins un caractère spécial")
      return 
    }
    
    Axios.post("/authentication/register", {
      name: prenom,
      firstname: nom,
      email: email,
      password: password,
    })
      .then((response) => {
        console.log(response.data)
        setNom("")
        setPrenom("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
        setErrorMessage("")
        //Axios.post("/email/send-email", {
        //   email: email,
      //  })
      })
      .catch((error) => {
        console.error(error)
        setErrorMessage(
          "Une erreur s'est produite lors de l'inscription. Veuillez réessayer."
        )
      })
  }

  return (
    <div>
      <title>Inscription</title>
      <br /> <br />
      <section className="bg-white">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-black">
            <img className="h-20 mr-2 w-30" src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="logo"/>
          </a>
          <div className="w-full mx-16 bg-white rounded-lg shadow lg:w-1/3 dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-black md:text-2xl">
                  Inscription
              </h1>
              <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="prenom" className="block mb-2 text-sm font-medium text-black">Prénom</label>
                  <input type="text" name="prenom" id="prenom" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Votre prénom" value={prenom} onChange={(e) => setPrenom(e.target.value)} required/>
                </div>
                <div>
                  <label htmlFor="nom" className="block mb-2 text-sm font-medium text-black">Nom</label>
                  <input type="text" name="nom" id="nom" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Votre nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                </div>

                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black">Votre email</label>
                  <input type="email" name="email" id="email" className="peer bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="nom@mail.com" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                  <p className="mt-2 invisible peer-placeholder-shown:!invisible peer-invalid:visible text-pink-600 text-sm">Le format de votre adresse mail n'est pas valide</p>                

                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-black">Mot de passe</label>
                  <input type="password" name="password" id="password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                </div>
                <label htmlFor="info" className="block mb-2 text-xs font-medium text-left text-gray-600"> Il doit contenir au moins 12 caractères,1 chiffre, 1 majuscule, 1 minuscule et 1 caractère spécial</label>
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-black">Confirmer votre mot de passe</label>
                  <input type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-base-300 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required/>
                </div>
                <button type="submit" className="w-full text-black bg-blue-500 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">S'inscrire</button>
                {errorMessage && <p>{errorMessage}</p>}
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
/*                 <ReCAPTCHA
                  sitekey={process.env.REACT_APP_SITE_KEY || ""}
                  ref={captchaRef}
                />
                */
export default Inscription
