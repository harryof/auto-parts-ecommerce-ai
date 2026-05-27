import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Save, Camera } from "lucide-react";
import api from "../services/api";

const LOYALTY_COLORS: Record<string, string> = {
  bronze: "linear-gradient(135deg, #ca8a5b, #a0522d)",
  silver: "linear-gradient(135deg, #e0e0e0, #9e9e9e)",
  gold: "linear-gradient(135deg, #F3C15F, #d4af37)",
  platinum: "linear-gradient(135deg, #e5e4e2, #78909c)"
};

const LOYALTY_NAMES: Record<string, string> = {
  bronze: "Бронза",
  silver: "Серебро",
  gold: "Золото",
  platinum: "Платина"
};

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [msg, setMsg] = useState("");
  const [err, setErr] = useState("");

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return navigate("/auth");
        const res = await fetch("http://localhost:5000/api/auth/me", {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("Need auth");
        const data = await res.json();
        setCurrentUser(data);
        setFormData(prev => ({
          ...prev, name: data.name || "", email: data.email || "", phone: data.phone || ""
        }));
      } catch (e) {
        navigate("/auth");
      }
    };
    fetchMe();
  }, [navigate]);

  if (!currentUser) return null;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("avatar", file);
    
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/auth/avatar", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: fd
      });
      if (!res.ok) throw new Error("Ошибка загрузки");
      const data = await res.json();
      setCurrentUser((prev: any) => ({ ...prev, avatar_url: data.avatar_url }));
      const userStr = localStorage.getItem("user");
      if (userStr) {
        const u = JSON.parse(userStr);
        u.avatar_url = data.avatar_url;
        localStorage.setItem("user", JSON.stringify(u));
      }
      setMsg("Аватар успешно обновлен");
      setTimeout(()=>setMsg(""), 3000);
    } catch (e: any) {
      setErr(e.message);
      setTimeout(()=>setErr(""), 3000);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(""); setErr("");
    
    try {
      const token = localStorage.getItem("token");
      
      if (formData.name !== currentUser.name || formData.phone !== currentUser.phone) {
        const res = await fetch("http://localhost:5000/api/auth/me", {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ name: formData.name, phone: formData.phone })
        });
        if (!res.ok) throw new Error("Ошибка обновления профиля");
      }
      
      
      if (formData.currentPassword && formData.newPassword) {
        if (formData.newPassword !== formData.confirmPassword) {
          throw new Error("Новые пароли не совпадают");
        }
        const res = await fetch("http://localhost:5000/api/auth/password", {
          method: "PUT",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ currentPassword: formData.currentPassword, newPassword: formData.newPassword })
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "Ошибка изменения пароля");
      }
      
      setMsg("Профиль успешно обновлен!");
      setIsEditing(false);
      setFormData(prev => ({ ...prev, currentPassword: "", newPassword: "", confirmPassword: "" }));
      setTimeout(()=>setMsg(""), 3000);
    } catch (error: any) {
      setErr(error.message);
      setTimeout(()=>setErr(""), 4000);
    }
  };

  const styleCard = LOYALTY_COLORS[currentUser.loyalty_status || "bronze"];
  const statusName = LOYALTY_NAMES[currentUser.loyalty_status || "bronze"];
  const discount = Number(currentUser.loyalty_discount || 2);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 animate-fade-in">
      <h1 className="section-title mb-4">
        <span>Личный</span> кабинет
      </h1>
      <div className="accent-line mx-auto md:mx-0 mb-10" />

      {msg && <div className="mb-4 p-4 rounded-xl text-green-500 font-bold glass text-center">{msg}</div>}
      {err && <div className="mb-4 p-4 rounded-xl text-red-500 font-bold glass text-center">{err}</div>}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        
        <div className="glass rounded-3xl p-8 flex flex-col items-center">
          <div className="relative mb-6 group">
            <div className="w-32 h-32 rounded-full overflow-hidden border-4" style={{ borderColor: 'var(--color-border2)' }}>
              {currentUser.avatar_url ? (
                <img src={`http://localhost:5000${currentUser.avatar_url}`} alt="Avatar" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full bg-dark-400 flex items-center justify-center">
                  <User size={64} className="text-gray-400" />
                </div>
              )}
            </div>
            <label className="absolute bottom-0 right-0 p-3 rounded-full cursor-pointer transition-transform group-hover:scale-110 shadow-lg" style={{ background: 'var(--bg-glass)', backdropFilter: 'blur(10px)', border: '1px solid var(--color-border2)' }}>
              <Camera size={20} style={{ color: 'var(--color-text)' }} />
              <input type="file" accept="image/*" className="hidden" onChange={handleAvatarUpload} />
            </label>
          </div>
          
          <h2 className="text-2xl font-bold text-[var(--color-text)] mb-1">{currentUser.name}</h2>
          <p className="text-dark-300 mb-6">{currentUser.email}</p>
          
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="w-full py-2 rounded-full font-bold transition-colors"
            style={{ border: '1px solid #F3C15F', color: '#F3C15F' }}
          >
            {isEditing ? "Отмена" : "Редактировать профиль"}
          </button>

          {currentUser.role === 'admin' && (
            <button
              onClick={() => navigate('/admin')}
              className="mt-4 w-full py-2 rounded-full font-bold bg-dark-400 text-white hover:bg-dark-300 transition-colors"
            >
              Панель администратора
            </button>
          )}
        </div>

        
        <div className="lg:col-span-2 flex flex-col gap-8">
          
          
          <div className="rounded-3xl p-8 shadow-2xl relative overflow-hidden" style={{ background: styleCard, color: '#fff' }}>
            
            <div className="absolute top-0 right-0 w-64 h-64 bg-white opacity-10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-black opacity-10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/4" />
            
            <div className="relative z-10 flex justify-between items-start">
              <div>
                <p className="text-sm opacity-80 mb-1 font-medium tracking-wide uppercase">Карта клиента</p>
                <h3 className="text-3xl font-black tracking-tight">{statusName}</h3>
              </div>
              <div className="text-right">
                <p className="text-sm opacity-80 mb-1 font-medium">Ваша скидка</p>
                <h3 className="text-4xl font-black">{discount}%</h3>
              </div>
            </div>
            
            <div className="relative z-10 mt-10 flex items-center justify-between">
              <p className="text-lg font-bold tracking-widest">{currentUser.id?.split('-')[0].toUpperCase()} **** ****</p>
              <div className="w-12 h-12 rounded-full border-2 border-white opacity-50 flex items-center justify-center">
                <User size={24} />
              </div>
            </div>
          </div>

          
          {isEditing && (
            <form onSubmit={handleSubmit} className="glass rounded-3xl p-8 flex flex-col gap-6">
              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Основные данные</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Имя</label>
                  <div className="relative">
                    <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300" />
                    <input name="name" type="text" value={formData.name} onChange={handleInputChange} className="input-glass w-full pl-10 p-3 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Телефон</label>
                  <div className="relative">
                    <Phone size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300" />
                    <input name="phone" type="tel" value={formData.phone} onChange={handleInputChange} className="input-glass w-full pl-10 p-3 rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="accent-line w-full my-2 opacity-50" />

              <h3 className="text-xl font-bold text-[var(--color-text)] mb-2">Изменение пароля</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Текущий пароль</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300" />
                    <input name="currentPassword" type="password" value={formData.currentPassword} onChange={handleInputChange} className="input-glass w-full pl-10 p-3 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Новый пароль</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300" />
                    <input name="newPassword" type="password" value={formData.newPassword} onChange={handleInputChange} className="input-glass w-full pl-10 p-3 rounded-xl" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-dark-300 mb-1">Подтвердите пароль</label>
                  <div className="relative">
                    <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-dark-300" />
                    <input name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleInputChange} className="input-glass w-full pl-10 p-3 rounded-xl" />
                  </div>
                </div>
              </div>

              <button type="submit" className="btn-primary mt-4 py-3 rounded-xl flex items-center justify-center gap-2">
                <Save size={20} />
                Сохранить изменения
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
