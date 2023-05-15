import React, { useState } from "react"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
import { Link } from "react-router-dom"

function Compte() {
  const [firstName, setFirstName] = useState("John")
  const [lastName, setLastName] = useState("Doe")
  const [email, setEmail] = useState("johndoe@example.com")
  const [isEditing, setIsEditing] = useState(false)

  const handleEditClick = () => {
    setIsEditing(true)
  }

  const handleSaveClick = () => {
    setIsEditing(false)
    // Enregistrer les changements dans la base de données ou envoyer une requête à l"API
  }

  return (
    <div>
      <Navigation />
      <Link to="/edituser" className="fixed top-0 right-0 px-4 py-2 m-4 font-bold text-white bg-blue-500 rounded hover:bg-blue-700">
  Éditer
      </Link>

      <div className="py-6 mx-auto max-w-7xl sm:px-6 lg:px-8">

        <div className="px-4 py-6 sm:px-0">
          <h1 className="mb-4 text-2xl font-semibold">Mes informations personnelles</h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="block mb-1 font-medium">
              Prénom
            </label>
            {isEditing ? (
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full form-input"
              />
            ) : (
              <div className="px-4 py-2 border border-gray-300 rounded-md">{firstName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block mb-1 font-medium">
              Nom
            </label>
            {isEditing ? (
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full form-input"
              />
            ) : (
              <div className="px-4 py-2 border border-gray-300 rounded-md">{lastName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block mb-1 font-medium">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full form-input"
              />
            ) : (
              <div className="px-4 py-2 border border-gray-300 rounded-md">{email}</div>
            )}
          </div>
          {isEditing ? (
            <button className="px-4 py-2 text-white bg-blue-500 rounded-md" onClick={handleSaveClick}>
              Enregistrer
            </button>
          ) : (
            <button className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md" onClick={handleEditClick}>
              Modifier
            </button>
          )}
        </div>
      </div>
      <Footer />

    </div>
  )
}

export default Compte
