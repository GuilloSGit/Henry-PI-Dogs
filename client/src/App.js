import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LandingPage from './components/LandingPage'
import Home from './components/Home'
import DogCreation from './components/DogCreation';
import Details from './components/Details';


function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/home' component={Home} />
          <Route path='/dog' component={DogCreation} />
          {/* <Route path='/dogs/:idRaza' component={Details} /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
