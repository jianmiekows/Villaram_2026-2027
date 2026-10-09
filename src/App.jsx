import { NavLink, Outlet } from "react-router";

const links = [
  { to: "/", label: "About Me" },
  { to: "/hobby/1", label: "Video Games" },
  { to: "/hobby/2", label: "Cooking" },
  { to: "/hobby/3", label: "Listening to Music" },
];

export default function App() {
  return (
    <main className="min-h-screen bg-stone-100 text-stone-900">
      <header className="border-b border-stone-300 bg-white">
        <div className="mx-auto flex max-w-5xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-stone-600">Portfolio</p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-900">Jian Mieko M. Villaram</h1>
          </div>

          <nav className="flex flex-wrap gap-2">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  [
                    "rounded border px-3 py-2 text-sm font-medium",
                    isActive
                      ? "border-stone-900 bg-stone-900 text-white"
                      : "border-stone-300 bg-stone-100 text-stone-700",
                  ].join(" ")
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <Outlet />
    </main>
  );
}
