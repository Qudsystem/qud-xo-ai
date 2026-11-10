# تصميم لعبة XO المحسّنة

## نظرة عامة

هذا التصميم يهدف إلى إضافة ميزات متقدمة للعبة XO الموجودة مع الحفاظ على جميع الوظائف والتصميم الحالي. سنضيف وضع اللعب بين لاعبين، نظام الإنجازات، الثيمات المتعددة، الرموز المخصصة، الإحصائيات المفصلة، التأثيرات الصوتية، وحفظ حالة اللعبة.

## البنية المعمارية

### البنية الحالية
اللعبة الحالية تستخدم:
- HTML5 مع Tailwind CSS للتصميم
- JavaScript vanilla للمنطق
- Font Awesome للأيقونات
- Local Storage لحفظ النقاط

### البنية المحسّنة
سنضيف طبقات جديدة مع الحفاظ على البنية الموجودة:

```
Enhanced XO Game
├── Core Game Logic (موجود)
│   ├── Game State Management
│   ├── AI Logic (Minimax)
│   └── Win Detection
├── UI Components (موجود + محسّن)
│   ├── Game Board
│   ├── Score Display
│   ├── Controls
│   └── Status Indicators
├── New Feature Modules (جديد)
│   ├── Game Mode Manager
│   ├── Achievement System
│   ├── Theme Manager
│   ├── Symbol Manager
│   ├── Statistics Tracker
│   ├── Audio Manager
│   └── Save State Manager
└── Storage Layer (محسّن)
    ├── Game Data
    ├── User Preferences
    ├── Achievement Progress
    └── Statistics Data
```

## المكونات والواجهات

### 1. مدير أوضاع اللعب (Game Mode Manager)
```javascript
class GameModeManager {
  constructor() {
    this.currentMode = 'ai'; // 'ai' أو 'pvp'
    this.playerNames = { player1: 'اللاعب 1', player2: 'اللاعب 2' };
  }
  
  switchMode(mode) { /* تبديل الوضع */ }
  getCurrentMode() { /* الحصول على الوضع الحالي */ }
  setPlayerNames(names) { /* تعيين أسماء اللاعبين */ }
}
```

### 2. نظام الإنجازات (Achievement System)
```javascript
class AchievementSystem {
  constructor() {
    this.achievements = new Map();
    this.progress = new Map();
    this.initializeAchievements();
  }
  
  checkAchievement(type, data) { /* فحص الإنجازات */ }
  unlockAchievement(id) { /* إلغاء قفل الإنجاز */ }
  getAchievements() { /* الحصول على قائمة الإنجازات */ }
}
```

### 3. مدير الثيمات (Theme Manager)
```javascript
class ThemeManager {
  constructor() {
    this.themes = {
      dark: { /* الثيم الداكن الحالي */ },
      neon: { /* ثيم النيون */ },
      classic: { /* الثيم الكلاسيكي */ }
    };
    this.currentTheme = 'dark';
  }
  
  applyTheme(themeName) { /* تطبيق الثيم */ }
  saveThemePreference() { /* حفظ تفضيل الثيم */ }
}
```

### 4. مدير الرموز (Symbol Manager)
```javascript
class SymbolManager {
  constructor() {
    this.symbolSets = {
      classic: { x: 'X', o: 'O' },
      shapes: { x: '●', o: '■' },
      emoji: { x: '😊', o: '😎' },
      icons: { x: 'fas fa-times', o: 'far fa-circle' }
    };
    this.currentSet = 'classic';
  }
  
  setSymbolSet(setName) { /* تعيين مجموعة الرموز */ }
  getSymbol(player) { /* الحصول على رمز اللاعب */ }
}
```

### 5. متتبع الإحصائيات (Statistics Tracker)
```javascript
class StatisticsTracker {
  constructor() {
    this.stats = {
      totalGames: 0,
      winRates: { easy: 0, medium: 0, hard: 0 },
      longestWinStreak: 0,
      totalPlayTime: 0,
      currentStreak: 0
    };
  }
  
  updateStats(gameResult) { /* تحديث الإحصائيات */ }
  getDetailedStats() { /* الحصول على إحصائيات مفصلة */ }
}
```

### 6. مدير الصوت (Audio Manager)
```javascript
class AudioManager {
  constructor() {
    this.sounds = {
      click: new Audio('data:audio/wav;base64,...'),
      win: new Audio('data:audio/wav;base64,...'),
      tie: new Audio('data:audio/wav;base64,..'),
    };
    this.enabled = true;
  }
  
  playSound(soundName) { /* تشغيل الصوت */ }
  toggleSound() { /* تبديل الصوت */ }
}
```

### 7. مدير حفظ الحالة (Save State Manager)
```javascript
class SaveStateManager {
  constructor() {
    this.storageKey = 'xo-game-state';
  }
  
  saveGameState(gameState) { /* حفظ حالة اللعبة */ }
  loadGameState() { /* تحميل حالة اللعبة */ }
  clearSavedState() { /* مسح الحالة المحفوظة */ }
}
```

## نماذج البيانات

### حالة اللعبة المحسّنة
```javascript
const enhancedGameState = {
  // الحالة الموجودة
  currentPlayer: 'X',
  gameActive: true,
  gameState: ['', '', '', '', '', '', '', '', ''],
  difficulty: 'hard',
  scores: { player: 0, ties: 0, ai: 0 },
  round: 1,
  
  // الحالة الجديدة
  gameMode: 'ai', // 'ai' أو 'pvp'
  playerNames: { player1: 'أنت', player2: 'الذكاء الاصطناعي' },
  currentTheme: 'dark',
  currentSymbolSet: 'classic',
  soundEnabled: true,
  achievements: [],
  statistics: {
    totalGames: 0,
    winRates: { easy: 0, medium: 0, hard: 0 },
    longestWinStreak: 0,
    currentStreak: 0,
    totalPlayTime: 0,
    sessionStartTime: null
  }
};
```

### نموذج الإنجاز
```javascript
const achievementModel = {
  id: 'win-streak-3',
  name: 'سلسلة الانتصارات',
  description: 'فز بثلاث جولات متتالية',
  icon: 'fas fa-fire',
  unlocked: false,
  unlockedAt: null,
  progress: 0,
  target: 3,
  type: 'streak'
};
```

### نموذج الثيم
```javascript
const themeModel = {
  name: 'neon',
  displayName: 'النيون',
  colors: {
    primary: '#00ff88',
    secondary: '#ff0088',
    background: '#0a0a0a',
    surface: '#1a1a1a',
    text: '#ffffff'
  },
  effects: {
    glow: true,
    particles: true,
    animations: 'enhanced'
  }
};
```
## خصائص الصحة

*الخاصية هي سمة أو سلوك يجب أن يكون صحيحاً عبر جميع التنفيذات الصالحة للنظام - في الأساس، بيان رسمي حول ما يجب أن يفعله النظام. الخصائص تعمل كجسر بين المواصفات القابلة للقراءة من قبل الإنسان وضمانات الصحة القابلة للتحقق آلياً.*

### خاصية 1: تبديل وضع اللعب
*لأي* حالة لعبة صالحة، عند تطبيق تبديل الوضع، يجب أن يتغير الوضع الحالي إلى الوضع البديل
**تتحقق من: المتطلبات 1.1**

### خاصية 2: عرض أسماء اللاعبين في وضع PvP
*لأي* حالة لعبة في وضع "لاعب ضد لاعب"، يجب أن تحتوي واجهة المستخدم على أسماء اللاعبين المحددة وليس النصوص الافتراضية للذكاء الاصطناعي
**تتحقق من: المتطلبات 1.2**

### خاصية 3: التناوب بدون ذكاء اصطناعي في وضع PvP
*لأي* لعبة في وضع "لاعب ضد لاعب"، يجب ألا يتم استدعاء أي وظائف للذكاء الاصطناعي أثناء اللعب
**تتحقق من: المتطلبات 1.3**

### خاصية 4: تحديث مؤشر الدور
*لأي* تغيير في دور اللاعب، يجب أن يعكس مؤشر الدور اللاعب الحالي بالنص والألوان الصحيحة
**تتحقق من: المتطلبات 1.4**

### خاصية 5: عرض الفائز في وضع PvP
*لأي* فوز في وضع "لاعب ضد لاعب"، يجب أن تعرض رسالة الفوز اسم اللاعب الفائز الصحيح
**تتحقق من: المتطلبات 1.5**

### خاصية 6: إشعارات الإنجازات
*لأي* تحقيق إنجاز صالح، يجب أن يظهر إشعار مع المعلومات الصحيحة للإنجاز
**تتحقق من: المتطلبات 2.1**

### خاصية 7: إنجاز سلسلة الانتصارات
*لأي* سلسلة من ثلاث انتصارات متتالية، يجب أن يتم منح إنجاز "سلسلة الانتصارات"
**تتحقق من: المتطلبات 2.2**

### خاصية 8: إنجاز المدافع الصلب
*لأي* سلسلة من خمس تعادلات مع الذكاء الاصطناعي الصعب، يجب أن يتم منح إنجاز "المدافع الصلب"
**تتحقق من: المتطلبات 2.3**

### خاصية 9: إنجاز اللاعب المثابر
*لأي* لاعب يكمل 10 جولات، يجب أن يتم منح إنجاز "اللاعب المثابر"
**تتحقق من: المتطلبات 2.4**

### خاصية 10: إنجاز قاهر الآلة
*لأي* فوز ضد الذكاء الاصطناعي في المستوى الصعب، يجب أن يتم منح إنجاز "قاهر الآلة"
**تتحقق من: المتطلبات 2.5**

### خاصية 11: عرض قائمة الإنجازات
*لأي* طلب لعرض الإنجازات، يجب أن تحتوي القائمة على جميع الإنجازات المحددة مع حالاتها الصحيحة
**تتحقق من: المتطلبات 2.6**

### خاصية 12: تطبيق الثيمات
*لأي* ثيم صالح، عند تطبيقه يجب أن تتغير ألوان الواجهة لتطابق مواصفات الثيم
**تتحقق من: المتطلبات 3.2, 3.3, 3.4**

### خاصية 13: حفظ تفضيلات الثيم
*لأي* تغيير في الثيم، يجب أن يتم حفظ الاختيار في التخزين المحلي
**تتحقق من: المتطلبات 3.5**

### خاصية 14: استعادة الثيم المحفوظ
*لأي* إعادة تحميل للصفحة، يجب أن يتم تطبيق الثيم المحفوظ تلقائياً
**تتحقق من: المتطلبات 3.6**

### خاصية 15: تطبيق مجموعات الرموز
*لأي* مجموعة رموز صالحة، عند تطبيقها يجب أن تظهر الرموز الصحيحة في اللعبة
**تتحقق من: المتطلبات 4.2, 4.3, 4.4**

### خاصية 16: حفظ تفضيلات الرموز
*لأي* تغيير في مجموعة الرموز، يجب أن يتم حفظ الاختيار في التخزين المحلي
**تتحقق من: المتطلبات 4.5**

### خاصية 17: عرض الإحصائيات الصحيحة
*لأي* بيانات لعبة، يجب أن تعرض الإحصائيات القيم الصحيحة للجولات ومعدلات الفوز والسلاسل
**تتحقق من: المتطلبات 5.2, 5.3, 5.4, 5.5**

### خاصية 18: تشغيل الأصوات المناسبة
*لأي* حدث في اللعبة، يجب أن يتم تشغيل الصوت المناسب للحدث (إذا كان الصوت مفعلاً)
**تتحقق من: المتطلبات 6.1, 6.2, 6.3**

### خاصية 19: تحكم في إعدادات الصوت
*لأي* تغيير في إعدادات الصوت، يجب أن يتم تطبيق التغيير فوراً وحفظه
**تتحقق من: المتطلبات 6.4, 6.5**

### خاصية 20: حفظ حالة اللعبة تلقائياً
*لأي* تغيير في حالة اللعبة، يجب أن يتم حفظ الحالة الجديدة في التخزين المحلي
**تتحقق من: المتطلبات 8.1**

### خاصية 21: استعادة حالة اللعبة
*لأي* حالة لعبة محفوظة صالحة، يجب أن يتم استعادة الحالة بدقة عند إعادة التحميل
**تتحقق من: المتطلبات 8.2**

### خاصية 22: مسح الحالة المحفوظة
*لأي* انتهاء جولة أو بدء لعبة جديدة، يجب أن يتم مسح حالة اللعبة المحفوظة مع الحفاظ على البيانات الأخرى
**تتحقق من: المتطلبات 8.4, 8.5**

## معالجة الأخطاء

### أخطاء التخزين المحلي
- التحقق من توفر localStorage قبل الاستخدام
- معالجة أخطاء امتلاء التخزين
- توفير قيم افتراضية عند فشل القراءة

### أخطاء الصوت
- التحقق من دعم المتصفح للصوت
- معالجة فشل تحميل الملفات الصوتية
- توفير تجربة صامتة عند فشل الصوت

### أخطاء الثيمات
- التحقق من صحة بيانات الثيم
- العودة للثيم الافتراضي عند الخطأ
- التحقق من توفر CSS المطلوب

### أخطاء حفظ الحالة
- التحقق من صحة بيانات الحالة المحفوظة
- معالجة البيانات المعطوبة أو القديمة
- توفير خيار إعادة تعيين عند الخطأ

## استراتيجية الاختبار

### نهج الاختبار المزدوج

سنستخدم نهجاً مزدوجاً يجمع بين اختبارات الوحدة واختبارات الخصائص:

#### اختبارات الوحدة
- اختبار وظائف محددة مثل تبديل الأوضاع
- اختبار حالات الحد مثل البيانات المعطوبة
- اختبار التكامل بين المكونات الجديدة والموجودة

#### اختبارات الخصائص
- استخدام مكتبة **fast-check** لـ JavaScript
- تشغيل كل اختبار خاصية لـ 100 تكرار كحد أدنى
- كل اختبار خاصية يجب أن يحتوي على تعليق يربطه بالخاصية في وثيقة التصميم
- تنسيق التعليق: `**Feature: enhanced-xo-game, Property {number}: {property_text}**`

#### متطلبات اختبار الخصائص
- كل خاصية صحة يجب أن يتم تنفيذها بواسطة اختبار خاصية واحد
- الاختبارات يجب أن تولد بيانات عشوائية صالحة للاختبار
- التحقق من الخصائص عبر مجموعة واسعة من المدخلات
- استخدام مولدات ذكية تقيد مساحة المدخلات بذكاء

#### أمثلة على اختبارات الخصائص

```javascript
// **Feature: enhanced-xo-game, Property 1: تبديل وضع اللعبة**
fc.test('Game mode toggle should switch between modes', 
  fc.record({
    currentMode: fc.constantFrom('ai', 'pvp'),
    gameState: fc.array(fc.constantFrom('', 'X', 'O'), { minLength: 9, maxLength: 9 })
  }),
  (data) => {
    const gameManager = new GameModeManager();
    gameManager.currentMode = data.currentMode;
    const originalMode = gameManager.getCurrentMode();
    gameManager.switchMode();
    const newMode = gameManager.getCurrentMode();
    expect(newMode).not.toBe(originalMode);
  }
);

// **Feature: enhanced-xo-game, Property 12: تطبيق الثيمات**
fc.test('Theme application should change interface colors',
  fc.constantFrom('dark', 'neon', 'classic'),
  (themeName) => {
    const themeManager = new ThemeManager();
    themeManager.applyTheme(themeName);
    const appliedTheme = themeManager.currentTheme;
    expect(appliedTheme).toBe(themeName);
    // التحقق من تطبيق الألوان الصحيحة
  }
);
```

### اختبارات التكامل
- اختبار التفاعل بين الميزات الجديدة والموجودة
- التحقق من عدم تأثير الميزات الجديدة على الوظائف الحالية
- اختبار سيناريوهات المستخدم الكاملة

### اختبارات الأداء
- قياس تأثير الميزات الجديدة على أداء اللعبة
- اختبار استهلاك الذاكرة للتخزين المحلي
- التحقق من سلاسة الرسوم المتحركة والتأثيرات

### اختبارات التوافق
- اختبار التوافق مع المتصفحات المختلفة
- التحقق من عمل الميزات على الأجهزة المحمولة
- اختبار التوافق مع إعدادات إمكانية الوصول