import React, { useEffect, useRef, useState } from 'react';

const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;

out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  vec2 u = f * f * (3.0 - 2.0 * f);

  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);
}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
  vec3 color1 = c1.rgb * c1.a;
  vec3 color2 = c2.rgb * c2.a;
  vec3 color3 = c3.rgb * c3.a;

  float r1 = smoothstep(0.0 + 0.35 * edgesWidth, 0.7 - 0.35 * edgesWidth + 0.5 * edge_blur, mixer);
  float r2 = smoothstep(0.3 + 0.35 * edgesWidth, 1.0 - 0.35 * edgesWidth + edge_blur, mixer);

  vec3 blended_color_2 = mix(color1, color2, r1);
  float blended_opacity_2 = mix(c1.a, c2.a, r1);

  vec3 c = mix(blended_color_2, color3, r2);
  float o = mix(blended_opacity_2, c3.a, r2);
  return vec4(c, o);
}

void main() {
  vec2 uv = gl_FragCoord.xy / max(u_resolution.xy, vec2(1.0));
  float t = 0.5 * u_time;

  float noise_scale = 0.0005 + 0.006 * u_scale;

  uv -= 0.5;
  uv *= (noise_scale * u_resolution);
  uv = rotate(uv, u_rotation * 0.5 * PI);
  uv /= max(u_pixelRatio, 0.1);
  uv += 0.5;

  float n1 = noise(uv * 1.0 + t);
  float n2 = noise(uv * 2.0 - t);
  float angle = n1 * TWO_PI;
  uv.x += 4.0 * u_distortion * n2 * cos(angle);
  uv.y += 4.0 * u_distortion * n2 * sin(angle);

  float iterations_number = ceil(clamp(u_swirlIterations, 1.0, 30.0));
  for (float i = 1.0; i <= iterations_number; i++) {
    uv.x += clamp(u_swirl, 0.0, 2.0) / i * cos(t + i * 1.5 * uv.y);
    uv.y += clamp(u_swirl, 0.0, 2.0) / i * cos(t + i * 1.0 * uv.x);
  }

  float proportion = clamp(u_proportion, 0.0, 1.0);

  float shape = 0.0;
  float mixer = 0.0;
  if (u_shape < 0.5) {
    vec2 checks_shape_uv = uv * (0.5 + 3.5 * u_shapeScale);
    shape = 0.5 + 0.5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
    mixer = shape + 0.48 * sign(proportion - 0.5) * pow(abs(proportion - 0.5), 0.5);
  } else if (u_shape < 1.5) {
    vec2 stripes_shape_uv = uv * (0.25 + 3.0 * u_shapeScale);
    float f = fract(stripes_shape_uv.y);
    shape = smoothstep(0.0, 0.55, f) * smoothstep(1.0, 0.45, f);
    mixer = shape + 0.48 * sign(proportion - 0.5) * pow(abs(proportion - 0.5), 0.5);
  } else {
    float sh = 1.0 - uv.y;
    sh -= 0.5;
    sh /= max(noise_scale * u_resolution.y, 0.001);
    sh += 0.5;
    float shape_scaling = 0.2 * (1.0 - u_shapeScale);
    shape = smoothstep(0.45 - shape_scaling, 0.55 + shape_scaling, sh + 0.3 * (proportion - 0.5));
    mixer = shape;
  }

  vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1.0 - clamp(u_softness, 0.0, 1.0), 0.01 + 0.01 * u_scale);

  fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;

interface LiquidFooterBackgroundProps {
  className?: string;
}

export default function LiquidFooterBackground({ className = '' }: LiquidFooterBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [webglActive, setWebglActive] = useState(false);

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
      console.warn('WebGL2 init caught:', e);
    }

    if (!gl) {
      console.warn('WebGL2 unavailable, relying on CSS liquid fluid gradient');
      return;
    }

    setWebglActive(true);

    const createShader = (glContext: WebGL2RenderingContext, type: number, source: string) => {
      const shader = glContext.createShader(type);
      if (!shader) return null;
      glContext.shaderSource(shader, source);
      glContext.compileShader(shader);
      if (!glContext.getShaderParameter(shader, glContext.COMPILE_STATUS)) {
        console.error('Shader compile error:', glContext.getShaderInfoLog(shader));
        glContext.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
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

    // Uniform Locations
    const uTimeLoc = gl.getUniformLocation(program, 'u_time');
    const uPixelRatioLoc = gl.getUniformLocation(program, 'u_pixelRatio');
    const uResolutionLoc = gl.getUniformLocation(program, 'u_resolution');
    const uScaleLoc = gl.getUniformLocation(program, 'u_scale');
    const uRotationLoc = gl.getUniformLocation(program, 'u_rotation');
    const uColor1Loc = gl.getUniformLocation(program, 'u_color1');
    const uColor2Loc = gl.getUniformLocation(program, 'u_color2');
    const uColor3Loc = gl.getUniformLocation(program, 'u_color3');
    const uProportionLoc = gl.getUniformLocation(program, 'u_proportion');
    const uSoftnessLoc = gl.getUniformLocation(program, 'u_softness');
    const uShapeLoc = gl.getUniformLocation(program, 'u_shape');
    const uShapeScaleLoc = gl.getUniformLocation(program, 'u_shapeScale');
    const uDistortionLoc = gl.getUniformLocation(program, 'u_distortion');
    const uSwirlLoc = gl.getUniformLocation(program, 'u_swirl');
    const uSwirlIterationsLoc = gl.getUniformLocation(program, 'u_swirlIterations');

    // Vibrant Mixon Brand Colors:
    // Color 1: Deep obsidian #030208
    gl.uniform4f(uColor1Loc, 3 / 255, 2 / 255, 8 / 255, 1.0);
    // Color 2: Luminous Deep Navy #083071
    gl.uniform4f(uColor2Loc, 8 / 255, 48 / 255, 113 / 255, 0.88);
    // Color 3: Radiant Mixon Electric Blue #015bf3
    gl.uniform4f(uColor3Loc, 1 / 255, 91 / 255, 243 / 255, 1.0);

    // Make-B fluid parameters
    gl.uniform1f(uScaleLoc, 0.52);
    gl.uniform1f(uRotationLoc, 114 / 90);
    gl.uniform1f(uProportionLoc, 0.95);
    gl.uniform1f(uSoftnessLoc, 0.95);
    gl.uniform1f(uShapeLoc, 2.0);
    gl.uniform1f(uShapeScaleLoc, 0.15);
    gl.uniform1f(uDistortionLoc, 0.18);
    gl.uniform1f(uSwirlLoc, 0.25);
    gl.uniform1f(uSwirlIterationsLoc, 16.0);

    let animationFrameId: number;
    let isVisible = true;
    const startTime = performance.now();

    const handleResize = () => {
      if (!canvas || !container || !gl) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(Math.floor(rect.width * dpr), 300);
      const height = Math.max(Math.floor(rect.height * dpr), 300);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
        gl.uniform2f(uResolutionLoc, width, height);
        gl.uniform1f(uPixelRatioLoc, dpr);
      }
    };

    handleResize();

    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    intersectionObserver.observe(container);

    const render = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(render);
      if (!isVisible || !gl) return;

      const elapsed = (currentTime - startTime) * 0.001;
      const speed = 0.45;
      gl.uniform1f(uTimeLoc, elapsed * speed);

      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
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
      className={`absolute inset-0 pointer-events-none overflow-hidden select-none z-0 ${className}`}
      aria-hidden="true"
    >
      {/* 1. LAYER 1: Ambient Living CSS Fluid Glow (Always visible, guaranteed 100% uptime) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Swirling Electric Blue Aurora (Bottom Right) */}
        <div 
          className="absolute -bottom-32 -right-20 w-[650px] h-[650px] rounded-full bg-gradient-to-tr from-[#015bf3]/40 via-[#0066ff]/25 to-transparent blur-[90px] animate-pulse" 
          style={{ animationDuration: '8s' }}
        />

        {/* Swirling Deep Navy & Royal Blue Aurora (Bottom Left) */}
        <div 
          className="absolute -bottom-40 -left-20 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-[#083071]/55 via-[#015bf3]/30 to-transparent blur-[100px] animate-pulse"
          style={{ animationDuration: '11s', animationDelay: '2s' }}
        />

        {/* Center Luminous Shimmer behind bottom logo */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[380px] bg-gradient-to-t from-[#015bf3]/35 via-[#083071]/20 to-transparent blur-[80px]"
        />
      </div>

      {/* 2. LAYER 2: WebGL2 Make-B.Studio Liquid Shader Canvas */}
      <canvas 
        ref={canvasRef} 
        className={`w-full h-full block absolute inset-0 transition-opacity duration-700 ${webglActive ? 'opacity-100' : 'opacity-0'}`}
        style={{ mixBlendMode: 'screen' }}
      />

      {/* 3. LAYER 3: Tactile Film Grain Overlay (Matches make-b.studio aesthetic) */}
      <div 
        className="absolute inset-0 opacity-[0.16] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '160px 160px'
        }}
      />

      {/* 4. LAYER 4: Soft Top Fade into content above */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-[#030208] to-transparent pointer-events-none" />
    </div>
  );
}
