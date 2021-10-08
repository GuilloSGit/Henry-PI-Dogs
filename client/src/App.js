import { BrowserRouter, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Home from './components/Home/Home';
// import DogDetail from './components/DogDetail/DogDetail';
// import DogCreation from './components/DogCreation/DogCreation';

function App() {
  return (
    <BrowserRouter>
      <div className="Guille">
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Home} />
        <Route path='/dog/:dogID' />
        <Route path='/newDog/' />
      </div>
    </BrowserRouter>
  );
}

export default App;