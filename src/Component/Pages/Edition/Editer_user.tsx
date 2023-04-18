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

  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }

  useEffect(() => {
    Axios.get("/user", { responseType: "json" }).then(response => {
      setUserList(response.data)
    })
  },[])

  return (
    <div>
      <title>Editer les utilisateurs</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les utilisateurs</th>
            </tr>
          </thead>
          <tbody>
            {userList.map(user => (
              <tr key={user.id}>
                <td className="border b border-black order-4 px-4 py-2">{user.name}</td>
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
        <option>Modifier un utilisateur</option>
        <option>Supprimer un utilisateur</option>
        <option>Désactiver un utilisateur</option>

      </select>      
      <Footer />
    </div>
  )
}

export default Editer_user