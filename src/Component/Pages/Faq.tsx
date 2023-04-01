import React, { useState, useEffect } from "react"
import axios from "axios"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function Faq() {
  const [faqs, setFaqs] = useState<{ id: number; question: string; answer: string }[]>([]) //Initialise un état faqs avec un tableau vide de questions et réponses, et une fonction setFaqs pour mettre à jour l'état. Le type d'un élément du tableau est un objet avec les propriétés id (numérique), question (chaîne de caractères) et réponse (chaîne de caractères).

  useEffect(() => {
    async function fetchData() {
      const response = await axios.get("http://localhost:8000/faq") //requete get au back
      setFaqs(response.data)
    }
    fetchData()
  }, [])

  return (
    <div>
      <Navigation />
      <title>Faq</title>
      <br />
      <p className="text-4xl md:text-lg">Foire aux questions</p>     
      <br />
      {faqs.map(faq => ( //Parcourir le tableau faqs et faire un element par réponse
        <div tabIndex={0} key={faq.id} className="collapse collapse-plus border border-base-300 bg-base-100 mr-16 ml-16 mb-4 rounded-box">
          <div className="collapse-title bg-blue-400 text-xl font-medium">
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
