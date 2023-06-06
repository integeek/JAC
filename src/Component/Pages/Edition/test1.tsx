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
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs
  const [faqSelectionne, setFaqSelectionne] = useState<Faq | null>(null)
  const [faqModifiee, setFaqModifiee] = useState<number | null>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)

  const [showModal, setShowModal] = useState(false)
  const [questionModif, setQuestionModif] = useState("")
  const [reponseModif, setReponseModif] = useState("")

  useEffect(() => {
    Axios.get("/faq").then((response) => {
      setFaqList(response.data)
    })
  }, [])

  const handleEditClick = (faq: Faq) => {
    setFaqSelectionne(faq)
    setShowModal(true)
  }
  
  const handleSaveClick = async () => {
    try {
      if (faqSelectionne) {
        const response = await Axios.put(`/faq/${faqSelectionne.id}`, { question: questionModif, answer: reponseModif })
        setFaqList(response.data)
        setShowModal(false)
      }
    } catch (error) {
      console.error(error)
    }
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
              <th className="px-4 py-2">Modifier</th>
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq) => (
              <tr key={faq.id}>
                <td className="px-4 py-2 border border-black">{faq.question}</td>
                <td className="order-3 px-4 py-2 border border-black b">
                  <button onClick={() => handleEditClick(faq)} className="btn btn-ghost btn-circle">
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
      {showModal && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10 focus:outline-none">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Editer la question</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle question" className="w-full max-w-xs input bg-gray-50 input-bordered" value={questionModif}
                        onChange={(e) => setQuestionModif(e.target.value)}/>
                    </div>
                    <h3 className="mt-6 text-lg leading-6 font-medium text-gray-900">Editer la réponse</h3>
                    <div className="mt-2">
                      <input type="text" placeholder="Nouvelle réponse" className="w-full max-w-xs input bg-gray-50 input-bordered" value={reponseModif}
                        onChange={(e) => setReponseModif(e.target.value)} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" onClick={handleSaveClick}>
            Sauvegarder
                </button>
                <button className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" onClick={() => setShowModal(false)}>
            Annuler
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <Footer />
    </div>
  )
}
export default EditerFaq
