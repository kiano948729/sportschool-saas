function App() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl ring-1 ring-slate-200">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-emerald-600">
          Sportschool
        </p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Tailwind werkt</h1>
        <p className="mt-3 text-slate-600">
          Je hebt Tailwind succesvol gekoppeld aan deze Vite app.
        </p>
        <button className="mt-6 inline-flex items-center rounded-lg bg-emerald-600 px-4 py-2 font-medium text-white shadow-sm transition hover:bg-emerald-700">
          Plan een training
        </button>
      </div>
    </main>
  )
}

export default App
