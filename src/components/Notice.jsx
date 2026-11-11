// notice = { ok: true|false, text: "..." } or null
export default function Notice({ notice }) {
  if (!notice) return null;
  return <p className={notice.ok ? "notice ok" : "notice error"}>{notice.text}</p>;
}
