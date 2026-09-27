# Paper Bazaar 03 · بازار کاغذ

A Persian, RTL material marketplace demo: discover paper, compare suppliers, prepare an inquiry, and explore a lightweight 3D material studio. Rebuilt from [paper-bazaar-3d_2](https://github.com/prestigegitserp/paper-bazaar-3d_2) at `e96115dea55379bc8a0b72c4fec08b952eb97543`.

## اجرا

Node.js **22.18+** (Node 24 supported).

```bash
npm ci
npm run dev
```

Web: http://localhost:5173 · API: http://localhost:8787/api/catalog

```bash
npm test
npm run build
npm run preview
```

For a static demo with no API, set `VITE_STATIC_DEMO=true` at build time. For subdirectory hosting, also set `VITE_PUBLIC_BASE=/paper-bazaar-3d_3/`. GitHub Pages workflow supplies both settings. The workflow requires Pages/Actions availability in the destination repository.

## نسخهٔ جدید چه دارد؟

- صفحهٔ جدید فارسی و راست‌به‌چپ با طراحی سبز و کاغذی، چیدمان موبایل و تصاویر متریال تولیدشده با CSS؛ بدون وابستگی به سرویس تصاویر خارجی.
- جستجوی فارسی با یکسان‌سازی «ي/ی» و «ك/ک»، دسته‌بندی، انتخاب فروشنده و مرتب‌سازی.
- نشان‌شده‌ها و سبد استعلام پایدار در همان مرورگر؛ تعداد و توضیحات سفارش؛ دانلود UTF-8 و کپی متن.
- مقایسهٔ حداکثر سه کالا با نمایش تاریخ، منبع و واحد فروش؛ بدون جمع‌زدن قیمت بسته‌های نامتجانس.
- استودیوی سه‌بعدی با چرخش، زوم، انتخاب رنگ و کیفیت؛ رندر فقط هنگام تغییر؛ بدون HDR یا فونت خارجی.
- تور معرفی سه‌مرحله‌ای برای ارائه و دسترسی اختیاری به گردش بازار نسخهٔ قبلی؛ سبد استعلام هنگام رفت‌وبرگشت منتقل می‌شود.
- موتور سه‌بعدی فقط بعد از درخواست کاربر دانلود می‌شود؛ بازار و استعلام بدون WebGL نیز قابل استفاده‌اند.
- خطاگیری نمایش سه‌بعدی، احترام به reduced-motion، کنترل با صفحه‌کلید و دیالوگ‌های native با مدیریت فوکوس.

## مرزهای این دمو

قیمت‌ها اسنپ‌شات منابع عمومی‌اند؛ قیمت زنده، موجودی قطعی، قرارداد همکاری یا نشان تأیید فروشنده نیستند. واحدهای فروش متفاوت‌اند. رنگ، جنس و ابعاد مدل‌های استودیو مفهومی‌اند و مشخصات واقعی کالا را تضمین نمی‌کنند. خروجی استعلام یک **پیش‌نویس محلی** است؛ ارسال، پرداخت، احراز هویت یا ثبت سفارش روی سرور پیاده‌سازی نشده است. Storage بین دستگاه‌ها همگام نیست.

سرویس کاتالوگ و ابزار refresh نسخهٔ قبلی حفظ شده‌اند. حالت API به معنای زنده بودن قیمت نیست؛ تاریخ هر محصول را ببینید.

## معماری

`src/market/Market.tsx` رابط و گردش خرید؛ `model.ts` جستجو و قرارداد استعلام؛ `Art.tsx` تصاویر سبک؛ `Showroom.tsx` صحنهٔ مستقل و lazy؛ `Walkthrough.tsx` پل ورود به بازار قدیمی. کد موتور و API قبلی برای ادامهٔ توسعه حفظ شده‌اند. دارایی‌های GLB و atlas هنگام build ساخته می‌شوند؛ نبود `toktx` در توسعه از fallback PNG استفاده می‌کند. CI خروجی KTX2 را نیز بررسی می‌کند.

- [Open-source review and design decisions](docs/OPEN_SOURCE_REVIEW.md)
- [Validation and performance](docs/VALIDATION_V3.md)
- [Investor demo script](docs/DEMO_SCRIPT.md)
- [Previous version documentation](docs/archive/README-v017.md)

MIT. Existing copyright retained. Third-party packages retain their respective licenses.
