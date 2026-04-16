export const onRequest = async (context) => {
  const { request, env } = context;

  // Garantir que aceitamos apenas POST
  if (request.method !== "POST") {
    return new Response(JSON.stringify({ error: "Method not allowed. Use POST." }), { 
      status: 405,
      headers: { "Content-Type": "application/json" }
    });
  }

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
      return new Response(JSON.stringify({ error: "API Key do Resend não configurada no Cloudflare Variables." }), { 
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
        from: "NGV Teksystem <onboarding@resend.dev>",
        to: "davydsonleal@gmail.com",
        subject: `Novo Contato Sugerido: ${name}`,
        html: `
          <h3>Nova Mensagem do Site</h3>
          <p><strong>Nome:</strong> ${name}</p>
          <p><strong>E-mail:</strong> ${email}</p>
          <p><strong>Mensagem:</strong> ${message}</p>
        `,
        reply_to: email
      }),
    });

    const data = await resendResponse.json();

    if (resendResponse.ok) {
      return new Response(JSON.stringify({ success: true }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ error: data.message || "Erro no Resend" }), { 
        status: resendResponse.status,
        headers: { "Content-Type": "application/json" }
      });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro interno: " + err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
