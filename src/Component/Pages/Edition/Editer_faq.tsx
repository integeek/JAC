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
  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [faqList, setFaqList] = useState<Faq[]>([])
  const [question, setQuestion] = useState("")

  useEffect(() => {
    Axios.get("/faq").then((response) => {
      setFaqList(response.data)
    })
  }, [])

  const handleActionSelection = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setActionSelectionnee(event.target.value)
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
            </tr>
          </thead>
          <tbody>
            {faqList.map((faq) => (
              <tr key={faq.id}>
                <td className="border border-black px-4 py-2">{faq.question}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>Choisissez ce que vous voulez faire avec la Faq</p>
      <br />
      <select
        className="select w-full max-w-xs bg-base-100 shadow-xl"
        onChange={handleActionSelection}
        value={actionSelectionnee}
      >
        <option value="" disabled>
          Choisissez votre action
        </option>
        <option value="Ajouter une question">Ajouter une question</option>
        <option value="Modifier une question">Modifier une question</option>
        <option value="Supprimer une question">Supprimer une question</option>
      </select>
      {actionSelectionnee === "Ajouter une question" && ( //probleme au niveau des contours des zones de texte
        <div className="flex justify-center items-center">
          <div className="w-full flex flex-col items-center">
            <p className="m-4">Entrez votre question</p>
            <input type="text" placeholder="Votre question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={question} onChange={(e) => setQuestion(e.target.value)} />
            <p className="m-4">Entrez la réponse</p>
            <textarea id="message" rows={4} className="block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="La réponse" ></textarea>
            <button className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
          </div>
        </div>

      )}
      {actionSelectionnee === "Modifier une question" && (
        <div>
          <p>Modification d'une question</p>
        </div>
      )}
      {actionSelectionnee === "Supprimer une question" && (
        <div>
          <p>Suppression d'une question</p>
        </div>
      )}
      <Footer />
    </div>
  )
}

export default Editer_faq
