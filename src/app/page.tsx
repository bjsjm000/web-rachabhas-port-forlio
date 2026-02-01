import PageShell from "@/app/(site)/components/page-shell";
import Hero from "@/app/(site)/components/hero";
import Projects from "@/app/(site)/components/projects";
import Experience from "@/app/(site)/components/experience";
import Skills from "@/app/(site)/components/skills";
import Contact from "@/app/(site)/components/contact";

export default function Page() {
  return (
    <PageShell>
      <Hero />
      <Projects />
      <Experience />
      <Skills />
      <Contact />
    </PageShell>
  );
}
