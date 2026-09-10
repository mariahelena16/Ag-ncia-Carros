const AUTH_KEY = 'agencia-auth';
const USERS_KEY = 'agencia-users';

export const ADMIN_CREDENTIALS = {
  email: 'admin@agencia.com',
  password: '123456'
};

export function getUsers() {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const users = window.localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch {
    return [];
  }
}

export function getCurrentUser() {
  if (typeof window === 'undefined') {
    return null;
  }

  try {
    const auth = window.localStorage.getItem(AUTH_KEY);
    return auth ? JSON.parse(auth) : null;
  } catch {
    return null;
  }
}

export function isAuthenticated() {
  if (typeof window === 'undefined') {
    return false;
  }

  const auth = window.localStorage.getItem(AUTH_KEY);
  return Boolean(auth);
}

export function isAdminUser() {
  const user = getCurrentUser();

  if (!user) return false;

  return Boolean(
    user.role === 'admin' ||
      user.email === ADMIN_CREDENTIALS.email ||
      String(user.email).toLowerCase().endsWith('@email.adm')
  );
}

export function registerUser({ name, email, password }: { name: string; email: string; password: string }) {
  const normalizedName = name.trim();
  const normalizedEmail = email.trim().toLowerCase();

  if (!normalizedName || normalizedName.length < 2) {
    throw new Error('Informe um nome válido com pelo menos 2 caracteres.');
  }

  if (!normalizedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalizedEmail)) {
    throw new Error('Informe um e-mail válido.');
  }

  if (!password || password.length < 6) {
    throw new Error('A senha deve ter pelo menos 6 caracteres.');
  }

  const users = getUsers();

  if (users.some((user: { email: string }) => user.email === normalizedEmail)) {
    throw new Error('Este e-mail já está cadastrado.');
  }

  const isAdmin = normalizedEmail === ADMIN_CREDENTIALS.email || normalizedEmail.endsWith('@email.adm');

  const newUser = {
    name: normalizedName,
    email: normalizedEmail,
    password,
    role: isAdmin ? 'admin' : 'user',
    createdAt: new Date().toISOString()
  };

  window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
  return true;
}

export function login(email: string, password: string) {
  const normalizedEmail = email.trim().toLowerCase();
  const users = getUsers();

  const userMatch = users.find(
    (user: { email: string; password: string }) =>
      user.email === normalizedEmail && user.password === password
  );

  const isAdmin = normalizedEmail === ADMIN_CREDENTIALS.email || normalizedEmail.endsWith('@email.adm');

  if (
    (normalizedEmail === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) ||
    userMatch
  ) {
    window.localStorage.setItem(
      AUTH_KEY,
      JSON.stringify({
        email: normalizedEmail,
        name: userMatch?.name || 'Administrador',
        role: isAdmin ? 'admin' : userMatch?.role || 'user',
        loggedAt: new Date().toISOString()
      })
    );

    return true;
  }

  return false;
}

export function logout() {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(AUTH_KEY);
  }
}
