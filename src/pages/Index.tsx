import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import ParticlesBackground from "@/components/ParticlesBackground";

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
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <ParticlesBackground />
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default Index;
