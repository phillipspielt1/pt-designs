import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import HeroCarousel from "@/components/HeroCarousel";
import SiteNav from "@/components/SiteNav";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="relative">
        <SiteNav />
        <HeroCarousel />
      </div>

      <section className="px-6 py-24 bg-[var(--color-bone)]">
        <div className="mx-auto max-w-xl">
          <p className="text-[11px] uppercase tracking-[0.32em] text-[var(--color-ink-soft)]/60 mb-4">
            Sandbox · VDT Test
          </p>
          <h2 className="font-display uppercase text-5xl sm:text-6xl mb-3 leading-none">
            Get in touch
          </h2>
          <p className="text-sm text-[var(--color-ink-soft)]/70 mb-10">
            Drop a note and it lands in the inbox.
          </p>
          <ContactForm />
        </div>
      </section>

      <Footer />
    </main>
  );
}
