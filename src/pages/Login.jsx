import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { loginAPI, saveTokens } from "../api/auth";

function Login() {
    const navigate = useNavigate();
    const location = useLocation();
    const [form, setForm] = useState({username: "", password: "",});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    
}