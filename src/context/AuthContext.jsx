import { createContext, useCallback, useContext, useEffect, useState } from "react";

import api from "../api.js";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  // only "loading" if there is a saved token we still need to check
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("access")));

  const loadProfile = useCallback(async () => {
    const { data } = await api.get("/profile/");
    setUser(data);
    return data;
  }, []);

  useEffect(() => {
    if (!localStorage.getItem("access")) return;
    loadProfile()
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [loadProfile]);

  // the api client fires this when the refresh token has expired too
  useEffect(() => {
    const onExpired = () => setUser(null);
    window.addEventListener("auth-expired", onExpired);
    return () => window.removeEventListener("auth-expired", onExpired);
  }, []);

  const login = async (username, password) => {
    const { data } = await api.post("/token/", { username, password });
    localStorage.setItem("access", data.access);
    localStorage.setItem("refresh", data.refresh);
    return loadProfile();
  };

  const register = async (form) => {
    await api.post("/register/", form);
    return login(form.username, form.password);
  };

  const logout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
