import { Navigate, Route, Routes } from 'react-router'
import ProtectedRoute from './components/ProtectedRoute'
import Gallery from './pages/Gallery'
import Login from './pages/Login'
import Register from './pages/Register'

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigate to="/login" />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route 
        path='/gallery'
        element={
          <ProtectedRoute>
            <Gallery />
          </ProtectedRoute>
        }
      />
    </Routes>
      
    
  );
}
      
export default App;
