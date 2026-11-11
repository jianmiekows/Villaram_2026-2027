import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api, { errorMessage, money } from "../api.js";
import Notice from "../components/Notice.jsx";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notice, setNotice] = useState(null);

  useEffect(() => {
    api
      .get("/transactions/")
      .then(({ data }) => setTransactions(data.results ?? data))
      .catch((err) => setNotice({ ok: false, text: errorMessage(err) }))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="muted">Loading…</p>;

  return (
    <>
      <h1>Transactions</h1>
      <Notice notice={notice} />

      {transactions.length === 0 ? (
        <p className="muted">
          No purchases yet. <Link to="/">Browse products</Link>
        </p>
      ) : (
        transactions.map((tx) => (
          <article className="card transaction" key={tx.id}>
            <header className="tx-head">
              <div>
                <strong>Order {tx.id.slice(0, 8).toUpperCase()}</strong>
                <span className="muted"> · {new Date(tx.created_at).toLocaleString()}</span>
              </div>
              <strong>{money(tx.total)}</strong>
            </header>
            <ul className="tx-items">
              {tx.items.map((line) => (
                <li key={line.id}>
                  <span>
                    {line.quantity} × {line.item.name}
                  </span>
                  <span className="muted">{money(line.subtotal)}</span>
                </li>
              ))}
            </ul>
          </article>
        ))
      )}
    </>
  );
}
