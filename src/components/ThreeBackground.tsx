/* eslint-disable react-hooks/immutability, react-hooks/purity */
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

interface NeuralNode {
  position: THREE.Vector3;
  baseOffset: THREE.Vector3;
  orbitAxis: THREE.Vector3;
  orbitSpeed: number;
  scale: number;
  color: THREE.Color;
  hubIndex: number;
}

interface Edge {
  from: number;
  to: number;
}

interface Packet {
  edgeIndex: number;
  progress: number;
  speed: number;
  size: number;
  color: THREE.Color;
}

// CameraController: continuous cinematic drift + scroll flight + mouse parallax
const CameraController: React.FC = () => {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRef.current = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Trigger initial scroll calculation
    handleScroll();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // 1. Gentle continuous cinematic drift (figure-eight path)
    const driftX = Math.sin(t * 0.12) * 1.5;
    const driftY = Math.cos(t * 0.08) * 0.8;
    
    // 2. Scroll flight - camera descends and flies deeper as user scrolls
    const scrollDepthY = -scrollRef.current * 10.0;
    const scrollDepthZ = -scrollRef.current * 5.0;

    // 3. Responsive mouse parallax
    const parallaxX = mouse.current.x * 2.2;
    const parallaxY = mouse.current.y * 1.6;

    // Compose final camera target position
    const targetX = driftX + parallaxX;
    const targetY = 1.0 + driftY + scrollDepthY + parallaxY;
    const targetZ = 8.5 + scrollDepthZ + (Math.abs(mouse.current.x) + Math.abs(mouse.current.y)) * -0.6;

    // Smooth interpolation (lerp)
    camera.position.x += (targetX - camera.position.x) * 0.025;
    camera.position.y += (targetY - camera.position.y) * 0.025;
    camera.position.z += (targetZ - camera.position.z) * 0.025;

    // Camera continuously aims at a shifting center target down the Z-axis
    const lookTarget = new THREE.Vector3(
      driftX * 0.3,
      0.6 + scrollDepthY * 0.8,
      -3.0 + scrollDepthZ
    );
    camera.lookAt(lookTarget);
  });

  return null;
};

// VolumetricGlowLights: projects colored light cones and dynamic point glows
const VolumetricGlowLights: React.FC = () => {
  const cyanLight = useRef<THREE.PointLight>(null);
  const purpleLight = useRef<THREE.PointLight>(null);
  const blueLight = useRef<THREE.PointLight>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (cyanLight.current) {
      cyanLight.current.position.x = Math.sin(t * 0.2) * 10;
      cyanLight.current.position.y = Math.cos(t * 0.15) * 6;
      cyanLight.current.position.z = -5 + Math.sin(t * 0.3) * 4;
    }
    if (purpleLight.current) {
      purpleLight.current.position.x = -Math.sin(t * 0.15) * 10;
      purpleLight.current.position.y = -Math.cos(t * 0.2) * 6;
      purpleLight.current.position.z = -6 + Math.cos(t * 0.3) * 4;
    }
    if (blueLight.current) {
      blueLight.current.position.y = Math.sin(t * 0.3) * 4 + 2;
    }
  });

  return (
    <>
      <ambientLight intensity={0.65} color="#050a18" />
      
      <pointLight
        ref={cyanLight}
        position={[-6, 3, -4]}
        intensity={35}
        distance={35}
        color="#00f0ff"
      />
      
      <pointLight
        ref={purpleLight}
        position={[6, -3, -4]}
        intensity={35}
        distance={35}
        color="#b500ff"
      />

      <pointLight
        ref={blueLight}
        position={[0, 4, -2]}
        intensity={20}
        distance={25}
        color="#3b82f6"
      />
    </>
  );
};

// BackgroundStarfield: massive layer of tiny particles drifting in the deep background
const BackgroundStarfield: React.FC = () => {
  const starsRef = useRef<THREE.Points>(null);
  const count = 400;

  const positions = React.useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i += 3) {
      pos[i] = (Math.random() - 0.5) * 35; // X
      pos[i + 1] = (Math.random() - 0.5) * 25 + 1; // Y
      pos[i + 2] = (Math.random() - 0.5) * 20 - 8; // Z (placed deep)
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (starsRef.current) {
      starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.0015;
    }
  });

  return (
    <points ref={starsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.025}
        color="#00f0ff"
        transparent
        opacity={0.22}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
};

// ImmersiveNeuralNetwork: massive edge-to-edge neural link network
const ImmersiveNeuralNetwork: React.FC = () => {
  const nodes = useRef<NeuralNode[]>([]);
  const edges = useRef<Edge[]>([]);
  const packets = useRef<Packet[]>([]);

  const nodeMeshRef = useRef<THREE.InstancedMesh>(null);
  const hubHaloMeshRef = useRef<THREE.InstancedMesh>(null);
  const packetMeshRef = useRef<THREE.InstancedMesh>(null);
  
  const lineGeometryRef = useRef<THREE.BufferGeometry>(null);
  const lineShaderRef = useRef<THREE.ShaderMaterial>(null);

  // Large-scale neural cluster hubs dispersed across the entire viewport space
  const hubs = React.useMemo(() => [
    new THREE.Vector3(-6.5, 4.0, -5.0),    // Hub 0: Left Frontal Lobe (Cyan)
    new THREE.Vector3(6.5, 4.0, -5.0),     // Hub 1: Right Creative Lobe (Purple)
    new THREE.Vector3(0, 1.8, -7.0),       // Hub 2: Core Central Processor (Teal)
    new THREE.Vector3(-4.5, -2.5, -6.0),   // Hub 3: Logic Engine Left (Blue)
    new THREE.Vector3(4.5, -2.5, -6.0),    // Hub 4: Security Synapse Right (Cyan-Blue)
    new THREE.Vector3(0, -4.2, -8.0),      // Hub 5: Deep Memory Base (Deep Purple)
    new THREE.Vector3(-7.5, 0.5, 1.0),     // Hub 6: Foreground Left Lobe (Close Parallax, Cyan)
    new THREE.Vector3(7.5, 0.5, 1.0),      // Hub 7: Foreground Right Lobe (Close Parallax, Purple)
    new THREE.Vector3(0, 5.0, -12.0)       // Hub 8: Farthest Background Hub (Dark Blue)
  ], []);

  const hubColors = React.useMemo(() => [
    new THREE.Color('#00f0ff'), // Hub 0
    new THREE.Color('#b500ff'), // Hub 1
    new THREE.Color('#00ffd5'), // Hub 2
    new THREE.Color('#3b82f6'), // Hub 3
    new THREE.Color('#1e40af'), // Hub 4
    new THREE.Color('#8b5cf6'), // Hub 5
    new THREE.Color('#00f0ff'), // Hub 6
    new THREE.Color('#b500ff'), // Hub 7
    new THREE.Color('#1d4ed8')  // Hub 8
  ], []);

  const nodesCount = 1100;   // Thousand+ interconnected nodes
  const packetsCount = 160;  // Volumetric data pulses flowing continuously
  const MAX_LINES = 2200;    // Massive connection network

  const linePositions = React.useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);
  const lineAlphas = React.useMemo(() => new Float32Array(MAX_LINES * 2), []);
  const lineColors = React.useMemo(() => new Float32Array(MAX_LINES * 2 * 3), []);

  useEffect(() => {
    const arr: NeuralNode[] = [];

    // 1. Major Lobe Hub nodes
    for (let i = 0; i < hubs.length; i++) {
      arr.push({
        position: hubs[i].clone(),
        baseOffset: new THREE.Vector3(0, 0, 0),
        orbitAxis: new THREE.Vector3(0, 1, 0),
        orbitSpeed: 0,
        scale: 2.5, // Large glowing hubs
        color: hubColors[i].clone(),
        hubIndex: i
      });
    }

    // 2. Secondary nodes distributed with a wide, volumetric spread
    for (let i = hubs.length; i < nodesCount; i++) {
      const hubIdx = i % hubs.length;
      const hubPos = hubs[hubIdx];

      // Exponential radial spread for dense clusters + trailing webs
      const r = (Math.random() * Math.random()) * 4.2 + 0.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);

      const offset = new THREE.Vector3(
        r * Math.sin(phi) * Math.cos(theta),
        r * Math.sin(phi) * Math.sin(theta),
        r * Math.cos(phi)
      );

      // Orbital unit vector axis
      const axisTheta = Math.random() * Math.PI * 2;
      const axisPhi = Math.acos((Math.random() * 2) - 1);
      const orbitAxis = new THREE.Vector3(
        Math.sin(axisPhi) * Math.cos(axisTheta),
        Math.sin(axisPhi) * Math.sin(axisTheta),
        Math.cos(axisPhi)
      ).normalize();

      const orbitSpeed = (Math.random() * 0.035 + 0.008) * (Math.random() < 0.5 ? 1 : -1);
      const scale = Math.random() * 0.32 + 0.22; // Small nodes
      const color = hubColors[hubIdx].clone().multiplyScalar(Math.random() * 0.35 + 0.85);

      arr.push({
        position: hubPos.clone().add(offset),
        baseOffset: offset.clone(),
        orbitAxis,
        orbitSpeed,
        scale,
        color,
        hubIndex: hubIdx
      });
    }
    nodes.current = arr;

    // 3. Connect nodes to their 2 nearest neighbors in the same cluster
    const edgesList: Edge[] = [];
    const edgeSet = new Set<string>();

    for (let i = 0; i < nodesCount; i++) {
      const nodeA = arr[i];
      const dists: { idx: number; d: number }[] = [];

      for (let j = 0; j < nodesCount; j++) {
        if (i === j) continue;
        const nodeB = arr[j];
        if (nodeA.hubIndex !== nodeB.hubIndex) continue;

        const d = nodeA.position.distanceTo(nodeB.position);
        dists.push({ idx: j, d });
      }

      dists.sort((a, b) => a.d - b.d);

      for (let k = 0; k < Math.min(2, dists.length); k++) {
        const neighborIdx = dists[k].idx;
        const key = Math.min(i, neighborIdx) + '_' + Math.max(i, neighborIdx);
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edgesList.push({ from: i, to: neighborIdx });
        }
      }
    }

    // Connect Lobe Hubs together to form backbone neural pathways
    const hubBackbone = [
      [0, 1], [0, 2], [1, 2], [1, 3], [2, 4], [3, 4], [3, 5], [4, 5], 
      [0, 6], [3, 6], [1, 7], [4, 7], [6, 7], [2, 8], [5, 8]
    ];
    hubBackbone.forEach(([hA, hB]) => {
      edgesList.push({ from: hA, to: hB });
    });

    // Add inter-cluster connections (long-range synapses) to weave the layout edge-to-edge
    for (let k = 0; k < 60; k++) {
      const idxA = Math.floor(Math.random() * nodesCount);
      const idxB = Math.floor(Math.random() * nodesCount);
      if (arr[idxA].hubIndex !== arr[idxB].hubIndex) {
        const key = Math.min(idxA, idxB) + '_' + Math.max(idxA, idxB);
        if (!edgeSet.has(key)) {
          edgeSet.add(key);
          edgesList.push({ from: idxA, to: idxB });
        }
      }
    }
    edges.current = edgesList;

    // 4. Initialize Data Packets
    const packetsList: Packet[] = [];
    for (let i = 0; i < packetsCount; i++) {
      const edgeIndex = Math.floor(Math.random() * edgesList.length);
      const edge = edgesList[edgeIndex];
      const color = arr[edge.from].color.clone();
      
      packetsList.push({
        edgeIndex,
        progress: Math.random(),
        speed: Math.random() * 0.5 + 0.3,
        size: Math.random() * 0.5 + 0.45,
        color
      });
    }
    packets.current = packetsList;

    // Set colors for the InstancedMesh nodes & hub volumetric halos
    arr.forEach((node, idx) => {
      nodeMeshRef.current?.setColorAt(idx, node.color);
    });
    
    // Color the 9 hub halos
    for (let i = 0; i < hubs.length; i++) {
      hubHaloMeshRef.current?.setColorAt(i, hubColors[i]);
    }

    if (nodeMeshRef.current && nodeMeshRef.current.instanceColor) {
      nodeMeshRef.current.instanceColor.needsUpdate = true;
    }
    if (hubHaloMeshRef.current && hubHaloMeshRef.current.instanceColor) {
      hubHaloMeshRef.current.instanceColor.needsUpdate = true;
    }
  }, [hubs, hubColors]);

  useFrame((state, delta) => {
    const d = Math.min(delta, 0.08);
    const time = state.clock.getElapsedTime();

    // Pass time uniform to line shader for scrolling electricity glow pulses
    if (lineShaderRef.current) {
      lineShaderRef.current.uniforms.uTime.value = time;
    }

    const tempMatrix = new THREE.Matrix4();
    const tempScale = new THREE.Vector3();
    const tempPosition = new THREE.Vector3();
    const tempQuaternion = new THREE.Quaternion();
    const rotQ = new THREE.Quaternion();

    // 1. Orbital calculations + node expansion/contraction breathing pulse
    nodes.current.forEach((node, idx) => {
      if (node.orbitSpeed !== 0) {
        rotQ.setFromAxisAngle(node.orbitAxis, node.orbitSpeed * d);
        node.baseOffset.applyQuaternion(rotQ);
        node.position.copy(hubs[node.hubIndex]).add(node.baseOffset);
      }

      // Breathing neural pulse: expand/contract subtly over time
      const breathe = Math.sin(time * 1.8 + idx * 0.05) * 0.14 + 1.0;
      const currentScale = node.scale * breathe;

      tempScale.set(currentScale, currentScale, currentScale);
      tempQuaternion.setFromEuler(new THREE.Euler(0, time * 0.05 * node.orbitSpeed, 0));
      tempMatrix.compose(node.position, tempQuaternion, tempScale);

      nodeMeshRef.current?.setMatrixAt(idx, tempMatrix);
    });
    if (nodeMeshRef.current) nodeMeshRef.current.instanceMatrix.needsUpdate = true;

    // 2. Position Hub Volumetric Halos (Index 0 to 8 in nodes array)
    for (let i = 0; i < hubs.length; i++) {
      const hubNode = nodes.current[i];
      if (!hubNode) continue;
      
      // Volumetric glow halo breathing pulse
      const haloBreathe = Math.sin(time * 1.2 + i * 0.4) * 0.15 + 1.05;
      const haloScale = 7.0 * haloBreathe; // Large halo envelope

      tempScale.set(haloScale, haloScale, haloScale);
      tempQuaternion.set(0, 0, 0, 1); // identity
      tempMatrix.compose(hubNode.position, tempQuaternion, tempScale);

      hubHaloMeshRef.current?.setMatrixAt(i, tempMatrix);
    }
    if (hubHaloMeshRef.current) hubHaloMeshRef.current.instanceMatrix.needsUpdate = true;

    // 3. Position Data Packets
    packets.current.forEach((packet, idx) => {
      packet.progress += packet.speed * d;
      if (packet.progress >= 1.0) {
        packet.progress = 0;
        packet.edgeIndex = Math.floor(Math.random() * edges.current.length);
        const edge = edges.current[packet.edgeIndex];
        if (edge) {
          packet.color.copy(nodes.current[edge.from].color);
        }
        packet.speed = Math.random() * 0.5 + 0.3;
      }

      const edge = edges.current[packet.edgeIndex];
      if (!edge) return;

      const nodeA = nodes.current[edge.from];
      const nodeB = nodes.current[edge.to];
      if (!nodeA || !nodeB) return;

      // Position packet interpolation
      tempPosition.lerpVectors(nodeA.position, nodeB.position, packet.progress);

      // Packet size grows in center of connections and fades to 0 at ends
      const pulse = Math.sin(packet.progress * Math.PI);
      const pScale = packet.size * pulse * 0.42;

      tempScale.set(pScale, pScale, pScale);
      tempQuaternion.set(0, 0, 0, 1);
      tempMatrix.compose(tempPosition, tempQuaternion, tempScale);

      packetMeshRef.current?.setMatrixAt(idx, tempMatrix);
      packetMeshRef.current?.setColorAt(idx, packet.color);
    });
    if (packetMeshRef.current) {
      packetMeshRef.current.instanceMatrix.needsUpdate = true;
      if (packetMeshRef.current.instanceColor) {
        packetMeshRef.current.instanceColor.needsUpdate = true;
      }
    }

    // 4. Update line vertices and connection alphas
    let lineCount = 0;
    const maxLineDist = 4.8; // Wider connection span

    for (let i = 0; i < edges.current.length; i++) {
      const edge = edges.current[i];
      const nodeA = nodes.current[edge.from];
      const nodeB = nodes.current[edge.to];
      if (!nodeA || !nodeB) continue;

      if (lineCount >= MAX_LINES) break;

      const idx = lineCount * 2;

      linePositions[idx * 3] = nodeA.position.x;
      linePositions[idx * 3 + 1] = nodeA.position.y;
      linePositions[idx * 3 + 2] = nodeA.position.z;

      linePositions[(idx + 1) * 3] = nodeB.position.x;
      linePositions[(idx + 1) * 3 + 1] = nodeB.position.y;
      linePositions[(idx + 1) * 3 + 2] = nodeB.position.z;

      const dist = nodeA.position.distanceTo(nodeB.position);
      
      // Dynamic alpha based on distance
      const alpha = Math.max(0, 1.0 - (dist / maxLineDist)) * 0.22;

      lineAlphas[idx] = alpha;
      lineAlphas[idx + 1] = alpha;

      lineColors[idx * 3] = nodeA.color.r;
      lineColors[idx * 3 + 1] = nodeA.color.g;
      lineColors[idx * 3 + 2] = nodeA.color.b;

      lineColors[(idx + 1) * 3] = nodeB.color.r;
      lineColors[(idx + 1) * 3 + 1] = nodeB.color.g;
      lineColors[(idx + 1) * 3 + 2] = nodeB.color.b;

      lineCount++;
    }

    if (lineGeometryRef.current) {
      lineGeometryRef.current.setDrawRange(0, lineCount * 2);
      lineGeometryRef.current.attributes.position.needsUpdate = true;
      lineGeometryRef.current.attributes.alpha.needsUpdate = true;
      lineGeometryRef.current.attributes.color.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* 1. All neural nodes rendered in a single instanced mesh */}
      <instancedMesh ref={nodeMeshRef} args={[undefined, undefined, nodesCount]}>
        <sphereGeometry args={[0.07, 6, 6]} />
        <meshBasicMaterial
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.85}
        />
      </instancedMesh>

      {/* 2. Hub Volumetric Bloom Halos */}
      <instancedMesh ref={hubHaloMeshRef} args={[undefined, undefined, hubs.length]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.06}
          depthWrite={false}
        />
      </instancedMesh>

      {/* 3. Volumetric data packets flowing through connections */}
      <instancedMesh ref={packetMeshRef} args={[undefined, undefined, packetsCount]}>
        <sphereGeometry args={[0.08, 4, 4]} />
        <meshBasicMaterial
          transparent
          blending={THREE.AdditiveBlending}
          opacity={0.95}
        />
      </instancedMesh>

      {/* 4. Additive glowing lines running dynamic GPU alpha pulses */}
      <lineSegments>
        <bufferGeometry ref={lineGeometryRef}>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-alpha"
            args={[lineAlphas, 1]}
            count={lineAlphas.length}
            array={lineAlphas}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[lineColors, 3]}
            count={lineColors.length / 3}
            array={lineColors}
            itemSize={3}
          />
        </bufferGeometry>
        <shaderMaterial
          ref={lineShaderRef}
          args={[
            {
              uniforms: {
                uTime: { value: 0.0 }
              },
              vertexShader: `
                attribute float alpha;
                attribute vec3 color;
                varying float vAlpha;
                varying vec3 vColor;
                varying vec3 vPosition;
                void main() {
                  vAlpha = alpha;
                  vColor = color;
                  vPosition = position;
                  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                }
              `,
              fragmentShader: `
                uniform float uTime;
                varying float vAlpha;
                varying vec3 vColor;
                varying vec3 vPosition;
                void main() {
                  // Scrolling energy pulse waves calculated on GPU using sine math on Y/Z positions
                  float pulse = 0.65 + 0.35 * sin(uTime * 3.8 + (vPosition.x + vPosition.y + vPosition.z) * 0.65);
                  gl_FragColor = vec4(vColor, vAlpha * pulse);
                }
              `,
              transparent: true,
              depthWrite: false,
              blending: THREE.AdditiveBlending,
            },
          ]}
        />
      </lineSegments>
    </group>
  );
};

// CanvasFallback: lightweight 2D canvas neural network rendering for mobile viewports
const CanvasFallback: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let w = (canvas.width = window.innerWidth);
    let h = (canvas.height = window.innerHeight);
    let scrollRatio = 0;

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    
    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollHeight > 0) {
        scrollRatio = window.scrollY / scrollHeight;
      }
    };

    window.addEventListener('resize', resize);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Generate fallback nodes
    const nodes: { x: number; y: number; baseZ: number; vx: number; vy: number; radius: number; isHub: boolean; breathe: number }[] = [];
    const hubsCount = 6;
    const normalCount = 45;

    for (let i = 0; i < hubsCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseZ: Math.random() * 200 - 100, // Z depth layering simulation
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.5) * 0.2,
        radius: Math.random() * 3 + 4,
        isHub: true,
        breathe: Math.random() * Math.PI
      });
    }

    for (let i = 0; i < normalCount; i++) {
      nodes.push({
        x: Math.random() * w,
        y: Math.random() * h,
        baseZ: Math.random() * 300 - 150,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        radius: Math.random() * 1.0 + 1.2,
        isHub: false,
        breathe: Math.random() * Math.PI
      });
    }

    const run = () => {
      ctx.clearRect(0, 0, w, h);

      // Simulate camera scroll parallax on Y coordinates
      const scrollOffsetY = -scrollRatio * 180;

      // Draw connection lines
      ctx.lineWidth = 0.5;
      for (let i = 0; i < nodes.length; i++) {
        const nA = nodes[i];
        const yA = nA.y + scrollOffsetY * (1.0 + nA.baseZ * 0.001); // parallax multiplier
        
        for (let j = i + 1; j < nodes.length; j++) {
          const nB = nodes[j];
          const yB = nB.y + scrollOffsetY * (1.0 + nB.baseZ * 0.001);

          const dx = nA.x - nB.x;
          const dy = yA - yB;
          const dist = Math.sqrt(dx * dx + dy * dy);

          const maxDist = nA.isHub || nB.isHub ? 180 : 110;
          if (dist < maxDist) {
            const alpha = (1 - dist / maxDist) * 0.12;
            ctx.strokeStyle = `rgba(0, 240, 255, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(nA.x, yA);
            ctx.lineTo(nB.x, yB);
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.breathe += 0.02;

        // Bounce borders
        if (n.x < 0 || n.x > w) n.vx *= -1;
        if (n.y < 0 || n.y > h) n.vy *= -1;

        const sizeOffset = Math.sin(n.breathe) * 0.4;
        const currentRadius = Math.max(0.5, n.radius + sizeOffset);
        const drawY = n.y + scrollOffsetY * (1.0 + n.baseZ * 0.002);

        ctx.beginPath();
        ctx.arc(n.x, drawY, currentRadius, 0, Math.PI * 2);
        if (n.isHub) {
          ctx.fillStyle = 'rgba(0, 240, 255, 0.45)';
          ctx.shadowBlur = 6;
          ctx.shadowColor = '#00f0ff';
        } else {
          ctx.fillStyle = 'rgba(59, 130, 246, 0.25)';
          ctx.shadowBlur = 0;
        }
        ctx.fill();
      });

      ctx.shadowBlur = 0;
      animId = requestAnimationFrame(run);
    };

    run();

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animId);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full object-cover pointer-events-none opacity-40 z-0 bg-[#070d1e]" />;
};

export const ThreeBackground: React.FC = () => {
  const [isMobile, setIsMobile] = useState(true);
  const [hasWebGL, setHasWebGL] = useState(true);

  useEffect(() => {
    const checkDevice = () => {
      const mobileWidth = window.innerWidth < 768;
      const touchCapable = window.matchMedia('(pointer: coarse)').matches;
      setIsMobile(mobileWidth || touchCapable);
    };

    const detectWebGL = () => {
      try {
        const canvas = document.createElement('canvas');
        const support = !!(
          window.WebGLRenderingContext &&
          (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
        );
        setHasWebGL(support);
      } catch {
        setHasWebGL(false);
      }
    };

    checkDevice();
    detectWebGL();

    window.addEventListener('resize', checkDevice);
    return () => window.removeEventListener('resize', checkDevice);
  }, []);

  if (isMobile || !hasWebGL) {
    return (
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none bg-[#050a18]">
        {/* Soft Nebula Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-br from-cyan-500/10 to-transparent blur-[90px] animate-[pulse_8s_infinite]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vh] rounded-full bg-gradient-to-tl from-purple-600/10 to-transparent blur-[90px] animate-[pulse_10s_infinite]" />
        
        {/* Network Grid Overlay */}
        <div className="absolute inset-0 opacity-[0.05] cyber-grid" />
        
        {/* Canvas Fallback */}
        <CanvasFallback />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-0 bg-transparent">
      <Suspense fallback={<div className="absolute inset-0 cyber-grid opacity-[0.05]" />}>
        <Canvas
          camera={{ position: [0, 1.2, 8.5], fov: 60 }}
          dpr={[1, 1.25]} // high-performance scaling to ensure clean 60fps
          gl={{ antialias: true, alpha: true }}
          style={{ width: '100vw', height: '100vh', position: 'absolute' }}
        >
          {/* Volumetric depth fog for atmospheric cinematic layers */}
          <fog attach="fog" args={['#050a18', 2.2, 16.0]} />
          
          <CameraController />
          <VolumetricGlowLights />
          <BackgroundStarfield />
          <ImmersiveNeuralNetwork />
          
        </Canvas>
      </Suspense>
    </div>
  );
};

export default ThreeBackground;
