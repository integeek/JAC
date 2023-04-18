import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { useState } from "react"
import { useEffect } from "react"
import Axios from "../../../Axios"

function Editer_menus() {

  interface Menus {
    id : string,
    date: Date;
    entree: string;
    mainDish: string;
    mainDishDescription: string;
    dessert: string;
    restaurantId: number;
 }

  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [menusList, setMenusList] = useState<Menus[]>([])

  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }

  useEffect(() => {
    Axios.get("/menus", { responseType: "json" }).then(response => {
      setMenusList(response.data)
    })
  },[])


  return (
    <div>
      <title>Editer les menus</title>
      <Navigation />
      <div className="center">
        <table className="mx-auto my-8"> 
          <thead>
            <tr>
              <th className="px-4 py-2">Les menus</th>
            </tr>
          </thead>
          <tbody>
            {menusList.map(menu => (
              <tr key={menu.id}>
                <td className="border b border-black order-4 px-4 py-2">{menu.mainDish}</td>
              </tr>
            ))}
          </tbody>
        </table>

      </div> 
      <p>Choisissez ce que vous voulez faire avec les menus</p>
      <br />
      <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
        <option disabled selected>Choisissez votre action</option>
        <option>Ajouter un menus</option>
        <option>Modifier un menus</option>
        <option>Supprimer un menus</option>
      </select>   
      <Footer />
    </div>
  )
}

export default Editer_menus