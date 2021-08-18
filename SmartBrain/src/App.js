import './App.css';
import Navigation from './components/navigation/navigation';
import Logo from './components/logo/logo';
import ImageLink from './components/image-link/image-link';
import Rank from './components/rank/rank';
import Particles from 'react-particles-js';

const particlesOptions = {
  particles: {
    number: {
      value: 100,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
}

function App() {
  return (
    <div className="App">
      <Particles className='particles' params={particlesOptions}/>
      <Navigation/>
      <Logo/>
      <Rank/>
      <ImageLink/>

  {/*face recog*/}

    </div>
  );
}

export default App;
