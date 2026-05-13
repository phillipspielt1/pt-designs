import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <section className="flex-1 flex items-center justify-center px-6 py-24">
        <div className="text-center">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-soft)]/60 mb-6">
            Sandbox
          </p>
          <h1 className="font-display text-6xl sm:text-8xl leading-none">
            VDT Test
          </h1>
        </div>
      </section>

      <section className="px-6 pb-16">
        <div className="mx-auto max-w-xl">
          <h2 className="font-display text-3xl mb-2">Get in touch</h2>
          <p className="text-sm text-[var(--color-ink-soft)]/70 mb-8">
            Drop a note and it lands in the inbox.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
