import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import Login from "./component/LogIn";
import Registration from "./component/Registration";
import UserPage from './component/UserPage';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ul>
          <li>
            <Link to="/">Dashboard</Link>
          </li>
          <li>
            <Link to="/reg">Registration</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
        </ul>
          <Routes>
              <Route path="/reg" element={<Registration/>} />
              <Route path="/login" element={<Login/>} />
              <Route path="/" element={<UserPage/>} />
          </Routes>
          
      </BrowserRouter>
    </div>
  );
}

export default App;
