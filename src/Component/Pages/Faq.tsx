import React, { useState, useEffect } from "react"
import Axios from "../../Axios"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function Faq() {
  const [faqs, setFaqs] = useState<{ id: number; question: string; answer: string }[]>([]) //Initialise un état faqs avec un tableau vide de questions et réponses, et une fonction setFaqs pour mettre à jour l'état. Le type d'un élément du tableau est un objet avec les propriétés id (numérique), question (chaîne de caractères) et réponse (chaîne de caractères).

  useEffect(() => {
    async function fetchData() {
      const response = await Axios.get("faq") //requete get au back
      setFaqs(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Navigation />
      <Link to="/editfaq" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
  Éditer
      </Link>
      <title>Faq</title>
      <br />
      <p className="text-4xl md:text-lg">Foire aux questions</p>     
      <br />
      {faqs.map(faq => ( //Parcourir le tableau faqs et faire un element par réponse
        <div tabIndex={0} key={faq.id} className="z-0 mb-4 ml-16 mr-16 border collapse collapse-plus border-base-300 bg-base-100 rounded-box">
          <div className="text-xl font-medium bg-blue-400 collapse-title">
            {faq.question}
          </div>
          <div className="collapse-content" style={{ textAlign: "left" }}> 
            <p>{faq.answer}</p>
          </div>
        </div>
      ))}
      <br /><br />
      <p className="text-black">Votre question n'y est pas ? Rendez-vous sur la <Link to="/contact" className="text-black hover:underline">page de contact</Link> </p>
      
      <Footer />
    </div>
  )
}

export default Faq
