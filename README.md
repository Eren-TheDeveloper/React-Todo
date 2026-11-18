# Alışkanlık Takibi

React, TypeScript ve Vite ile günlük alışkanlık takibi.

## Çalıştırma

Node.js 22.18+ ve npm gerekir. Tekrarlanabilir kurulum için `.nvmrc` içindeki Node.js 22.23.1 ve Node ile gelen npm 10 önerilir.

```sh
npm ci
npm run dev
```

## Kontroller

Tüm kontrolleri tek komutla çalıştır:

```sh
npm run check
```

Kontrolleri ayrı ayrı çalıştırmak veya üretim çıktısını önizlemek için:

```sh
npm run lint
npm test
npm run build
npm run preview
```

Testler kayıt doğrulamasını, gün işaretlemeyi, gelecek tarih engelini ve seri hesabını kapsar. Üretim çıktısı `dist/` klasörüne yazılır.

## Özellikler

- Boşlukları temizleyerek alışkanlık ekleme; boş, 80 karakterden uzun ve aynı adlı girdileri engelleme.
- Günleri tamamlandı olarak işaretleme ve işareti kaldırma. Gelecek günler kapalıdır.
- Pazartesi başlayan haftalar arasında gezinme ve mevcut haftaya dönme.
- Bugünkü ilerleme, haftalık tamamlanma sayısı ve günlük seri. Bugün henüz tamamlanmadıysa dün biten seri korunur; kaçırılan gün seriyi sıfırlar.
- Silme ve son silinen alışkanlığı geri alma. Aynı adla yeniden alışkanlık eklenirse önceki geri alma kaldırılır.
- Türkçe tarihler, mobil düzen, klavye odağı ve ekran okuyucu etiketleri.

## Veri saklama

Veriler `habit-tracker:v1` anahtarıyla bu tarayıcının localStorage alanında saklanır; farklı cihazlar veya sekmeler arasında canlı eşitleme yoktur. Tarayıcı verilerini temizlemek kayıtları kaldırır. Son silmeyi geri alma bilgisi sayfa yenilenince kaybolur.

Bozuk kayıt algılanırsa kayıt otomatik olarak ezilmez. Ekrandaki yeni kayıt düğmesi, mevcut listeyi kaydederek eski kaydın üzerine yazmayı sağlar. Depolama kullanılamıyorsa uygulama uyarı gösterir ve oturum boyunca çalışmaya devam eder.

Günler cihazın yerel saatine göre hesaplanır. Açık sayfada tarih düzenli olarak ve pencereye dönüldüğünde güncellenir.

## GitHub'a gönderme

GitHub üzerinde boş bir depo oluştur; başlangıçta README, lisans veya gitignore ekleme. Bu proje için yerel `main` dalı hazırlanmıştır. Aşağıdaki adreste kendi kullanıcı ve depo adını kullan:

```sh
git remote add origin https://github.com/KULLANICI/DEPO.git
git push -u origin main
```

GitHub Actions, push ve pull request olaylarında Windows ve Ubuntu üzerinde kilit dosyasından kurulum, lint, test ve üretim derlemesi çalıştırır. İş akışı yalnızca kaynak okuma yetkisine sahiptir; dağıtım yapmaz ve özel secret gerektirmez.

`node_modules/`, `dist/`, ortam dosyaları ve yerel test çıktıları Git dışında tutulur. `package-lock.json` depoya dahil edilir. Uygulama ortam değişkeni veya harici API anahtarı gerektirmez.

Bağımlılık güvenlik taraması için `npm audit` çalıştırılabilir. Güncelleme sonrasında `npm ci` ve `npm run check` komutlarıyla doğrulama yap.

## Yayınlama

`npm run build` çıktısı olan `dist/` klasörü statik barındırma hizmetine yüklenebilir. GitHub'a kaynak kodu göndermek uygulamayı otomatik yayımlamaz. GitHub Pages gibi bir alt dizine dağıtımda Vite `base` ayarı depo yoluna göre yapılandırılmalıdır.
