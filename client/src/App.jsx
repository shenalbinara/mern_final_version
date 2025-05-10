import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { About } from './pages/About'
import { SignIn } from './pages/Signin'
import SignUp from './pages/SignUp'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import { Home } from './pages/Home'

export default function App() {
  return (
    <BrowserRouter>
       <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/sign_in" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/prjects" element={<Projects />} />
       </Routes>
    
    </BrowserRouter>
  )
}
