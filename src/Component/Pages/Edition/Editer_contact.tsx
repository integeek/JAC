import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import Axios from "../../../Axios"
import { useState, useEffect} from "react"

interface Contact {
    id: string;
    name: string;
    email: string;
    message: string;
    date: Date;
}

function Editer_contact() {
  const [contactList, setContactList] = useState<Contact[]>([])
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    Axios.get("/contact")
      .then(response => {
        setContactList(response.data)
      })
  }, [])

  const handleDeleteContact = async (id: string): Promise<void> => {
    try {
      await Axios.delete(`/contact/${id}`)
      // Mettre à jour la liste des menus après la suppression
      const response = await Axios.get("/contact")
      setContactList(response.data)
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de la suppression de la question.")
    }
  }
  return (
    <div>
      <Navigation />
      <title>Voir formulaire contact</title>
      <p className="text-4xl md:text-lg py-8">Voir les formulaires de contact</p>
      <div className="center" >
        <table className="mx-auto my-8 shadow-md">
          <thead>
            <tr>
              <th className="px-4 py-2">Le nom</th>
              <th className="px-4 py-2">La date</th>
              <th className="px-4 py-2">L'email</th>
              <th className="px-4 py-2">Le message</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {contactList.map((contact) => (
              <tr key={contact.id}>
                <td className="border border-black px-4 py-2">{contact.name}</td>
                <td className="border border-black px-4 py-2">{new Date(contact.date).toLocaleString("fr-FR")}</td>
                <td className="border border-black px-4 py-2">{contact.email}</td>
                <td className="border border-black px-4 py-2">{contact.message}</td>
                <td className="border border-black order-4 px-4 py-2">
                  <button onClick={() => handleDeleteContact(contact.id)} className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-trash" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#ff5722" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="4" y1="7" x2="20" y2="7" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                      <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                      <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                    </svg>
                  </button>
                  <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-mail-reply" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="#00bcd4" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <line x1="5" y1="12" x2="13" y2="12" />
                      <line x1="5" y1="12" x2="9" y2="16" />
                      <line x1="5" y1="12" x2="9" y2="8" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>
      <br /><br /><br /><br /><br /><br /><br /><br /><br /><br /><br />
      <Footer />
    </div>
  )
}

export default Editer_contact
