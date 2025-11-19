# YildizTech Web Uygulaması

React + Vite + Tailwind tabanlı kurumsal web sitesi.

## Hızlı Başlangıç

PowerShell:

> npm install
> npm run dev

Vite geliştirme adresi terminalde görünür. Üretimde ve alt-dizin altında barındırma için uygulama, `/Yildiz-Tech/` köküne göre yapılandırılmıştır.

## Önemli Yapılandırmalar

- vite.config.js: `base: '/Yildiz-Tech/'`
- src/App.jsx: `BrowserRouter basename={import.meta.env.BASE_URL}`
 - Çok dillilik: `src/i18n/i18n.jsx` (TR/EN). Navbar’da dil geçişi.
 - Çerez onayı: `src/components/CookieConsent.jsx` (KVKK uyumlu tercih yönetimi).
 - WhatsApp CTA: `src/components/WhatsAppCTA.jsx` (sabit kayan buton).
 - GitHub projeleri: `src/components/GithubProjects.jsx` (kurucuların depoları).

## Sayfalar

- `/` — Anasayfa
- `/about` — Hakkımızda
- `/services` — Hizmetler (Çözümlerimiz)
- `/projects` — Projeler
- `/founders` — Kurucular
- `/support` — Destek
- `/kvkk` — KVKK Aydınlatma
- `/contact` — İletişim

## Yapılan Değişiklikler (19.11.2025)

- Alt dizin desteği: Router `basename` ayarlandı (src/App.jsx)
- Navbar: Blog/Hizmetler/Kurucular linkleri kaldırıldı; logo büyütüldü (src/components/Navbar.jsx)
- Footer: Dahili linkler düzeltildi; adres ve e-posta tıklanabilir; uyarı yazısı kaldırıldı (src/components/Footer.jsx)
- İletişim: Form gönderimi Gmail compose açacak şekilde ayarlandı (src/components/Contact.jsx)
- Form Gönderimi (opsiyonel): Formspree desteği + reCAPTCHA eklendi. `VITE_FORMSPREE_ID` ve `VITE_RECAPTCHA_SITE_KEY` sağlanırsa formdan gönderilir.
- KVKK: Sayfa ve navbar bağlantısı eklendi/iyileştirildi
 - GitHub Projeleri: Projeler sayfası otomatik GitHub feed ile güncellendi.
 - WhatsApp CTA: Tüm sayfalarda sabit “Teklif Al” butonu.
 - Çok Dillilik: TR/EN altyapısı ve Navbar etiketleri eklendi.

## İletişim Formu Davranışı
Formspree ile kullanmak için `.env` içine aşağıyı ekleyin (Vite yeniden başlatın):

```
VITE_FORMSPREE_ID=your_form_id
VITE_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
```

Contact formu reCAPTCHA checkbox'ını gösterir; doğrulanmadan gönderime izin vermez. Kimlikler sağlanmamışsa Gmail compose’a düşer.

Gönder'e bastığınızda yeni bir pencerede Gmail oluşturma ekranı açılır ve alıcı `info@yildiztech.com` olarak ayarlanır. Açılmazsa tarayıcı açılır pencere engelleyicisini kontrol edin.
