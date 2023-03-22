import logo from "./logo.svg";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import "./App.css";
import { useState, useRef } from "react";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Html, useGLTF } from "@react-three/drei";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { Brain } from "./Brain";

const scroller = Scroll.scroller;

const Sphere = (props) => {
  const ref = useRef();

  return (
    <mesh ref={ref} position={[props.gap, 0, 0]} scale={0.1}>
      <sphereGeometry />
      <meshStandardMaterial color="blue" transparent opacity={0.6} />
    </mesh>
  );
};


const RevolvingSphere = (props) => {
  const groupRef = useRef();
  useFrame(({ clock }) => {
    groupRef.current.rotation.z = props.speedFactor * clock.getElapsedTime();
    groupRef.current.rotation.x = props.angle;
  })
  return (
    <group ref={groupRef} position={props.position} >
      <Sphere gap={props.gap} />
    </group>
  )
}

const SphereGroup = (props) => {
  const groupRef = useRef();



  return (
    <group ref={groupRef}>
      <RevolvingSphere speedFactor={2} gap={2} angle={10} />
      <RevolvingSphere speedFactor={5} gap={1.1} angle={170} />
      <RevolvingSphere speedFactor={-1} gap={1.7} angle={60} />
      <RevolvingSphere speedFactor={3} gap={1} angle={-90} />
      <RevolvingSphere speedFactor={2} gap={1.3} angle={120} />
      <RevolvingSphere speedFactor={-5} gap={1.1} angle={150} />
    </group>

  )
}

const HTMLContent = () => {
  return (
    <mesh>
      <Html as='div'>
      </Html>
    </mesh>
  );
};

const handleScrollTo = (name) => {
  scroller.scrollTo(name, {
    duration: 1000,
    delay: 20,
    smooth: true,
    offset: -65,
  });
}
const resumeLink = "https://drive.google.com/file/d/1Pxfkymiir8UIs5q3Zag-KrvdKLxOew38/preview"
function App() {
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
            <div>
              Welcome
            </div>
          </div>
          <div
            id="Nav2"
            className="NavButton"
            onClick={() => {
              handleScrollTo("Resume")
            }}
          >
            Resume
          </div>
          <div
            id="Nav3"
            className="NavButton"
            onClick={() => {
              handleScrollTo("Page 3")
            }}
          >
            About Me
          </div>
        </div>
      </div>
      <div className="Page" id="Page1" name="Page 1">
        <div className="IntroContainer">
          <div className="IntroName">
            George Anumba
          </div>
          <div className="IntroTitles">
            Full Stack Developer | Musician | Quantum Enthusiast
          </div>
          <div className="Intro">
            Hello My name is George Anumba and love programming. I am looking to use my skills in the industry as a Full Stack Developer (MORE TALKING HERE OR SOMETHING)
          </div>
        </div>
        <Canvas >
          <HTMLContent />
          <pointLight position={[10, 10, 10]} />
          <pointLight position={[-10, -10, 10]} />
          <Brain />
          <SphereGroup />
        </Canvas>

      </div>
      <div className="Page" id="Resume" name="Resume">
        <iframe className="ResumePreview" src={resumeLink} />
      </div>
      <div className="Page" id="Page3" name="Page 3">
      <div className="AboutMeContainer">
          <div className="AboutMe">
            I really love developing applications that make things easier and more effective. Please Contact Me at any of my
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
