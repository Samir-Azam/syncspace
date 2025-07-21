import { Navigate, Route, Routes } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import SignUppage from './pages/SignUppage'
import Callpage from './pages/Callpage'
import Chatpage from './pages/Chatpage'
import LoginPage from './pages/LoginPage'
import Notificationpage from './pages/Notificationpage'
import OnBoardingpage from './pages/OnBoardingpage'
import  { Toaster } from 'react-hot-toast'
import { useQuery } from '@tanstack/react-query'
import { axiosInstance } from './lib/axios.js'

const App = () => {

  const {data:authData, isLoading, error} = useQuery({queryKey:["authUser"],
    queryFn : async ()=>{
      const res = await axiosInstance.get("/auth/me")
      return res.data
    },
    retry:false
  },)
  
  const authUser = authData?.user
  
  return (
    <div className="h-screen" data-theme="dark">
      <Routes>
        <Route
          path="/"
          element={authUser ? <Homepage /> : <Navigate to="/login" />}
        />
        <Route
          path="/signup"
          element={!authUser ? <SignUppage /> : <Navigate to="/" />}
        />
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/call"
          element={authUser ? <Callpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/chat"
          element={authUser ? <Chatpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/notification"
          element={authUser ? <Notificationpage /> : <Navigate to="/login" />}
        />
        <Route
          path="/onboarding"
          element={!authUser ? <OnBoardingpage /> : <Navigate to="/signup" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App