import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import * as Scroll from "react-scroll";
import "./App.css";
import { useState, useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Html, Trail, useGLTF, Clone } from "@react-three/drei";
import { Brain } from "./Brain";
const scroller = Scroll.scroller;

const Sphere = (props) => {

  const ref = useRef()

  return (
    <mesh ref={ref} position={props.position} scale={0.09} >
      <sphereGeometry />
      <meshStandardMaterial color="blue" transparent opacity={0.6} />
    </mesh>

  );
};

const ShrinkingSphere = (props) => {

  const ref = useRef()

  // useFrame(({ clock }) => {
  //   ref.current.scale -= clock.getElapsedTime()
  // })

  return (
    <mesh ref={ref} position={props.position} scale={0.09} >
      <sphereGeometry />
      <meshStandardMaterial color="blue" transparent opacity={0.6} />
    </mesh>

  );
};




const RevolvingSphere = (props) => {
  const groupRef = useRef();
  const sphereRef = useRef();
  const trailsRef = useRef();
  const [trail, setTrail] = useState([]);
  const { scene } = useThree();

  useEffect(() => {
    let addToTrail = setInterval(() => {
      setTrail((trail) => [...trail,
      <group rotation={groupRef.current.rotation}>
        <ShrinkingSphere position={[props.gap, 0, 0]} />
      </group>
      ])
      setTimeout(() => {
        // trail.slice(0, trail.length - 1)
        let len = trailsRef.current.children.length

        console.log(scene.remove(scene.getObjectById(trailsRef.current.children[len - 1].id)));
        console.log(trail.slice(0, trail.length - 1))

      }, 100)
    }, 1000)



    if (trail.length > 5) {
      clearInterval(addToTrail)
    }

    return () => {
      clearInterval(addToTrail)
    }
  })


  useFrame(({ clock, scene }) => {
    groupRef.current.rotation.z = props.speedFactor * clock.getElapsedTime();
    groupRef.current.rotation.x = props.angle;

  })
  return (
    <>
      <group ref={groupRef}>
        <Trail width={20} >
          <Sphere position={[props.gap, 0, 0]} />
        </Trail>
      </group>
      <group ref={trailsRef}>
        {trail}
      </group>
    </>

  )
}
const SphereGroup = (props) => {
  const groupRef = useRef();
  const ref = useRef();
  const [spheres, setSpheres] = useState([])
  useMemo(() => {

  }, [spheres])

  useEffect(() => {
    let a = [];
    for (let index = 0; index < 1; index++) {
      const posOrNeg = Math.random() * 2 - 1;
      a.push({
        gap: Math.random() * (3 - 1 + 1) + 1,
        speedFactor: posOrNeg * (Math.random() * (9 - 4 + 1) + 9),
        angle: Math.random() * 360,
        position: [Math.random() * (25 - 15 + 1) + 15, 0, 0]
      })
    }
    setSpheres([...a,])
  }, [])

  return (
    <group ref={groupRef}>
      {spheres.map((sphere, index) => (
        <RevolvingSphere key={index} speedFactor={sphere.speedFactor} gap={sphere.gap} angle={sphere.angle} />
      ))}
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
              handleScrollTo("About Me")
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
          {/* <Sphere position={[10,10,10]} /> */}
          <SphereGroup />
        </Canvas>

      </div>
      <div className="Page" id="Resume" name="Resume">
        <iframe className="ResumePreview" src={resumeLink} />
      </div>
      <div className="Page" id="About Me" name="About Me">
        <div className="AboutMeContainer">
          <div className="AboutMe">
            <div> I really love developing applications that make things easier and more effective. </div>
            <div> I also really playing video games </div>
            <div> I also really love music </div>
            <div> I also really love Quantum Mechanics </div>
            <div> Please Contact me using one of the options below! </div>
            <div className="LinksContainer">
              <img alt="Github" className="tp-logo" src={require("./github-mark.png")} />
              <img className="tp-logo" src={require("./LI-In-Bug.png")} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default App;
