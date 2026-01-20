import { IssueReturnpage } from './components/pages/operational'
import { Memberpage } from './components/pages/member'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
import { AdminPage } from './components/pages/admin'
import ClerkManagementPage from './components/pages/clerk'
import BookManagementPage from './components/pages/book'
import Home from './components/pages/home'
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/operational" element={<IssueReturnpage />} />
        <Route path="/member" element={<Memberpage />} />
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/clerk" element={<ClerkManagementPage />} />
        <Route path="/book" element={<BookManagementPage />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
