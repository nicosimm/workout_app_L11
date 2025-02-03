import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthenticationContext';  // Import the provider
import { useAuthenticationContext } from './hooks/useAuthenticationContext';  // Ensure the correct path

// pages & components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Navbar from './components/Navbar';

function App() {
  return (
    <AuthContextProvider>  {/* Wrap the entire app in the provider */}
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <div className="pages">
            <Routes>
              <Route 
                path="/" 
                element={<ProtectedRoute component={Home} />} 
              />
              <Route 
                path="/login" 
                element={<UnauthenticatedRoute component={Login} />} 
              />
              <Route 
                path="/signup" 
                element={<UnauthenticatedRoute component={Signup} />} 
              />
            </Routes>
          </div>
        </BrowserRouter>
      </div>
    </AuthContextProvider>
  );
}

// Helper component to protect the route for authenticated users
const ProtectedRoute = ({ component: Component }) => {
  const { user } = useAuthenticationContext(); // Use the custom hook to access user
  return user ? <Component /> : <Navigate to="/login" />;
};

// Helper component for unauthenticated routes
const UnauthenticatedRoute = ({ component: Component }) => {
  const { user } = useAuthenticationContext(); // Use the custom hook to access user
  return !user ? <Component /> : <Navigate to="/" />;
};

export default App;
