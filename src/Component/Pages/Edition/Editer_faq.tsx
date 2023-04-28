import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState, useEffect } from "react"
import Axios from "../../../Axios"

interface Faq {
  id: number;
  question: string;
  answer: string;
}

function Editer_faq() {
  const [faqList, setFaqList] = useState<Faq[]>([])
  //const [question, setQuestion] = useState("")
  const [nouvelleQuestion, setNouvelleQuestion] = useState("")
  const [nouvelleReponse, setNouvelleReponse] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [faqSelectionne, setFaqSelectionne] = useState<Faq | null>(null)
  const [faqModifiee, setFaqModifiee] = useState<number | null>(null)
  const [questionModif, setQuestionModif] = useState("")
  const [reponseModif, setReponseModif] = useState("")


  useEffect(() => {
    Axios.get("/faq").then((response) => {
      setFaqList(response.data)
    })
  }, [])

  const handleModifier = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (!faqSelectionne) {
      return
    }
    Axios.put(`/faq/${faqSelectionne.id}`, {
      question: questionModif,
      answer: reponseModif,
    }).then(() => {
      setFaqList(prevFaqList =>
        prevFaqList.map(faq =>
          faq.id === faqSelectionne.id ? { ...faq, question: questionModif, answer: reponseModif } : faq
        )
      )
      setFaqSelectionne(null)
      setFaqSelectionne(null)
      setFaqModifiee(null) // reset the modification state
      setQuestionModif("")
      setReponseModif("")
    }).catch(error => {
      setErrorMessage("Erreur lors de la modification de la FAQ")
      console.error(error)
    })
  }

  const handleDeleteQuestion = async (id: number): Promise<void> => {
    try {
      await Axios.delete(`/faq/${id}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/faq")
      setFaqList(response.data)
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de la suppression de la question.")
    }
  }

  // Définir le gestionnaire d'événements pour le bouton "Valider"
  const handleAjouterQuestion = () => {
  // Vérifier si la question et la réponse sont remplies
    if (nouvelleQuestion.trim() === "" || nouvelleReponse.trim() === "") {
      setErrorMessage("Veuillez remplir tous les champs.")
      return
    }
  
    // Envoyer la requête POST pour ajouter la nouvelle question
    Axios.post("/faq", {
      question: nouvelleQuestion,
      answer: nouvelleReponse,
    })
      .then((response) => {
        // Mettre à jour l'état faqList avec la nouvelle question
        setFaqList([...faqList, response.data])
    
        // Réinitialiser les états pour la nouvelle question et sa réponse
        setNouvelleQuestion("")
        setNouvelleReponse("")
      })
      .catch(() => {
        setErrorMessage("Une erreur s'est produite.")
      })

  }
  return (
    <div>
      <title>Editer la Faq</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8">
          <thead>
            <tr>
              <th className="px-4 py-2">La Faq</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq) => (
              <tr key={faq.id}>
                <td className="border border-black px-4 py-2">{faq.question}</td>
                <td className="border b border-black order-4 px-4 py-2">
                  <button onClick={() => handleDeleteQuestion(faq.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                </td>
                <td className="border b border-black order-3 px-4 py-2">
                  <button onClick={() => {
                    setFaqSelectionne(faq)
                    setFaqModifiee(faq.id)
                  }} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p><b>Ajouter une entrée dans la Faq :</b></p>
      <div className="flex justify-center items-center">
        <div className="w-full flex flex-col items-center">
          <p className="m-4">Entrez votre question</p>
          <input type="text" placeholder="Votre question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={nouvelleQuestion} onChange={(e) => setNouvelleQuestion(e.target.value)} />
          <p className="m-4">Entrez la réponse</p>
          <textarea id="message" rows={4} className="block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" value={nouvelleReponse}  onChange={(e) => setNouvelleReponse(e.target.value)} placeholder="La réponse" ></textarea>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <button onClick={handleAjouterQuestion} className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
        </div>
      </div>

      <Footer />
      <br /><br />

    </div>
  )
}

export default Editer_faq
/*        
      {faqModifiee === faq.id ? (
        <form onSubmit={handleModifier}>
          <input type="text" placeholder="modification de la question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={questionModif} onChange={(e) => setQuestionModif(e.target.value)} />
          <input type="text" placeholder="modification de la question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={reponseModif} onChange={(e) => setReponseModif(e.target.value)} />
          <button type="submit" className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
        </form>
      ) : (
        <button onClick={() => {
          setFaqModifiee(faq.id)
          setQuestionModif(faq.question)
          setReponseModif(faq.answer)
        }} className="btn btn-ghost btn-circle">Modifier</button>
      )}
      */