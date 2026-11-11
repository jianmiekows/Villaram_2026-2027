import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { errorMessage } from "../api.js";
import Notice from "../components/Notice.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [form, setForm] = useState({ username: "", password: "" });
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await login(form.username, form.password);
      navigate(location.state?.from || "/", { replace: true });
    } catch (err) {
      const text =
        err.response?.status === 401 ? "Wrong username or password." : errorMessage(err);
      setNotice({ ok: false, text });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card form narrow" onSubmit={onSubmit}>
      <h1>Log in</h1>
      <Notice notice={notice} />
      <label>
        Username
        <input name="username" value={form.username} onChange={onChange} required autoFocus />
      </label>
      <label>
        Password
        <input
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          required
        />
      </label>
      <button className="btn" disabled={busy}>
        {busy ? "Logging in…" : "Log in"}
      </button>
      <p className="muted">
        No account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
}
