import { createContext, useContext, useState, useEffect } from 'react';

// ============================================================
// AuthContext — Mock authentication with localStorage persistence
// Replace with real API calls when backend is ready
// ============================================================

const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: 1,
    name: 'Example One',
    email: 'example1@devopsx.io',
    password: 'password123',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=example1',
    role: 'student',
    enrolledCourses: [1, 2, 5],
    wishlist: [3, 7],
    certificates: [1],
    joinedAt: '2024-01-15',
  },
];

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('devopsx_user');
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch {
        localStorage.removeItem('devopsx_user');
      }
    }
    setLoading(false);
  }, []);

  // Mock login — replace with API call
  const login = async (email, password) => {
    const found = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );
    if (!found) throw new Error('Invalid email or password');
    const { password: _pwd, ...safeUser } = found;
    setUser(safeUser);
    localStorage.setItem('devopsx_user', JSON.stringify(safeUser));
    return safeUser;
  };

  // Mock register — replace with API call
  const register = async ({ name, email, password }) => {
    const exists = MOCK_USERS.find((u) => u.email === email);
    if (exists) throw new Error('Email already registered');
    const newUser = {
      id: Date.now(),
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${name}`,
      role: 'student',
      enrolledCourses: [],
      wishlist: [],
      certificates: [],
      joinedAt: new Date().toISOString().split('T')[0],
    };
    MOCK_USERS.push({ ...newUser, password });
    setUser(newUser);
    localStorage.setItem('devopsx_user', JSON.stringify(newUser));
    return newUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('devopsx_user');
  };

  const updateProfile = (updates) => {
    const updated = { ...user, ...updates };
    setUser(updated);
    localStorage.setItem('devopsx_user', JSON.stringify(updated));
  };

  const toggleWishlist = (courseId) => {
    if (!user) return;
    const wishlist = user.wishlist.includes(courseId)
      ? user.wishlist.filter((id) => id !== courseId)
      : [...user.wishlist, courseId];
    updateProfile({ wishlist });
  };

  const isEnrolled = (courseId) => user?.enrolledCourses?.includes(courseId) ?? false;
  const isWishlisted = (courseId) => user?.wishlist?.includes(courseId) ?? false;

  return (
    <AuthContext.Provider
      value={{ user, loading, login, register, logout, updateProfile, toggleWishlist, isEnrolled, isWishlisted }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
