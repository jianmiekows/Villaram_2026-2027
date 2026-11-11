import { NavLink, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext.jsx";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="nav">
      <div className="nav-inner">
        <NavLink to="/" className="brand">
          Online Shop
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end>
            Products
          </NavLink>
          {user ? (
            <>
              <NavLink to="/products/new">Create product</NavLink>
              <NavLink to="/cart">Cart</NavLink>
              <NavLink to="/transactions">Transactions</NavLink>
              <NavLink to="/profile">Profile</NavLink>
              <button type="button" className="link-button" onClick={handleLogout}>
                Log out ({user.username})
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login">Log in</NavLink>
              <NavLink to="/register">Register</NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
