/**
 * Shown when the admin gate fails — i.e. the request reached /admin
 * without a Cloudflare Access session. In production this means
 * Cloudflare Access hasn't been configured (or was removed) for the
 * /admin* path. The admin fails closed: no content is rendered.
 */
export default function AdminLocked() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-[#0E1116] text-white px-6">
      <div className="max-w-md text-center">
        <div className="mx-auto mb-6 size-12 rounded-full border border-white/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
            <rect x="4" y="11" width="16" height="9" rx="2" />
            <path d="M8 11V8a4 4 0 0 1 8 0v3" />
          </svg>
        </div>
        <h1 className="text-xl font-semibold mb-3">Admin is locked</h1>
        <p className="text-sm leading-relaxed text-white/60">
          This area is protected by Cloudflare Access. It looks like no
          Access session is present. Set up a Cloudflare Access application
          for <code className="text-white/80">/admin*</code> and{" "}
          <code className="text-white/80">/api/admin/*</code>, then sign in
          to continue.
        </p>
      </div>
    </main>
  );
}
