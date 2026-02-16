import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter } from "lucide-react";
import { useGsapScroll } from "@/hooks/use-gsap-scroll";
import ParallaxBackground from "@/components/ParallaxBackground";

const ContactSection = () => {
  const { sectionRef, contentRef } = useGsapScroll({ stagger: 0.1, y: 30 });
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Message sent!",
      description: "Thanks for reaching out. I'll get back to you soon!",
    });

    setFormData({ name: "", email: "", subject: "", message: "" });
    setIsSubmitting(false);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "abhi2002gupta@gmail.com",
      href: "mailto:abhi2002gupta@gmail.com",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "New Delhi, IN",
      href: "#",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7355985582",
      href: "tel:+917355985582",
    },
  ];

  const socialLinks = [
    { icon: Github, href: "https://github.com/Abhishek-G06", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/abhishek-gupta-667229189/", label: "LinkedIn" },
    { icon: Twitter, href: "https://x.com/23Abhishek06", label: "Twitter" },
  ];

  return (
    <section 
      ref={sectionRef}
      id="contact" 
      className="py-20 lg:py-32 relative overflow-hidden"
    >
      <ParallaxBackground variant="contact" />
      <div ref={contentRef} className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 data-scroll className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
              Get in Touch
            </h2>
            <div data-scroll className="w-24 h-1 bg-primary mx-auto rounded-full mb-6" />
            <p data-scroll className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind or just want to say hello? I'd love to hear
              from you. Let's create something amazing together!
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-2 space-y-8">
              <div className="space-y-6">
                {contactInfo.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    data-scroll
                    className="flex items-start gap-4 group"
                  >
                    <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-primary group-hover:text-primary-foreground transition-colors duration-300">
                      <item.icon className="w-5 h-5 text-accent-foreground group-hover:text-primary-foreground" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      <p className="text-foreground font-medium group-hover:text-primary transition-colors">
                        {item.value}
                      </p>
                    </div>
                  </a>
                ))}
              </div>

              <div data-scroll className="pt-6 border-t border-border">
                <p className="text-sm text-muted-foreground mb-4">
                  Follow me on social media
                </p>
                <div className="flex gap-3">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg bg-card border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-500"
                      aria-label={link.label}
                    >
                      <link.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div 
              data-scroll
              className="lg:col-span-3"
            >
              <form
                onSubmit={handleSubmit}
                className="bg-card p-8 rounded-2xl shadow-sm border border-border/50"
              >
                <div className="grid sm:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Your Name
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="bg-background"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-foreground mb-2"
                    >
                      Email Address
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="mail@example.com"
                      required
                      className="bg-background"
                    />
                  </div>
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Subject
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="How can I help you?"
                    required
                    className="bg-background"
                  />
                </div>
                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-foreground mb-2"
                  >
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project..."
                    rows={5}
                    required
                    className="bg-background resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  variant="hero"
                  size="lg"
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
