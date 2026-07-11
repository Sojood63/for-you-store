'use client';
import { useEffect, useState, useRef } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [welcomeText, setWelcomeText] = useState('');
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1. اختفاء اللودر بعد ثانيتين ونصف
   const timer = setTimeout(() => {
    setLoading(false);
    console.log("loading = false");
  }, 4000);

 // 2. نص الترحيب الذكي حسب الوقت باللغة العربية 🌸
const hours = new Date().getHours();
if (hours < 12) setWelcomeText('صباح الخير، أهلاً بكِ في For You');
else if (hours < 18) setWelcomeText('مساء الخير، أهلاً بكِ في For You');
else setWelcomeText('أهلاً بكِ في ليلتكِ المنتظرة، For You');

    // 3. تأثير البتلات المتساقطة (Canvas)
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth; 
    canvas.height = window.innerHeight;

    let petals: { x: number; y: number; r: number; speed: number; drift: number }[] = [];
    for (let i = 0; i < 50; i++) {
      petals.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 6 + 3,
        speed: Math.random() * 1 + 0.5,
        drift: Math.random() - 0.5,
      });
    }

    let animationFrameId = 0;
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      petals.forEach((p) => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(Math.PI / 4);
        ctx.fillStyle = 'rgba(232, 160, 180, 0.4)';
        ctx.beginPath();
        ctx.ellipse(0, 0, p.r, p.r / 2, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.y += p.speed;
        p.x += p.drift;

        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
      });
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  
  return (
    
    <main className="relative min-h-screen bg-[#fdf8f4] flex items-center justify-center overflow-hidden font-sans select-none">
      {/* الـ Header الفخم لأعلى الصفحة - متناسق تماماً مع الجوال */}
<div className="w-full
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
absolute top-[100px] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center justify-center text-center px-4 select-none animate-fade-in">
  {/* اسم المتجر */}
 <h1   className="animate-shimmer
text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
font-serif
font-bold
tracking-[8px]
text-[#c0365a]
drop-shadow-lg
">
For You
</h1>
  <div className="
w-full
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8
h-[2px]
bg-[#d98aa4]
rounded-full
opacity-70
"/>
<p className="
text-sm
md:text-base
text-[#6d5b52]
tracking-wide
flex
items-center
gap-2
">
Every flower tells a story

<span className="text-xl">🌸</span>

</p>
</div>

      {/* ستايل مخصص للأنيميشن لتأثير الاختفاء التلقائي */}
      <style jsx global>{`
        @keyframes hideWelcome {
          0% { opacity: 0; transform: translateY(-20px); }
          15% { opacity: 1; transform: translateY(0); }
          75% { opacity: 1; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-20px); visibility: hidden; }
        }
        .animate-welcome {
          animation: hideWelcome 6s forwards;
        }
      `}</style>

      {/* 1. شاشة اللودر الترحيبية من مكتبة Font Awesome مباشرة */}
      {loading && (
        <div className=" w-full
max-w-7xl
mx-auto
px-4
sm:px-6
lg:px-8fixed inset-0 bg-[#fdf8f4] z-[9999] flex flex-col items-center justify-center transition-opacity duration-1000">
          <div className="w-20 h-20 text-[#c0365a] flex items-center justify-center mb-4">
            {/* الأيقونة التي قمتِ بتعديلها لتوليب مخصصة */}
                   <i
                  className="fas fa-spa text-6xl animate-spin text-[#c0365a]"
               style={{ animationDuration: "3s" }}
              ></i>
          </div>
          <h1 className="text-3xl
sm:text-4xl
md:text-5xl
lg:text-6xl
 font-serif text-[#c0365a] tracking-widest hover:scale-105
transition
duration-500">
            For You
          </h1>
        </div>
      )}

      {/* 2. صندوق الترحيب المنبثق على جهة اليسار (يظهر بعد انتهاء اللودر) */}
{!loading && welcomeText && (
  <div 
    className="fixed top-[40px] right-[20px] bg-white/70
backdrop-blur-md
border
border-white/30  text-[#5a4a42] px-4 py-2.5 rounded-lg shadow-lg z-[1000] text-xs font-medium animate-welcome max-w-[220px]"
    style={{ borderRight: '4px solid #c0365a' }}
    dir="rtl"
  >
     
    <strong className="text-[#c0365a] block mt-0.5 font-semibold whitespace-normal">
      {welcomeText} 🌸
    </strong>
  </div>
)}

      {/* 3. الدوائر الملونة في الخلفية */}
      <div className="
absolute
top-1/2
left-1/2
-translate-x-1/2
-translate-y-1/2
w-[250px]
h-[250px]
bg-pink-100
rounded-full
blur-[90px]
opacity-40
"/>
<div className="absolute bottom-[-50px] right-[-50px] w-[250px] h-[250px] bg-[#fce4ec] rounded-full blur-[60px] opacity-60 animate-bounce" style={{ animationDuration: '8s' }}></div>

      {/* 4. لوحة البتلات المتساقطة */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-10" />

    </main>
  );
}
    