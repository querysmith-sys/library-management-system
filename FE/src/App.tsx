import { IssueReturnpage } from './components/pages/operational'
import { Memberpage } from './components/pages/member'
import './App.css'
import { BrowserRouter,Route,Routes } from 'react-router-dom'
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
        <Route path="/operational" element={<IssueReturnpage />} />
        <Route path="/member" element={<Memberpage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
