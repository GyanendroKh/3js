import * as React from 'react';
import {View} from 'react-native';

import {GLView} from 'expo-gl';
import {Renderer} from 'expo-three';

import {
  AmbientLight,
  SphereGeometry,
  Fog,
  GridHelper,
  Mesh,
  MeshStandardMaterial,
  PerspectiveCamera,
  Scene,
} from 'three';

export default function LoadThreeDModel() {
  const sphere = new SphereMesh();
  const camera = new PerspectiveCamera(100, 0.4, 0.01, 1000);

  let cameraInitialPositionX = 0;
  let cameraInitialPositionY = 2;
  let cameraInitialPositionZ = 5;

  return (
    <View style={{flex: 1}}>
      <GLView
        style={{flex: 1}}
        onContextCreate={async gl => {
          // GL Parameter disruption
          const {drawingBufferWidth: width, drawingBufferHeight: height} = gl;

          // Renderer declaration and set properties
          const renderer = new Renderer({gl});
          renderer.setSize(width, height);
          renderer.setClearColor('#fff');

          // Scene declaration, add a fog, and a grid helper to see axes dimensions
          const scene = new Scene();
          scene.fog = new Fog('#3A96C4', 1, 10000);
          scene.add(new GridHelper(10, 10));

          // Add all necessary lights
          const ambientLight = new AmbientLight(0x101010);
          scene.add(ambientLight);

          // Add sphere object instance to our scene
          scene.add(sphere);

          // Set camera position and look to sphere
          camera.position.set(
            cameraInitialPositionX,
            cameraInitialPositionY,
            cameraInitialPositionZ,
          );

          camera.lookAt(sphere.position);

          // Render function
          const render = () => {
            requestAnimationFrame(render);
            renderer.render(scene, camera);
            gl.endFrameEXP();
          };
          render();
        }}
      />
    </View>
  );
}

class SphereMesh extends Mesh {
  constructor() {
    super(
      new SphereGeometry(0, 50, 20, 0, Math.PI * 2, 0, Math.PI * 2),
      new MeshStandardMaterial({
        color: 0xff0000,
      }),
    );
  }
}
