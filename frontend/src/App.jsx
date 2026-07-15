import { BrowserRouter, Routes, Route } from "react-router-dom"

import Login from "./pages/Login"
import Rooms from "./pages/Rooms"
import Chat from "./pages/Chat"
import ProtectedRoute from "./components/ProtectedRoute"

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route 
        path="/"
        element= {<Login />}
        />

        <Route
          path="/rooms"
          element={
              <ProtectedRoute>
                  <Rooms />
              </ProtectedRoute>
          }
      />

      <Route
          path="/chat/:roomName"
          element={
              <ProtectedRoute>
                  <Chat />
              </ProtectedRoute>
          }
      />

      </Routes>
    </BrowserRouter>
  )
}

export default App