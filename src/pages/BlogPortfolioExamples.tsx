import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";

const examples = [
  {
    name: "Brittany Chiang",
    url: "https://brittanychiang.com",
    why: "A masterclass in restraint. A single-page, dark, monospace layout keeps focus on the writing and the work. Sticky side navigation and subtle scroll-linked highlights make the timeline of roles easy to scan without ever feeling busy.",
    takeaway: "Pick one strong idea and commit. Consistency beats variety.",
  },
  {
    name: "Bruno Simon",
    url: "https://bruno-simon.com",
    why: "A drivable 3D world as a resume. It is memorable because the medium demonstrates the skill: WebGL, physics, and interaction design are the portfolio.",
    takeaway: "If your craft is interactive, make the portfolio interactive. Show, don't list.",
  },
  {
    name: "Josh W. Comeau",
    url: "https://www.joshwcomeau.com",
    why: "Playful micro-interactions on almost every element, paired with thorough long-form writing. The site itself is a live demo of the CSS and React patterns he teaches.",
    takeaway: "A blog is a portfolio. Deep articles rank in search and build trust faster than case study screenshots.",
  },
  {
    name: "Rauno Freiberg",
    url: "https://rauno.me",
    why: "Extreme typographic discipline and hairline details. Notes, experiments, and craft-first work presented with almost no chrome.",
    takeaway: "Reduce until only the content and craft remain. Whitespace is a feature.",
  },
  {
    name: "Cassie Evans",
    url: "https://www.cassie.codes",
    why: "SVG and GSAP animations that reinforce her specialty. Every hover, transition, and illustration is on-brand for a motion-focused developer.",
    takeaway: "Let the visual language mirror the specialty you want to be hired for.",
  },
  {
    name: "Lee Robinson",
    url: "https://leerob.io",
    why: "Fast, minimal, MDX-driven blog with live view counts and GitHub stats. Ships new writing regularly, which compounds SEO and authority over time.",
    takeaway: "Publishing cadence beats a perfect design. A living site outranks a polished dead one.",
  },
  {
    name: "Olivia Ng",
    url: "https://oliviang.com",
    why: "Editorial layout, big typography, and a clear narrative from role to role. Reads like a magazine feature rather than a job application.",
    takeaway: "Structure the site as a story. Lead with the arc, not the tech stack.",
  },
  {
    name: "Adham Dannaway",
    url: "https://www.adhamdannaway.com",
    why: "Split-personality hero (designer and developer) that immediately frames the value proposition. Case studies focus on decisions and outcomes, not screenshots.",
    takeaway: "Answer 'what do you do' in the first three seconds.",
  },
  {
    name: "Matt Farley",
    url: "https://mattfarley.ca",
    why: "One page, one goal: get hired. Clear positioning statement, testimonials, and a short list of past clients. No navigation to get lost in.",
    takeaway: "A single well-argued page can outperform a multi-page site for lead generation.",
  },
  {
    name: "Robb Owen",
    url: "https://robbowen.digital",
    why: "Confident, opinionated voice throughout the copy. The animations are ambitious but always in service of guiding the eye through the case studies.",
    takeaway: "Write like a person. A distinctive voice is a moat that templates cannot copy.",
  },
];

const BlogPortfolioExamples = () => {
  const publishedIso = "2026-07-04";
  const url = "https://abhishek-engine.lovable.app/blog/portfolio-examples";
  const title = "10 Best Full Stack Developer Portfolio Examples for 2026";
  const description =
    "An analytical breakdown of 10 developer portfolio website examples that actually get results — with the design and content lessons behind each one.";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta
          name="keywords"
          content="portfolio website examples, developer portfolio, full stack developer portfolio, web developer portfolio examples, portfolio inspiration"
        />
        <link rel="canonical" href={url} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: title,
            description,
            author: {
              "@type": "Person",
              name: "Abhishek Gupta",
              url: "https://abhishek-engine.lovable.app",
            },
            datePublished: publishedIso,
            dateModified: publishedIso,
            mainEntityOfPage: url,
          })}
        </script>
      </Helmet>

      <div className="min-h-screen bg-background relative">
        <Navbar />
        <main className="container mx-auto max-w-3xl px-4 pt-32 pb-24">
          <article>
            <header className="mb-12">
              <p className="text-sm uppercase tracking-widest text-muted-foreground mb-4">
                Guide · Portfolio design
              </p>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {title}
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                {description}
              </p>
            </header>

            <section className="prose prose-lg dark:prose-invert max-w-none mb-12">
              <h2 className="text-2xl font-semibold mb-4">
                What makes a portfolio actually work?
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Most developer portfolios fail for the same reasons: a generic
                template, a wall of logos, and no point of view. The examples
                below are different. Each one commits to a single idea and
                lets that idea shape every decision — the typography, the
                interactions, the copy, and the case studies.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                For each site, you will find what it does well, why the choice
                works, and the one lesson worth stealing.
              </p>
            </section>

            <ol className="space-y-10 list-none pl-0">
              {examples.map((ex, i) => (
                <li key={ex.url} className="border-l-2 border-primary/40 pl-6">
                  <h2 className="text-2xl font-semibold mb-2">
                    <span className="text-primary mr-2">{i + 1}.</span>
                    <a
                      href={ex.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline"
                    >
                      {ex.name}
                    </a>
                  </h2>
                  <p className="text-muted-foreground leading-relaxed mb-3">
                    {ex.why}
                  </p>
                  <p className="text-sm">
                    <span className="font-semibold text-foreground">
                      Lesson:
                    </span>{" "}
                    <span className="text-muted-foreground">{ex.takeaway}</span>
                  </p>
                </li>
              ))}
            </ol>

            <section className="mt-16 pt-10 border-t border-border">
              <h2 className="text-2xl font-semibold mb-4">
                How to apply this to your own portfolio
              </h2>
              <ul className="space-y-3 text-muted-foreground leading-relaxed">
                <li>
                  <strong className="text-foreground">Pick one angle.</strong>{" "}
                  Motion, systems, writing, or craft. Everything else supports
                  it.
                </li>
                <li>
                  <strong className="text-foreground">
                    Show decisions, not screenshots.
                  </strong>{" "}
                  Case studies that explain trade-offs are more persuasive
                  than image galleries.
                </li>
                <li>
                  <strong className="text-foreground">Publish regularly.</strong>{" "}
                  A modest blog that ships monthly will outrank a polished
                  static site within a year.
                </li>
                <li>
                  <strong className="text-foreground">Cut, then cut again.</strong>{" "}
                  Every section you remove sharpens the ones that remain.
                </li>
              </ul>
            </section>

            <footer className="mt-16 pt-10 border-t border-border">
              <Link
                to="/"
                className="text-primary hover:underline font-medium"
              >
                ← Back to Abhishek Gupta's portfolio
              </Link>
            </footer>
          </article>
        </main>
        <Footer />
        <BackToTop />
      </div>
    </>
  );
};

export default BlogPortfolioExamples;
