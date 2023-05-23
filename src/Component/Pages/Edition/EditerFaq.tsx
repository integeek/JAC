import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState, useEffect } from "react"
import Axios from "../../../Axios"

interface Faq {
  id: number;
  question: string;
  answer: string;
}

function EditerFaq() {
  const [faqList, setFaqList] = useState<Faq[]>([])
  //const [question, setQuestion] = useState("")
  const [nouvelleQuestion, setNouvelleQuestion] = useState("")
  const [nouvelleReponse, setNouvelleReponse] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [faqSelectionne, setFaqSelectionne] = useState<Faq | null>(null)
  const [faqModifiee, setFaqModifiee] = useState<number | null>(null)
  const [questionModif, setQuestionModif] = useState("")
  const [reponseModif, setReponseModif] = useState("")
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)


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

  useEffect(() => {
    if (showSuccessAlert) {
      // Masquer la notification après 1 seconde
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 1000)

      // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
      return () => clearTimeout(timeoutId)
    }
  }, [showSuccessAlert])

  const handleDeleteQuestion = async (id: number): Promise<void> => {
    try {
      await Axios.delete(`/faq/${id}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/faq")
      setFaqList(response.data)
      setErrorMessage("")
      setShowSuccessAlert(true)
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
        <table className="mx-auto my-8 shadow-md">
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
                <td className="px-4 py-2 border border-black">{faq.question}</td>
                <td className="order-4 px-4 py-2 border border-black b">
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
                <td className="order-3 px-4 py-2 border border-black b">
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
      {showSuccessAlert && (
        <div className="alert alert-success shadow-lg w-1/2 mx-auto flex justify-center items-center">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>L'entrée de la Faq a été supprimé avec succès !</span>
          </div>
        </div>
      )}
      <p><b>Ajouter une entrée dans la Faq :</b></p>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center w-full">
          <p className="m-4">Entrez votre question</p>
          <input type="text" placeholder="Votre question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={nouvelleQuestion} onChange={(e) => setNouvelleQuestion(e.target.value)} />
          <p className="m-4">Entrez la réponse</p>
          <textarea id="message" className=" textarea textarea-bordered block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="La réponse" value={nouvelleReponse}  onChange={(e) => setNouvelleReponse(e.target.value)}></textarea>
          {errorMessage && <p className="text-red-600">{errorMessage}</p>}
          <button onClick={handleAjouterQuestion} className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
        </div>
      </div>

      <Footer />
      <br /><br />

    </div>
  )
}

export default EditerFaq
/*        
      {faqModifiee === faq.id ? (
        <form onSubmit={handleModifier}>
          <input type="text" placeholder="modification de la question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={questionModif} onChange={(e) => setQuestionModif(e.target.value)} />
          <input type="text" placeholder="modification de la question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={reponseModif} onChange={(e) => setReponseModif(e.target.value)} />
          <button type="submit" className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Valider</button>
        </form>
      ) : (
        <button onClick={() => {
          setFaqModifiee(faq.id)
          setQuestionModif(faq.question)
          setReponseModif(faq.answer)
        }} className="btn btn-ghost btn-circle">Modifier</button>
      )}
      */