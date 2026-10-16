"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MessageCircle, ChevronRight } from "lucide-react";

export default function HeroStudio3D({ whatsappLink, isDark = true }: { whatsappLink: string; isDark?: boolean }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // ─── Scene / Camera / Renderer ───────────────────────────────────────────
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0f1f35);
    scene.fog = new THREE.FogExp2(0x0f1f35, 0.028);

    const W = container.clientWidth;
    const H = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(34, W / H, 0.1, 100);
    camera.position.set(0, 0.15, 10.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // ─── Lighting ─────────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0x4a6d96, 2.2));

    // Two overhead studio spots
    const addSpot = (x: number, intensity: number) => {
      const s = new THREE.SpotLight(0xdbeafe, intensity);
      s.position.set(x, 9, 4);
      s.angle = 0.5; s.penumbra = 0.8; s.decay = 1.2; s.distance = 26;
      s.castShadow = true;
      const t = new THREE.Object3D();
      t.position.set(0, 0, 0);
      scene.add(t);
      s.target = t;
      scene.add(s);
      return s;
    };
    addSpot(-5, 18);
    addSpot(5, 18);

    // Front / rim
    const frontKey = new THREE.DirectionalLight(0xfff8ed, 4.0);
    frontKey.position.set(2, 4, 8);
    scene.add(frontKey);

    // Cursor-tracking accent
    const cursorLight = new THREE.PointLight(0x7dd3fc, 4.5, 15);
    cursorLight.position.set(0, 2, 4.5);
    scene.add(cursorLight);

    // Gold warm glow
    const warmGlow = new THREE.PointLight(0xf59e0b, 3.5, 9);
    warmGlow.position.set(0.5, 0, 2.5);
    scene.add(warmGlow);

    // Cyan ring floor light
    const ringLight = new THREE.PointLight(0x0ea5e9, 6, 8);
    ringLight.position.set(0, -2, 0);
    scene.add(ringLight);

    // ─── Environment: Floor ─────────────────────────────────────────────────
    const floor = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 50),
      new THREE.MeshStandardMaterial({ color: 0x16304c, roughness: 0.22, metalness: 0.5 })
    );
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2.25;
    floor.receiveShadow = true;
    scene.add(floor);

    // Back wall
    const backWall = new THREE.Mesh(
      new THREE.PlaneGeometry(50, 24),
      new THREE.MeshStandardMaterial({ color: 0x0d1e30, roughness: 0.7, metalness: 0.15 })
    );
    backWall.position.set(0, 5, -9);
    scene.add(backWall);

    // Side shelves
    const shelfMat = new THREE.MeshStandardMaterial({ color: 0x111e2e, roughness: 0.35, metalness: 0.4 });
    [-9, 9].forEach((x, i) => {
      const shelf = new THREE.Mesh(new THREE.BoxGeometry(6.5, 5, 2.2), shelfMat);
      shelf.position.set(x, 1.5, -3.8);
      shelf.rotation.y = i === 0 ? 0.36 : -0.36;
      scene.add(shelf);
      const glow = new THREE.Mesh(
        new THREE.BoxGeometry(6.2, 0.1, 2.0),
        new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.4 })
      );
      glow.position.set(x, 3.9, -3.7);
      glow.rotation.y = shelf.rotation.y;
      scene.add(glow);
    });

    // Volumetric spotlight cones
    const coneGeo = new THREE.ConeGeometry(3.2, 10, 32, 1, true);
    const coneMat = new THREE.MeshBasicMaterial({
      color: 0xbfdbfe, transparent: true, opacity: 0.07,
      side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending
    });
    const cL = new THREE.Mesh(coneGeo, coneMat);
    cL.position.set(-4.8, 4, 1.8); cL.rotation.z = -0.44; cL.rotation.x = -0.16;
    scene.add(cL);
    const cR = new THREE.Mesh(coneGeo, coneMat.clone());
    cR.position.set(4.8, 4, 1.8); cR.rotation.z = 0.44; cR.rotation.x = -0.16;
    scene.add(cR);

    // ─── Floor Neon Ring ──────────────────────────────────────────────────────
    const ringGeo = new THREE.TorusGeometry(4.5, 0.06, 20, 100);
    const ringMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, transparent: true, opacity: 0.98, blending: THREE.AdditiveBlending
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = -2.22;
    scene.add(ringMesh);

    const haloMesh = new THREE.Mesh(
      new THREE.RingGeometry(4.0, 5.1, 64),
      new THREE.MeshBasicMaterial({
        color: 0x0284c7, transparent: true, opacity: 0.42,
        side: THREE.DoubleSide, blending: THREE.AdditiveBlending, depthWrite: false
      })
    );
    haloMesh.rotation.x = Math.PI / 2;
    haloMesh.position.y = -2.21;
    scene.add(haloMesh);

    // ─── Obsidian Sphere ("Canica") with golden arc & reflections ─────────────
    // Build sphere base texture
    const texC = document.createElement("canvas");
    texC.width = 2048; texC.height = 2048;
    const tc = texC.getContext("2d")!;
    const bg = tc.createLinearGradient(0, 0, 2048, 2048);
    bg.addColorStop(0, "#060e1a"); bg.addColorStop(0.5, "#020508"); bg.addColorStop(1, "#08121e");
    tc.fillStyle = bg; tc.fillRect(0, 0, 2048, 2048);

    // Reflection band (showroom lights reflected on glossy surface, as in reference photo)
    const reflGrad = tc.createLinearGradient(500, 200, 900, 900);
    reflGrad.addColorStop(0, "rgba(100,160,220,0.0)");
    reflGrad.addColorStop(0.3, "rgba(140,200,255,0.18)");
    reflGrad.addColorStop(0.55, "rgba(200,230,255,0.32)");
    reflGrad.addColorStop(0.75, "rgba(140,200,255,0.18)");
    reflGrad.addColorStop(1, "rgba(100,160,220,0.0)");
    tc.save();
    tc.translate(1024, 1024);
    tc.rotate(-0.42);
    tc.fillStyle = reflGrad;
    tc.fillRect(-900, -600, 500, 1200);
    tc.restore();

    // Emissive texture for the gold arc
    const emC = document.createElement("canvas");
    emC.width = 2048; emC.height = 2048;
    const ec = emC.getContext("2d")!;
    ec.fillStyle = "#000"; ec.fillRect(0, 0, 2048, 2048);

    const drawArc = (ctx: CanvasRenderingContext2D, isEm: boolean) => {
      ctx.save();
      const cx = 1024, cy = 1024;
      const sx = cx - 190, sy = 100, cpx = cx + 230, cpy = cy, ex = cx - 145, ey = 1940;

      // Wide soft aura
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(cpx + 60, cpy, ex, ey);
      ctx.lineWidth = isEm ? 52 : 42;
      ctx.strokeStyle = isEm ? "rgba(245,158,11,0.5)" : "rgba(217,119,6,0.55)";
      ctx.filter = "blur(22px)"; ctx.stroke();

      // Glow blade
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(cpx, cpy, ex, ey);
      ctx.lineWidth = 20;
      ctx.strokeStyle = isEm ? "rgba(253,224,71,0.95)" : "rgba(251,191,36,0.95)";
      ctx.filter = "blur(7px)"; ctx.stroke();

      // Sharp core
      ctx.filter = "none";
      ctx.beginPath(); ctx.moveTo(sx, sy); ctx.quadraticCurveTo(cpx, cpy, ex, ey);
      ctx.lineWidth = 7;
      ctx.strokeStyle = isEm ? "#ffffff" : "#fef9c3"; ctx.stroke();
      ctx.restore();
    };
    drawArc(tc, false);
    drawArc(ec, true);

    const sphereTex = new THREE.CanvasTexture(texC);
    const emTex = new THREE.CanvasTexture(emC);

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(1.78, 72, 72),
      new THREE.MeshPhysicalMaterial({
        map: sphereTex,
        emissiveMap: emTex,
        emissive: new THREE.Color(0xffd700),
        emissiveIntensity: 2.5,
        roughness: 0.05,
        metalness: 0.95,
        clearcoat: 1.0,
        clearcoatRoughness: 0.03,
        reflectivity: 1.0,
        envMapIntensity: 1.0,
      })
    );
    sphere.position.set(0, 0.22, 0);
    sphere.rotation.y = -Math.PI * 0.48;
    sphere.castShadow = true;
    scene.add(sphere);

    // Contact shadow
    const shC = document.createElement("canvas");
    shC.width = 256; shC.height = 256;
    const sc = shC.getContext("2d")!;
    const sg = sc.createRadialGradient(128, 128, 10, 128, 128, 120);
    sg.addColorStop(0, "rgba(0,0,0,0.92)"); sg.addColorStop(0.4, "rgba(0,0,0,0.55)"); sg.addColorStop(1, "rgba(0,0,0,0)");
    sc.fillStyle = sg; sc.fillRect(0, 0, 256, 256);
    const contactShadow = new THREE.Mesh(
      new THREE.PlaneGeometry(4.4, 4.4),
      new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(shC), transparent: true, opacity: 0.88, depthWrite: false })
    );
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.set(0, -2.2, 0);
    scene.add(contactShadow);

    // ─── Floating Icon Coins (from /public/icon-*.png) ────────────────────────
    const goldSide = new THREE.MeshStandardMaterial({ color: 0xca8a04, metalness: 0.94, roughness: 0.2 });

    // Returns a THREE.Group so we can rotate the group in Y (world Y)
    // while the inner mesh stays fixed at rotation.x = PI/2 (face toward +Z).
    // This avoids Euler XYZ order causing tilting when both X and Y are set.
    const buildCoin = (iconUrl: string, radius: number, depth: number): Promise<THREE.Group> => {
      return new Promise((resolve) => {
        const img = new Image();
        img.crossOrigin = "anonymous";
        img.onload = () => {
          const fc = document.createElement("canvas");
          fc.width = 512; fc.height = 512;
          const fCtx = fc.getContext("2d")!;

          // Gold radial base
          const gd = fCtx.createRadialGradient(256, 256, 28, 256, 256, 256);
          gd.addColorStop(0, "#fef08a"); gd.addColorStop(0.45, "#d97706"); gd.addColorStop(1, "#78350f");
          fCtx.fillStyle = gd; fCtx.fillRect(0, 0, 512, 512);

          // Outer ring
          fCtx.strokeStyle = "rgba(254,240,138,0.75)"; fCtx.lineWidth = 14;
          fCtx.beginPath(); fCtx.arc(256, 256, 228, 0, Math.PI * 2); fCtx.stroke();
          fCtx.strokeStyle = "rgba(120,53,15,0.5)"; fCtx.lineWidth = 6;
          fCtx.beginPath(); fCtx.arc(256, 256, 210, 0, Math.PI * 2); fCtx.stroke();

          // Icon in circle — rotate canvas 90° CW to compensate CylinderGeometry cap UV rotation
          fCtx.save();
          fCtx.beginPath(); fCtx.arc(256, 256, 155, 0, Math.PI * 2); fCtx.clip();
          fCtx.fillStyle = "rgba(255,255,255,0.94)";
          fCtx.fillRect(101, 101, 310, 310);
          fCtx.translate(256, 256);
          fCtx.rotate(-Math.PI / 2); // compensate for UV orientation of cylinder cap (turned left instead of right)
          fCtx.translate(-256, -256);
          fCtx.drawImage(img, 101, 101, 310, 310);
          fCtx.restore();

          const tex = new THREE.CanvasTexture(fc);
          // Standard CylinderGeometry — NO geo.rotateX (no UV distortion)
          const geo = new THREE.CylinderGeometry(radius, radius, depth, 40);
          const faceMat = new THREE.MeshStandardMaterial({ map: tex, metalness: 0.88, roughness: 0.2 });
          const mesh = new THREE.Mesh(geo, [goldSide, faceMat, faceMat]);
          mesh.rotation.x = Math.PI / 2; // face points toward camera (+Z)
          mesh.castShadow = true;

          // Wrap in group — group.rotation.y = world Y spin, no interaction with mesh.rotation.x
          const group = new THREE.Group();
          group.add(mesh);
          resolve(group);
        };
        img.onerror = () => {
          const geo = new THREE.CylinderGeometry(radius, radius, depth, 40);
          const mesh = new THREE.Mesh(geo, [goldSide, goldSide, goldSide]);
          mesh.rotation.x = Math.PI / 2;
          const group = new THREE.Group();
          group.add(mesh);
          resolve(group);
        };
        img.src = iconUrl;
      });
    };

    interface TokenData {
      mesh: THREE.Object3D | null;
      baseX: number; baseY: number; baseZ: number;
      freq: number; phase: number; amp: number;
      rotY: number; rotZ: number; pFactor: number;
    }

    // 5 icon positions
    const tokenSpecs: Omit<TokenData, "mesh">[] = [
      { baseX: -3.9, baseY: -0.3,  baseZ: 1.0,  freq: 1.3, phase: 0.0, amp: 0.17, rotY: 0.42,  rotZ: 0.13,  pFactor: 0.35 },
      { baseX: -2.1, baseY:  0.65, baseZ: -0.3, freq: 1.6, phase: 1.8, amp: 0.14, rotY: 0.35,  rotZ: 0.10,  pFactor: 0.25 },
      { baseX: -1.9, baseY: -0.75, baseZ: 2.2,  freq: 1.7, phase: 3.2, amp: 0.20, rotY: -0.38, rotZ: -0.15, pFactor: 0.60 },
      { baseX:  2.3, baseY:  0.6,  baseZ: 0.4,  freq: 1.4, phase: 4.2, amp: 0.18, rotY: 0.55,  rotZ: 0.22,  pFactor: 0.38 },
      { baseX:  3.2, baseY: -0.6,  baseZ: 2.0,  freq: 1.5, phase: 5.4, amp: 0.18, rotY: -0.45, rotZ: 0.15,  pFactor: 0.55 },
    ];

    const iconUrls = [
      "/icon-git.png",
      "/icon-laravel.png",
      "/icon-php.png",
      "/icon-sql.jpg",
      "/icon-vite.jpg",
    ];

    const tokens: TokenData[] = tokenSpecs.map(s => ({ ...s, mesh: null }));

    // Build coin groups async and add to scene
    iconUrls.forEach((url, i) => {
      buildCoin(url, 0.62, 0.12).then(group => {
        group.position.set(tokens[i].baseX, tokens[i].baseY, tokens[i].baseZ);
        scene.add(group);
        tokens[i].mesh = group; // store GROUP, not mesh
      });
    });

    // ─── Mouse physics ───────────────────────────────────────────────────────
    let mouseX = 0, mouseY = 0;
    let baseSphRotY = -Math.PI * 0.48;
    let targetRotX = 0, targetRotY = baseSphRotY;
    let isDrag = false, prevX = 0, prevY = 0, velX = 0, velY = 0;

    const onMove = (e: MouseEvent) => {
      const r = container.getBoundingClientRect();
      // Check if within or near hero container
      const isInsideOrNear =
        e.clientY >= r.top - 100 &&
        e.clientY <= r.bottom + 100 &&
        e.clientX >= r.left - 50 &&
        e.clientX <= r.right + 50;

      if (!isInsideOrNear) {
        // Smoothly settle back to center when cursor moves away to rest of page
        mouseX = 0;
        mouseY = 0;
        if (!isDrag) {
          targetRotY = baseSphRotY;
          targetRotX = 0;
        }
        return;
      }

      // Normalized coordinates clamped between -1 and 1
      const rawX = ((e.clientX - r.left) / r.width) * 2 - 1;
      const rawY = -(((e.clientY - r.top) / r.height) * 2 - 1);
      mouseX = Math.max(-1, Math.min(1, rawX));
      mouseY = Math.max(-1, Math.min(1, rawY));

      if (!isDrag) {
        targetRotY = baseSphRotY + mouseX * 1.2;
        // Subtle tilt only, never flip or sink
        targetRotX = -mouseY * 0.18;
      } else {
        const dx = e.clientX - prevX, dy = e.clientY - prevY;
        velX = dx * 0.009; velY = dy * 0.009;
        sphere.rotation.y += velX; sphere.rotation.x += velY;
        baseSphRotY = sphere.rotation.y;
        prevX = e.clientX; prevY = e.clientY;
      }
    };

    const onDown = (e: MouseEvent) => {
      isDrag = true;
      setIsInteracting(true);
      prevX = e.clientX;
      prevY = e.clientY;
    };
    const onUp = () => {
      isDrag = false;
      setIsInteracting(false);
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      const r = container.getBoundingClientRect();
      const rawX = ((t.clientX - r.left) / r.width) * 2 - 1;
      const rawY = -(((t.clientY - r.top) / r.height) * 2 - 1);
      mouseX = Math.max(-1, Math.min(1, rawX));
      mouseY = Math.max(-1, Math.min(1, rawY));
      targetRotY = baseSphRotY + mouseX * 1.2;
      targetRotX = -mouseY * 0.18;
    };
    const onResize = () => {
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("mousemove", onMove);
    container.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    container.addEventListener("touchmove", onTouch, { passive: true });
    window.addEventListener("resize", onResize);

    // ─── Animation loop ──────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf: number;

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      if (!isDrag) {
        sphere.rotation.y += (targetRotY + Math.sin(t * 0.4) * 0.1 - sphere.rotation.y) * 0.06;
        sphere.rotation.x += (targetRotX + Math.cos(t * 0.6) * 0.05 - sphere.rotation.x) * 0.06;
        // Gentle horizontal parallax only — vertical position NEVER sinks into the floor
        sphere.position.x += (mouseX * 0.18 - sphere.position.x) * 0.05;
        // Keep altitude steady with a gentle rhythmic breathing float
        sphere.position.y += (0.22 + Math.sin(t * 1.5) * 0.05 - sphere.position.y) * 0.06;
        contactShadow.position.x = sphere.position.x;
        contactShadow.scale.setScalar(1 + (sphere.position.y - 0.22) * 0.2);
      } else {
        velX *= 0.92;
        velY *= 0.92;
        sphere.rotation.y += velX;
        sphere.rotation.x += velY;
      }

      cursorLight.position.x = mouseX * 2.8;
      cursorLight.position.y = 1.8 + mouseY * 1.2;

      tokens.forEach(tok => {
        if (!tok.mesh) return;
        const fy = tok.baseY + Math.sin(t * tok.freq + tok.phase) * tok.amp;
        const px = tok.baseX + mouseX * tok.pFactor * 0.35;
        // Crucial: tokens do NOT sink down with cursor Y; they keep their harmonic altitude
        tok.mesh.position.x += (px - tok.mesh.position.x) * 0.07;
        tok.mesh.position.y += (fy - tok.mesh.position.y) * 0.07;
        tok.mesh.rotation.set(
          0,
          Math.sin(t * tok.rotY * 0.35 + tok.phase) * 0.14,
          0
        );
      });

      ringMat.opacity = 0.85 + Math.sin(t * 2.2) * 0.13;
      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", onResize);
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <section className={`relative w-full h-[70vh] sm:h-[82vh] md:h-[92vh] min-h-[480px] sm:min-h-[580px] md:min-h-[700px] max-h-[1080px] overflow-hidden select-none transition-colors duration-500 ${isDark ? "bg-[#0f1f35]" : "bg-[#0b172a]"}`}>
      {/* WebGL canvas */}
      <div
        ref={mountRef}
        className="absolute inset-0 z-0 cursor-grab active:cursor-grabbing"
        title="Mueve o arrastra para rotar la canica 3D"
      />

      {/* ── TOP BADGE ONLY ── */}
      <div className="absolute inset-x-0 top-0 z-20 flex flex-col items-center text-center px-4 pt-5 sm:pt-7 md:pt-9 pointer-events-none">
        <div className="pointer-events-auto inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-5 sm:py-2 rounded-full border border-cyan-400/30 bg-slate-950/70 backdrop-blur-md text-[10px] sm:text-xs md:text-sm font-bold text-cyan-300 shadow-xl tracking-wide sm:tracking-wider uppercase max-w-[90vw] text-center">
          <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-cyan-400 animate-pulse flex-shrink-0" />
          <span>Tecnología que Impulsa tu Negocio</span>
        </div>
      </div>

      {/* ── BUTTONS (bottom center, above ring) ── */}
      <div className="absolute inset-x-0 bottom-5 sm:bottom-8 z-20 flex flex-col sm:flex-row justify-center items-center gap-2.5 sm:gap-4 px-5 pointer-events-none">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto w-full sm:w-auto group inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 rounded-full bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 text-white font-bold text-sm shadow-[0_0_28px_rgba(59,130,246,0.65)] hover:shadow-[0_0_40px_rgba(59,130,246,0.85)] hover:scale-105 active:scale-95 transition-all duration-300 border border-white/20"
        >
          <MessageCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
          Adquirir Ahora
          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
        <div className="flex gap-2.5 w-full sm:w-auto">
          <a
            href="#nosotros"
            className="pointer-events-auto flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-7 sm:py-3.5 rounded-full bg-white/10 hover:bg-white/18 text-white font-semibold text-xs sm:text-sm border border-white/20 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Quiénes Somos
          </a>
          <a
            href="#services"
            className="pointer-events-auto flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-4 py-3 sm:px-7 sm:py-3.5 rounded-full bg-slate-900/60 hover:bg-slate-900/80 text-cyan-300 font-semibold text-xs sm:text-sm border border-cyan-500/30 backdrop-blur-md hover:scale-105 transition-all duration-300 shadow-xl"
          >
            Ver Servicios
          </a>
        </div>
      </div>

      {/* Interaction hint — hidden on mobile to save space */}
      <div className={`hidden sm:flex absolute bottom-1 sm:bottom-2 inset-x-0 justify-center z-10 transition-opacity duration-500 pointer-events-none ${isInteracting ? "opacity-20" : "opacity-70"}`}>
        <p className="text-[10px] sm:text-[11px] text-slate-400 font-medium tracking-wide">
          ✦ Mueve el cursor o arrastra la canica 3D
        </p>
      </div>
    </section>
  );
}
