import { IssueReturnpage } from './components/pages/operational'
import { Memberpage } from './components/pages/member'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { AdminPage } from './components/pages/admin'
import ClerkManagementPage from './components/pages/clerk'
import BookManagementPage from './components/pages/book'
import Home from './components/pages/home'
import LoginPage from './components/pages/auth/login-page'
import { Forbidden } from './components/pages/forbidden'
import ProtectedRoute from './components/protectedRoute'


function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/operational" element={<ProtectedRoute><IssueReturnpage /></ProtectedRoute>} />
        <Route path="/member" element={<ProtectedRoute><Memberpage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute><AdminPage /></ProtectedRoute>} />
        <Route path="/clerk" element={<ProtectedRoute><ClerkManagementPage /></ProtectedRoute>} />
        <Route path="/book" element={<ProtectedRoute><BookManagementPage /></ProtectedRoute>} />
        <Route path="/" element={<Home />} />
        <Route path="/forbidden" element={<Forbidden />} />
      </Routes>
      <Routes>
        <Route path="/auth/login" element={<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
