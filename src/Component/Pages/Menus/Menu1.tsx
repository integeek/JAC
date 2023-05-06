import Navigation from "../../Navigation/Navigation"
import Footer from "../../Footer/Footer"
import { useState, useEffect } from "react"
import Axios from "../../../Axios"
import { Link } from "react-router-dom"

function Menu1() {

  interface Repas {
    id : string,
    date: Date;
    entree: string;
    mainDish: string;
    mainDishDescription: string;
    dessert: string;
    restaurantId: number;
  }

  const [repas, setRepas] = useState<Repas[]>([])
  const [quantities, setQuantities] = useState(new Array(repas.length).fill(0))
  const [compteur, setCompteur] = useState(1)
  const [commentaire, setCommentaire] = useState("")
  const [menusID, setMenusID] = useState("")
  const [errorMessage, setErrorMessage] = useState("") //Pour les messages d'erreurs

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  useEffect(() => {
    // Charger les restaurants depuis l'API
    Axios
      .get("http://localhost:8000/menus")
      .then((response) => {
        setRepas(response.data)
        setQuantities(new Array(response.data.length).fill(0))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  const handleAjouterReservation = () => {
    const totalQuantity = quantities.reduce((acc, cur) => acc + cur, 0)
    const menuIds = repas.filter((repas, index) => quantities[index] > 0).map((repas) => repas.id)
    if (menuIds.length === 0) {
      setErrorMessage("Vous devez sélectionner au moins un menu.")
      return
    }
    if (totalQuantity === 0) {
      setErrorMessage("Vous devez sélectionner au moins un menu.")
      return
    }

    Axios.post("/reservation", {
      commentaire: commentaire,
      menusId: menuIds.join(","),
      nbPersonne: totalQuantity,
    })
      .then((response) => {
        setCommentaire("")
        setMenusID(menuIds.join(","))
      })
      .catch(() => {
        setErrorMessage("Une erreur s'est produite.")
      })
  }


  return (
    <div>
      <Navigation />
      <title>Réserver un menu</title>
      <Link to="/editmenus" className="fixed top-0 right-0 m-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
  Éditer
      </Link>
      <p className="text-4xl md:text-lg py-4">Réserver un menu</p>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {repas.map((repas, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex">
              <img src={"https://via.placeholder.com/100"} alt={repas.mainDishDescription} className="w-1/2 p-4" />
              <div className="p-4 w-1/2 flex flex-col justify-between">
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{"Menu numéro " + (compteur + index)}</h2>
                  <p className="text-gray-700 text-base">{repas.entree}</p>
                  <p className="text-gray-700 text-base">{repas.mainDish}</p>
                  <p className="text-gray-700 text-base">{repas.mainDishDescription}</p>
                  <p className="text-gray-700 text-base">{repas.dessert}</p>
                </div>
                <div className="mt-4 flex justify-center items-center mb-10">
                  <div className="flex justify-center items-center">
                    <button className="bg-gray-300 rounded-l-lg px-2" onClick={() => handleQuantityChange(index, Math.max(0, quantities[index] - 1))}>-</button>
                    <span className="mx-2">{quantities[index]}</span>
                    <button className="bg-gray-300 rounded-r-lg px-2" onClick={() => handleQuantityChange(index, quantities[index] + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <label htmlFor="commentaire" className=" py-6 block mb-2 text-sm font-medium text-black" >Vos commentaires par rapport aux menus</label> 
        <textarea id="commentaire" className="textarea textarea-bordered outline:none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Vos commentaires" value={commentaire} onChange={(e) => setCommentaire(e.target.value)}></textarea>
        <button onClick={handleAjouterReservation} className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Réserver</button>
        <Footer />
      </div>
    </div>
  )
}

export default Menu1
