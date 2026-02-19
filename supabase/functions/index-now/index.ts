import { corsHeaders } from "../_shared/cors.ts";

const INDEXNOW_KEY = "a1b2c3d4e5f6g7h8";
const SITE_URL = "https://abhishek-engine.lovable.app";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { urls } = await req.json();
    const urlList = urls && urls.length > 0 ? urls : [SITE_URL + "/"];

    const payload = {
      host: "abhishek-engine.lovable.app",
      key: INDEXNOW_KEY,
      keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
      urlList,
    };

    // Ping Bing/Yandex via IndexNow
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const text = await response.text();

    return new Response(
      JSON.stringify({ success: status >= 200 && status < 300, status, response: text }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
