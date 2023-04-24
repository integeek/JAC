import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"

function Editer_user() {

  interface User {
    id: string;
    email: string;
    firstname: string;
    name: string;
    password: string;
    role: string;
    enabled: boolean;
  }

  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [userList, setUserList] = useState<User[]>([])
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs

  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }

  useEffect(() => {
    Axios.get("/user", { responseType: "json" }).then(response => {
      setUserList(response.data)
    })
  },[])

  const handleDeleteUser = async (id: string): Promise<void> => {
    try {
      await Axios.delete(`/user/${id}`)
      // Mettre à jour la liste des restaurants après la suppression
      const response = await Axios.get("/user")
      setUserList(response.data)
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de la suppression de la question.")
    }
  }


  return (
    <div>
      <title>Editer les utilisateurs</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les utilisateurs</th>
              <th className="px-4 py-2">Supprimer</th>
              <th className="px-4 py-2">Modifier</th>
              <th className="px-4 py-2">Activer/Désactiver</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td className="border b border-black order-4 px-4 py-2">{user.name}</td>
                <td className="border b border-black order-4 px-4 py-2">
                  <button onClick={() => handleDeleteUser(user.id)} className="btn btn-ghost btn-circle">
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
                  <button className="btn btn-ghost btn-circle">
                    <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-edit" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#2c3e50" fill="none" stroke-linecap="round" stroke-linejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                      <path d="M9 7h-3a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-3" />
                      <path d="M9 15h3l8.5 -8.5a1.5 1.5 0 0 0 -3 -3l-8.5 8.5v3" />
                      <line x1="16" y1="5" x2="19" y2="8" />
                    </svg>
                  </button>
                </td>
                <td className="border b border-black order-3 px-4 py-2"> <input type="checkbox" className="toggle toggle-error" checked={true} /> </td>
              </tr>
            ))}
          </tbody>
        </table>

      </div>

      <p>Choisissez ce que vous voulez faire avec les utilisateurs</p>
      <br />
      <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
        <option disabled selected>Choisissez votre action</option>
        <option>Approuver un utilisateur</option>
        <option>Désactiver un utilisateur</option>

      </select>      
      <Footer />
    </div>
  )
}

export default Editer_user