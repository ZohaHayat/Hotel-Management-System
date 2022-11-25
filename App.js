import './App.css';
import {BrowserRouter as Router,Route,Routes,Link} from 'react-router-dom'
import Home from "./pages/Home.js"
import SignUp from './pages/SignUp.js';

function App() {
  return <div className='App'>
    <Router>
      <Link to="/signup"> Sign up</Link>
      <Link to="/"> Home page</Link>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signup" element={<SignUp/>} />
      </Routes>
    </Router>
  </div>
}

export default App;
