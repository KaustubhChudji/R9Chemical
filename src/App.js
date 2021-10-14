import './App.css';
import SignIn from './component/login/SignIn';
import SignUP from './component/login/SignUP';
import Navbar from './component/login/Navbar';
import Dashboard from './component/Pages/Dashboard';
import { BrowserRouter, Route, Link , Switch} from 'react-router-dom';
 
function App() {
  return (
    
    <div>
      <BrowserRouter>
      <Switch>
      <Route exact="true" path="/" component = {SignIn} />
      <Route   path="/SignIn" component = {SignIn} />
      <Route   path="/SignUP" component = {SignUP} />
      <Route   path="/Navbar" component = {Navbar} />
      <Route   path="/Dashboard" component = {Dashboard} />
      </Switch>
      </BrowserRouter>
    </div>
 
  );
}

export default App;
