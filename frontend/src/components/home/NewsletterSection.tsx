import React, { useEffect, useRef, useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

const NewsletterSection: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);

  return (
    <section ref={ref} className="max-w-[1600px] mx-auto px-4 py-16 mb-8">
      <div 
        className={`relative w-full rounded-[2.5rem] overflow-hidden bg-dark-800 border border-white/5 p-8 md:p-16 transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary-500/10 blur-[100px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 blur-[80px] rounded-full -translate-x-1/2 translate-y-1/2 pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-20">
          
          {/* Text Content */}
          <div className="flex-1 text-center lg:text-left max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-primary-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Mail size={14} /> Подписка на новости
            </div>
            <h2
              className="text-3xl md:text-5xl font-black mb-4 leading-tight"
              style={{ color: 'var(--color-text)' }}
            >
              Секретные акции и <br className="hidden md:block"/>
              <span className="text-primary-400">промокоды</span> только для своих
            </h2>
            <p className="text-dark-300 text-lg md:text-xl">
              Оставьте свой email, чтобы первыми узнавать о масштабных распродажах, новинках и получать персональные скидки. Никакого спама, обещаем!
            </p>
          </div>

          {/* Form */}
          <div className="w-full lg:w-auto flex-shrink-0">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 w-full max-w-md mx-auto lg:mx-0 p-2 rounded-full"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--color-border2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
              }}
            >
              <input
                type="email"
                placeholder="Ваш Email адрес"
                required
                className="flex-1 bg-transparent border-none outline-none px-6 py-4 min-w-[250px]"
                style={{
                  color: 'var(--input-color)',
                }}
                onFocus={e => (e.currentTarget.style.outline = 'none')}
              />
              <button
                type="submit"
                className="btn-primary rounded-full px-8 py-4 w-full sm:w-auto uppercase tracking-wide text-sm"
              >
                Подписаться <ArrowRight size={18} />
              </button>
            </form>
            <p className="text-xs text-dark-500 text-center lg:text-left mt-4 px-4">
              Нажимая кнопку, вы соглашаетесь с <a href="#" className="underline hover:text-white transition-colors">политикой конфиденциальности</a>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
