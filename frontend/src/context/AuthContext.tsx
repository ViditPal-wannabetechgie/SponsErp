'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  updateUserRole: (role: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Check if user session exists in localStorage
    const savedUser = localStorage.getItem('sponserp-auth-user');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('sponserp-auth-user');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Authenticate user against stored users or establish session
    const usersStr = localStorage.getItem('sponserp-registered-users') || '[]';
    let users: Array<{ name: string; email: string; password: string; role?: string }> = [];
    try {
      users = JSON.parse(usersStr);
    } catch {
      users = [];
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      if (existing.password === password) {
        const loggedInUser: User = {
          id: btoa(existing.email),
          name: existing.name,
          email: existing.email,
          role: existing.role,
        };
        setUser(loggedInUser);
        localStorage.setItem('sponserp-auth-user', JSON.stringify(loggedInUser));
        return true;
      } else {
        throw new Error('Incorrect password. Please try again.');
      }
    } else {
      // If user hasn't registered yet, prompt them to use Create Account
      throw new Error('Account not found with this email. Please click "Create Account".');
    }
  };

  const signup = async (name: string, email: string, password: string): Promise<boolean> => {
    const usersStr = localStorage.getItem('sponserp-registered-users') || '[]';
    let users: Array<{ name: string; email: string; password: string; role?: string }> = [];
    try {
      users = JSON.parse(usersStr);
    } catch {
      users = [];
    }

    const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (existing) {
      throw new Error('An account with this email already exists. Please Sign In.');
    }

    const newUser = {
      id: btoa(email),
      name,
      email,
      role: '',
    };

    users.push({ name, email, password, role: '' });
    localStorage.setItem('sponserp-registered-users', JSON.stringify(users));
    localStorage.setItem('sponserp-auth-user', JSON.stringify(newUser));
    setUser(newUser);
    return true;
  };

  const updateUserRole = (role: string) => {
    if (!user) return;
    const updated = { ...user, role };
    setUser(updated);
    localStorage.setItem('sponserp-auth-user', JSON.stringify(updated));

    // Update in registered list too
    const usersStr = localStorage.getItem('sponserp-registered-users') || '[]';
    try {
      const users = JSON.parse(usersStr);
      const idx = users.findIndex((u: any) => u.email.toLowerCase() === user.email.toLowerCase());
      if (idx !== -1) {
        users[idx].role = role;
        localStorage.setItem('sponserp-registered-users', JSON.stringify(users));
      }
    } catch {}
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('sponserp-auth-user');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
