import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Code2, 
  Smartphone, 
  Cloud, 
  BrainCircuit, 
  ChevronRight, 
  Cpu, 
  Globe, 
  ShieldCheck,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
  Terminal,
  MessageSquare,
  Send,
  X,
  CheckCircle2
} from 'lucide-react';

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatMessages, setChatMessages] = useState([
    { sender: 'bot', text: 'Olá! Como podemos ajudar com seu projeto de software hoje?' }
  ]);
  const [chatInput, setChatInput] = useState('');
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;
    
    setChatMessages(prev => [...prev, { sender: 'user', text: chatInput }]);
    setChatInput('');
    
    // Simulate bot response
    setTimeout(() => {
      setChatMessages(prev => [...prev, { 
        sender: 'bot', 
        text: 'Obrigado pela mensagem! Um de nossos especialistas entrará em contato em breve.' 
      }]);
    }, 1000);
  };

  const handleSendEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      message: formData.get('message'),
    };

    setFormStatus('sending');
    
    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const contentType = response.headers.get("content-type");
      
      if (response.ok) {
        setFormStatus('sent');
        setTimeout(() => setFormStatus('idle'), 3000);
        (e.target as HTMLFormElement).reset();
      } else {
        let errorMessage = 'Falha ao enviar e-mail.';
        
        if (response.status === 405) {
          errorMessage = "Erro 405: O Cloudflare não encontrou sua função. Verifique se a pasta 'functions' foi enviada corretamente no deploy.";
        } else if (response.status === 500) {
          errorMessage = "Erro 500: Verifique se a variável RESEND_API_KEY foi adicionada no painel do Cloudflare.";
        } else if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        }

        alert(errorMessage);
        setFormStatus('idle');
      }
    } catch (error) {
      console.error('Erro de conexão:', error);
      alert('Erro de conexão com o servidor do Cloudflare.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 font-sans selection:bg-cyan-500/30">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 border-b border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <div className="flex items-center gap-3">
              <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-teal-600 shadow-lg shadow-cyan-500/20">
                <Cpu className="w-6 h-6 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-200">
                  NGV TEKSYSTEM
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium -mt-1">
                  Solutions LTDA
                </span>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="flex items-center space-x-8">
                <a href="#inicio" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Início</a>
                <a href="#solucoes" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Soluções</a>
                <a href="#sobre" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Sobre Nós</a>
                <a href="#contato" className="text-sm font-medium text-slate-300 hover:text-cyan-400 transition-colors">Contato</a>
                <a href="#contato" className="px-5 py-2.5 text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-500 rounded-lg transition-all shadow-[0_0_20px_rgba(8,145,178,0.3)] hover:shadow-[0_0_25px_rgba(8,145,178,0.5)]">
                  Fale Conosco
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="inicio" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-cyan-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              Inovação Tecnológica
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8 leading-tight"
            >
              Transformando o Futuro com{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-teal-300 to-cyan-500">
                Software Inteligente
              </span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed"
            >
              A NGV Teksystem desenvolve soluções de software sob medida, escaláveis e seguras para impulsionar a transformação digital da sua empresa.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <a href="#solucoes" className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-white bg-cyan-600 hover:bg-cyan-500 rounded-xl transition-all shadow-[0_0_30px_rgba(8,145,178,0.4)] hover:shadow-[0_0_40px_rgba(8,145,178,0.6)] flex items-center justify-center gap-2">
                Conheça Nossos Produtos
                <ArrowRight className="w-5 h-5" />
              </a>
              <a href="#contato" className="w-full sm:w-auto px-8 py-4 text-base font-semibold text-slate-300 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 rounded-xl transition-all flex items-center justify-center gap-2">
                Agendar Demonstração
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solucoes" className="py-24 bg-slate-900/50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Nossas Soluções de Software</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              Desenvolvemos um ecossistema completo de tecnologias para atender às necessidades específicas do seu negócio.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-cyan-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-xl bg-cyan-500/10 flex items-center justify-center mb-6 border border-cyan-500/20 text-cyan-400">
                <Code2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Sistemas de Gestão (ERP)</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Plataformas robustas para integrar e automatizar todos os processos da sua empresa em um único lugar.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-teal-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-xl bg-teal-500/10 flex items-center justify-center mb-6 border border-teal-500/20 text-teal-400">
                <Smartphone className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Aplicativos Mobile</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Apps nativos e híbridos de alta performance para iOS e Android, focados na experiência do usuário.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-blue-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-xl bg-blue-500/10 flex items-center justify-center mb-6 border border-blue-500/20 text-blue-400">
                <Cloud className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">Soluções em Nuvem</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Arquitetura cloud escalável, segura e de alta disponibilidade para hospedar suas aplicações críticas.
              </p>
            </motion.div>

            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-slate-950 border border-slate-800 p-8 rounded-2xl hover:border-purple-500/50 transition-colors group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 rounded-bl-full -mr-8 -mt-8 transition-transform group-hover:scale-110" />
              <div className="w-14 h-14 rounded-xl bg-purple-500/10 flex items-center justify-center mb-6 border border-purple-500/20 text-purple-400">
                <BrainCircuit className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold mb-3">IA & Analytics</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-6">
                Sistemas inteligentes que transformam dados em insights acionáveis para tomada de decisão.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sobre Nós Section */}
      <section id="sobre" className="py-24 relative overflow-hidden bg-slate-900/40 border-y border-slate-800/50">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-cyan-500/10 blur-[120px] rounded-full" />
          <div className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] bg-teal-500/10 blur-[120px] rounded-full" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium mb-6">
                <Terminal className="w-4 h-4" />
                Nossa História
              </div>
              <h2 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
                Nascidos no futuro.<br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-teal-300">
                  Fundada em Março de 2026.
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-6 leading-relaxed">
                A NGV Teksystem Solutions surgiu com uma proposta clara e ambiciosa: redefinir o padrão de excelência no desenvolvimento de software corporativo. Em um mundo onde a tecnologia avança exponencialmente, nascemos já adaptados às demandas da nova era digital.
              </p>
              <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                Nossa equipe de engenheiros e arquitetos de software trabalha incansavelmente para entregar soluções que não apenas resolvem problemas atuais, mas preparam sua empresa para os desafios de amanhã.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="border-l-2 border-cyan-500 pl-4">
                  <h4 className="text-2xl font-bold text-white mb-1">Missão</h4>
                  <p className="text-sm text-slate-400">Democratizar a alta tecnologia para empresas de todos os portes.</p>
                </div>
                <div className="border-l-2 border-teal-500 pl-4">
                  <h4 className="text-2xl font-bold text-white mb-1">Visão</h4>
                  <p className="text-sm text-slate-400">Ser a principal referência em inovação de software no Brasil.</p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative flex justify-center"
            >
              <div className="aspect-square w-full max-w-md rounded-full border border-slate-800/60 p-8 relative animate-[spin_60s_linear_infinite]">
                <div className="w-full h-full rounded-full border border-dashed border-cyan-500/30 p-8">
                  <div className="w-full h-full rounded-full border border-teal-500/20 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                    <Cpu className="w-24 h-24 text-cyan-400/50 animate-pulse" />
                  </div>
                </div>
                {/* Orbiting dots */}
                <div className="absolute top-0 left-1/2 w-4 h-4 bg-cyan-400 rounded-full shadow-[0_0_15px_#22d3ee] -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 left-1/2 w-3 h-3 bg-teal-400 rounded-full shadow-[0_0_15px_#2dd4bf] -translate-x-1/2 translate-y-1/2" />
                <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-400 rounded-full shadow-[0_0_10px_#60a5fa] -translate-x-1/2 -translate-y-1/2" />
              </div>
              
              {/* Floating Info Card */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900/90 backdrop-blur-md border border-slate-700 p-6 rounded-2xl shadow-2xl w-64 text-center">
                <div className="text-cyan-400 font-mono text-sm mb-2">status: online</div>
                <div className="text-2xl font-bold text-white mb-1">100%</div>
                <div className="text-xs text-slate-400 uppercase tracking-wider">Foco em Inovação</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contato Section */}
      <section id="contato" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Fale Conosco</h2>
              <p className="text-slate-400 mb-10 text-lg">
                Tem um projeto em mente? Nossa equipe está pronta para transformar sua visão em realidade com tecnologia de ponta.
              </p>
              
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Telefone / WhatsApp</h4>
                    <p className="text-slate-400">+55 (31) 98379-8755</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">E-mail</h4>
                    <p className="text-slate-400">davydsonleal@gmail.com</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 shrink-0">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">Endereço</h4>
                    <p className="text-slate-400">
                      Rua Gil Carvalho, 104<br/>
                      Bairro Monte Carlo<br/>
                      Santa Luiza - MG<br/>
                      CEP 33.172-140
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Contact Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-[80px] pointer-events-none" />
              <h3 className="text-2xl font-bold mb-6">Envio de e-mail automático</h3>
              
              <form onSubmit={handleSendEmail} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Nome Completo</label>
                  <input name="name" required type="text" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="Seu nome" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">E-mail Corporativo</label>
                  <input name="email" required type="email" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all" placeholder="seu@email.com" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-400 mb-1">Mensagem</label>
                  <textarea name="message" required rows={4} className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all resize-none" placeholder="Como podemos ajudar?"></textarea>
                </div>
                
                <button 
                  type="submit" 
                  disabled={formStatus !== 'idle'}
                  className="w-full py-4 text-base font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-xl transition-all shadow-[0_0_20px_rgba(34,211,238,0.2)] hover:shadow-[0_0_30px_rgba(34,211,238,0.4)] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {formStatus === 'idle' && (
                    <>Enviar Mensagem <Send className="w-4 h-4" /></>
                  )}
                  {formStatus === 'sending' && (
                    <span className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      Enviando...
                    </span>
                  )}
                  {formStatus === 'sent' && (
                    <>Enviado com Sucesso! <CheckCircle2 className="w-5 h-5" /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
            <div className="col-span-1 lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-teal-600">
                  <Cpu className="w-5 h-5 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-lg font-bold tracking-tight text-slate-100">
                    NGV TEKSYSTEM
                  </span>
                  <span className="text-[9px] uppercase tracking-widest text-slate-400 font-medium -mt-1">
                    Solutions LTDA
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-sm max-w-md mb-6">
                Desenvolvemos soluções tecnológicas inovadoras para empresas que buscam liderança e eficiência no mercado digital.
              </p>
              <div className="inline-flex items-center px-3 py-1.5 rounded-md bg-slate-900 border border-slate-800 text-xs font-mono text-slate-300">
                CNPJ: 65.736.447/0001-79
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Soluções</h4>
              <ul className="space-y-3">
                <li><a href="#solucoes" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Sistemas ERP</a></li>
                <li><a href="#solucoes" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Aplicativos Mobile</a></li>
                <li><a href="#solucoes" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Cloud Computing</a></li>
                <li><a href="#solucoes" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Inteligência Artificial</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white font-semibold mb-6">Links Rápidos</h4>
              <ul className="space-y-3">
                <li><a href="#inicio" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Início</a></li>
                <li><a href="#sobre" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Sobre Nós</a></li>
                <li><a href="#contato" className="text-slate-400 hover:text-cyan-400 text-sm transition-colors">Contato</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} NGV Teksystem Solutions LTDA. Todos os direitos reservados.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Termos de Uso</a>
              <a href="#" className="text-slate-500 hover:text-white transition-colors text-sm">Política de Privacidade</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Chat */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
        <AnimatePresence>
          {isChatOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.9 }}
              className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-80 mb-4 overflow-hidden flex flex-col"
            >
              <div className="bg-gradient-to-r from-cyan-600 to-teal-600 p-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                    <Cpu className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-semibold text-sm">NGV Assistant</h4>
                    <p className="text-cyan-100 text-xs">Online agora</p>
                  </div>
                </div>
                <button onClick={() => setIsChatOpen(false)} className="text-white/80 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="h-64 p-4 overflow-y-auto flex flex-col gap-3 bg-slate-950">
                {chatMessages.map((msg, i) => (
                  <div key={i} className={`max-w-[85%] p-3 rounded-xl text-sm ${msg.sender === 'bot' ? 'bg-slate-800 text-slate-200 self-start rounded-tl-none' : 'bg-cyan-600 text-white self-end rounded-tr-none'}`}>
                    {msg.text}
                  </div>
                ))}
              </div>
              
              <form onSubmit={handleSendMessage} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
                <input 
                  type="text" 
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  placeholder="Digite sua mensagem..." 
                  className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-cyan-500"
                />
                <button type="submit" className="bg-cyan-600 hover:bg-cyan-500 text-white p-2 rounded-lg transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </form>
            </motion.div>
          )}
        </AnimatePresence>

        <button 
          onClick={() => setIsChatOpen(!isChatOpen)}
          className="w-14 h-14 bg-cyan-600 hover:bg-cyan-500 text-white rounded-full shadow-[0_0_20px_rgba(8,145,178,0.4)] flex items-center justify-center transition-transform hover:scale-110"
        >
          {isChatOpen ? <X className="w-6 h-6" /> : <MessageSquare className="w-6 h-6" />}
        </button>
      </div>
    </div>
  );
}
