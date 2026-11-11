import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api, { errorMessage, money } from "../api.js";
import Notice from "../components/Notice.jsx";
import ProductImage from "../components/ProductImage.jsx";

export default function Cart() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState(null);

  const load = useCallback(async () => {
    const { data } = await api.get("/cart/");
    setCart(data);
  }, []);

  useEffect(() => {
    load()
      .catch((err) => setNotice({ ok: false, text: errorMessage(err) }))
      .finally(() => setLoading(false));
  }, [load]);

  // run a cart request; the API sends back the updated cart
  const run = async (request) => {
    try {
      const { data } = await request();
      setCart(data);
      setNotice(null);
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    }
  };

  const changeQuantity = (item, quantity) => {
    if (quantity < 1) return;
    run(() => api.patch(`/cart/items/${item.id}/`, { quantity }));
  };

  const remove = (item) => run(() => api.delete(`/cart/items/${item.id}/`));

  const clear = () => run(() => api.delete("/cart/"));

  const checkout = async () => {
    setBusy(true);
    setNotice(null);
    try {
      await api.post("/transactions/checkout/");
      navigate("/transactions");
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    } finally {
      setBusy(false);
    }
  };

  if (loading) return <p className="muted">Loading…</p>;

  const items = cart?.items ?? [];

  return (
    <>
      <h1>Your cart</h1>
      <Notice notice={notice} />

      {items.length === 0 ? (
        <p className="muted">
          Your cart is empty. <Link to="/">Browse products</Link>
        </p>
      ) : (
        <>
          <div className="card list">
            {items.map((item) => (
              <div className="line" key={item.id}>
                <ProductImage product={item.product} className="small" />
                <div className="line-info">
                  <Link to={`/products/${item.product.id}`} className="product-name">
                    {item.product.name}
                  </Link>
                  <span className="muted">{money(item.product.price)} each</span>
                </div>
                <div className="stepper">
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => changeQuantity(item, item.quantity - 1)}
                    disabled={item.quantity <= 1}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    type="button"
                    className="btn secondary"
                    onClick={() => changeQuantity(item, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                <strong className="subtotal">{money(item.subtotal)}</strong>
                <button type="button" className="link-button danger" onClick={() => remove(item)}>
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <button type="button" className="link-button danger" onClick={clear}>
              Clear cart
            </button>
            <div className="total">
              Total: <strong>{money(cart.total)}</strong>
            </div>
            <button className="btn" onClick={checkout} disabled={busy}>
              {busy ? "Processing…" : "Checkout"}
            </button>
          </div>
        </>
      )}
    </>
  );
}
