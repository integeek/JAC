import React, { useState } from "react"
import Navigation from "../Navigation/Navigation"
import Footer from "../Footer/Footer"
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

      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">

        <div className="px-4 py-6 sm:px-0">
          <h1 className="text-2xl font-semibold mb-4">Mes informations personnelles</h1>
          <div className="mb-4">
            <label htmlFor="firstName" className="block font-medium mb-1">
              Prénom
            </label>
            {isEditing ? (
              <input
                type="text"
                id="firstName"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="form-input w-full"
              />
            ) : (
              <div className="border border-gray-300 py-2 px-4 rounded-md">{firstName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block font-medium mb-1">
              Nom
            </label>
            {isEditing ? (
              <input
                type="text"
                id="lastName"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="form-input w-full"
              />
            ) : (
              <div className="border border-gray-300 py-2 px-4 rounded-md">{lastName}</div>
            )}
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email
            </label>
            {isEditing ? (
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="form-input w-full"
              />
            ) : (
              <div className="border border-gray-300 py-2 px-4 rounded-md">{email}</div>
            )}
          </div>
          {isEditing ? (
            <button className="bg-blue-500 text-white py-2 px-4 rounded-md" onClick={handleSaveClick}>
              Enregistrer
            </button>
          ) : (
            <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded-md" onClick={handleEditClick}>
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
