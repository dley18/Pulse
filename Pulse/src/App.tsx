import { Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './screens/Home/home';
import CPUDashboard from './screens/CPUDashboard/cpuDashboard';
import './index.css'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cpu" element={<CPUDashboard />} />
    </Routes>
  )
}

export default App
