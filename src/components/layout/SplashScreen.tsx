'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';

export function SplashScreen() {
    const [showSplash, setShowSplash] = useState(false);
    const [phase, setPhase] = useState<'init' | 'active' | 'finished'>('init');
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Detect mobile/tablet for performance optimization
        const checkMobile = () => window.innerWidth < 1024;
        setIsMobile(checkMobile());

        const hasSeenSplash = sessionStorage.getItem('schaltkraft_splash_seen');
        if (!hasSeenSplash) {
            setShowSplash(true);
            setTimeout(() => setPhase('active'), 50); // Faster start
            sessionStorage.setItem('schaltkraft_splash_seen', 'true');
            // Total: 2.5s animations + 0.5s pause + fade
            setTimeout(() => {
                setPhase('finished');
                // Pause 0.5s after animations, then fade out over 0.8s
                setTimeout(() => setShowSplash(false), 1300);
            }, 3000);
        }
    }, []);

    // Canvas Circuit Animation Effect
    useEffect(() => {
        if (!showSplash || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationFrameId: number;
        const startTime = performance.now();
        const PULSE_DURATION = 2500; // 2.5 seconds, matching orange line animation

        const DPR = Math.max(1, Math.min(2, window.devicePixelRatio || 1));
        const COLORS = {
            bg: "#000000",
            line: "rgba(255,255,255,0.65)",
            lineSoft: "rgba(255,255,255,0.28)",
            energy: "rgba(255,140,0,0.95)",
            energySoft: "rgba(255,140,0,0.35)"
        };

        function rand(min: number, max: number) { return Math.random() * (max - min) + min; }
        function randi(min: number, max: number) { return Math.floor(rand(min, max + 1)); }

        // Circuit graph
        const routes: any[] = [];
        const pulses: any[] = [];

        function chipRect() {
            const w = Math.min(window.innerWidth * 0.62, 780);
            const h = Math.min(window.innerHeight * 0.42, 460);
            return { x: (window.innerWidth - w) / 2, y: (window.innerHeight - h) / 2, w, h };
        }

        function orthRoute(ax: number, ay: number, bx: number, by: number, bends = 1) {
            const pts = [{ x: ax, y: ay }];
            if (bends === 1) {
                if (Math.random() < 0.5) pts.push({ x: bx, y: ay });
                else pts.push({ x: ax, y: by });
            } else {
                const mx = rand(Math.min(ax, bx) + 40, Math.max(ax, bx) - 40);
                const my = rand(Math.min(ay, by) + 40, Math.max(ay, by) - 40);
                pts.push({ x: mx, y: ay });
                pts.push({ x: mx, y: my });
                pts.push({ x: bx, y: my });
            }
            pts.push({ x: bx, y: by });
            return pts;
        }

        function shuffle(a: any[]) {
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        function buildCircuits() {
            routes.length = 0;
            pulses.length = 0;

            const W = window.innerWidth;
            const H = window.innerHeight;
            const cr = chipRect();
            const pad = 22;

            const chip = {
                left: cr.x + pad,
                right: cr.x + cr.w - pad,
                top: cr.y + pad,
                bottom: cr.y + cr.h - pad
            };

            // Ports around chip - reduced count on mobile
            const ports = [];
            const perSide = isMobile ? randi(6, 10) : randi(14, 18);
            for (let i = 0; i < perSide; i++) {
                ports.push({ x: rand(chip.left, chip.right), y: chip.top, dir: "up" });
                ports.push({ x: rand(chip.left, chip.right), y: chip.bottom, dir: "down" });
                ports.push({ x: chip.left, y: rand(chip.top, chip.bottom), dir: "left" });
                ports.push({ x: chip.right, y: rand(chip.top, chip.bottom), dir: "right" });
            }

            // Targets evenly distributed on ALL edges - reduced on mobile
            const edgeTargets = [];
            const perEdge = isMobile ? randi(8, 12) : randi(18, 24);
            for (let i = 0; i < perEdge; i++) {
                edgeTargets.push({ x: (i + 0.5) * W / perEdge, y: 18 });
                edgeTargets.push({ x: W - 18, y: (i + 0.5) * H / perEdge });
                edgeTargets.push({ x: (i + 0.5) * W / perEdge, y: H - 18 });
                edgeTargets.push({ x: 18, y: (i + 0.5) * H / perEdge });
            }

            shuffle(ports);
            shuffle(edgeTargets);

            const routeCount = Math.min(ports.length, edgeTargets.length);

            for (let i = 0; i < routeCount; i++) {
                const p = ports[i];
                const t = edgeTargets[i];

                const step = 18;
                let ax = p.x, ay = p.y;
                if (p.dir === "up") ay -= step;
                if (p.dir === "down") ay += step;
                if (p.dir === "left") ax -= step;
                if (p.dir === "right") ax += step;

                const jx = ax + rand(-120, 120);
                const jy = ay + rand(-90, 90);

                const bends = Math.random() < 0.6 ? 1 : 2;

                const pts1 = orthRoute(p.x, p.y, jx, jy, bends);
                const pts2 = orthRoute(jx, jy, t.x, t.y, bends);
                const pts = pts1.concat(pts2.slice(1));

                const width = Math.random() < 0.7 ? 1 : 1.6;
                routes.push({ pts, width, length: polyLen(pts) }); // Cache length for performance

                // many pulses => energy everywhere - fewer on mobile
                if (Math.random() < (isMobile ? 0.4 : 0.65)) {
                    pulses.push({
                        routeIndex: routes.length - 1,
                        t: Math.random(),
                        speed: rand(0.08, 0.18),
                        size: rand(2.5, 5.2)
                    });
                }
            }

            // Subtle inner rings around center area - fewer on mobile
            const ringCount = isMobile ? 5 : 10;
            for (let k = 0; k < ringCount; k++) {
                const inset = 16 + k * 6.0;
                const x1 = cr.x + inset;
                const y1 = cr.y + inset;
                const x2 = cr.x + cr.w - inset;
                const y2 = cr.y + cr.h - inset;
                const pts = [
                    { x: x1, y: y1 },
                    { x: x2, y: y1 },
                    { x: x2, y: y2 },
                    { x: x1, y: y2 },
                    { x: x1, y: y1 }
                ];
                routes.push({ pts, width: (k % 3 === 0 ? 1.4 : 1), ring: true, alpha: 0.10, length: polyLen(pts) });
            }
        }

        function polyLen(pts: any[]) {
            let L = 0;
            for (let i = 1; i < pts.length; i++) {
                const dx = pts[i].x - pts[i - 1].x, dy = pts[i].y - pts[i - 1].y;
                L += Math.hypot(dx, dy);
            }
            return L;
        }

        // Use cached length for better performance
        function pointAtCached(pts: any[], cachedLen: number, t: number) {
            let dist = t * cachedLen;
            for (let i = 1; i < pts.length; i++) {
                const a = pts[i - 1], b = pts[i];
                const seg = Math.hypot(b.x - a.x, b.y - a.y);
                if (dist <= seg) {
                    const u = seg === 0 ? 0 : dist / seg;
                    return { x: a.x + (b.x - a.x) * u, y: a.y + (b.y - a.y) * u };
                }
                dist -= seg;
            }
            const last = pts[pts.length - 1];
            return { x: last.x, y: last.y };
        }

        function drawBackground() {
            if (!ctx) return;
            ctx.fillStyle = COLORS.bg;
            ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

            // tiny static noise - reduced on mobile for performance
            const noiseCount = isMobile ? 40 : 120;
            ctx.globalAlpha = 0.05;
            for (let i = 0; i < noiseCount; i++) {
                ctx.fillStyle = "rgba(255,255,255,1)";
                ctx.fillRect(rand(0, window.innerWidth), rand(0, window.innerHeight), 1, 1);
            }
            ctx.globalAlpha = 1;
        }

        function drawRoutes() {
            if (!ctx) return;
            ctx.save();
            ctx.lineCap = "round";
            ctx.lineJoin = "round";

            // base lines
            for (const rt of routes) {
                ctx.strokeStyle = COLORS.lineSoft;
                ctx.lineWidth = rt.width || 1;
                ctx.globalAlpha = rt.ring ? (rt.alpha || 0.10) : 0.35;
                ctx.shadowBlur = 0;

                const pts = rt.pts;
                ctx.beginPath();
                ctx.moveTo(pts[0].x, pts[0].y);
                for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
                ctx.stroke();
            }

            // highlight pass (white) - skip on mobile for performance
            if (!isMobile) {
                ctx.globalAlpha = 0.22;
                ctx.strokeStyle = COLORS.line;
                ctx.shadowBlur = 10;
                ctx.shadowColor = "rgba(255,255,255,0.18)";
                for (const rt of routes) {
                    ctx.lineWidth = (rt.width || 1) + 0.3;
                    const pts = rt.pts;
                    ctx.beginPath();
                    ctx.moveTo(pts[0].x, pts[0].y);
                    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i].x, pts[i].y);
                    ctx.stroke();
                }
            }

            // energy pulses (orange) - synchronized with 2.5s line animation
            const elapsed = performance.now() - startTime;
            const pulseProgress = Math.min(1, elapsed / PULSE_DURATION);
            // Fade in during first 0.3s, fade out during last 0.3s
            let pulseOpacity = 1;
            if (pulseProgress < 0.12) {
                pulseOpacity = pulseProgress / 0.12; // fade in
            } else if (pulseProgress > 0.88) {
                pulseOpacity = (1 - pulseProgress) / 0.12; // fade out
            }
            if (pulseProgress >= 1) pulseOpacity = 0; // fully hidden after animation

            ctx.globalAlpha = pulseOpacity;
            for (const p of pulses) {
                const rt = routes[p.routeIndex];
                if (!rt) continue;
                const pt = pointAtCached(rt.pts, rt.length, p.t);

                ctx.fillStyle = COLORS.energy;
                ctx.shadowBlur = isMobile ? 12 : 22; // Reduced on mobile
                ctx.shadowColor = COLORS.energy;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, p.size, 0, Math.PI * 2);
                ctx.fill();

                ctx.fillStyle = COLORS.energySoft;
                ctx.shadowBlur = isMobile ? 15 : 30; // Reduced on mobile
                ctx.shadowColor = COLORS.energySoft;
                ctx.beginPath();
                ctx.arc(pt.x, pt.y, p.size + 4, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        }

        let last = performance.now();
        function render(now: number) {
            const dt = Math.min(0.05, (now - last) / 1000);
            last = now;

            for (const p of pulses) {
                p.t += p.speed * dt;
                if (p.t > 1) p.t -= 1;
            }

            drawBackground();
            drawRoutes();

            animationFrameId = requestAnimationFrame(render);
        }

        function resize() {
            if (!canvas || !ctx) return;
            canvas.width = Math.floor(window.innerWidth * DPR);
            canvas.height = Math.floor(window.innerHeight * DPR);
            ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
            buildCircuits();
        }

        window.addEventListener("resize", resize);
        resize();
        animationFrameId = requestAnimationFrame(render);

        return () => {
            window.removeEventListener("resize", resize);
            cancelAnimationFrame(animationFrameId);
        };
    }, [showSplash]);

    const sloganText = "Qualität in jedem Schaltmoment";

    return (
        <AnimatePresence>
            {showSplash && (
                <motion.div
                    key="splash-overlay"
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                    initial={{ opacity: 1 }}
                    animate={phase === 'finished' ? { opacity: 0 } : { opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                >
                    {/* LAYER 0: Canvas Background (Circuit Animation) */}
                    <div className="absolute inset-0 z-0 pointer-events-none">
                        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full block" />
                        {/* Soft Vignette Overlay */}
                        <div className="absolute inset-0 pointer-events-none" style={{
                            background: `
                                radial-gradient(900px 600px at 50% 50%, rgba(255,140,0,0.05), transparent 60%),
                                radial-gradient(1200px 900px at 50% 55%, rgba(255,255,255,0.03), transparent 70%),
                                linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.60))
                            `
                        }}></div>
                    </div>

                    {/* LAYER 1: Central Hub (Brand) - UNTOUCHED content & Orange Frame */}
                    <motion.div
                        className="relative z-10 p-6 sm:p-12 md:p-16 flex flex-col items-center bg-black rounded-[24px] shadow-2xl w-[90%] max-w-[900px] mx-auto"
                        initial={{ opacity: 0 }}
                        animate={phase === 'active' ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.8 }}
                    >

                        {/* 1.1 The Logo & Title */}
                        <motion.div
                            className="flex flex-col items-center z-20"
                            initial={{ scale: 0.95 }}
                            animate={phase === 'active' ? { scale: 1 } : {}}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                        >
                            <div className="w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mb-4 sm:mb-8 relative">
                                <img
                                    src="/images/splashscreen/schaltkraft_icon_transparent.svg"
                                    alt="Schaltkraft Icon"
                                    className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(255,255,255,0.2)]"
                                />
                            </div>
                            <h1 className="text-3xl sm:text-5xl md:text-8xl font-black font-heading tracking-widest text-white uppercase mb-4 sm:mb-6 text-center">
                                Schaltkraft
                            </h1>
                        </motion.div>

                        {/* 1.2 The Orange Border (Self-Drawing during Brand Reveal) */}
                        <div className="absolute inset-0 z-10 pointer-events-none">
                            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                <motion.rect
                                    x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                                    rx="24" ry="24"
                                    fill="none"
                                    stroke="#FF6B00"
                                    strokeWidth="2"
                                    strokeOpacity={0.8}
                                    initial={{ pathLength: 0 }}
                                    animate={phase === 'active' ? { pathLength: 1 } : { pathLength: 0 }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                />
                            </svg>
                            {/* Glow */}
                            {phase === 'active' && (
                                <svg className="w-full h-full absolute inset-0 blur-sm" xmlns="http://www.w3.org/2000/svg">
                                    <motion.rect
                                        x="2" y="2" width="calc(100% - 4px)" height="calc(100% - 4px)"
                                        rx="24" ry="24"
                                        fill="none"
                                        stroke="#FF6B00"
                                        strokeWidth="4"
                                        strokeOpacity={0.4}
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ duration: 2.5, ease: "easeInOut" }}
                                    />
                                </svg>
                            )}
                        </div>

                        {/* 1.3 The Slogan (Types during Brand Reveal) */}
                        <div className="h-6 sm:h-8 md:h-10 flex items-center z-20 relative">
                            {(phase === 'active' || phase === 'finished') && (
                                <motion.div
                                    className="text-xs sm:text-lg md:text-2xl text-white font-medium tracking-[0.2em] uppercase text-center"
                                    initial="hidden"
                                    animate="visible"
                                    variants={{
                                        visible: { transition: { staggerChildren: 0.08, delayChildren: 0 } }
                                    }}
                                >
                                    {sloganText.split("").map((char, index) => (
                                        <motion.span
                                            key={index}
                                            variants={{
                                                hidden: { opacity: 0 },
                                                visible: { opacity: 1 }
                                            }}
                                        >
                                            {char}
                                        </motion.span>
                                    ))}
                                </motion.div>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
