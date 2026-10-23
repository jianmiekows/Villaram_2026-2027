import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { clearTokens } from "../api/auth";
import { PokemonCreateAPI, PokemonDeleteAPI, PokemonListAPI, PokemonPatchAPI } from "../api/pokemons";
import FormPokemon from "../components/FormPokemon";
import GalleryPokemon from "../components/GalleryPokemon";

function Gallery() {
    const navigate = useNavigate();
    const [pokemons, setPokemons] = useState([]);
    const [editing, setEditing] = useState(null);
    const [formKey, setFormKey] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [formError, setFormError] = useState("");
}