import { Route, Navigate } from "react-router-dom"
import React from "react"

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
}) => {
  if (isAuthenticated) {
    return <Route path={path} element={element} />
  } else {
    return <Navigate to="/connexion" />
  }
}


export default PrivateRoute





/*import { Route, Navigate } from "react-router-dom"
import React from "react"

interface PrivateRouteProps {
  path: string;
  element: React.ReactNode;
  isAuthenticated: boolean;
  allowedRoles: string[];
  userRole: string;
}


const PrivateRoute: React.FC<PrivateRouteProps> = ({
  path,
  element,
  isAuthenticated,
  allowedRoles,
  userRole
}) => {
  if (isAuthenticated && allowedRoles.includes(userRole)) {
    return <Route path={path} element={element} />
  } else if (isAuthenticated) {
    return <Navigate to="/erreurperm" />
  } else {
    return <Navigate to="/connexion" />
  }
}


export default PrivateRoute
*/