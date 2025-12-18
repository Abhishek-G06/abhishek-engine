import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import SkillsSection from "@/components/SkillsSection";
import ProjectsSection from "@/components/ProjectsSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <>
      <Helmet>
        <title>Jane Doe | Full Stack Developer & Creative Technologist</title>
        <meta
          name="description"
          content="Futuristic portfolio of Jane Doe, a full-stack developer specializing in React, TypeScript, Three.js and immersive web experiences."
        />
        <meta
          name="keywords"
          content="web developer, full stack developer, react developer, three.js, 3D web, portfolio"
        />
        <link rel="canonical" href="https://example.com" />
      </Helmet>

      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection />
          <ContactSection />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
