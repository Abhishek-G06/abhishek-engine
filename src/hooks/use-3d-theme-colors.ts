import { useTheme } from "next-themes";
import { useMemo } from "react";

export interface ThemeColors {
  primary: string;
  secondary: string;
  accent: string;
  particles: string;
}

export function use3DThemeColors(): ThemeColors {
  const { resolvedTheme } = useTheme();
  
  return useMemo(() => {
    if (resolvedTheme === "dark") {
      return {
        primary: "#7C3AED",    // Purple
        secondary: "#8B5CF6",  // Lighter purple
        accent: "#A78BFA",     // Even lighter purple
        particles: "#C4B5FD",  // Soft purple for particles
      };
    }
    // Light mode - verdant green theme
    return {
      primary: "#4A9B84",
      secondary: "#64B5A0",
      accent: "#3D8B6E",
      particles: "#64B5A0",
    };
  }, [resolvedTheme]);
}
