import { createBrowserRouter } from "react-router-dom"
import App from "../App"

export const getRoutes = ()=> {

  return createBrowserRouter([
    {
      path:'/',
      element:<App />,
      children:[
        
      ]
    }
  ])
}