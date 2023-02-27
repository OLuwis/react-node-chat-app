import "./index.css"
import React from 'react'
import ReactDOM from 'react-dom/client'
import SignIn from './components/SignIn';
import ChatLayout from './components/ChatLayout';
import { io } from "socket.io-client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const socket = io("http://localhost:3000", {
  autoConnect: false,
  secure: false
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <SignIn socket={socket}/>,
  },
  {
    path: "/chat",
    element: <ChatLayout socket={socket}/>
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
