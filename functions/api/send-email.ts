export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Campos faltando" }), { status: 400 });
    }

    // Usaremos a API do Resend (é a forma mais estável no Cloudflare)
    // O usuário precisará colocar a key 'RESEND_API_KEY' nas variáveis do Cloudflare
    const resendApiKey = env.RESEND_API_KEY;

    if (!resendApiKey) {
      return new Response(JSON.stringify({ error: "Configuração de e-mail pendente no Cloudflare (RESEND_API_KEY faltando)." }), { status: 500 });
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "NGV Contato <onboarding@resend.dev>",
        to: "davydsonleal@gmail.com",
        subject: `Nova mensagem de ${name}`,
        html: `<p><strong>Nome:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Mensagem:</strong> ${message}</p>`,
      }),
    });

    if (response.ok) {
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } else {
      const error = await response.json();
      return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro interno: " + err.message }), { status: 500 });
  }
}
