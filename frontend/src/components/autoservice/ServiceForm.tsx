import React, { useState } from "react";
import { Service } from "./ServiceList";

interface ServiceFormProps {
  services: Service[];
}

const FieldLabel: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <label className="block text-xs font-semibold uppercase tracking-wider mb-1.5 text-dark-300">
    {children}
  </label>
);

const ServiceForm: React.FC<ServiceFormProps> = ({ services }) => {
  const [formData, setFormData] = useState({
    name: "", phone: "", email: "", carModel: "",
    service: "", date: "", time: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const selectedDate = new Date(`${formData.date}T${formData.time}`);
    if (selectedDate < new Date()) {
      alert("Пожалуйста, выберите дату и время в будущем");
      return;
    }
    console.log("Form submitted:", formData);
    setSent(true);
    setFormData({ name: "", phone: "", email: "", carModel: "", service: "", date: "", time: "", message: "" });
    setTimeout(() => setSent(false), 4000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  /* Shared inline style for all native inputs/selects */
  const fieldStyle: React.CSSProperties = {
    background: "var(--input-bg)",
    color: "var(--input-color)",
    border: "1px solid var(--color-border2)",
    borderRadius: "0.75rem",
    padding: "0.65rem 1rem",
    fontSize: "0.9rem",
    outline: "none",
    width: "100%",
    transition: "border-color 0.2s, box-shadow 0.2s",
  };

  return (
    <div className="glass rounded-3xl p-7">
      <h2 className="text-xl font-bold mb-6" style={{ color: "var(--color-text)" }}>
        Записаться на сервис
      </h2>

      {sent && (
        <div
          className="mb-5 px-4 py-3 rounded-xl text-sm font-semibold text-emerald-300 border border-emerald-500/30"
          style={{ background: "rgba(16,185,129,0.1)" }}
        >
          ✓ Заявка отправлена! Мы свяжемся с вами для подтверждения.
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name + Phone */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Ваше имя *</FieldLabel>
            <input
              type="text" name="name" value={formData.name}
              onChange={handleChange} placeholder="Иван Иванов"
              required style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <FieldLabel>Телефон *</FieldLabel>
            <input
              type="tel" name="phone" value={formData.phone}
              onChange={handleChange} placeholder="+7 (___) ___-__-__"
              required style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Email + Car model */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <FieldLabel>Email</FieldLabel>
            <input
              type="email" name="email" value={formData.email}
              onChange={handleChange} placeholder="example@mail.ru"
              style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <FieldLabel>Модель автомобиля *</FieldLabel>
            <input
              type="text" name="carModel" value={formData.carModel}
              onChange={handleChange} placeholder="Toyota Camry 2020"
              required style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Service select */}
        <div>
          <FieldLabel>Услуга *</FieldLabel>
          <select
            name="service" value={formData.service}
            onChange={handleChange} required
            style={fieldStyle}
            onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
          >
            <option value="">Выберите услугу</option>
            {services.map((s) => (
              <option key={s.id} value={s.title}>{s.title}</option>
            ))}
          </select>
        </div>

        {/* Date + Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <FieldLabel>Дата *</FieldLabel>
            <input
              type="date" name="date" value={formData.date}
              onChange={handleChange} min={today} required
              style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
          <div>
            <FieldLabel>Время *</FieldLabel>
            <input
              type="time" name="time" value={formData.time}
              onChange={handleChange}
              min={formData.date === today ? new Date().toTimeString().slice(0, 5) : "00:00"}
              required style={fieldStyle}
              onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
              onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
            />
          </div>
        </div>

        {/* Message */}
        <div>
          <FieldLabel>Дополнительная информация</FieldLabel>
          <textarea
            name="message" value={formData.message}
            onChange={handleChange} rows={3}
            placeholder="Опишите проблему или пожелания..."
            style={{ ...fieldStyle, resize: "none" }}
            onFocus={e => { e.currentTarget.style.borderColor = "#F3C15F"; e.currentTarget.style.boxShadow = "0 0 0 2px rgba(243,193,95,0.15)"; }}
            onBlur={e => { e.currentTarget.style.borderColor = "var(--color-border2)"; e.currentTarget.style.boxShadow = "none"; }}
          />
        </div>

        <button type="submit" className="btn-primary w-full mt-1">
          Записаться на сервис
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default ServiceForm;
