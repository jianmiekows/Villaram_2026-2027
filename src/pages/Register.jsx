import { useState } from "react"
import { Link, useNavigate } from "react-router"
import { registerAPI } from "../api/users"

const FIELDS = [
    {name: "username", label: "Username", type: "text"},
    {name: "email", label: "Email", type: "text"},
    {name: "first_name", label: "First Name", type: "text"},
    {name: "last_name", label: "Last Name", type: "text"},
    {name: "password", label: "Password", type: "password"},
    {name: "confirm_password", label: "Confirm Password", type: "password"},

];

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({username: "", email: "", first_name: "", last_name: "", password: "", confirm_password: ""});
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    function handleChange(e) {
        
    }

}