import { lazy, Suspense } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const ParticlesBackground = lazy(() => import("@/components/ParticlesBackground"));
const AboutSection = lazy(() => import("@/components/AboutSection"));
const SkillsSection = lazy(() => import("@/components/SkillsSection"));
const ProjectsSection = lazy(() => import("@/components/ProjectsSection"));
const ContactSection = lazy(() => import("@/components/ContactSection"));

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Abhishek Gupta | Full Stack Developer & Designer</title>
        <meta
          name="description"
          content="Portfolio of Abhishek Gupta, a full-stack developer specializing in React, TypeScript, and modern web technologies. View my projects and get in touch."
        />
        <meta
          name="keywords"
          content="web developer, full stack developer, react developer, portfolio, frontend developer"
        />
        <link rel="canonical" href="https://abhishek-engine.lovable.app" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Abhishek Gupta",
            "url": "https://abhishek-engine.lovable.app",
            "jobTitle": "Full Stack Developer",
            "sameAs": [
              "https://github.com/Abhishek-G06",
              "https://www.linkedin.com/in/abhishek-gupta-667229189/"
            ]
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <Suspense fallback={null}>
          <ParticlesBackground />
        </Suspense>
        <Navbar />
        <main>
          <HeroSection />
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <AboutSection />
          </Suspense>
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <SkillsSection />
          </Suspense>
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <ProjectsSection />
          </Suspense>
          <Suspense fallback={<div className="min-h-[50vh]" />}>
            <ContactSection />
          </Suspense>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
