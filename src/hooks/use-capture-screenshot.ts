import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useQueryClient } from "@tanstack/react-query";

export function useCaptureScreenshot() {
  const [capturingIds, setCapturingIds] = useState<Set<string>>(new Set());
  const queryClient = useQueryClient();

  const capture = async (projectId: string, url: string) => {
    setCapturingIds((prev) => new Set(prev).add(projectId));
    try {
      const { data, error } = await supabase.functions.invoke("capture-screenshot", {
        body: { projectId, url },
      });
      if (error) throw error;
      await queryClient.invalidateQueries({ queryKey: ["projects"] });
      return data?.image_url as string;
    } finally {
      setCapturingIds((prev) => {
        const next = new Set(prev);
        next.delete(projectId);
        return next;
      });
    }
  };

  const isCapturing = (id: string) => capturingIds.has(id);

  return { capture, isCapturing };
}
