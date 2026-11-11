import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import api, { errorMessage, money } from "../api.js";
import Notice from "../components/Notice.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProductDetail() {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api
      .get(`/products/${id}/`)
      .then(({ data }) => {
        if (!ignore) setProduct(data);
      })
      .catch((err) => {
        if (ignore) return;
        const text = err.response?.status === 404 ? "Product not found." : errorMessage(err);
        setNotice({ ok: false, text });
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [id]);

  const addToCart = async () => {
    if (!user) {
      navigate("/login", { state: { from: `/products/${id}` } });
      return;
    }
    try {
      await api.post("/cart/items/", { product_id: product.id, quantity });
      setNotice({ ok: true, text: "Added to your cart." });
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    }
  };

  if (loading) return <p className="muted">Loading…</p>;
  if (!product) {
    return (
      <>
        <Notice notice={notice} />
        <Link to="/">Back to products</Link>
      </>
    );
  }

  return (
    <>
      <Link to="/">← Back to products</Link>
      <div className="card detail">
        <ProductImage product={product} className="large" />
        <div className="detail-body">
          <h1>{product.name}</h1>
          <p className="price big">{money(product.price)}</p>
          <p className="muted">SKU: {product.sku}</p>
          <p className="muted">
            {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
          </p>
          <p>{product.description || "No description."}</p>

          <Notice notice={notice} />

          <div className="row align-end">
            <label className="qty">
              Quantity
              <input
                type="number"
                min="1"
                max={Math.max(product.stock, 1)}
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
              />
            </label>
            <button className="btn" disabled={product.stock === 0} onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
