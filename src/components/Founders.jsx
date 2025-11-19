import React from 'react';
import { motion } from 'framer-motion';
import mahmutImg from '../../Photos/mahmut.jpeg';
import muhhametImg from '../../Photos/muhhamet.jpeg';
import yildizImg from '../../Photos/yıldız.jpeg';

const founders = [
  {
    name: 'Mahmut Sibal',
    title: 'Yapay Zeka Destekli Programlama Uzmanı',
  img: mahmutImg,
    email: 'mahmutsibal9@gmail.com',
    phone: '+90 536 898 38 55',
    linkedin: 'https://www.linkedin.com/in/mahmut-sibal-980a17368/',
    github: 'https://github.com/MahmutSibal',
    bio: 'Model destekli kod üretimi, çok ajanlı mimariler ve üretken yapay zeka entegrasyonlarında derin tecrübe.'
  },
  {
    name: 'Muhammet Öner',
    title: 'Ürün & İş Geliştirme Yöneticisi',
  img: muhhametImg,
    email: 'muhammet@example.com',
    phone: '',
    linkedin: 'https://www.linkedin.com/in/muhammet-%C3%B6ner-b245a9302?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    github: 'https://github.com/muhammetoner',
    bio: 'Strateji, ürün yönetimi ve müşteri odaklı çözümler geliştirmede deneyimli lider.'
  },
  {
    name: 'Yıldız Uçucu',
    title: 'Gömülü Yazılım Sistemler Uzmanı',
  img: yildizImg,
    email: 'ucucuyildiz21@gmail.com',
    phone: '+90 535 309 74 36',
    linkedin: 'https://www.linkedin.com/in/y%C4%B1ld%C4%B1zucucu2112?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app',
    github: 'https://github.com/yldzucucu21',
    bio: 'Gerçek zamanlı işletim sistemleri, donanım yakın yazılım ve güvenilirlik mühendisliği odaklı.'
  }
];

const Founders = () => {
  return (
    <section className="relative py-32 px-6 max-w-6xl mx-auto" id="founders">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h2 className="text-4xl font-bold gradient-text">Kurucular</h2>
        <p className="mt-4 text-gray-300">Disiplinler arası yaklaşım ile inovasyonu uçtan uca yöneten çekirdek ekip.</p>
      </div>
      <div className="grid md:grid-cols-2 gap-10">
        {founders.map((f,i)=>(
          <motion.div key={f.name} initial={{opacity:0, y:30}} whileInView={{opacity:1, y:0}} viewport={{once:true}} transition={{delay:i*0.2}} className="glass rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center">
            <img src={f.img} alt={f.name} className="w-40 h-40 object-cover rounded-2xl ring-2 ring-brand-500/40" />
            <div>
              <h3 className="text-2xl font-semibold">{f.name}</h3>
              <p className="mt-1 text-brand-300 text-sm uppercase tracking-wider font-medium">{f.title}</p>
              <p className="mt-4 text-gray-300 text-sm leading-relaxed">{f.bio}</p>
              <div className="mt-4 flex flex-wrap items-center gap-3 text-xs">
                <a href={`mailto:${f.email}`} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-brand-400 transition">E-posta</a>
                <a href={`https://wa.me/${f.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-brand-500/10 border border-brand-500/40 text-brand-300 hover:bg-brand-500/20 transition">WhatsApp</a>
                <a href={f.linkedin} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-brand-400 transition">LinkedIn</a>
                <a href={f.github} target="_blank" rel="noreferrer" className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 hover:border-brand-400 transition">GitHub</a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Founders;
