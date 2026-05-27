export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  password: string;
}


let users: User[] = [];


export const registerUser = (
  userData: Omit<User, "id">
): { success: boolean; message: string } => {
  
  if (users.some((user) => user.email === userData.email)) {
    return {
      success: false,
      message: "Пользователь с таким email уже существует",
    };
  }

  
  const newUser: User = {
    id: Date.now().toString(), 
    ...userData,
  };

  
  users.push(newUser);

  
  localStorage.setItem("users", JSON.stringify(users));

  return { success: true, message: "Регистрация успешна" };
};


export const loginUser = (
  email: string,
  password: string
): { success: boolean; message: string; user?: Omit<User, "password"> } => {
  
  const storedUsers = localStorage.getItem("users");
  if (storedUsers) {
    users = JSON.parse(storedUsers);
  }

  
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) {
    return { success: false, message: "Неверный email или пароль" };
  }

  
  const { password: _, ...userWithoutPassword } = user;

  
  localStorage.setItem("currentUser", JSON.stringify(userWithoutPassword));

  return {
    success: true,
    message: "Вход выполнен успешно",
    user: userWithoutPassword,
  };
};


export const logoutUser = (): void => {
  localStorage.removeItem("currentUser");
};


export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem("currentUser");
};


export const getCurrentUser = (): Omit<User, "password"> | null => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};
