import { Route, Navigate } from "react-router-dom"
import React from "react"

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string; // Ajoutez la propriété userRole de type string
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
  allowedRoles
}) => {
  const userRole = "admin" // Remplacez cette valeur par le rôle de l'utilisateur récupéré depuis votre système d'authentification

  if (isAuthenticated && allowedRoles.includes(userRole)) {     // Vérifiez à la fois l'authentification et si le rôle de l'utilisateur est inclus dans les rôles autorisés
    return <Route path={path} element={element} />
  } else if (isAuthenticated) {  // Si l'utilisateur est authentifié mais n'a pas l'un des rôles autorisés,
    return <Navigate to="/erreurperm" />
  } else {  // Si l'utilisateur n'est pas authentifié, redirigez-le vers la page de connexion
    return <Navigate to="/connexion" />
  }
}

export default PrivateRoute
