

import React, { useRef } from 'react'

import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

export const Brain = (props) => {
  const brain = useLoader(GLTFLoader, require("./brain.glb"))
  return (
    <mesh>
      <primitive object={brain.scene} />
      <meshBasicMaterial color="#049ef4" opacity={1} />
    </mesh>
  )
}

