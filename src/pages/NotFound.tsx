import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>Page Not Found | Abhishek Gupta Portfolio</title>
        <meta
          name="description"
          content="The page you're looking for doesn't exist. Return to Abhishek Gupta's portfolio home to explore projects and contact information."
        />
        <meta name="robots" content="noindex" />
        <meta property="og:title" content="Page Not Found | Abhishek Gupta Portfolio" />
        <meta
          property="og:description"
          content="The page you're looking for doesn't exist on Abhishek Gupta's portfolio."
        />
        <meta property="og:url" content="https://abhishek-engine.lovable.app/404" />
      </Helmet>
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="text-primary underline hover:text-primary/90">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
