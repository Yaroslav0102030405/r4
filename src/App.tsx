import { Suspense, lazy} from 'react'
import { Routes, Route } from 'react-router'
import Navigation from './assets/components/navigation/navigation.tsx'
import './App.css'
import routes from './assets/routes/routes.tsx'
// import Login from './assets/routes/login.tsx'
// import Test from './assets/routes/test.tsx'


const Home = lazy(() => import('./assets/routes/home.tsx'))
const About = lazy(() => import('./assets/routes/about.tsx'))
const Login = lazy(() => import("./assets/routes/login.tsx"))
const Register = lazy(() => import("./assets/routes/register.tsx"))
const Test = lazy(() => import("./assets/routes/test.tsx"))


function App() {
  return (
    <>
    <Navigation />
        <Suspense fallback={<h1>Загружаємо...</h1>}>
          <Routes>
            <Route index element={<Home />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.login} element={<Login />} />
            <Route path={routes.register} element={<Register />} />
            <Route path={routes.test} element={<Test />}/>
            {/* <Route path="*" element={<NotFound />} /> */}
          </Routes>
        </Suspense>
    </>
  )
}

export default App
