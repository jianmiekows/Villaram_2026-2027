import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api, { errorMessage, money } from "../api.js";
import Notice from "../components/Notice.jsx";
import ProductImage from "../components/ProductImage.jsx";
import { useAuth } from "../context/AuthContext.jsx";

export default function Products() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [query, setQuery] = useState(""); // the search that was actually submitted
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    let ignore = false;
    setLoading(true);
    api
      .get("/products/", { params: query ? { search: query } : {} })
      .then(({ data }) => {
        if (ignore) return;
        setProducts(data.results ?? data);
        setNotice(null);
      })
      .catch((err) => {
        if (!ignore) setNotice({ ok: false, text: errorMessage(err) });
      })
      .finally(() => {
        if (!ignore) setLoading(false);
      });
    return () => {
      ignore = true;
    };
  }, [query]);

  const addToCart = async (product) => {
    if (!user) {
      navigate("/login", { state: { from: "/" } });
      return;
    }
    try {
      await api.post("/cart/items/", { product_id: product.id, quantity: 1 });
      setNotice({ ok: true, text: `${product.name} added to your cart.` });
    } catch (err) {
      setNotice({ ok: false, text: errorMessage(err) });
    }
  };

  const onSearch = (e) => {
    e.preventDefault();
    setQuery(search.trim());
  };

  return (
    <>
      <div className="page-head">
        <h1>Products</h1>
        <form className="search" onSubmit={onSearch}>
          <input
            placeholder="Search products…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="btn">Search</button>
        </form>
      </div>

      <Notice notice={notice} />
      {loading && <p className="muted">Loading…</p>}
      {!loading && products.length === 0 && <p className="muted">No products found.</p>}

      <div className="grid">
        {products.map((product) => (
          <article className="card product-card" key={product.id}>
            <Link to={`/products/${product.id}`}>
              <ProductImage product={product} />
            </Link>
            <div className="product-body">
              <Link to={`/products/${product.id}`} className="product-name">
                {product.name}
              </Link>
              <p className="price">{money(product.price)}</p>
              <p className="muted">
                {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
              </p>
              <button
                className="btn"
                disabled={product.stock === 0}
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
