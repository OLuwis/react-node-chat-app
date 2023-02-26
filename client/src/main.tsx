import "./index.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import SignIn from './components/SignIn';
import ChatLayout from './components/ChatLayout';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/chat",
    element: <ChatLayout />
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
