import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider, useLanguage } from "@/i18n/LanguageContext";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";
import Index from "./pages/Index";
import Admin from "./pages/Admin";
import NotFound from "./pages/NotFound";
import { ReactNode } from "react";

const queryClient = new QueryClient();

const LanguageTransitionWrapper = ({ children }: { children: ReactNode }) => {
  const { isTransitioning } = useLanguage();
  return (
    <div className={`transition-opacity duration-150 ${isTransitioning ? 'opacity-0' : 'opacity-100'}`}>
      {children}
    </div>
  );
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <SmoothScrollProvider>
                <LanguageTransitionWrapper>
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/admin" element={<Admin />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </LanguageTransitionWrapper>
              </SmoothScrollProvider>
            </BrowserRouter>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
