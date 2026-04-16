import express from "express";
import nodemailer from "nodemailer";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for sending email
  app.post("/api/send-email", async (req, res) => {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      console.warn("Tentativa de envio de e-mail com campos faltando:", { name, email, message });
      return res.status(400).json({ error: "Todos os campos (nome, email, mensagem) são obrigatórios." });
    }

    // Fallback directly provided by user for immediate functionality
    const user = process.env.SMTP_USER || process.env.EMAIL_USER || "davydsonleal@gmail.com";
    const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS || "xuzzogylqjyvyaoe";

    if (!user || !pass) {
      console.error("ERRO: Credenciais de e-mail não configuradas.");
      return res.status(500).json({ 
        error: "Servidor não configurado para enviar e-mails." 
      });
    }

    try {
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { 
          user: user.trim(), 
          pass: pass.replace(/\s+/g, '') // Remove spaces from app password if present
        },
      });

      const mailOptions = {
        from: user.trim(),
        to: "davydsonleal@gmail.com",
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
        replyTo: email
      };

      console.log(`Tentando enviar e-mail de ${email} para davydsonleal@gmail.com...`);
      const info = await transporter.sendMail(mailOptions);
      console.log("E-mail enviado com sucesso:", info.messageId);
      res.status(200).json({ success: true });
    } catch (error) {
      console.error("ERRO DETALHADO AO ENVIAR E-MAIL:", error);
      res.status(500).json({ 
        error: "Erro interno ao enviar e-mail. Verifique se a 'Senha de App' do Google está correta e se o e-mail não foi bloqueado." 
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running in ${process.env.NODE_ENV || 'development'} mode on http://localhost:${PORT}`);
  });
}

startServer();
