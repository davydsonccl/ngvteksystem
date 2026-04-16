export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    // Rota da API para envio de e-mail
    if (url.pathname === "/api/send-email" && request.method === "POST") {
      try {
        const { name, email, message } = await request.json();

        if (!name || !email || !message) {
          return new Response(JSON.stringify({ error: "Campos obrigatórios faltando." }), {
            status: 400,
            headers: { "Content-Type": "application/json" }
          });
        }

        const resendApiKey = env.RESEND_API_KEY;
        if (!resendApiKey) {
          return new Response(JSON.stringify({ error: "Configuração RESEND_API_KEY faltando no painel do Cloudflare." }), {
            status: 500,
            headers: { "Content-Type": "application/json" }
          });
        }

        const resendResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "NGV Contato <onboarding@resend.dev>",
            to: "davydsonleal@gmail.com",
            subject: `Novo Contato de ${name}`,
            html: `<p><strong>Nome:</strong> ${name}</p><p><strong>E-mail:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`,
            reply_to: email,
          }),
        });

        const data = await resendResponse.json();
        return new Response(JSON.stringify(resendResponse.ok ? { success: true } : { error: data.message }), {
          status: resendResponse.status,
          headers: { "Content-Type": "application/json" }
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: "Erro interno no Worker: " + err.message }), {
          status: 500,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Se não for a API, ele tenta servir o site estático (comportamento padrão do Pages)
    return env.ASSETS.fetch(request);
  },
};
