import React, { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import "../index.css"

function Home() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/connexion")
    }, 2000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="bg-blue-500 flex justify-center items-center h-screen">
      <img src="https://www.lad.fr/sites/default/files/logo-web-couleur.png" alt="Logo" />
    </div>
  )
}

export default Home
