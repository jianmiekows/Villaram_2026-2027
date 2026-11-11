import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { errorMessage } from "../api.js";
import Notice from "../components/Notice.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const EMPTY = {
  username: "",
  email: "",
  password: "",
  first_name: "",
  middle_name: "",
  last_name: "",
  gender: "",
};

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);
    try {
      await register(form); // creates the account, then logs in
      navigate("/", { replace: true });
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card form narrow" onSubmit={onSubmit}>
      <h1>Create an account</h1>
      <Notice notice={notice} />
      <label>
        Username
        <input name="username" value={form.username} onChange={onChange} required />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={onChange} required />
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
      <div className="row">
        <label>
          First name
          <input name="first_name" value={form.first_name} onChange={onChange} />
        </label>
        <label>
          Middle name
          <input name="middle_name" value={form.middle_name} onChange={onChange} />
        </label>
        <label>
          Last name
          <input name="last_name" value={form.last_name} onChange={onChange} />
        </label>
      </div>
      <label>
        Gender
        <select name="gender" value={form.gender} onChange={onChange}>
          <option value="">Prefer not to say</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
      </label>
      <button className="btn" disabled={busy}>
        {busy ? "Creating…" : "Register"}
      </button>
      <p className="muted">
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </form>
  );
}
