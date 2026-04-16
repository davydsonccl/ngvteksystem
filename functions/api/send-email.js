export async function onRequestPost(context) {
  const { request, env } = context;

  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return new Response(JSON.stringify({ error: "Dados incompletos." }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    const apiKey = env.RESEND_API_KEY;
    if (!apiKey) {
      return new Response(JSON.stringify({ error: "RESEND_API_KEY não configurada no painel do Cloudflare." }), { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      });
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Contato NGV <onboarding@resend.dev>",
        to: "davydsonleal@gmail.com",
        subject: `Novo Contato de ${name}`,
        html: `<strong>Nome:</strong> ${name}<br><strong>Email:</strong> ${email}<br><strong>Mensagem:</strong> ${message}`,
        reply_to: email,
      }),
    });

    const result = await resendResponse.json();

    return new Response(JSON.stringify(resendResponse.ok ? { success: true } : { error: result.message }), {
      status: resendResponse.status,
      headers: { "Content-Type": "application/json" }
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: "Erro interno: " + err.message }), { 
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
}
