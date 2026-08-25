import { useEffect, useRef } from 'react';
import { useReducedMotion } from '../hooks/useReducedMotion';

const PARTICLE_COUNT = 1400;
const MAX_DPR = 1.75;

const VERTEX_SHADER = `
attribute vec3 aPosition;
attribute float aSeed;

uniform float uTime;
uniform vec2 uPointer;
uniform float uAspect;

varying float vDepth;
varying float vSeed;

void main() {
  vec3 p = aPosition;

  // Slow drift so the field breathes instead of sitting still.
  p.y += sin(uTime * 0.25 + aSeed * 6.2831) * 0.06;
  p.x += cos(uTime * 0.19 + aSeed * 4.1) * 0.05;

  // Rotate the whole cloud around Y, nudged by the pointer.
  float angle = uTime * 0.06 + uPointer.x * 0.45;
  float s = sin(angle);
  float c = cos(angle);
  p = vec3(p.x * c - p.z * s, p.y, p.x * s + p.z * c);

  // And a gentle tilt on X from vertical pointer position.
  float tilt = uPointer.y * 0.3;
  float ts = sin(tilt);
  float tc = cos(tilt);
  p = vec3(p.x, p.y * tc - p.z * ts, p.y * ts + p.z * tc);

  // Push the cloud away from the camera, then perspective-divide by hand.
  float z = p.z + 3.2;
  float persp = 1.6 / max(z, 0.15);

  gl_Position = vec4(p.x * persp / uAspect, p.y * persp, 0.0, 1.0);

  // 0 at the back of the cloud, 1 at the front.
  vDepth = clamp(1.0 - (z - 1.6) / 3.2, 0.0, 1.0);
  vSeed = aSeed;
  gl_PointSize = mix(1.0, 4.2, vDepth * vDepth) * persp * 1.4;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

varying float vDepth;
varying float vSeed;

uniform float uFade;

void main() {
  // Round, soft-edged points. Discarding the corners keeps them circular.
  vec2 d = gl_PointCoord - vec2(0.5);
  float r = dot(d, d);
  if (r > 0.25) discard;
  float alpha = smoothstep(0.25, 0.02, r);

  // Fuchsia in front, violet behind, with a few pink outliers for variety.
  vec3 near = vec3(0.910, 0.475, 0.976);
  vec3 far  = vec3(0.655, 0.545, 0.980);
  vec3 pink = vec3(0.957, 0.447, 0.714);
  vec3 tint = mix(far, near, vDepth);
  tint = mix(tint, pink, step(0.86, vSeed) * 0.65);

  gl_FragColor = vec4(tint, alpha * mix(0.12, 0.60, vDepth) * uFade);
}
`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function buildProgram(gl: WebGLRenderingContext) {
  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

/** Points on a spherical shell, so the cloud reads as a volume rather than a slab. */
function buildGeometry() {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  const seeds = new Float32Array(PARTICLE_COUNT);

  for (let i = 0; i < PARTICLE_COUNT; i += 1) {
    // Deterministic pseudo-random: identical field on every load, no Math.random
    // flicker between renders.
    const a = Math.sin(i * 12.9898) * 43758.5453;
    const b = Math.sin(i * 78.233) * 26041.7891;
    const c = Math.sin(i * 39.425) * 15731.7431;
    const r1 = a - Math.floor(a);
    const r2 = b - Math.floor(b);
    const r3 = c - Math.floor(c);

    const theta = r1 * Math.PI * 2;
    const phi = Math.acos(2 * r2 - 1);
    const radius = 0.75 + r3 * 0.85;

    positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius * 1.9;
    positions[i * 3 + 1] = Math.cos(phi) * radius * 1.05;
    positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius;
    seeds[i] = r1;
  }

  return { positions, seeds };
}

/**
 * A GPU particle field behind the page: ~1400 points on a spherical shell,
 * perspective-projected in the vertex shader and rotated by time and pointer.
 *
 * Written against raw WebGL rather than three.js on purpose. The whole effect is
 * a few kilobytes; pulling in a 3D engine for a background would have cost more
 * than the rest of the site put together, on a page recruiters open on phones.
 */
export function ParticleField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    const gl = canvas.getContext('webgl', {
      alpha: true,
      antialias: true,
      depth: false,
      premultipliedAlpha: false,
    });
    // No WebGL: the CSS gradient backdrop stands on its own.
    if (!gl) return undefined;

    const program = buildProgram(gl);
    if (!program) return undefined;

    const { positions, seeds } = buildGeometry();

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);
    const aPosition = gl.getAttribLocation(program, 'aPosition');

    const seedBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, seeds, gl.STATIC_DRAW);
    const aSeed = gl.getAttribLocation(program, 'aSeed');

    const uTime = gl.getUniformLocation(program, 'uTime');
    const uPointer = gl.getUniformLocation(program, 'uPointer');
    const uAspect = gl.getUniformLocation(program, 'uAspect');
    const uFade = gl.getUniformLocation(program, 'uFade');

    gl.useProgram(program);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const nextW = Math.round(canvas.clientWidth * dpr);
      const nextH = Math.round(canvas.clientHeight * dpr);
      if (nextW === width && nextH === height) return;
      width = nextW;
      height = nextH;
      canvas.width = width;
      canvas.height = height;
      gl.viewport(0, 0, width, height);
    };

    // Pointer drives rotation. Values are read in the frame loop, never held in
    // React state.
    const pointer = { x: 0, y: 0 };
    const targetPointer = { x: 0, y: 0 };

    const onPointerMove = (event: PointerEvent) => {
      targetPointer.x = (event.clientX / window.innerWidth) * 2 - 1;
      targetPointer.y = (event.clientY / window.innerHeight) * 2 - 1;
    };

    const draw = (timeMs: number) => {
      resize();

      pointer.x += (targetPointer.x - pointer.x) * 0.045;
      pointer.y += (targetPointer.y - pointer.y) * 0.045;

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.enableVertexAttribArray(aPosition);
      gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, seedBuffer);
      gl.enableVertexAttribArray(aSeed);
      gl.vertexAttribPointer(aSeed, 1, gl.FLOAT, false, 0, 0);

      gl.uniform1f(uTime, reduced ? 0 : timeMs / 1000);
      gl.uniform2f(uPointer, pointer.x, pointer.y);
      gl.uniform1f(uAspect, Math.max(width / Math.max(height, 1), 0.5));
      gl.uniform1f(uFade, 1);

      gl.drawArrays(gl.POINTS, 0, PARTICLE_COUNT);
    };

    let frame = 0;
    const loop = (time: number) => {
      draw(time);
      frame = requestAnimationFrame(loop);
    };

    let contextLost = false;
    const onContextLost = (event: Event) => {
      event.preventDefault();
      contextLost = true;
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    canvas.addEventListener('webglcontextlost', onContextLost);

    // Paint once synchronously so the field is correct on first render rather
    // than waiting for a frame callback. requestAnimationFrame is suspended
    // entirely while the document is hidden, which would otherwise leave the
    // canvas at its default 300x150 until the tab is looked at.
    draw(0);

    if (!reduced) {
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      frame = requestAnimationFrame(loop);
    }

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      canvas.removeEventListener('webglcontextlost', onContextLost);
      if (!contextLost) {
        gl.deleteBuffer(positionBuffer);
        gl.deleteBuffer(seedBuffer);
        gl.deleteProgram(program);
      }
    };
  }, [reduced]);

  return <canvas ref={canvasRef} className="particle-field" aria-hidden="true" />;
}
