import { useState } from 'react';
import Main from './components/Main';
import './App.css';
import CarouselCustom from './components/Carusel';
import { Carousel } from 'flowbite-react';
import Img from './img/click.png';
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Main />
    </>
  );
}

export default App;
