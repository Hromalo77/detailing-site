import { getSiteContent } from "@/db/content";
import { hasAdminPassword, isAdminAuthenticated } from "./auth";
import AdminEditor from "./admin-editor";

export const dynamic = "force-dynamic";

export default async function AdminPage({
  searchParams,
}: {
  searchParams?: Promise<{ error?: string }>;
}) {
  const authenticated = await isAdminAuthenticated();
  const params = await searchParams;
  const authError =
    params?.error === "config"
      ? "ADMIN_PASSWORD is not configured in the runtime environment."
      : params?.error
        ? "Incorrect password."
        : "";

  if (!authenticated) {
    return (
      <main className="admin-shell login-shell">
        <section className="admin-login">
          <p className="admin-kicker">Cape Shine</p>
          <h1>Admin dashboard</h1>
          <form action="/api/admin/login" method="post">
            <label>
              Password
              <input name="password" type="password" required autoFocus />
            </label>
            {authError && <p className="admin-error">{authError}</p>}
            {!hasAdminPassword() && !authError && (
              <p className="admin-error">
                ADMIN_PASSWORD is not configured in the runtime environment.
              </p>
            )}
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
