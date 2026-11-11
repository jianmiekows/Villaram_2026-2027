import { useState } from "react";
import { useNavigate } from "react-router-dom";

import api, { errorMessage } from "../api.js";
import Notice from "../components/Notice.jsx";

const EMPTY = { name: "", description: "", sku: "", price: "", stock: "0", is_active: true };

export default function CreateProduct() {
  const navigate = useNavigate();

  const [form, setForm] = useState(EMPTY);
  const [file, setFile] = useState(null);
  const [notice, setNotice] = useState(null);
  const [busy, setBusy] = useState(false);

  const onChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    setNotice(null);

    // files can't go in JSON, so send multipart form data
    const body = new FormData();
    Object.entries(form).forEach(([key, value]) => body.append(key, value));
    if (file) body.append("thumbnail", file); // image is optional

    try {
      const { data } = await api.post("/products/", body);
      navigate(`/products/${data.id}`);
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  return (
    <form className="card form narrow" onSubmit={onSubmit}>
      <h1>Create product</h1>
      <Notice notice={notice} />
      <label>
        Name
        <input name="name" value={form.name} onChange={onChange} required />
      </label>
      <label>
        Description
        <textarea name="description" rows="4" value={form.description} onChange={onChange} />
      </label>
      <label>
        SKU
        <input name="sku" value={form.sku} onChange={onChange} required />
      </label>
      <div className="row">
        <label>
          Price
          <input
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={form.price}
            onChange={onChange}
            required
          />
        </label>
        <label>
          Stock
          <input
            name="stock"
            type="number"
            min="0"
            step="1"
            value={form.stock}
            onChange={onChange}
            required
          />
        </label>
      </div>
      <label>
        Thumbnail (optional)
        <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0] || null)} />
      </label>
      <label className="check">
        <input name="is_active" type="checkbox" checked={form.is_active} onChange={onChange} />
        Active (visible in the shop)
      </label>
      <button className="btn" disabled={busy}>
        {busy ? "Saving…" : "Create product"}
      </button>
    </form>
  );
}
