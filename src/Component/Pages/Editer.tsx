import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { useEffect, useState } from "react"
import Axios from "../../Axios"


function Editer() {

  interface Restaurant {
    id: string;
    name: string;
  }

  interface Faq {
    id: number;
    question: string;
    answer: string
  }
  
  interface Menus {
     id : string,
     date: Date;
     entree: string;
     mainDish: string;
     mainDishDescription: string;
     dessert: string;
     restaurantId: number;
  }
  
  interface User {
    id: string;
    email: string;
    firstname: string;
    name: string;
    password: string;
    role: string;
    enabled: boolean;
  }

  const [pageSelectionnee, setPageSelectionnee] = useState("")
  const [actionSelectionnee, setActionSelectionnee] = useState("")
  const [question, setQuestion] = useState("")
  const [reponse, setReponse] = useState("")
  const [restaurant, setRestaurant] = useState<Restaurant[]>([])
  const [nouveauRestaurant, setNouveauRestaurant] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [faqList, setFaqList] = useState<Faq[]>([])
  const [menusList, setMenusList] = useState<Menus[]>([])
  const [userList, setUserList] = useState<User[]>([])


  const handlePageSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSelectionnee(event.target.value)
    setActionSelectionnee("")
  }
  
  const handleActionSelection = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setActionSelectionnee(event.target.value)
  }
  const handleAjouterQuestion = () => {
    const newQuestion = {
      question: question,
      reponse: reponse,
    }
  }

  useEffect(() => {
    Axios.get("/menus", { responseType: "json" }).then(response => {
      setMenusList(response.data)
    })
  },[])

  useEffect(() => {
    Axios.get("/user", { responseType: "json" }).then(response => {
      setUserList(response.data)
    })
  },[])

  useEffect(() => {
    Axios.get("/faq", { responseType: "json" }).then(response => {
      setFaqList(response.data)
    })
  },[])

  const handleNouveauRestaurantNom = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNouveauRestaurant(e.target.value)
  }
  
  useEffect(() => {
    Axios.get("/restaurant", { responseType: "json" }).then(response => {
      setRestaurant(response.data)
    })
  }, []) 

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    try{
      const response = await Axios.post("/restaurant", {
        name: nouveauRestaurant,
      })
      console.log(response.data)
      setNouveauRestaurant("")
      setErrorMessage("")
    } catch (error) {
      console.error(error)
      setErrorMessage("Une erreur est survenue lors de l'ajout du restaurant.")
    }
  }
  


  /*
    Axios.post("http://localhost:8000/faq", newQuestion)
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  */


  return (
    <div>
      <Navigation />
      <br />
      <title>Editer</title>
      <p className="text-4xl md:text-lg">Page d'édition du site</p>
      <br /><br />
      <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handlePageSelection}>
        <option disabled selected>Choisissez quelle page éditer </option>
        <option>Les menus</option>
        <option>La Faq</option>
        <option>Les restaurants</option>
        <option>Les utilisateurs</option>
      </select>
      <br />

      {pageSelectionnee === "La Faq" && (
        <div>
          <div className="center">
            <table className="mx-auto my-8"> 
              <thead>
                <tr>
                  <th className="px-4 py-2">La Faq</th>
                </tr>
              </thead>
              <tbody>
                {faqList.map(faq => (
                  <tr key={faq.id}>
                    <td className="border b border-black order-4 px-4 py-2">{faq.question}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>


          <p>Choisissez ce que vous voulez faire avec la Faq</p>
          <br />
          <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
            <option disabled selected>Choisissez votre action</option>
            <option>Ajouter une question</option>
            <option>Modifier une question</option>
            <option>Supprimer une question</option>
          </select>
          {actionSelectionnee === "Ajouter une question" && ( //probleme au niveau des contours des zones de texte
            <div className="flex justify-center items-center">
              <div className="w-full flex flex-col items-center">
                <p className="m-4">Entrez votre question</p>
                <input type="text" placeholder="Votre question" className="input bg-gray-50 input-bordered w-full max-w-xs" value={question} onChange={(e) => setQuestion(e.target.value)} />
                <p className="m-4">Entrez la réponse</p>
                <textarea id="message" rows={4} className="block p-2.5 w-full max-w-xs text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="La réponse" value={reponse.toString()}></textarea>
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
        </div>
      )}


      {pageSelectionnee === "Les menus" &&
        <div>
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
        </div>
      }

      {pageSelectionnee === "Les restaurants" &&
        <div>
          <div className="center">
            <table className="mx-auto my-8"> 
              <thead>
                <tr>
                  <th className="px-4 py-2">Les restaurants</th>
                </tr>
              </thead>
              <tbody>
                {restaurant.map(restaurant => (
                  <tr key={restaurant.id}>
                    <td className="border b border-black order-4 px-4 py-2">{restaurant.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>

          </div>

          <br />
          <p>Choisissez ce que vous voulez faire avec les restaurants</p>
          <br />
          <select className="select w-full max-w-xs bg-base-100 shadow-xl" onChange={handleActionSelection}>
            <option disabled selected>Choisissez votre action</option>
            <option>Ajouter un restaurant</option>
            <option>Supprimer un restaurant</option>
            <option>Modifier un restaurant</option>
          </select>

          {actionSelectionnee === "Ajouter un restaurant" && (
            <div>
              <form onSubmit={handleSubmit}>
                <div className="w-full flex flex-col items-center">
                  <p className="m-4">Entrez le nom du restaurant</p>
                  <input type="text" placeholder="Nom du restaurant" value={nouveauRestaurant} onChange={handleNouveauRestaurantNom} className="input bg-gray-50 input-bordered w-full max-w-xs"/>
                  <button type="submit" className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Valider</button>
                  {errorMessage && <p className="text-red-500">{errorMessage}</p>}
                  <br /><br />
                </div>         
                <br /><br />
              </form>
            </div>
          )}

          {actionSelectionnee === "Supprimer un restaurant" && (
            <div>
              <p>Supprimer un restaurant</p>
            </div>
          )}

          {actionSelectionnee === "Modifier un restaurant" && (
            <div>
              <p>Modification d'un restaurant</p>
            </div>
          )}
        </div>
      }

      {pageSelectionnee === "Les utilisateurs" &&
        <div>
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
        </div>
      }

      <Footer /> 
    </div>
  )
}
  
export default Editer