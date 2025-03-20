import { BrowserRouter, Route, Routes } from "react-router-dom"
import Register from "./Auth/register"
import Login from "./Auth/login"
import VerifyEmail from "./Auth/verify-email"
import Home from "./home/home"
import ChatList from "./home/chatlist"
import SearchFriends from "./home/searchFriends"
import Profile from "./home/profile"
import ChatWindow from "./home/chatWindow"
import ProtectedRoute from "./Auth/protectRoute"

function App() {
 

  return (
    <BrowserRouter>
      <Routes>
          <Route path='/signup' element={<Register/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/verify-email/:token' element={<VerifyEmail/>}/>
          <Route path="/" element={<ProtectedRoute component={<Home/>}/> }>
          <Route index element={<ChatList/>}/>
          <Route path="search-friends" element={<SearchFriends/>}/>
          <Route path="profile" element={<Profile/>}/>
          <Route path="chatWindow" element={<ChatWindow/>}/>
          </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
