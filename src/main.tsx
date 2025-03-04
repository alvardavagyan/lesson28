import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Login } from './pages/Login'
import { Profile } from './pages/Profile/Dashboard'
import { Layout } from './pages/Profile/Layout'
import { Photos } from './pages/Profile/Photos'
import { UpdateAccount } from './pages/Profile/Settings'

const routes = createBrowserRouter([
  {
    path: '',
    element: <Signup />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/profile',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Profile />
      },
      {
        path: "albums",
        element: <Photos />
      },
      {
        path:"settings",
        element:<UpdateAccount />
      }
      
    ]
  }
]
)

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={routes}>
    </RouterProvider>
  </StrictMode>,
)
