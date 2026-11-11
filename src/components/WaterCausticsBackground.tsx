import React, { useEffect, useRef, useState } from 'react';

const CAUSTICS_VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const CAUSTICS_FRAGMENT_SHADER = `#version 300 es
precision highp float;
uniform float u_time;
uniform vec2 u_resolution;
out vec4 fragColor;

void main() {
  vec2 uv = gl_FragCoord.xy / u_resolution.xy;
  
  // Aspect-corrected coordinate space for realistic ripple scale
  float aspect = u_resolution.x / max(u_resolution.y, 1.0);
  vec2 p = vec2(uv.x * aspect * 3.8, uv.y * 3.8);
  vec2 i = p;
  float c = 1.0;
  float inten = 0.045;
  float t = u_time * 0.42;

  // 4-octave caustic interference wave calculation
  for (int n = 0; n < 4; n++) {
    float f = float(n + 1);
    float tn = t * (1.0 - (2.4 / f));
    i = p + vec2(
      cos(tn - i.x) + sin(tn + i.y),
      sin(tn - i.y) + cos(tn + i.x)
    );
    c += 1.0 / length(vec2(
      p.x / (sin(i.x + tn) / inten),
      p.y / (cos(i.y + tn) / inten)
    ));
  }

  c /= 4.0;
  c = 1.18 - pow(c, 1.25);
  
  // Pure Caribbean/Pool water palette matching Context.dev's azure liquid
  vec3 deepWater = vec3(0.015, 0.32, 0.86);  // #0452DC
  vec3 midWater  = vec3(0.06, 0.55, 0.98);   // #0F8CFA
  vec3 highWater = vec3(0.62, 0.90, 1.0);    // Sunlight caustic highlight

  vec3 waterCol = mix(deepWater, midWater, clamp(c * 0.85, 0.0, 1.0));
  waterCol = mix(waterCol, highWater, clamp(pow(max(c, 0.0), 3.2) * 1.6, 0.0, 1.0));

  // Vertical fade: Top (1.0 in GL coords) is transparent, bottom (0.0) is vibrant water
  float alpha = smoothstep(0.92, 0.15, uv.y) * 0.92;

  fragColor = vec4(waterCol, alpha);
}
`;

interface WaterCausticsBackgroundProps {
  className?: string;
}

export default function WaterCausticsBackground({ className = '' }: WaterCausticsBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglReady, setWebglReady] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGL2RenderingContext | null = null;
    try {
      gl = canvas.getContext('webgl2', {
        alpha: true,
        antialias: true,
        powerPreference: 'high-performance',
        preserveDrawingBuffer: false,
      });
    } catch (e) {
      console.warn('WebGL2 init fallback:', e);
    }

    if (!gl) {
      return;
    }

    const createShader = (glCtx: WebGL2RenderingContext, type: number, src: string) => {
      const shader = glCtx.createShader(type);
      if (!shader) return null;
      glCtx.shaderSource(shader, src);
      glCtx.compileShader(shader);
      if (!glCtx.getShaderParameter(shader, glCtx.COMPILE_STATUS)) {
        console.error('Caustic shader compile failed:', glCtx.getShaderInfoLog(shader));
        glCtx.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, CAUSTICS_VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, CAUSTICS_FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Caustic program link failed:', gl.getProgramInfoLog(program));
      return;
    }

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1, -1,
         1, -1,
        -1,  1,
        -1,  1,
         1, -1,
         1,  1,
      ]),
      gl.STATIC_DRAW
    );

    const aPositionLoc = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(aPositionLoc);
    gl.vertexAttribPointer(aPositionLoc, 2, gl.FLOAT, false, 0, 0);

    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');

    setWebglReady(true);

    let animationFrameId: number;
    let isVisible = true;
    const startTime = performance.now();

    const handleResize = () => {
      if (!canvas || !container || !gl) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const observer = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
    }, { threshold: 0.05 });
    observer.observe(container);

    const render = (now: number) => {
      if (isVisible && gl && canvas) {
        const elapsed = (now - startTime) / 1000;
        gl.useProgram(program);
        gl.uniform1f(uTimeLoc, elapsed);
        gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      observer.disconnect();
      cancelAnimationFrame(animationFrameId);
      if (gl) {
        gl.deleteProgram(program);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(positionBuffer);
      }
    };
  }, []);

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 w-full h-full pointer-events-none overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* WebGL Caustic Water Canvas */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
          webglReady ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* High-fidelity CSS Ambient Fallback & Gradient Overlay (ensures zero empty space) */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#0284c7]/40 via-[#38bdf8]/20 to-transparent"
        style={{
          backgroundImage: !webglReady 
            ? 'radial-gradient(circle at 50% 120%, rgba(14, 165, 233, 0.45) 0%, rgba(56, 189, 248, 0.2) 40%, transparent 70%)' 
            : undefined
        }}
      />

      {/* Surface caustic shimmer lines overlay */}
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-[#0284c7]/30 to-transparent mix-blend-overlay" />
    </div>
  );
}
