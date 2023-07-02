import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { GetRoutes } from './routes/routes'
import { RouterProvider } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={GetRoutes()} />
  </React.StrictMode>,
)
