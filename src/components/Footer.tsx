export default function Footer() {
  return (
    <footer className="mt-24 border-t border-[var(--color-line)]">
      <div className="mx-auto max-w-3xl px-6 py-8 flex items-center justify-between text-xs text-[var(--color-ink-soft)]/70">
        <span>&copy; {new Date().getFullYear()} VDT Test</span>
        <a
          href="https://vdtsites.com"
          target="_blank"
          rel="noreferrer"
          className="font-mono uppercase tracking-[0.18em] text-[10px] hover:text-[var(--color-ink)] transition-colors"
        >
          Site by VDTSITES.COM
        </a>
      </div>
    </footer>
  );
}
