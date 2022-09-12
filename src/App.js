import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import "./App.css";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Html } from "@react-three/drei";
const scroller = Scroll.scroller;


const Object = () => {
  return (
    <mesh>
      <sphereGeometry />
      <meshStandardMaterial color="hotpink" />
    </mesh>
  );
};

const HTMLContent = () => {
  return (
    <mesh>
      <Html>
        <div>hello</div>
      </Html>
    </mesh>
  );
};

const handleScrollTo = (name) => {
  scroller.scrollTo(name, {
    duration: 1000,
    delay: 20,
    smooth: true,
    offset: 0,
  });
}

function App() {
  const [shown, setShown] = useState(false);
  return (
    <div>
      <div className="NavBar">
        <div
          className="HomeButton"
          style={{
            backgroundColor: "white",
            marginTop: "1vh",
            marginBottom: "1vh",
            padding: "2vh",
            textAlign: "center",
            verticalAlign: "center",
          }}
        >
          George Anumba
        </div>
        <div className="NavContainer">
          <div
            id="Nav1"
            className="NavButton"
            onClick={() => {
              handleScrollTo("Page 1")
            }}
          >
            <div style={{}}>
              Hello
            </div>
          </div>
          <div
            id="Nav2"
            className="NavButton"
            onClick={()=>{
              handleScrollTo("Page 2")
            }}
          >
            Nav Item 2
          </div>
          <div
            id="Nav3"
            className="NavButton"
            onClick={() => {
              handleScrollTo("Page 3")
            }}
          >
            Nav Item 3
          </div>
        </div>
      </div>
      <div className="Page" id="Page1" name="Page 1">
        <Canvas>
          <HTMLContent />
          <pointLight position={[10, 10, 10]} />
        </Canvas>
      </div>
      <div className="Page" id="Page2" name="Page 2"></div>
      <div className="Page" id="Page3" name="Page 3"></div>
    </div>
  );
}

export default App;
