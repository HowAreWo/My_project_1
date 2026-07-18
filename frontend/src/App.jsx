import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import Register from "./pages/Register"
import GamePlay from "./pages/GamePlay"
import Membership from "./pages/Membership"
import NavBar from "./components/NavBar"
import useAuthStore from "./store/useAuthStore"

function ProtectedRoute({ children }) {
  const token = useAuthStore((s) => s.token)
  return token ? children : React.createElement(Navigate, { to: "/login" })
}

export default function App() {
  return React.createElement(BrowserRouter, null,
    React.createElement("div", { className: "min-h-screen bg-gray-50" },
      React.createElement(Routes, null,
        React.createElement(Route, { path: "/login", element: React.createElement(Login) }),
        React.createElement(Route, { path: "/register", element: React.createElement(Register) }),
        React.createElement(Route, { path: "/", element: React.createElement(ProtectedRoute, null, React.createElement(Home)) }),
        React.createElement(Route, { path: "/play", element: React.createElement(ProtectedRoute, null, React.createElement(GamePlay)) }),
        React.createElement(Route, { path: "/membership", element: React.createElement(ProtectedRoute, null, React.createElement(Membership)) })
      ),
      React.createElement(NavBar)
    )
  )
}
