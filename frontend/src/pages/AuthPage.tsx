import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, Phone, Eye, EyeOff } from "lucide-react";
import api from "../services/api";

const AuthPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");

  const toggleAuthMode = () => {
    setIsLogin(!isLogin);
    setError("");
    setSuccess("");
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    try {
      if (isLogin) {
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await api.login(email, password);
        setSuccess("Вход выполнен успешно!");
        window.dispatchEvent(new Event("authChange"));
        setTimeout(() => navigate("/"), 800);
      } else {
        const name = formData.get("name") as string;
        const phone = formData.get("phone") as string;
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;
        await api.register({ name, email, password, phone });
        setSuccess("Регистрация прошла успешно! Войдите в аккаунт.");
        setTimeout(() => setIsLogin(true), 1200);
      }
    } catch (err: any) {
      setError(err.message || "Произошла ошибка");
    }
  };

  return (
    <div className="max-w-md mx-auto py-10 animate-fade-in">
      <div className="glass rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-6">
          <div className="text-center mb-10">
            <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 8vw, 2.5rem)' }}>
              {isLogin ? <span>Вход</span> : <span>Регистрация</span>}
            </h1>
            <div className="accent-line mx-auto mt-2" />
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
              {error}
            </div>
          )}

          {success && (
            <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {!isLogin && (
              <>
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-[var(--color-text)] mb-1"
                  >
                    Имя
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className="input-dark" style={{ paddingLeft: '2.5rem' }}
                      placeholder="Иван Иванов"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-[var(--color-text)] mb-1"
                  >
                    Телефон
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone size={18} className="text-gray-400" />
                    </div>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      className="input-dark" style={{ paddingLeft: '2.5rem' }}
                      placeholder="+7 (___) ___-__-__"
                      required
                    />
                  </div>
                </div>
              </>
            )}

            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-[var(--color-text)] mb-1"
              >
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="input-dark" style={{ paddingLeft: '2.5rem' }}
                  placeholder="example@mail.ru"
                  required
                />
              </div>
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-[var(--color-text)] mb-1"
              >
                Пароль
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="input-dark" style={{ paddingLeft: '2.5rem', paddingRight: '2.5rem' }}
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <EyeOff size={18} className="text-gray-400" />
                  ) : (
                    <Eye size={18} className="text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            {isLogin && (
              <div className="flex justify-end mb-6">
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary-700 hover:text-primary-800"
                >
                  Забыли пароль?
                </Link>
              </div>
            )}

            <button
              type="submit"
              className="btn-primary w-full mt-4 py-3 text-lg"
            >
              {isLogin ? "Войти" : "Зарегистрироваться"}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-dark-300">
              {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}{" "}
              <button
                onClick={toggleAuthMode}
                className="text-[#F3C15F] hover:text-[#d4a017] font-medium transition-colors"
              >
                {isLogin ? "Зарегистрироваться" : "Войти"}
              </button>
            </p>
          </div>
        </div>

        <div className="px-6 py-4 border-t" style={{ borderColor: 'var(--color-border2)', background: 'rgba(0,0,0,0.02)' }}>
          <div className="text-sm text-center text-dark-300">
            Продолжая, вы соглашаетесь с{" "}
            <Link
              to="/terms"
              className="text-[#F3C15F] hover:text-[#d4a017] transition-colors"
            >
              условиями использования
            </Link>{" "}
            и{" "}
            <Link
              to="/privacy-policy"
              className="text-[#F3C15F] hover:text-[#d4a017] transition-colors"
            >
              политикой конфиденциальности
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
