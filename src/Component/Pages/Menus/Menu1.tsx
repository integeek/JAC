import Navigation from "../../Navigation/Navigation"
import Footer from "../../Footer/Footer"
import { useState } from "react"

function Menu1() {

  const menus = [
    { name: "Menu 1", image: "https://via.placeholder.com/100",  description: "description du menu 1", entree: "Entree 1", dessert:"Dessert 1", plat: "plat 1"},
    { name: "Menu 2", image: "https://via.placeholder.com/100",  description: "description du menu 2", entree: "Entree 2", dessert:"Dessert 2", plat: "plat 2"  },
    { name: "Menu 3", image: "https://via.placeholder.com/100",  description: "description du menu 3", entree: "Entree 3", dessert:"Dessert 3", plat: "plat 3"  },
    { name: "Menu 4", image: "https://via.placeholder.com/100",  description: "description du menu 4", entree: "Entree 4", dessert:"Dessert 4", plat: "plat 4" },
    { name: "Menu 5", image: "https://via.placeholder.com/100",  description: "description du menu 5", entree: "Entree 5", dessert:"Dessert 5", plat: "plat 5"  },
  ]
  
  const [quantities, setQuantities] = useState(new Array(menus.length).fill(0))

  const handleQuantityChange = (index: number, value: number) => {
    const newQuantities = [...quantities]
    newQuantities[index] = value
    setQuantities(newQuantities)
  }

  return (
    <div>
      <Navigation />
      <title>Réserver un menu</title>
      <p className="text-4xl md:text-lg py-4">Réserver un menu</p>
      <div className="p-6">
        <div className="grid grid-cols-3 gap-4">
          {menus.map((menu, index: number) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden flex">
              <img src={menu.image} alt={menu.name} className="w-1/2 p-4" />
              <div className="p-4 w-1/2 flex flex-col justify-between">
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-bold mb-2">{menu.name}</h2>
                  <p className="text-gray-700 text-base">{menu.entree}</p>
                  <p className="text-gray-700 text-base">{menu.plat}</p>
                  <p className="text-gray-700 text-base">{menu.description}</p>
                  <p className="text-gray-700 text-base">{menu.dessert}</p>
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


        <label htmlFor="commentaire" className=" py-6 block mb-2 text-sm font-medium text-black">Vos commentaires par rapport aux menus</label> 
        <textarea id="commentaire" className="textarea textarea-bordered outline:none block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300" placeholder="Vos commentaires"></textarea>
        <button className="btn bg-blue-400 hover:bg-blue-600 border-blue-400 m-8 btn-active">Réserver</button>
        <Footer />
      </div>
    </div>
  )
}

export default Menu1
