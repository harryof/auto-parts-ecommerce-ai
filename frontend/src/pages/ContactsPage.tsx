import React, { useState } from "react";

const MapPinIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
);

const PhoneIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const ClockIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ContactItem: React.FC<{ icon: React.ReactNode; label: string; value: string }> = ({ icon, label, value }) => (
  <div className="flex items-start gap-4">
    <div className="flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center text-[#F3C15F]"
      style={{ background: "rgba(243,193,95,0.12)" }}>
      {icon}
    </div>
    <div>
      <p className="text-xs font-semibold text-dark-300 uppercase tracking-wider mb-0.5">{label}</p>
      <p className="text-sm font-medium" style={{ color: "var(--color-text)" }}>{value}</p>
    </div>
  </div>
);

const ContactsPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSent(true);
    setFormData({ name: "", email: "", phone: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="section-title mb-4">
        <span>Контакты</span>
      </h1>
      <div className="accent-line mx-auto mb-12" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        
        <div className="flex flex-col gap-6">

          
          <div className="glass rounded-3xl p-7 flex flex-col gap-5">
            <h2 className="text-lg font-bold" style={{ color: "var(--color-text)" }}>
              Наши контакты
            </h2>
            <div className="flex flex-col gap-5">
              <ContactItem icon={<MapPinIcon />} label="Адрес" value="г. Москва, ул. Автозапчастей, д. 123" />
              <ContactItem icon={<PhoneIcon />} label="Телефон" value="+7 (495) 123-45-67" />
              <ContactItem icon={<MailIcon />} label="Email" value="info@autoparts.ru" />
            </div>
          </div>

          
          <div className="glass rounded-3xl p-7">
            <h2 className="text-lg font-bold mb-5" style={{ color: "var(--color-text)" }}>
              Режим работы
            </h2>
            <div className="flex flex-col gap-3">
              {[
                { day: "Понедельник — Пятница", time: "9:00 — 20:00", active: true },
                { day: "Суббота", time: "10:00 — 18:00", active: false },
                { day: "Воскресенье", time: "Выходной", active: false },
              ].map(({ day, time, active }) => (
                <div key={day} className="flex items-center justify-between py-2.5 border-b last:border-b-0"
                  style={{ borderColor: "var(--color-border)" }}>
                  <div className="flex items-center gap-3">
                    <ClockIcon />
                    <span className="text-sm font-medium text-dark-300">{day}</span>
                  </div>
                  <span className={`text-sm font-semibold ${active ? "text-[#F3C15F]" : "text-dark-300"}`}>
                    {time}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        
        <div className="glass rounded-3xl p-7">
          <h2 className="text-lg font-bold mb-6" style={{ color: "var(--color-text)" }}>
            Напишите нам
          </h2>

          {sent && (
            <div className="mb-5 px-4 py-3 rounded-xl text-sm font-semibold text-emerald-300 border border-emerald-500/30"
              style={{ background: "rgba(16,185,129,0.1)" }}>
              ✓ Сообщение отправлено! Мы свяжемся с вами в ближайшее время.
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">
                  Ваше имя *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Иван Иванов"
                  required
                  className="input-dark w-full"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">
                  Телефон
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+7 (___) ___-__-__"
                  className="input-dark w-full"
                />
              </div>
            </div>

            
            <div>
              <label className="block text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@mail.ru"
                required
                className="input-dark w-full"
              />
            </div>

            
            <div>
              <label className="block text-xs font-semibold text-dark-300 uppercase tracking-wider mb-1.5">
                Сообщение *
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={5}
                placeholder="Опишите ваш вопрос..."
                required
                className="input-dark w-full resize-none"
              />
            </div>

            <button type="submit" className="btn-primary w-full mt-1">
              Отправить сообщение
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
