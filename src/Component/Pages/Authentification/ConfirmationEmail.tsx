import Footer from "../../Footer/Footer"
import Navigation from "../../Navigation/Navigation"
import { Link, useParams } from "react-router-dom"

function ConfirmationEmail() {

  const { token } = useParams()

  return (
    <div>
      <Navigation />

      <div className="flex flex-col items-center justify-center min-h-screen">
        <title>Confirmation email</title>
        <div className="text-center">
          <p className="py-8 text-4xl md:text-lg">Confirmation d'adresse email</p>
          <p>Votre adresse email a été validée avec succès.</p>
          <p>Vous pouvez maintenant vous connecter à votre compte</p>
          <Link to="/connexion" className="inline-flex text-white bg-blue-400 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center my-4 mx-10">Page de connexion</Link>
        </div>
        <Footer />
      </div>
    </div>
  )
}

export default ConfirmationEmail
