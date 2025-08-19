export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Имитация базы данных пользователей
let users: User[] = [];

// Функция для регистрации нового пользователя
export const registerUser = (
  userData: Omit<User, "id">
): { success: boolean; message: string } => {
  // Проверяем, не существует ли уже пользователь с таким email
  if (users.some((user) => user.email === userData.email)) {
    return {
      success: false,
      message: "Пользователь с таким email уже существует",
    };
  }

  // Создаем нового пользователя
  const newUser: User = {
    id: Date.now().toString(), // Простой способ генерации ID
    ...userData,
  };

  // Добавляем пользователя в "базу данных"
  users.push(newUser);

  // Сохраняем в localStorage
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Регистрация успешна" };
};

// Функция для входа пользователя
export const loginUser = (
  email: string,
  password: string
): { success: boolean; message: string; user?: Omit<User, "password"> } => {
  // Загружаем пользователей из localStorage
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }

  // Ищем пользователя
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: "Неверный email или пароль" };
  }

  // Создаем копию пользователя без пароля
  const { password: _, ...userWithoutPassword } = user;

  // Сохраняем информацию о текущем пользователе
  localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

  return {
    success: true,
    message: "Вход выполнен успешно",
    user: userWithoutPassword,
  };
};

// Функция для выхода пользователя
export const logoutUser = (): void => {
  localStorage.removeItem("currentUser");
};

// Функция для проверки авторизации
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("currentUser");
};

// Функция для получения текущего пользователя
export const getCurrentUser = (): Omit<User, "password"> | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};
