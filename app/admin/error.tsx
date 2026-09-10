"use client";

export default function AdminError({ reset }: { reset: () => void }) {
  return (
    <main className="admin-shell login-shell">
      <section className="admin-login" role="alert">
        <p className="admin-kicker">Cape Shine</p>
        <h1>Admin temporarily unavailable</h1>
        <p>We couldn’t load your saved content. Please try again in a moment.</p>
        <button type="button" onClick={reset}>Try again</button>
      </section>
    </main>
  );
}
