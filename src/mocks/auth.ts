export interface User {
  name: string;
  email: string;
  phone: string;
  password?: string;
}

const USERS_KEY = 'raizes_mock_users';

export const getMockUsers = (): User[] => {
  const users = localStorage.getItem(USERS_KEY);
  if (users) {
    return JSON.parse(users);
  }
  // Mock default users
  const defaultUsers = [
    { name: "Usuário Teste", email: "teste@raizes.com", phone: "(11) 99999-9999", password: "123" }
  ];
  localStorage.setItem(USERS_KEY, JSON.stringify(defaultUsers));
  return defaultUsers;
};

export const registerMockUser = (user: User): { success: boolean; error?: string } => {
  const users = getMockUsers();
  const existingUser = users.find(u => u.email === user.email);
  if (existingUser) {
    return { success: false, error: "E-mail já cadastrado no sistema." };
  }
  
  users.push(user);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
  return { success: true };
};

export const authenticateMockUser = (email: string, password: string): { success: boolean; user?: Omit<User, 'password'>; error?: string } => {
  const users = getMockUsers();
  const user = users.find(u => u.email === email && u.password === password);
  
  if (user) {
    const { password: _, ...userWithoutPassword } = user;
    return { success: true, user: userWithoutPassword };
  }
  
  return { success: false, error: "E-mail ou senha inválidos." };
};
