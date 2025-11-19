import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';

// İşletme WhatsApp sabit numarası
const BUSINESS_WHATSAPP = '905521643855';
// Muhammet arkadaş numarası (tel erişim için)
const MUHAMMET_TEL = '+90 546 153 21 18';

const Contact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState('idle');
  const [error, setError] = useState('');
  const recaptchaRef = useRef(null);

  const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID;
  const RECAPTCHA_SITE_KEY = import.meta.env.VITE_RECAPTCHA_SITE_KEY;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!FORMSPREE_ID) {
      // fallback: Gmail compose
      const subject = encodeURIComponent('Web sitesi iletişim formu');
      const body = encodeURIComponent(`Ad: ${name}\nE-posta: ${email}\n\nMesaj:\n${message}`);
      const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=info@yildiztech.com&su=${subject}&body=${body}`;
      window.open(gmailUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    let recaptchaToken = '';
    if (RECAPTCHA_SITE_KEY && window.grecaptcha) {
      recaptchaToken = window.grecaptcha.getResponse();
      if (!recaptchaToken) {
        setError('Lütfen reCAPTCHA doğrulamasını tamamlayın.');
        return;
      }
    }

    setStatus('submitting');
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, 'g-recaptcha-response': recaptchaToken })
      });
      const data = await res.json().catch(()=>({}));
      if (res.ok) {
        setStatus('success');
        setName(''); setEmail(''); setMessage('');
        if (window.grecaptcha && RECAPTCHA_SITE_KEY) window.grecaptcha.reset();
      } else {
        setStatus('error');
        setError(data?.error || 'Gönderim sırasında bir sorun oluştu.');
      }
    } catch (err) {
      setStatus('error');
      setError('Ağ hatası. Lütfen tekrar deneyin.');
    }
  };
  return (
    <section id="contact" className="relative py-32 px-6 max-w-5xl mx-auto">
      <div className="text-center mb-14 max-w-2xl mx-auto">
        <h2 className="text-4xl font-bold gradient-text">İletişim</h2>
        <p className="mt-4 text-gray-300">İhtiyaçlarınıza özel bir keşif görüşmesi planlayalım. 48 saat içinde dönüş yapıyoruz.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        <form onSubmit={handleSubmit} className="glass rounded-2xl p-8 flex flex-col gap-5">
          <input value={name} onChange={(e)=>setName(e.target.value)} required placeholder="Ad Soyad" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <input value={email} onChange={(e)=>setEmail(e.target.value)} required type="email" placeholder="E-posta" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          <textarea value={message} onChange={(e)=>setMessage(e.target.value)} required rows={5} placeholder="Mesajınız" className="px-4 py-3 rounded-lg bg-white/5 border border-white/10 focus:outline-none focus:ring-2 focus:ring-brand-500" />
          {RECAPTCHA_SITE_KEY && (
            <div className="g-recaptcha" data-sitekey={RECAPTCHA_SITE_KEY} ref={recaptchaRef}></div>
          )}
          <button disabled={status==='submitting'} type="submit" className="mt-2 px-6 py-3 rounded-lg bg-brand-500 hover:bg-brand-400 font-medium transition disabled:opacity-60">{status==='submitting' ? 'Gönderiliyor…' : 'Gönder'}</button>
          {status==='success' && <p className="text-xs text-green-400">Teşekkürler! Mesajınız alındı.</p>}
          {error && <p className="text-xs text-red-400">{error}</p>}
          {!FORMSPREE_ID && <p className="text-xs text-gray-400">Not: Geçici olarak Gmail compose ile gönderim yapılır. Formspree için `VITE_FORMSPREE_ID` eklenirse doğrudan formdan gönderilir.</p>}
        </form>
        <div className="space-y-8">
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">Hızlı Erişim</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><span className="text-white">Genel WhatsApp (İşletme):</span> <a className="text-brand-300 hover:underline" href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noreferrer">+90 552 164 38 55</a></li>
              <li><span className="text-white">Mahmut Sibal (WhatsApp):</span> <a className="text-brand-300 hover:underline" href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noreferrer">+90 552 164 38 55</a></li>
              <li><span className="text-white">Yıldız Uçucu (WhatsApp):</span> <a className="text-brand-300 hover:underline" href={`https://wa.me/${BUSINESS_WHATSAPP}`} target="_blank" rel="noreferrer">+90 552 164 38 55</a></li>
              <li><span className="text-white font-bold text-brand-400">Muhammet Öner (İletişim):</span> <a className="text-white hover:text-brand-300 hover:underline font-medium" href="tel:+905461532118" rel="noreferrer">{MUHAMMET_TEL}</a></li>
              <li><span className="text-white">E-posta:</span> info@yildiztech.com (örnek)</li>
              <li><span className="text-white">LinkedIn:</span> /company/yildiztech</li>
              <li><span className="text-white">GitHub:</span> /yildiztech</li>
            </ul>
          </motion.div>
          <motion.div initial={{opacity:0}} whileInView={{opacity:1}} viewport={{once:true}} className="glass rounded-2xl p-6">
            <h3 className="font-semibold text-lg mb-2">Neden Biz?</h3>
            <p className="text-sm text-gray-300 leading-relaxed">Model tabanlı üretken geliştirme, firmware optimizasyonu ve sistem seviyesi entegrasyon becerilerini aynı çatı altında topluyoruz. Risk azaltıcı hızlı prototip + güvenilir ölçekleme yaklaşımı.</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
