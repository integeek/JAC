//page de contact
import "./Contact.css"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import Axios from "../../Axios"
import { useState } from "react"

import { LocationOn, Email, Facebook,LocalPhone } from "@mui/icons-material"
//<p className="mt-2 invisible peer-placeholder-shown:!invisible peer-invalid:visible text-pink-600 text-sm">Le format de votre adresse mail n'est pas valide</p>                

function Contact() {
   
  const [nom, setNom] = useState("")
  const [email, setEmail] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (nom === "" || email === "" || message === "") {
      setError("Veuillez remplir tous les champs")
    } else {
      const date = new Date().toLocaleDateString()
      Axios.post("/contact", {
        name: nom,
        email: email,
        message: message,
        date: date,
      })
        .then((response) => {
          console.log(response.data)
          setNom("")
          setEmail("")
          setMessage("")
          setError("")
        })
        .catch((error) => {
          console.log(error)
          setError(
            "Une erreur s'est produite lors de l'envoi du formulaire. Veuillez réessayer."
          )
        })
    }
  }


  return (
    <div>
      <Navigation />
      <title>Contact</title>

      <div className="container px-6 mx-auto my-8">

        <section className="mb-8 text-gray-800">

          <p className="mb-8 text-4xl md:text-lg">Nous contacter</p>     

          <div className="flex flex-wrap" id="formulaire">
            <div className="w-full px-3 mb-12 grow-0 basis-auto lg:mb-0 lg:w-5/12 lg:px-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6 form-group">
                  <input type="text" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput7" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} required/>
                </div>
                <div className="mb-6 form-group">
                  <input type="email" className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleInput8" placeholder="Adresse email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                
                </div>
                <div className="mb-6 form-group">
                  <textarea className=" form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none" id="exampleFormControlTextarea13" rows={3} placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required></textarea>
                </div>
 
                <button type="submit" className=" w-full px-6 py-2.5 bg-blue-400 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-600 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out">Envoyer</button>
              </form>
            </div>
          </div>
          <div className="w-full grow-0 shrink-0 basis-auto lg:w-7/12" id='contact'>
            <div className="flex flex-wrap">
              <div className="w-full px-3 mb-12 grow-0 shrink-0 basis-auto lg:w-6/12 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <LocationOn sx={{ fontSize: 60 }} style={{ color: "black" }}/>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-1 font-bold">Adresse</p>
                    <p className="text-gray-500"> 31 rue de Liège</p>
                    <p className="text-gray-500">75008 Paris</p>
                  </div>
                </div>
              </div>
              <div className="w-full px-3 mb-12 grow-0 shrink-0 basis-auto lg:w-6/12 lg:px-6">
                <div className="flex items-start">
                  <div className="shrink-0">
                    <Email sx={{ fontSize: 60 }} style={{ color: "black" }}/>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-1 font-bold">Adresse mail</p>
                    <p className="text-gray-500">contact@lad.fr</p>
                  </div>
                </div>
              </div>
              <div className="w-full px-3 mb-12 grow-0 shrink-0 basis-auto lg:w-6/12 lg:px-6">
                <div className="flex align-start">
                  <div className="shrink-0">
                    <LocalPhone sx={{ fontSize: 60 }} style={{ color: "black" }}/>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-1 font-bold">Téléphone</p>
                    <p className="text-gray-500">+33 01 43 87 24 63</p>
                  </div>
                </div>
              </div>
              <div className="w-full px-3 mb-12 grow-0 shrink-0 basis-auto lg:w-6/12 lg:px-6">
                <div className="flex align-start">
                  <div className="shrink-0">
                    <Facebook sx={{ fontSize: 60 }} style={{ color: "black" }}/>
                  </div>
                  <div className="ml-6 grow">
                    <p className="mb-1 font-bold">Facebook</p>
                    <p className="text-gray-500">Les ailes déployées</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

      </div>

      <Footer />

    </div>
  )
}
  
export default Contact
