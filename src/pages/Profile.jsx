import { useEffect, useState } from "react";

import api, { errorMessage } from "../api.js";
import Notice from "../components/Notice.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Profile() {
  const { user, setUser } = useAuth();

  const [form, setForm] = useState({
    email: user.email || "",
    first_name: user.first_name || "",
    middle_name: user.middle_name || "",
    last_name: user.last_name || "",
    gender: user.gender || "",
  });
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  // local preview of the newly chosen avatar
  useEffect(() => {
    if (!file) {
      setPreview(null);
      return undefined;
    }
    const url = URL.createObjectURL(file);
    setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file]);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);

    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (file) body.append("avatar", file); // only send the avatar if a new one was chosen

    try {
      const { data } = await api.patch("/profile/", body);
      setUser(data);
      setFile(null);
      setNotice({ ok: true, text: "Profile updated." });
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  const avatarSrc = preview || user.avatar;

  return (
    <form className="card form narrow" onSubmit={onSubmit}>
      <h1>Profile</h1>
      <Notice notice={notice} />

      <div className="avatar-row">
        {avatarSrc ? (
          <img className="avatar" src={avatarSrc} alt="Avatar" />
        ) : (
          <div className="avatar placeholder">{user.username[0]?.toUpperCase()}</div>
        )}
        <label>
          Avatar
          <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
        </label>
      </div>

      <label>
        Username
        <input value={user.username} disabled />
      </label>
      <label>
        Email
        <input name="email" type="email" value={form.email} onChange={onChange} required />
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
        {busy ? "Saving…" : "Save changes"}
      </button>
    </form>
  );
}
