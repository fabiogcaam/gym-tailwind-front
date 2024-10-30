import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home/Home"
import Login from "./pages/Login/Login"
import SignUp from "./pages/SignUp/SignUp"
import Main from "./pages/Main/Main"
import Profile from "./pages/Profile/Profile"
import ProfileEdit from "./pages/ProfileEdit/ProfileEdit"
import Bookings from "./pages/Bookings/Bookings"
import PrivateRoute from "./components/PrivateRoute/PrivateRoute"

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route element={<PrivateRoute />}>
          <Route path="/main" element={<Main />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/:id/profileEdit" element={<ProfileEdit />} />
          <Route path="/:id/bookings" element={<Bookings />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
