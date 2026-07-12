'use client';
import { useEffect, useState, useRef } from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Playfair_Display } from 'next/font/google';
const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '700'] });

type Petal = {
  x: number;
  y: number;
  r: number;
  speed: number;
  drift: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  opacity: number;
};

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [welcomeText, setWelcomeText] = useState('');
  const [showHint, setShowHint] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Loader timer
    const loaderTimer = setTimeout(() => {
      setLoading(false);
      setShowHint(true);
      console.log('loading = false');
    }, 3500);

    // 2. Greeting مع اسم اليوم
    const hours = new Date().getHours();
    const dayName = new Date().toLocaleDateString('ar', { weekday: 'long' });
    let greeting = '';
    if (hours < 12)       greeting = `صباح ${dayName} المشرق، أهلاً بكِ في For You`;
    else if (hours < 18)  greeting = `مساء ${dayName} الجميل، أهلاً بكِ في For You`;
    else                  greeting = `أهلاً بكِ في ليلتكِ الساحرة، For You`;
    setWelcomeText(greeting);

    // 3. Canvas setup
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();

    const handleResize = () => setCanvasSize();
    const handleMouse = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      if (parallaxRef.current) {
        parallaxRef.current.style.transform = `translate(${x}px, ${y}px)`;
      }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouse);

    // 4. Petals with variety
    const isMobile = window.innerWidth < 640;
    const petalCount = isMobile ? 25 : 55;

    const petalColors = [
      'rgba(232, 160, 180, 0.5)',
      'rgba(245, 200, 220, 0.5)',
      'rgba(192, 54, 90, 0.35)',
      'rgba(255, 220, 230, 0.55)',
      'rgba(217, 138, 164, 0.45)',
    ];

    const petals: Petal[] = [];
    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 7 + 3,
        speed: Math.random() * 0.9 + 0.3,
        drift: Math.random() - 0.5,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: (Math.random() - 0.5) * 0.04,
        color: petalColors[Math.floor(Math.random() * petalColors.length)],
        opacity: Math.random() * 0.5 + 0.3,
      });
    }

    let animationFrameId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;
        p.rotation += p.rotationSpeed;

        if (p.y > canvas.height + 20) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.x < -20) p.x = canvas.width + 20;
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouse);
      clearTimeout(loaderTimer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <main className="relative min-h-screen bg-[#fdf8f4] flex items-center justify-center overflow-hidden font-sans select-none">
      {/* ===== Header ===== */}
      <div className="absolute top-14 sm:top-20 md:top-24 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center text-center w-full px-6 animate-fade-in">

        {/* New Collection Badge */}
        <div className="mb-5 inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-white/50 rounded-full px-4 py-1.5 shadow-sm">
          <span className="w-1.5 h-1.5 bg-[#c0365a] rounded-full animate-pulse"></span>
          <span className="text-[11px] sm:text-xs tracking-[2px] text-[#6d5b52] uppercase">
            مجموعة ربيع 2025 · جديدة
          </span>
        </div>

        <h1 className="animate-shimmer text-4xl sm:text-5xl md:text-7xl font-serif font-bold tracking-[10px] md:tracking-[14px] drop-shadow-[0_5px_25px_rgba(192,54,90,.25)]">
          For You
        </h1>

        <div className="w-24 h-[2px] bg-gradient-to-r from-transparent via-[#d98aa4] to-transparent rounded-full opacity-70 my-4"></div>

        <p className="text-sm sm:text-base text-[#6d5b52] tracking-wide flex items-center gap-2">
          Every flower tells a story
          <span className="text-xl animate-pulse">🌸</span>
        </p>

        {/* CTA Button */}
        <button
          className="group relative mt-8 px-9 py-3 bg-[#c0365a] text-white rounded-full shadow-lg shadow-[#c0365a]/30 hover:shadow-xl hover:shadow-[#c0365a]/40 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 overflow-hidden"
          aria-label="دخول المتجر"
        >
          <span className="relative z-10 text-sm sm:text-base tracking-wider">
            تسوّقي الآن ✦
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-[#c0365a] via-[#d04876] to-[#e89bb0] opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
        </button>
      </div>

      {/* ===== Loader ===== */}
      {loading && (
        <div className="fixed inset-0 bg-[#fdf8f4] z-[9999] flex flex-col items-center justify-center transition-opacity duration-1000">
          <div className="relative w-32 h-32 flex items-center justify-center">
            <i
              className="fas fa-spa text-6xl text-[#c0365a] animate-float"
              style={{ animationDelay: '0s' }}
            ></i>
            <i
              className="fas fa-leaf absolute top-2 right-2 text-2xl text-[#e89bb0] animate-float"
              style={{ animationDelay: '0.4s' }}
            ></i>
            <i
              className="fas fa-heart absolute bottom-3 left-2 text-xl text-[#c0365a] animate-float"
              style={{ animationDelay: '0.8s' }}
            ></i>
          </div>

          <h1 className="mt-8 animate-shimmer text-5xl font-serif font-bold tracking-[8px]">
            For You
          </h1>

          <div className="mt-7 flex gap-2">
            <span className="w-2 h-2 bg-[#c0365a] rounded-full animate-loader-dot"></span>
            <span className="w-2 h-2 bg-[#c0365a] rounded-full animate-loader-dot" style={{ animationDelay: '0.2s' }}></span>
            <span className="w-2 h-2 bg-[#c0365a] rounded-full animate-loader-dot" style={{ animationDelay: '0.4s' }}></span>
          </div>
        </div>
      )}

      {/* ===== Welcome popup ===== */}
      {!loading && welcomeText && (
        <div
          dir="rtl"
          className="fixed top-6 right-5 z-[1000] bg-white/70 backdrop-blur-md border border-white/40 shadow-2xl rounded-2xl px-5 py-3 animate-welcome max-w-[90vw]"
          style={{ borderRight: '4px solid #c0365a' }}
        >
          <strong className="text-[#c0365a] text-sm sm:text-base">
            {welcomeText} 🌸
          </strong>
        </div>
      )}

      {/* ===== Parallax decorative layer ===== */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 pointer-events-none transition-transform duration-200 ease-out"
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-pink-100 rounded-full blur-[100px] opacity-50"></div>
        <div className="absolute bottom-[-60px] right-[-60px] w-[260px] h-[260px] bg-[#fce4ec] rounded-full blur-[80px] opacity-70"></div>
        <div className="absolute top-[15%] left-[8%] w-[180px] h-[180px] bg-[#fce4ec] rounded-full blur-[90px] opacity-40"></div>
        <div className="absolute top-[60%] right-[12%] w-[140px] h-[140px] bg-pink-200 rounded-full blur-[70px] opacity-30"></div>
      </div>

      {/* ===== Petals canvas ===== */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-10"
        aria-hidden="true"
      />

      {/* ===== Scroll hint ===== */}
      {showHint && (
        <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2 animate-fade-in opacity-0" style={{ animationDelay: '1.8s', animationFillMode: 'forwards' }}>
          <span className="text-[11px] text-[#6d5b52] tracking-[3px] uppercase opacity-70">
            استمري بالاستكشاف
          </span>
          <div className="w-6 h-10 border-2 border-[#c0365a]/40 rounded-full flex items-start justify-center p-1.5">
            <span className="w-1 h-2 bg-[#c0365a] rounded-full animate-scroll-hint"></span>
          </div>
        </div>
      )}
    </main>
  );
}
