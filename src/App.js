import logo from './logo.svg';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import './App.css';
import { useState } from 'react';
import { Canvas } from '@react-three/fiber'

function App() {
  const [shown, setShown] = useState(false);
  const scroller = Scroll.scroller
  return (
    <div>
      <div className='NavBar'>
        <div className='HomeButton' style={{ backgroundColor: "white", marginTop: "1vh", marginBottom: "1vh", textAlign: "center", verticalAlign: "center" }} >
          George Anumba
        </div>
        <div className='NavContainer'>
          <div id='1' className='NavButton' onClick={() => {
            scroller.scrollTo("Item 1", { duration: 1000, delay: 20, smooth: true, offset: 0 })
          }}>
            Hello
          </div>
          <div id='2' className='NavButton' onClick={() => {
            scroller.scrollTo("Item 2", { duration: 1000, delay: 20, smooth: true, offset: 0 })
          }} >
            Nav Item 2
          </div>
          <div id='3' className='NavButton' onClick={() => {
            scroller.scrollTo("Item 3", { duration: 1000, delay: 20, smooth: true, offset: 0 })
          }} >
            Nav Item 3
          </div>
        </div>
      </div>
      <div className='Page' name="Item 1">
        <Canvas>
          <pointLight position={[10, 10, 10]} />
          <mesh>
            <sphereGeometry />
            <meshStandardMaterial color="hotpink" />
          </mesh>
        </Canvas>
      </div>
      <div className='Page' name="Item 2">
      </div>
      <div className='Page' name="Item 3" >
      </div>
    </div>

  );
}

export default App;
