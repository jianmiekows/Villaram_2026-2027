import jianPhoto from "../assets/jian.jpg";

const contacts = [
  { label: "Facebook", href: "https://www.facebook.com/share/1PMk46tto9/" },
  { label: "Instagram", href: "https://www.instagram.com/jnmk.ie?exln=b2doMThzY2Q1ZHc=" },
  { label: "Email", href: "mailto:jianmiekov@gmail.com" },
];

export default function AboutMe() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-16">
      <div className="grid items-center gap-10 md:grid-cols-2">
        <div className="overflow-hidden border border-stone-300 bg-white">
          <img
            src={jianPhoto}
            alt="Jian Mieko M. Villaram"
            className="h-105 w-full object-cover"
          />
        </div>

        <div>
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.2em] text-stone-600">
            Mabait
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-stone-900 md:text-5xl">
            Jian Mieko M. Villaram
          </h1>
          <p className="mt-4 text-xl italic text-stone-700">
            “I ain't tisoy, I'm budoy”
          </p>
          <p className="mt-6 max-w-xl text-base leading-8 text-stone-700">
            Normal na tao lang.
          </p>

          <div className="mt-8">
            <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-stone-600">
              Contacts
            </h2>
            <div className="flex flex-wrap gap-3">
              {contacts.map((contact) => (
                <a
                  key={contact.label}
                  href={contact.href}
                  target={contact.href.startsWith("http") ? "_blank" : undefined}
                  rel={contact.href.startsWith("http") ? "noreferrer" : undefined}
                  className="border border-stone-400 bg-white px-4 py-2 text-sm font-medium text-stone-800"
                >
                  {contact.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
