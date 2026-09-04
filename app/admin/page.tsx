import { getSiteContent } from "@/db/content";
import { isAdminAuthenticated } from "./auth";
import AdminEditor from "./admin-editor";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const authenticated = await isAdminAuthenticated();
  const params = await searchParams;

  if (!authenticated) {
    return (
      <main className="admin-shell login-shell">
        <section className="admin-login">
          <p className="admin-kicker">Cape Shine</p>
          <h1>Admin dashboard</h1>
          <p>Edit access is protected by the `ADMIN_PASSWORD` environment variable.</p>
          <form action="/api/admin/login" method="post">
            <label>
              Password
              <input name="password" type="password" required autoFocus />
            </label>
            {params?.error && <p className="admin-error">Incorrect password.</p>}
            <button type="submit">Sign in</button>
          </form>
        </section>
      </main>
    );
  }

  const content = await getSiteContent();

  return (
    <main className="admin-shell">
      <header className="admin-topbar">
        <div>
          <p className="admin-kicker">Cape Shine</p>
          <h1>Admin dashboard</h1>
        </div>
        <div className="admin-topbar-actions">
          <a href="/" target="_blank">
            View site
          </a>
          <form action="/api/admin/logout" method="post">
            <button type="submit">Sign out</button>
          </form>
        </div>
      </header>
      <AdminEditor initialContent={content} />
    </main>
  );
}
