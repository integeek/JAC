import { Route, Navigate } from "react-router-dom"
import React from "react"

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode; //reçois du code react
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  if (isAuthenticated) {     // Si l'utilisateur est authentifié, afficher la route avec le composant fourni
    return <Route path={path} element={element} />
  } else { //Sinon, redirigé vers la page de connexion 
    return <Navigate to="/connexion" />
  }
}

export default PrivateRoute
