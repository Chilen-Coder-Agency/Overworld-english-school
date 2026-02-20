/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, Globe, BookOpen, MessageSquare, X, Instagram, Facebook } from 'lucide-react';

export default function App() {
  const [formData, setFormData] = useState({
    nome: '',
    idade: '',
    nivel: 'Iniciante'
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [modalContent, setModalContent] = useState<'privacy' | 'terms' | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSelectPlan = (planName: string) => {
    if (!formSubmitted) {
      document.getElementById('form-section')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    const { nome, idade, nivel } = formData;
    const message = `Olá! Meu nome é ${nome}, tenho ${idade} anos e meu nível é ${nivel}. Escolhi o plano *${planName}* e quero saber mais sobre o curso Oneworld English.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/258872201674?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  const scrollToPricing = () => {
    document.getElementById('pricing-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const Modal = ({ type, onClose }: { type: 'privacy' | 'terms', onClose: () => void }) => (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-oneworld-navy/80 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
        className="bg-white rounded-3xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto relative shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 p-2 hover:bg-slate-100 rounded-full transition-colors">
          <X className="w-6 h-6 text-slate-400" />
        </button>
        
        {type === 'privacy' ? (
          <div className="prose prose-slate">
            <h2 className="text-3xl font-black text-oneworld-navy mb-6">Política de Privacidade</h2>
            <p>A <strong>Oneworld English</strong> valoriza a sua privacidade. Esta política descreve como recolhemos e utilizamos os seus dados.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">1. Recolha de Dados</h3>
            <p>Recolhemos o seu nome, idade e nível de inglês através do nosso formulário de contacto para personalizar o seu atendimento.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">2. Uso de Informações</h3>
            <p>Os dados são utilizados exclusivamente para o redirecionamento ao WhatsApp e para que os nossos consultores possam oferecer o melhor plano de estudos.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">3. Partilha de Dados</h3>
            <p>Não partilhamos os seus dados pessoais com terceiros para fins comerciais.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">4. Segurança</h3>
            <p>Implementamos medidas de segurança para proteger as suas informações contra acesso não autorizado.</p>
          </div>
        ) : (
          <div className="prose prose-slate">
            <h2 className="text-3xl font-black text-oneworld-navy mb-6">Termos e Condições</h2>
            <p>Ao utilizar este site, você concorda com os seguintes termos:</p>
            <h3 className="text-xl font-bold mt-6 mb-2">1. Uso do Serviço</h3>
            <p>Este site destina-se à captura de leads para os cursos de inglês da Oneworld English.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">2. Inscrição</h3>
            <p>O preenchimento do formulário não garante vaga imediata. A matrícula será confirmada após contacto com o consultor e pagamento da taxa correspondente.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">3. Pagamentos</h3>
            <p>Os valores apresentados (1.000 MT, 1.800 MT e 3.000 MT) referem-se a mensalidades e podem sofrer alterações com aviso prévio.</p>
            <h3 className="text-xl font-bold mt-6 mb-2">4. Propriedade Intelectual</h3>
            <p>Todo o conteúdo deste site, incluindo logotipos e textos, é propriedade da Oneworld English.</p>
          </div>
        )}
      </motion.div>
    </motion.div>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <AnimatePresence>
        {modalContent && <Modal type={modalContent} onClose={() => setModalContent(null)} />}
      </AnimatePresence>
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-md z-50 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTskUvTHGvzblFexdUV5VhE5ecC4XcSpkb7wNyiazLlpCW1ZEXd" 
              alt="Oneworld English Logo" 
              className="w-12 h-12 rounded-full border-2 border-oneworld-navy object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tighter text-oneworld-navy leading-none">Oneworld</span>
              <div className="flex items-center gap-1">
                <div className="h-[1px] flex-1 bg-oneworld-red"></div>
                <span className="text-[10px] font-bold tracking-[0.2em] text-oneworld-red">ENGLISH</span>
                <div className="h-[1px] flex-1 bg-oneworld-red"></div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-48 overflow-hidden min-h-[80vh] flex items-center">
        <div className="absolute inset-0 -z-10">
          <img 
            src="https://www.moneytimes.com.br/uploads/2022/02/img-4-notetablet.jpg" 
            alt="Background" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Navy Blue Overlay with Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-oneworld-navy via-oneworld-navy/90 to-oneworld-navy/40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl lg:text-7xl font-black text-white leading-[1.1] mb-6">
              Fale Inglês com <span className="text-oneworld-red">Confiança</span> e Transforme o seu Futuro.
            </h1>
            <p className="text-xl text-white/80 mb-8 max-w-lg">
              Metodologia prática focada em resultados reais. Do zero à fluência com suporte personalizado e pacotes que cabem no seu bolso.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <CheckCircle className="text-oneworld-red w-5 h-5" />
                <span className="font-medium text-white">Fluência Acelerada</span>
              </div>
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-lg border border-white/20">
                <CheckCircle className="text-oneworld-red w-5 h-5" />
                <span className="font-medium text-white">Suporte 24/7 via WhatsApp</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form-section" className="py-20 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white rounded-[2rem] shadow-xl overflow-hidden border border-slate-100"
          >
            <div className="bg-oneworld-navy p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-2">Dê o Primeiro Passo Hoje</h2>
              <p className="text-white/70">Preencha os seus dados e receba uma consultoria gratuita para o seu nível.</p>
            </div>
            
            <form onSubmit={handleSubmit} className="p-8 lg:p-12 space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    placeholder="Ex: João Silva"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-oneworld-navy focus:bg-white outline-none transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Idade</label>
                  <input 
                    required
                    type="number" 
                    min="5"
                    name="idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    placeholder="Sua idade"
                    className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-oneworld-navy focus:bg-white outline-none transition-all"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-bold uppercase tracking-wider text-slate-500 ml-1">Nível de Inglês</label>
                <select 
                  name="nivel"
                  value={formData.nivel}
                  onChange={handleInputChange}
                  className="w-full px-6 py-4 rounded-xl bg-slate-50 border-2 border-transparent focus:border-oneworld-navy focus:bg-white outline-none transition-all appearance-none cursor-pointer"
                >
                  <option value="Iniciante">Iniciante</option>
                  <option value="Intermédio">Intermédio</option>
                  <option value="Avançado">Avançado</option>
                </select>
              </div>

              <button 
                type="submit"
                className="w-full bg-oneworld-navy hover:bg-oneworld-navy/90 text-white p-4 md:p-6 rounded-2xl font-bold text-lg md:text-xl flex flex-col md:flex-row items-center justify-center gap-2 md:gap-3 shadow-lg shadow-oneworld-navy/20 transition-all active:scale-[0.98] group"
              >
                <CheckCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
                <span className="text-center">Confirmar Dados e Escolher Meu Plano</span>
              </button>
              
              <p className="text-center text-slate-400 text-sm">
                Ao clicar, você será redirecionado para o nosso WhatsApp oficial.
              </p>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing-section" className="py-20 bg-white relative">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            {formSubmitted && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="inline-block bg-oneworld-red text-white px-6 py-2 rounded-full font-bold shadow-lg mb-8 text-sm md:text-base"
              >
                ✓ Dados confirmados! Agora escolha o seu plano abaixo.
              </motion.div>
            )}
            <h2 className="text-4xl font-black text-oneworld-navy mb-4">Escolha o Seu Pacote</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Selecione o plano ideal para o seu objetivo. Ao clicar, você será redirecionado para o WhatsApp com os seus dados.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2rem] bg-slate-50 border-2 flex flex-col transition-all ${formSubmitted ? 'border-oneworld-red shadow-xl' : 'border-slate-100'}`}
            >
              <h3 className="text-xl font-bold mb-2">Essencial</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-oneworld-navy">349</span>
                <span className="text-slate-500 font-bold ml-1">MT/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>2 aulas por semana</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Material digital incluso</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Acesso ao grupo de estudos</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('Essencial')} 
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${formSubmitted ? 'bg-whatsapp-green text-white shadow-lg' : 'border-2 border-oneworld-navy text-oneworld-navy hover:bg-oneworld-navy hover:text-white'}`}
              >
                {formSubmitted && <MessageSquare className="w-5 h-5" />}
                {formSubmitted ? 'Finalizar no WhatsApp' : 'Selecionar Plano'}
              </button>
            </motion.div>

            {/* Standard Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2rem] bg-oneworld-navy text-white flex flex-col shadow-2xl relative overflow-hidden transition-all ${formSubmitted ? 'ring-4 ring-oneworld-red' : ''}`}
            >
              <div className="absolute top-4 right-4 bg-oneworld-red text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Popular</div>
              <h3 className="text-xl font-bold mb-2">Plus</h3>
              <div className="mb-6">
                <span className="text-4xl font-black">1 000</span>
                <span className="text-white/70 font-bold ml-1">MT/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>4 aulas por semana</span>
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Acesso ao grupo de estudos</span>
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Plano de estudos individualizado</span>
                </li>
                <li className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Material didático incluso</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('Plus')} 
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${formSubmitted ? 'bg-whatsapp-green text-white shadow-lg' : 'bg-oneworld-red text-white hover:bg-oneworld-red/90'}`}
              >
                {formSubmitted && <MessageSquare className="w-5 h-5" />}
                {formSubmitted ? 'Finalizar no WhatsApp' : 'Selecionar Plano'}
              </button>
            </motion.div>

            {/* Premium Plan */}
            <motion.div 
              whileHover={{ y: -10 }}
              className={`p-8 rounded-[2rem] bg-slate-50 border-2 flex flex-col transition-all ${formSubmitted ? 'border-oneworld-red shadow-xl' : 'border-slate-100'}`}
            >
              <h3 className="text-xl font-bold mb-2">Premium (domicílio)</h3>
              <div className="mb-6">
                <span className="text-4xl font-black text-oneworld-navy">2 750</span>
                <span className="text-slate-500 font-bold ml-1">MT/mês</span>
              </div>
              <ul className="space-y-4 mb-8 flex-1">
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>3 aulas particulares por semana</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Material didático incluso</span>
                </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Plano de estudos individualizado</span>
                  </li>
                <li className="flex items-center gap-2 text-slate-600">
                  <CheckCircle className="text-oneworld-red w-5 h-5 shrink-0" />
                  <span>Grupo de estudo e interação com professores</span>
                </li>
              </ul>
              <button 
                onClick={() => handleSelectPlan('Premium (domicílio)')} 
                className={`w-full py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 ${formSubmitted ? 'bg-whatsapp-green text-white shadow-lg' : 'border-2 border-oneworld-navy text-oneworld-navy hover:bg-oneworld-navy hover:text-white'}`}
              >
                {formSubmitted && <MessageSquare className="w-5 h-5" />}
                {formSubmitted ? 'Finalizar no WhatsApp' : 'Selecionar Plano'}
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-oneworld-navy rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-oneworld-navy/20">
                <Globe className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Alcance Global</h3>
              <p className="text-slate-600">Prepare-se para o mundo com um vocabulário rico e atualizado.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-oneworld-red rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-oneworld-red/20">
                <BookOpen className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Gramática Simplificada</h3>
              <p className="text-slate-600">Entenda as regras de forma lógica e sem decoreba cansativa.</p>
            </div>
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-100 hover:shadow-lg transition-all">
              <div className="w-14 h-14 bg-whatsapp-green rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-emerald-200">
                <Send className="text-white w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">Suporte Direto</h3>
              <p className="text-slate-600">Tire suas dúvidas diretamente com nossos consultores especializados.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-oneworld-navy py-12 text-white mt-auto">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTskUvTHGvzblFexdUV5VhE5ecC4XcSpkb7wNyiazLlpCW1ZEXd" 
              alt="Oneworld English Logo" 
              className="w-10 h-10 rounded-full border border-white/30 object-cover bg-white"
              referrerPolicy="no-referrer"
            />
            <span className="text-xl font-bold">Oneworld English</span>
          </div>
          <p className="text-white/50 text-sm">© 2026 Oneworld English. Todos os direitos reservados.</p>
          <div className="flex flex-col items-center md:items-end gap-4">
            <div className="flex gap-4">
              <a 
                href="https://instagram.com/Maybe_Wesley" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-oneworld-red transition-colors group"
                title="Instagram: Maybe_Wesley"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com/Maybe_Wesley" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 bg-white/10 rounded-full hover:bg-oneworld-red transition-colors group"
                title="Facebook: Maybe_Wesley"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
            <div className="flex gap-6">
              <button onClick={() => setModalContent('terms')} className="text-white/70 hover:text-white transition-colors text-sm">Termos</button>
              <button onClick={() => setModalContent('privacy')} className="text-white/70 hover:text-white transition-colors text-sm">Privacidade</button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
