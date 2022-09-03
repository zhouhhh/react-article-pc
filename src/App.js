import './App.css';
import { Routes, Route, Navigate, unstable_HistoryRouter as HistoryRouer } from 'react-router-dom'
import { lazy, Suspense } from 'react';
import { history } from '@/utils/history'
// import Login from '@/pages/Login'
// import Layout from '@/pages/Layout'
// import Publish from './pages/Publish';
// import Article from './pages/Article';
// import Home from './pages/Home';
import { AuthComponent } from '@/components/AuthComponent'
const Login = lazy(() => import('@/pages/Login'))
const Layout = lazy(() => import('@/pages/Layout'))
const Publish = lazy(() => import('./pages/Publish'))
const Article = lazy(() => import('./pages/Article'))
const Home = lazy(() => import('./pages/Home'))

function App() {
  return (
    <HistoryRouer history={history}>
      <div className="App">
        <Suspense
          fallback={
            <div
              style={{
                textAlign: 'center',
                marginTop: 200
              }}
            >
              loading...
            </div>
          }
        >
          <Routes>
            <Route path='/' element={
              <AuthComponent>
                <Layout />
              </AuthComponent>
            }>
              <Route path="home" element={<Home />} />
              <Route path="article" element={<Article />} />
              <Route path="publish" element={<Publish />} />
              <Route path="/" element={<Navigate to="home" />} />

            </Route>
            <Route path='/login' element={<Login />}></Route>
          </Routes>
        </Suspense>
      </div>
    </HistoryRouer>
  );
}

export default App;
