import Card from "./Card";

function GalleryPokemon({ pokemons, onEdit, onDelete }) {
  if (pokemons.length === 0) {
    return (
      <p className="text-center text-gray-500">
        No Pokémon yet. Add one with the form above.
      </p>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {pokemons.map((pokemon) => (
        <Card
          key={pokemon.id}
          pokemon={pokemon}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default GalleryPokemon;
