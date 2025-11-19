import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

const I18nContext = createContext({ lang: 'tr', t: (k)=>k, setLang: ()=>{} });
const STORAGE_KEY = 'lang';

const dict = {
  tr: {
    home: 'Anasayfa', about: 'Hakkımızda', services: 'Hizmetler', projects: 'Referanslar', founders: 'Kurucular', contact: 'İletişim', kvkk: 'KVKK', support: 'Destek',
    projects_title: 'Projelerimiz', projects_desc: 'Kurucuların GitHub profillerinden öne çıkan depolar otomatik listelenir. Filtrelerden sahibi veya dile göre daraltabilirsiniz.'
  },
  en: {
    home: 'Home', about: 'About', services: 'Services', projects: 'Projects', founders: 'Founders', contact: 'Contact', kvkk: 'KVKK', support: 'Support',
    projects_title: 'Our Projects', projects_desc: 'Highlighted repositories from the founders’ GitHub profiles. Filter by owner or language.'
  }
};

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState('tr');
  useEffect(()=>{ const saved = localStorage.getItem(STORAGE_KEY); if (saved) setLang(saved); }, []);
  const value = useMemo(()=> ({
    lang,
    setLang: (l)=> { setLang(l); localStorage.setItem(STORAGE_KEY, l); },
    t: (k)=> (dict[lang] && dict[lang][k]) || (dict.tr[k]) || k
  }), [lang]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export const useI18n = () => useContext(I18nContext);
