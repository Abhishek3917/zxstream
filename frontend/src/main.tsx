import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import NotFound from './page/NotFound.tsx'
import VideoList from './page/VideoList.tsx'

import PlayerPage from './components/PlayerPage.tsx'

const router = createBrowserRouter([

{
    path:'/',
    element:<App />,
    errorElement:<NotFound />
},

{
    path:'/videolist',
    element:<VideoList />
},

{
    path:'/player/:id',
    element:<PlayerPage />
}

])


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
