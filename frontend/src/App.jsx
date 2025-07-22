import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import SignUppage from './pages/SignUppage'
import Callpage from './pages/Callpage'
import Chatpage from './pages/Chatpage'
import LoginPage from './pages/LoginPage'
import Notificationpage from './pages/Notificationpage'
import OnBoardingpage from './pages/OnBoardingpage'
import  { Toaster } from 'react-hot-toast'
import PageLoader from './components/PageLoader.jsx'
import useAuthUser from './hooks/useAuthUser.js'

const App = () => {

  const {isLoading, authUser} = useAuthUser()

  const isAuthenticated = Boolean(authUser)
  const isOnboarded = authUser?.isOnboarded
  if (isLoading) return <PageLoader/>
  
  return (
    <div className="h-screen" data-theme="dark">
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated && isOnboarded ? (
              <Homepage />
            ) : (
              <Navigate to={!isAuthenticated ? "/login" : "/onboarding"} />
            )
          }
        />

        <Route
          path="/signup"
          element={!isAuthenticated ? <SignUppage /> : (<Navigate to={
            isOnboarded? "/": "/onboarding"
          } />)}
        />
        <Route
          path="/login"
          element={!isAuthenticated ? <LoginPage /> : (<Navigate to={!isOnboarded?"/onboarding":"/"}/>)}
        />
        <Route
          path="/call"
          element={isAuthenticated ? <Callpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={isAuthenticated ? <Chatpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notification"
          element={
            isAuthenticated ? <Notificationpage /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/onboarding"
          element={
            isAuthenticated  ? (isOnboarded?(<Navigate to="/" />):<OnBoardingpage />): (<Navigate to="/login" />) 
          }
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App