import { lazy, Suspense } from "react"
import { Routes, Route, Navigate, useLocation } from "react-router-dom"
import { AnimatePresence, motion } from "framer-motion"

import "./App.css"
import { Login } from "./components/views/auth/Login/Login"
import { Tasks } from "./components/views/Tasks/Tasks"
import { Donate } from "./components/views/Donate/Donate"
import { Register } from "./components/views/auth/Register/Register"
import Registered from "./components/views/Registered/Registered"

const Error404 = lazy(() => import("./components/views/Error404/Error404"))

const RequireAuth = ({ children }) => {
  if (!localStorage.getItem("token")) {
    return <Navigate to="/login" replace={true} />
  }
  return children
}

const pageTransition = {
  initial: {
    opacity: 0,
    x:'-100vw'
  },
  animate: {
    x:0,
    opacity: 1,
    transition:{
      duration:0.5,
      ease:[0.6, -0.05, 0.01, 0.99]
    }
  },
  exit:{
    x:'-100vw',
    opacity:0,
    transition:{
      duration:0.5,
      ease:[0.6, -0.05, 0.01, 0.99]
    }
  }
}

export const App = () => {

  const location = useLocation()

  return (
    <AnimatePresence>
      <Routes location={location} key={location.pathname}>
        <Route path="/"
          element={
            <motion.div
              className="page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <RequireAuth>
                <Tasks />
              </RequireAuth>
            </motion.div>
          } />
        <Route
          path="/donate"
          element={
            <RequireAuth>
              <motion.div
                className="page"
                initial="initial"
                animate="animate"
                exit="exit"
                variants={pageTransition}
              >
                <Donate />
              </motion.div>
            </RequireAuth>
          }
        />
        <Route path="/login" element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Login />
          </motion.div>

        } />
        <Route
          path="/registered/:teamID"
          element={
            <motion.div
              className="page"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={pageTransition}
            >
              <Registered />
            </motion.div>
          }
        />
        <Route path="/register" element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Register />
          </motion.div>

        } />
        <Route path="*" element={
          <motion.div
            className="page"
            initial="initial"
            animate="animate"
            exit="exit"
            variants={pageTransition}
          >
            <Suspense fallback={<>...</>}>
              <Error404 />
            </Suspense>
          </motion.div>
        } />
      </Routes>
    </AnimatePresence>
  )
}
