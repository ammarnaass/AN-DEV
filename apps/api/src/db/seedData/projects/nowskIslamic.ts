export const nowskIslamicProject = {
  slug: "nowsk-islamic",
  title_ar: "نُسُك إسلامي (Nowsk Islamic) — تطبيق أندرويد إسلامي شامل",
  title_en: "Nowsk Islamic - Modern Jetpack Compose Android Application",
  summary_ar: "تطبيق إسلامي حديث لنظام Android مبني بنظام Jetpack Compose و Material 3، يوفر مواقيت الصلاة الفلكية، القرآن الكريم، الأذكار مع اهتزازات لمسية، وبوصلة القبلة.",
  summary_en: "Native Android Islamic companion built with Jetpack Compose, Material 3, astronomical prayer calculation, offline Room DB, and haptic feedback.",
  body_ar: `
### التحدي الهندسي
تطوير تطبيق أندرويد متكامل يرافق المسلم في عباداته اليومية بدقة وسكينة، يجمع بين مواقيت الصلاة الفلكية والأذان والقرآن الكريم والأذكار والمسبحة الإلكترونية وبوصلة القبلة، مع المحافظة التامة على خصوصية المستخدم وعدم استنزاف بطارية الهاتف أو إرسال الموقع الجغرافي لأي خوادم خارجية.

### الحل المعماري المعتمد
1. **واجهة مستخدم حديثة وتفاعلية بنظام Jetpack Compose**: بناء التطبيق بنسبة 100% بنظام Compose التصريحي وفق أحدث معايير Material Design 3 مع دعم كامل للاتجاه العربي (RTL) والحركات السلسة.
2. **محرك الحسابات الفلكية المحلي**: حساب مواقيت الصلوات الخمس والشروق ومنتصف الليل بدقة فلكية عالية محلياً داخل جهاز المستخدم بالاعتماد على صيغ الحساب المعتمدة (أم القرى، رابطة العالم الإسلامي، الهيئة المصرية).
3. **ردود فعل لمسية ذكية (Haptic Feedback Engine)**: دمج مستشعرات الاهتزاز مع عدادات التسبيح والأذكار لتقديم تجربة حركية تفاعلية دون الحاجة للنظر إلى الشاشة.
4. **تحديد القبلة عبر دمج المستشعرات (Sensor Fusion)**: بوصلة قبلة دقيقة تعتمد على دمج قراءات مستشعرات الجيروسكوب والمجال المغناطيسي للهاتف.
5. **قاعدة بيانات محلية سريعة (Room Database)**: حفظ تفضيلات المستخدم وسجلات التسبيح والأدعية وعلامات القراءة محلياً.

### النتائج ومقاييس الأداء
- استهلاك طاقة يكاد لا يُذكر (**Zero Background Battery Drain**).
- خصوصية مطلقة للبيانات دون إرسال أي إحداثيات لخوادم خارجية.
- زمن تشغيل بارد فائق السرعة واستجابة سلسة بمعدل **60 FPS**.
`,
  body_en: `
### Engineering Challenge
Building a modern native Android spiritual companion consolidating astronomical prayer times, Athan notifications, Quran recitation, Dhikr counters, and a geomagnetic Qibla compass while preserving battery life and user location privacy.

### Architectural Solution
1. **100% Jetpack Compose & Material 3**: Declarative UI architecture natively supporting right-to-left (RTL) Arabic typography, responsive layouts, and dynamic themes.
2. **On-Device Astronomical Calculation**: Offline astronomical calculation of prayer times utilizing accredited global conventions (Umm al-Qura, Egyptian Authority, MWL) with zero cloud dependencies.
3. **Tactile Haptic Feedback**: Context-aware physical vibration patterns on Dhikr and Tasbeeh counters facilitating eyes-free spiritual engagement.
4. **Sensor Fusion Qibla Compass**: Hardware geomagnetic and accelerometer calibration delivering real-time heading guidance toward Makkah.
5. **Room Database Persistence**: Robust offline state management storing bookmarks, daily progress, and user preferences.

### Metrics & Outcomes
- Sub-**1%** background battery consumption per 24-hour cycle.
- Complete data privacy with on-device coordinate processing.
- Consistent **60 FPS** rendering across varied Android hardware tiers.
`,
  project_type: "mobile",
  version: "v2.0.1",
  package_size: "18.5 MB Optimized APK",
  platforms_json: JSON.stringify(["android"]),
  download_url: "https://github.com/ammarnaass/nowsk/releases",
  enable_live_preview: false,
  cover_image: "/uploads/projects/nowsk-islamic.webp",
  live_url: null,
  repo_url: "https://github.com/ammarnaass/nowsk",
  featured: true,
  published: true,
  sort_order: 5,
  tech_json: JSON.stringify([
    "Kotlin 2.0",
    "Android SDK 35",
    "Jetpack Compose",
    "Material Design 3",
    "Coroutines & Flow",
    "Room Database",
    "Location & Sensors API",
    "Google AdMob"
  ]),
  type_specs_json: JSON.stringify({
    ui_toolkit: "100% Declarative Jetpack Compose with Material 3 RTL layout",
    prayer_calculation: "Astronomical offline algorithms (Umm al-Qura, Egyptian Authority, MWL)",
    haptic_engine: "Tactile vibration feedback on Tasbeeh & Dhikr counters",
    qibla_compass: "Real-time hardware magnetic & geomagnetic sensor fusion",
    local_storage: "Room Database for bookmarks, prayers, and preferences",
    monetization: "Adaptive Google AdMob integration preserving spiritual focus"
  }),
  gallery_json: JSON.stringify([
    {
      url: "/uploads/projects/nowsk-islamic.webp",
      caption_ar: "الغلاف الترويجي لتطبيق نُسُك إسلامي",
      caption_en: "Nowsk Islamic Feature Graphic & Branding",
      frame_type: "phone"
    },
    {
      url: "/uploads/projects/nowsk-screen-1.webp",
      caption_ar: "الواجهة الرئيسية ومواقيت الصلاة الدقيقة",
      caption_en: "Home Interface & Astronomical Prayer Times",
      frame_type: "phone"
    },
    {
      url: "/uploads/projects/nowsk-screen-2.webp",
      caption_ar: "قارئ القرآن الكريم بالرسم العثماني",
      caption_en: "Uthmani Script Holy Quran Reader",
      frame_type: "phone"
    },
    {
      url: "/uploads/projects/nowsk-screen-3.webp",
      caption_ar: "عداد الأذكار التفاعلي مع ردود الفعل اللمسية",
      caption_en: "Interactive Dhikr Counter with Haptic Feedback",
      frame_type: "phone"
    }
  ])
};
