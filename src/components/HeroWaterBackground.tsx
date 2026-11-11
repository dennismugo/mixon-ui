import React, { useEffect, useRef } from 'react';

const TIME_STEP = 1 / 60;

function createSimulation(width: number, height: number) {
  const columns = Math.max(3, Math.min(180, Math.ceil(width / 8)));
  const rows = Math.max(3, Math.min(120, Math.ceil(height / 8)));
  const cellWidth = width / columns;
  const cellHeight = height / rows;
  const minCell = Math.min(cellWidth, cellHeight);
  const factorX = 0.22 * Math.pow(minCell / cellWidth, 2);
  const factorY = 0.22 * Math.pow(minCell / cellHeight, 2);

  let current = new Float32Array(columns * rows);
  let previous = new Float32Array(columns * rows);
  const output = new Uint8Array(columns * rows * 4);
  const damping = new Float32Array(columns * rows);
  let accumulator = 0;

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < columns; x++) {
      const edgeDist = Math.min(x, y, columns - x - 1, rows - y - 1);
      damping[y * columns + x] = 0.985 - 0.12 * Math.max(0, 1 - edgeDist / 12);
    }
  }

  return {
    columns,
    rows,
    disturb(x0: number, y0: number, x1: number, y1: number, intensity: number, radius = 22) {
      const dx = x1 - x0;
      const dy = y1 - y0;
      const lenSq = dx * dx + dy * dy;
      const minX = Math.max(1, Math.floor((Math.min(x0, x1) - 2 * radius) / cellWidth));
      const maxX = Math.min(columns - 2, Math.ceil((Math.max(x0, x1) + 2 * radius) / cellWidth));
      const minY = Math.max(1, Math.floor((Math.min(y0, y1) - 2 * radius) / cellHeight));
      const maxY = Math.min(rows - 2, Math.ceil((Math.max(y0, y1) + 2 * radius) / cellHeight));

      for (let cy = minY; cy <= maxY; cy++) {
        for (let cx = minX; cx <= maxX; cx++) {
          const px = (cx + 0.5) * cellWidth - x0;
          const py = (cy + 0.5) * cellHeight - y0;
          const t = lenSq > 0 ? Math.max(0, Math.min(1, (px * dx + py * dy) / lenSq)) : 0;
          const rx = px - dx * t;
          const ry = py - dy * t;
          const weight = Math.exp(-(rx * rx + ry * ry) / (radius * radius * 0.5));
          previous[cy * columns + cx] += intensity * weight;
        }
      }
    },
    advance(dt: number) {
      accumulator += Math.min(dt, 0.05);
      while (accumulator >= TIME_STEP) {
        for (let y = 1; y < rows - 1; y++) {
          for (let x = 1; x < columns - 1; x++) {
            const idx = y * columns + x;
            const c = current[idx];
            const laplacian =
              (current[idx - 1] + current[idx + 1] - 2 * c) * factorX +
              (current[idx - columns] + current[idx + columns] - 2 * c) * factorY;
            const edgeDamping = 1 - (0.985 - damping[idx]) * 0.4;
            previous[idx] = (c + (c - previous[idx]) * damping[idx] + laplacian) * edgeDamping;
          }
        }
        const temp = current;
        current = previous;
        previous = temp;
        accumulator -= TIME_STEP;
      }

      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < columns; x++) {
          const idx = y * columns + x;
          const sx =
            (current[y * columns + Math.min(columns - 1, x + 1)] -
              current[y * columns + Math.max(0, x - 1)]) /
            (2 * cellWidth);
          const sy =
            (current[Math.min(rows - 1, y + 1) * columns + x] -
              current[Math.max(0, y - 1) * columns + x]) /
            (2 * cellHeight);
          const encX = Math.round(Math.max(0, Math.min(65535, 32768 + 32767 * sx)));
          const encY = Math.round(Math.max(0, Math.min(65535, 32768 + 32767 * sy)));
          output[4 * idx] = encX >> 8;
          output[4 * idx + 1] = encX & 255;
          output[4 * idx + 2] = encY >> 8;
          output[4 * idx + 3] = encY & 255;
        }
      }
      return output;
    }
  };
}

const VERTEX_SHADER_SRC = `
attribute vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER_SRC = `
precision highp float;
uniform sampler2D image;
uniform sampler2D water;
uniform vec2 resolution;
uniform vec2 surfaceSize;
uniform vec2 imageSize;
uniform float time;
uniform float glass;

vec2 waveShape(vec2 point, out vec3 curvature) {
  vec2 warp = vec2(sin(point.y * 0.007 + time * 0.19), cos(point.x * 0.006 - time * 0.16)) * 28.0;
  vec2 p = point + warp;
  vec2 slope = vec2(0.0);
  curvature = vec3(0.0);
  for (int i = 0; i < 12; i++) {
    if (glass > 0.5 && i >= 9) break;
    float index = float(i);
    float angle = index * 2.39996 + 0.4;
    vec2 direction = vec2(cos(angle), sin(angle));
    float frequency = 0.016 * pow(1.28, index);
    float amplitude = 9.0 * pow(0.76, index);
    float speed = glass > 0.5 ? 0.3 + index * 0.09 : 0.25 + fract(sin(index * 17.13 + 1.7) * 437.58) * 0.65;
    float packet = sin(dot(point, vec2(-direction.y, direction.x)) * 0.008 + index * 2.7 - time * 0.21);
    amplitude *= glass > 0.5 ? 1.0 : 1.0 + packet * 0.22;
    if (i >= 9) {
      frequency *= 1.5;
      amplitude *= 0.45;
    }
    float phase = dot(p, direction) * frequency + time * speed + index * 12.7;
    slope += direction * cos(phase) * amplitude * frequency;
    if (i < 9) {
      curvature -= sin(phase) * amplitude * frequency * frequency * vec3(direction.x * direction.x, direction.x * direction.y, direction.y * direction.y);
    }
  }
  if (glass > 0.5) return slope;
  for (int i = 0; i < 3; i++) {
    float index = float(i);
    float lifetime = 7.0 + index * 1.3;
    float cycle = time / lifetime + index * 0.37;
    float generation = floor(cycle);
    float age = fract(cycle) * lifetime;
    vec2 seed = vec2(generation + index * 13.7, generation * 1.3 + index * 8.9);
    vec2 origin = fract(sin(seed + vec2(5.2, 9.1)) * vec2(43758.54, 22578.14));
    origin *= vec2(surfaceSize.x, surfaceSize.y * 0.46);
    vec2 delta = point - origin;
    float radius = length(delta);
    float front = radius - age * (48.0 + index * 9.0);
    float envelope = exp(-front * front / 7200.0) * smoothstep(0.0, 0.8, age) * exp(-age * 0.45) * (1.0 - smoothstep(lifetime - 1.0, lifetime, age));
    vec2 direction = delta / max(radius, 1.0);
    float phase = front * 0.07;
    slope += direction * cos(phase) * envelope * 0.16;
    curvature -= sin(phase) * envelope * 0.008 * vec3(direction.x * direction.x, direction.x * direction.y, direction.y * direction.y);
  }
  return slope;
}

vec2 surfaceSlope(vec2 uv) {
  vec4 encoded = texture2D(water, uv) * 255.0;
  return (vec2(dot(encoded.rg, vec2(256.0, 1.0)), dot(encoded.ba, vec2(256.0, 1.0))) - 32768.0) / 32767.0;
}

void main() {
  vec2 uv = gl_FragCoord.xy / resolution;
  // Elegant modern gradient starting pure white at top (uv.y = 1.0) down to soft gray
  vec3 grayTone = mix(vec3(0.89, 0.91, 0.93), vec3(1.0, 1.0, 1.0), smoothstep(0.40, 0.95, uv.y));
  
  if (glass < 0.5 && uv.y > 0.52) {
    gl_FragColor = vec4(grayTone, 1.0);
    return;
  }
  vec2 point = uv * surfaceSize;
  vec3 curvature;
  vec2 waves = waveShape(point, curvature);
  vec2 wake = surfaceSlope(uv);
  vec2 slope = waves + wake * 1.1;

  vec3 normal = normalize(vec3(-slope, 1.0));
  vec3 view = normalize(vec3(0.0, 0.38, 1.0));
  vec3 reflected = reflect(-view, normal);
  float sky = smoothstep(-0.45, 0.65, reflected.y);
  vec3 reflection = mix(vec3(0.18, 0.36, 0.67), vec3(0.85, 0.94, 1.0), sky);
  float ribbon = exp(-pow((reflected.y + 0.1 + sin(reflected.x * 4.0) * 0.06) * 7.0, 2.0));
  reflection += ribbon * vec3(0.28, 0.31, 0.34);
  float fresnel = 0.12 + 0.38 * pow(1.0 - max(dot(normal, view), 0.0), 3.0);
  vec3 bottomCurvature;
  waveShape(point + slope * 65.0 + vec2(32.0, -18.0), bottomCurvature);
  vec2 stepUv = vec2(5.0) / surfaceSize;
  vec2 wakeX = (surfaceSlope(uv + vec2(stepUv.x, 0.0)) - surfaceSlope(uv - vec2(stepUv.x, 0.0))) / 10.0;
  vec2 wakeY = (surfaceSlope(uv + vec2(0.0, stepUv.y)) - surfaceSlope(uv - vec2(0.0, stepUv.y))) / 10.0;
  bottomCurvature += vec3(wakeX.x, (wakeX.y + wakeY.x) * 0.5, wakeY.y);
  vec3 lens = bottomCurvature * 75.0;
  float focusing = (1.0 - lens.x) * (1.0 - lens.z) - lens.y * lens.y;
  float caustic = exp(-abs(focusing) * 4.5);
  vec3 waterColor = mix(vec3(0.13, 0.34, 0.72), vec3(0.38, 0.67, 0.89), smoothstep(0.0, 1.0, uv.y));
  waterColor += caustic * vec3(0.24, 0.34, 0.38);
  waterColor *= 0.94 + dot(normal, normalize(vec3(-0.4, 0.5, 1.0))) * 0.12;
  vec3 color = mix(waterColor, reflection, fresnel + ribbon * 0.2);
  vec3 halfway = normalize(normalize(vec3(-0.35, 0.6, 1.0)) + view);
  float glint = pow(max(dot(normal, halfway), 0.0), 160.0);
  color += glint * vec3(0.2, 0.23, 0.24);

  // Seamless gradient transition between grayish tone and water ripples
  float waterBlend = smoothstep(0.52, 0.38, uv.y);
  color = mix(grayTone, color, waterBlend);

  gl_FragColor = vec4(color, 1.0);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
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

export default function HeroWaterBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const section = canvas?.closest('section');
    if (!canvas || !section) return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let cleanupCurrent: (() => void) | undefined;

    function init() {
      cleanupCurrent?.();
      cleanupCurrent = undefined;

      if (mediaQuery.matches || !canvas || !section) return;

      const gl = (canvas.getContext('webgl', {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: 'high-performance'
      }) || canvas.getContext('webgl2', {
        alpha: true,
        antialias: true,
        depth: false,
        powerPreference: 'high-performance'
      }) || canvas.getContext('experimental-webgl')) as WebGLRenderingContext | null;

      if (!gl) return;

      const vertShader = compileShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER_SRC);
      const fragShader = compileShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER_SRC);
      const program = gl.createProgram();

      if (!vertShader || !fragShader || !program) return;
      gl.attachShader(program, vertShader);
      gl.attachShader(program, fragShader);
      gl.linkProgram(program);

      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        gl.deleteProgram(program);
        return;
      }

      const positionBuffer = gl.createBuffer();
      const fallbackTexture = gl.createTexture();
      gl.useProgram(program);
      gl.uniform1f(gl.getUniformLocation(program, 'glass'), 0.0);

      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl.STATIC_DRAW
      );

      const posAttrib = gl.getAttribLocation(program, 'position');
      gl.enableVertexAttribArray(posAttrib);
      gl.vertexAttribPointer(posAttrib, 2, gl.FLOAT, false, 0, 0);

      gl.bindTexture(gl.TEXTURE_2D, fallbackTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

      const uniforms = {
        resolution: gl.getUniformLocation(program, 'resolution'),
        surfaceSize: gl.getUniformLocation(program, 'surfaceSize'),
        imageSize: gl.getUniformLocation(program, 'imageSize'),
        time: gl.getUniformLocation(program, 'time'),
        water: gl.getUniformLocation(program, 'water')
      };

      const waterTexture = gl.createTexture();
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, waterTexture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.uniform1i(uniforms.water, 1);
      gl.activeTexture(gl.TEXTURE0);

      let sim = createSimulation(1, 1);
      let animFrameId = 0;
      let lastTime = 0;
      let elapsedTime = 0;
      let isIntersecting = false;
      let isReady = false;
      let isDisposed = false;
      let hasFadeIn = false;

      let currentPointer: { x: number; y: number } | undefined;
      let prevPointer: { x: number; y: number } | undefined;
      let bounds = canvas.getBoundingClientRect();

      function updateSize() {
        if (!canvas) return;
        bounds = canvas.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, 1.5, Math.sqrt(9e5 / Math.max(bounds.width * bounds.height, 1)));
        canvas.width = Math.max(1, Math.round(bounds.width * dpr));
        canvas.height = Math.max(1, Math.round(bounds.height * dpr));
        sim = createSimulation(Math.max(1, bounds.width), Math.max(1, bounds.height));

        clearPointers();
        gl.activeTexture(gl.TEXTURE1);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
        gl.texImage2D(
          gl.TEXTURE_2D,
          0,
          gl.RGBA,
          sim.columns,
          sim.rows,
          0,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          sim.advance(0)
        );
        gl.activeTexture(gl.TEXTURE0);
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
        gl.uniform2f(uniforms.surfaceSize, bounds.width, bounds.height);
      }

      function loop(timestamp: number) {
        if (!isIntersecting || document.hidden || isDisposed) {
          animFrameId = 0;
          return;
        }
        animFrameId = requestAnimationFrame(loop);
        if (timestamp - lastTime < 1000 / 60 - 1) return;

        const dt = Math.min((timestamp - lastTime) / 1000, 0.05);
        elapsedTime += dt;

        if (currentPointer) {
          const from = prevPointer ?? currentPointer;
          const dist = Math.hypot(currentPointer.x - from.x, currentPointer.y - from.y);
          if (!prevPointer || dist > 0.1) {
            const intensity = prevPointer ? Math.min(1, 0.04 * dist) : 0.55;
            sim.disturb(from.x, from.y, currentPointer.x, currentPointer.y, intensity);
          }
          prevPointer = { ...currentPointer };
        }

        gl.activeTexture(gl.TEXTURE1);
        gl.texSubImage2D(
          gl.TEXTURE_2D,
          0,
          0,
          0,
          sim.columns,
          sim.rows,
          gl.RGBA,
          gl.UNSIGNED_BYTE,
          sim.advance(dt)
        );
        gl.activeTexture(gl.TEXTURE0);
        lastTime = timestamp;
        gl.uniform1f(uniforms.time, elapsedTime);
        gl.drawArrays(gl.TRIANGLES, 0, 6);

        if (!hasFadeIn) {
          canvas.style.opacity = '1';
          hasFadeIn = true;
        }
      }

      function handleLoopControl() {
        cancelAnimationFrame(animFrameId);
        clearPointers();
        if (!isDisposed && isReady && isIntersecting && !document.hidden) {
          lastTime = performance.now();
          animFrameId = requestAnimationFrame(loop);
        }
      }

      function clearPointers() {
        currentPointer = undefined;
        prevPointer = undefined;
      }

      function onPointerMove(e: PointerEvent) {
        if (e.pointerType === 'touch' || !isReady || !isIntersecting || document.hidden || !canvas) return;
        if (!bounds) bounds = canvas.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = bounds.bottom - e.clientY;
        if (x < 0 || x > bounds.width || y < 0 || y > bounds.height) {
          clearPointers();
        } else {
          currentPointer = { x, y };
        }
      }

      function onClick(e: MouseEvent) {
        if (e.button !== 0 || !isReady || !isIntersecting || document.hidden || !canvas) return;
        if (!bounds) bounds = canvas.getBoundingClientRect();
        const x = e.clientX - bounds.left;
        const y = bounds.bottom - e.clientY;
        if (x >= 0 && x <= bounds.width && y >= 0 && y <= bounds.height) {
          sim.disturb(x, y, x, y, 2.6, 28);
        }
      }

      function onContextLost(e: Event) {
        e.preventDefault();
        isReady = false;
        if (canvas) canvas.style.opacity = '0';
        hasFadeIn = false;
        handleLoopControl();
      }

      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        1,
        1,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        new Uint8Array([0, 0, 0, 255])
      );
      updateSize();
      isReady = true;
      isIntersecting = true;
      canvas.style.opacity = '1';
      handleLoopControl();

      const resizeObserver = new ResizeObserver(updateSize);
      resizeObserver.observe(canvas);

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        isIntersecting = entry.isIntersecting;
        handleLoopControl();
      });
      intersectionObserver.observe(canvas);

      function onScroll() {
        if (isIntersecting && canvas) {
          bounds = canvas.getBoundingClientRect();
        }
      }

      window.addEventListener('scroll', onScroll, { passive: true });
      section.addEventListener('pointermove', onPointerMove, { passive: true });
      section.addEventListener('click', onClick, { passive: true });
      window.addEventListener('pointermove', onPointerMove, { passive: true });
      section.addEventListener('pointerleave', clearPointers);
      section.addEventListener('pointercancel', clearPointers);
      document.addEventListener('visibilitychange', handleLoopControl);
      canvas.addEventListener('webglcontextlost', onContextLost);

      cleanupCurrent = () => {
        isDisposed = true;
        cancelAnimationFrame(animFrameId);
        resizeObserver.disconnect();
        intersectionObserver.disconnect();
        window.removeEventListener('scroll', onScroll);
        section.removeEventListener('pointermove', onPointerMove);
        section.removeEventListener('click', onClick);
        window.removeEventListener('pointermove', onPointerMove);
        section.removeEventListener('pointerleave', clearPointers);
        section.removeEventListener('pointercancel', clearPointers);
        document.removeEventListener('visibilitychange', handleLoopControl);
        canvas.removeEventListener('webglcontextlost', onContextLost);

        if (canvas) canvas.style.opacity = '0';
        if (fallbackTexture) gl.deleteTexture(fallbackTexture);
        if (waterTexture) gl.deleteTexture(waterTexture);
        if (positionBuffer) gl.deleteBuffer(positionBuffer);
        if (program) gl.deleteProgram(program);
      };
    }

    init();
    mediaQuery.addEventListener('change', init);

    return () => {
      mediaQuery.removeEventListener('change', init);
      cleanupCurrent?.();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-100 transition-opacity duration-700 pointer-events-none"
    />
  );
}
