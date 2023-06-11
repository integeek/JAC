import Navigation from "../../Navigation/Navigation"
import Footer from "../../Footer/Footer"
import { useState, useEffect } from "react"
import Axios from "../../../Axios"
import { Link } from "react-router-dom"
import DatePicker from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"


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
  const [startDate, setStartDate] = useState(new Date())  
  const [selectedDate, setSelectedDate] = useState<null | Date>(null)
  const [showSuccessAlert, setShowSuccessAlert] = useState(false)


  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  useEffect(() => {
    // Charger les restaurants depuis l'API
    Axios
      .get("menus")
      .then((response) => {
        setRepas(response.data)
        setQuantities(new Array(response.data.length).fill(0))
      })
      .catch((error) => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    if (showSuccessAlert) {
      // Masquer la notification après 1 seconde
      const timeoutId = setTimeout(() => {
        setShowSuccessAlert(false)
      }, 2000)

      // Nettoyer le timeout lors du démontage du composant ou lorsqu'il y a un changement de valeur pour showSuccessAlert
      return () => clearTimeout(timeoutId)
    }
  }, [showSuccessAlert])
  const handleAjouterReservation = () => {
    const menus = repas
      .filter((repas, index) => quantities[index] > 0)
      .map((repas, index) => {
        return {
          menuId: repas.id,
          quantity: quantities[index]
        }
      })
  
    if (menus.length === 0) {
      setErrorMessage("Vous devez sélectionner au moins un menu.")
      return
    }
  
    const totalQuantity = menus.reduce((acc, cur) => acc + cur.quantity, 0)
  
    if (selectedDate) {
      const reservationData = {
        date: selectedDate.toISOString(),
        commentaire: commentaire,
        menus: menus.map((menu) => menu.menuId).join(","),
        nbPersonne: totalQuantity,
      }
    
      Axios.post("/reservation", reservationData)
        .then((response) => {
          console.log(response)
          setCommentaire("")
          setShowSuccessAlert(true)
        })
        .catch(() => {
          setErrorMessage("Une erreur s'est produite.")
        })
    }
  }
  
  return (
    <div>
      <Navigation />
      <title>Réserver un menu</title>
      <Link to="/editmenus" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
  Éditer
      </Link>
      <p className="py-4 text-4xl md:text-lg">Réserver un menu</p>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {repas.map((repas, index) => (
            <div key={index} className="flex overflow-hidden bg-white rounded-lg shadow-md">
              <img src={"https://via.placeholder.com/100"} alt={repas.mainDishDescription} className="w-1/2 p-4" />
              <div className="flex flex-col justify-between w-1/2 p-4">
                <div className="flex flex-col justify-between">
                  <h2 className="mb-2 text-xl font-bold">{"Menu numéro " + (compteur + index)}</h2>
                  <p className="text-base text-gray-700">{repas.entree}</p>
                  <p className="text-base text-gray-700">{repas.mainDish}</p>
                  <p className="text-base text-gray-700">{repas.mainDishDescription}</p>
                  <p className="text-base text-gray-700">{repas.dessert}</p>
                </div>
                <div className="flex items-center justify-center mt-4 mb-10">
                  <div className="flex items-center justify-center">
                    <button className="px-2 bg-gray-300 rounded-l-lg" onClick={() => handleQuantityChange(index, Math.max(0, quantities[index] - 1))}>-</button>
                    <span className="mx-2">{quantities[index]}</span>
                    <button className="px-2 bg-gray-300 rounded-r-lg" onClick={() => handleQuantityChange(index, quantities[index] + 1)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center mx-auto ">
          
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => {
              const nextDay = new Date(date)
              nextDay.setDate(nextDay.getDate() + 1)
              setSelectedDate(nextDay)
            }}
            dateFormat="yyyy-MM-dd"
            className="block p-2.5 mt-4 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300"
          />
        </div>


        <label htmlFor="commentaire" className="block py-6 mb-2 text-sm font-medium text-black " >Vos commentaires par rapport aux menus</label> 
        <textarea id="commentaire" className="textarea textarea-bordered outline:none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Vos commentaires" value={commentaire} onChange={(e) => setCommentaire(e.target.value)}></textarea>
        <button onClick={handleAjouterReservation} className="m-8 bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">Réserver</button>
        
        <button className="bg-blue-400 border-blue-400 btn hover:bg-blue-600 btn-active">
          <Link to="/reserver" className="text-white">
          Retourner à la page des restaurants
          </Link>
        </button>

        {showSuccessAlert && (
          <div className="flex items-center justify-center w-1/2 mx-auto transition-opacity duration-500 shadow-lg alert alert-success">
            <div>
              <svg xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Votre menu a bien été réservé !</span>
            </div>
          </div>
        )}
        <Footer />
      </div>
    </div>
  )
}

export default Menu1
/*
<label htmlFor="datepicker" className="block mt-4 mb-2 font-medium text-gray-700">
La date de votre réservation
      </label>
      <DatePicker selected={selectedDate} onChange={(date) => {
        if (date) {
          setSelectedDate(date)
        }
      }} />*/