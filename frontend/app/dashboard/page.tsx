export default function DashboardPage() {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-[#0b1220]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_15%_20%,rgba(59,130,246,0.24),transparent_46%),radial-gradient(circle_at_85%_75%,rgba(34,211,238,0.17),transparent_44%),linear-gradient(180deg,#0b1220_0%,#0f172a_100%)]" />

      <div className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-400/15 blur-3xl animate-orbit-slow" />
      <div className="pointer-events-none absolute -bottom-44 -right-24 h-112 w-md rounded-full bg-cyan-300/14 blur-3xl animate-orbit-reverse" />

      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.11)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.11)_1px,transparent_1px)] bg-size-[72px_72px] opacity-30" />
    </section>
  );
}
