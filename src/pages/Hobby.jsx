import { useParams } from "react-router";
import cookingPhoto from "../assets/cooking.png";
import musicPhoto from "../assets/music.png";
import videoGamesPhoto from "../assets/ml.png";

const hobbies = [
  {
    id: 1,
    name: "Video Games",
    image: videoGamesPhoto,
    description:
      "Playing online games if I have a free time. One of it is playing Mobile Legends, where it is a 5v5 MOBA game.",
    reason:
      "To reduce stress and use it as my comfort zone.",
  },
  {
    id: 2,
    name: "Cooking",
    image: cookingPhoto,
    description:
      "Cooking is the art, science, and craft of using heat to prepare food for consumption.",
    reason:
      "Cooking is one of my favorite hobbies that I do love the most.",
  },
  {
    id: 3,
    name: "Listening to Music",
    image: musicPhoto,
    description:
      "The act of engaging with auditory art, where sound waves are organized into melody, harmony, rhythm, and timbre to evoke emotion, tell stories, or stimulate the brain.",
    reason:
      "I love listening to music whenever I am because it really helps me to do anything smoothly.",
  },
];

export default function Hobby() {
  const { id } = useParams();
  const selectedHobby = hobbies.find((hobby) => hobby.id === Number(id)) ?? hobbies[0];

  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid items-center gap-8 border border-stone-300 bg-white p-6 md:grid-cols-2 md:p-8">
        <div className="overflow-hidden border border-stone-300 bg-stone-200">
          <img
            src={selectedHobby.image}
            alt={selectedHobby.name}
            className="h-90 w-full object-cover"
          />
        </div>

        <div>
          <h3 className="text-3xl font-bold text-stone-900">{selectedHobby.name}</h3>
          <p className="mt-5 text-base leading-8 text-stone-700">{selectedHobby.description}</p>

          <div className="mt-6 border-l-2 border-stone-400 pl-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-stone-600">Reason</p>
            <p className="mt-2 text-base leading-7 text-stone-700">{selectedHobby.reason}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
