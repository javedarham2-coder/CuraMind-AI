import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Brain, Sparkles, ShieldCheck } from "lucide-react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { cn } from "@/lib/utils";

const analysisSteps = [
  "Reading patient history",
  "Analyzing symptoms and signals",
  "Evaluating lifestyle factors",
  "Comparing medical patterns",
  "Estimating personalized risk profile",
  "Generating clinician-ready report",
];

// Analysis page: manages progress steps and renders the CuraCore™ 3D brain
export function AnalysisPage() {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const total = analysisSteps.length;
    const stepDur = 1400;
    const tick = 40;
    const totalTicks = (stepDur * total) / tick;

    let i = 0;
    let completionTimer: ReturnType<typeof setTimeout> | undefined;
    const interval = setInterval(() => {
      i += 1;
      const newProgress = Math.min(100, (i / totalTicks) * 100);
      setProgress(newProgress);

      const stepIndex = Math.min(total - 1, Math.floor((i / totalTicks) * total));
      setStep(stepIndex);

      if (newProgress >= 100) {
        clearInterval(interval);
        setStep(total);
        setIsComplete(true);
        completionTimer = setTimeout(() => navigate("/dashboard"), 1000);
      }
    }, tick);

    return () => {
      clearInterval(interval);
      if (completionTimer) clearTimeout(completionTimer);
    };
  }, [navigate]);

  return (
    <div className="relative min-h-screen overflow-hidden bg-navy-500 text-white">
      {/* Background */}
      <div className="absolute inset-0 bg-mesh-hero opacity-60" />
      <div className="absolute inset-0 grid-pattern opacity-[0.05]" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[600px] w-[600px] rounded-full bg-medical-500/20 blur-[120px] pointer-events-none" />

      <div className="relative mx-auto max-w-5xl px-5 sm:px-8 py-12 sm:py-16">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Brain size={20} className="text-cyan-400" />
            <span className="text-sm font-semibold">CuraCore™ Engine</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-success-500 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-success-500" />
            </span>
            Secure analysis · End-to-end encrypted
          </div>
        </div>

        <div className="mt-12 sm:mt-20 grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: AI brain */}
          <div className="flex flex-col items-center">
            <AIBrain progress={progress} />
            <div className="mt-10 w-full max-w-md">
              <div className="flex items-center justify-between text-sm">
                <span className="text-white/70 font-medium">Overall progress</span>
                <span className="font-semibold tabular-nums">{Math.round(progress)}%</span>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-cyan-400 via-medical-400 to-cyan-400 bg-[length:200%_100%] animate-gradient-shift"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                />
              </div>
            </div>
          </div>

          {/* Right: status steps */}
          <div>
            <AnimatePresence mode="wait">
              {isComplete ? (
                <motion.div
                  key="complete"
                  initial={{ opacity: 0, y: 6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 rounded-full border border-success-400/35 bg-success-500/10 px-3 py-1.5 text-xs font-semibold text-success-300"
                >
                  <Check size={13} strokeWidth={3} />
                  Clinician-Ready Report Generated
                </motion.div>
              ) : (
                <motion.p
                  key="analyzing"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium"
                >
                  <Sparkles size={12} className="text-cyan-400" />
                  <span>Multi-modal CuraCore™ analysis in progress</span>
                </motion.p>
              )}
            </AnimatePresence>
            <h1 className="mt-5 text-display-md text-balance">
              CuraCore™ is carefully{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-medical-300 bg-clip-text text-transparent">
                analyzing your profile
              </span>
              .
            </h1>
            <p className="mt-3 text-white/70 leading-relaxed">
              This usually takes under a minute. Your data is being processed in a secure,
              isolated environment.
            </p>

            <ol className="mt-8 space-y-2.5">
              {analysisSteps.map((s, i) => {
                const complete = i < step;
                const active = i === step;
                return (
                  <motion.li
                    key={s}
                    animate={{ opacity: complete || active ? 1 : 0.48 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-3.5 py-3 transition-all",
                      complete
                        ? "border-success-500/30 bg-success-500/5"
                        : active
                        ? "border-cyan-400/30 bg-cyan-400/5"
                        : "border-white/10 bg-white/5"
                    )}
                  >
                    <div
                      className={cn(
                        "h-7 w-7 rounded-full flex items-center justify-center shrink-0 transition-colors",
                        complete
                          ? "bg-success-500 text-white"
                          : active
                          ? "bg-cyan-400 text-navy-500"
                          : "bg-white/10 text-white/40"
                      )}
                    >
                      {complete ? (
                        <Check size={14} strokeWidth={3} />
                      ) : active ? (
                        <span className="h-2 w-2 rounded-full bg-navy-500 animate-pulse" />
                      ) : (
                        <span className="text-xs font-semibold">{i + 1}</span>
                      )}
                    </div>
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={s}
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -4 }}
                        className={cn(
                          "text-sm",
                          complete || active ? "text-white" : "text-white/50"
                        )}
                      >
                        {s}
                        {active && (
                          <span className="ml-1 inline-flex gap-0.5">
                            <Dot delay={0} />
                            <Dot delay={0.15} />
                            <Dot delay={0.3} />
                          </span>
                        )}
                      </motion.span>
                    </AnimatePresence>
                  </motion.li>
                );
              })}
            </ol>

            <div className="mt-8 flex items-center gap-2 text-xs text-white/50">
              <ShieldCheck size={14} className="text-success-400" />
              <span>
                No personally identifiable data is stored on CuraCore™ infrastructure. Report is generated
                in real-time.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <motion.span
      className="h-1 w-1 rounded-full bg-cyan-400"
      animate={{ opacity: [0.3, 1, 0.3] }}
      transition={{ duration: 1.2, repeat: Infinity, delay }}
    />
  );
}

function AIBrain({ progress }: { progress: number }) {
  // Three.js container reference
  const containerRef = useRef<HTMLDivElement | null>(null);
  const frameIdRef = useRef<number | null>(null);

  // Initialize Three.js scene, camera, renderer and controls
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#07101f");

    const camera = new THREE.OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      -1000,
      1000
    );
    camera.position.set(0, 0, 400);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    renderer.setClearColor(0x07101f, 0);

    container.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.125;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.8;

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.2);
    directionalLight.position.set(5, 10, 10);
    scene.add(directionalLight);

    const brainGeometry = new THREE.IcosahedronGeometry(90, 4);
    const brainMaterial = new THREE.MeshStandardMaterial({
      color: 0x27c1ff,
      metalness: 0.15,
      roughness: 0.35,
      emissive: 0x0d5e88,
      emissiveIntensity: 0.7,
      flatShading: false,
      transparent: true,
      opacity: 0.96,
      envMapIntensity: 0.7,
    });

    const brainMesh = new THREE.Mesh(brainGeometry, brainMaterial);
    brainMesh.castShadow = true;
    brainMesh.receiveShadow = true;
    scene.add(brainMesh);

    const wireframe = new THREE.LineSegments(
      new THREE.WireframeGeometry(brainGeometry),
      new THREE.LineBasicMaterial({ color: 0x6ee7b7, transparent: true, opacity: 0.33 })
    );
    scene.add(wireframe);

    const pulseLight = new THREE.PointLight(0x22d3ee, 1.3, 400, 2);
    pulseLight.position.set(0, 0, 120);
    scene.add(pulseLight);

    const animate = () => {
      const elapsed = performance.now() * 0.001;
      brainMesh.rotation.y = elapsed * 0.35;
      brainMesh.rotation.x = Math.sin(elapsed * 0.5) * 0.15;
      wireframe.rotation.y = elapsed * 0.48;
      pulseLight.intensity = 1.1 + Math.sin(elapsed * 2.3) * 0.15;
      controls.update();
      renderer.render(scene, camera);
      frameIdRef.current = window.requestAnimationFrame(animate);
    };

    frameIdRef.current = window.requestAnimationFrame(animate);

    const handleResize = () => {
      if (!containerRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight;
      camera.left = -w / 2;
      camera.right = w / 2;
      camera.top = h / 2;
      camera.bottom = -h / 2;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (frameIdRef.current !== null) {
        window.cancelAnimationFrame(frameIdRef.current);
      }
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative h-[300px] w-[300px] sm:h-[360px] sm:w-[360px]">
      <div
        ref={containerRef}
        className="relative h-full w-full overflow-hidden rounded-full border border-white/10 bg-navy-950"
      />

      <div className="absolute inset-0 rounded-full border border-white/10" />
      <div className="absolute inset-4 rounded-full border border-white/10" />
      <div className="absolute inset-10 rounded-full border border-cyan-400/20" />

      <motion.div
        className="absolute inset-16 rounded-full border-2 border-cyan-400/40"
        animate={{ rotate: 360 }}
        transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
        style={{ borderTopColor: "rgba(34,211,238,0.9)", borderRightColor: "transparent" }}
      />
      <motion.div
        className="absolute inset-24 rounded-full border-2 border-medical-400/40"
        animate={{ rotate: -360 }}
        transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
        style={{ borderBottomColor: "rgba(96,165,250,0.9)", borderLeftColor: "transparent" }}
      />

      <motion.div
        className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-medical-500/20 blur-2xl"
        animate={{ opacity: [0.35, 0.9, 0.35], scale: [0.94, 1.06, 0.94] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
      />

      <svg className="absolute inset-0 -rotate-90" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="49" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        <motion.circle
          cx="50"
          cy="50"
          r="49"
          stroke="url(#progressGrad)"
          strokeWidth="2"
          strokeLinecap="round"
          strokeDasharray="308"
          animate={{ strokeDashoffset: 308 - (308 * progress) / 100 }}
          transition={{ duration: 0.3 }}
        />
        <defs>
          <linearGradient id="progressGrad" x1="0" y1="0" x2="100" y2="100">
            <stop offset="0%" stopColor="#22D3EE" />
            <stop offset="100%" stopColor="#60A5FA" />
          </linearGradient>
        </defs>
      </svg>

      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="w-1 rounded-full bg-cyan-400"
            animate={{ height: ["6px", "20px", "6px"] }}
            transition={{ duration: 1.1, repeat: Infinity, delay: i * 0.12, ease: "easeInOut" }}
          />
        ))}
      </div>
    </div>
  );
}
