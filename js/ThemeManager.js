/**
 * مدير الثيمات - يدير تطبيق الثيمات المختلفة
 */
class ThemeManager {
  constructor() {
    this.themes = {
      dark: {
        name: 'dark',
        displayName: 'الليل',
        colors: {
          primary: '#3b82f6',
          secondary: '#ec4899',
          background: '#020617',
          surface: '#0f172a',
          text: '#f1f5f9'
        }
      },
      neon: {
        name: 'neon',
        displayName: 'النيون',
        colors: {
          primary: '#00ff88',
          secondary: '#ff0088',
          background: '#0a0a0a',
          surface: '#1a1a1a',
          text: '#ffffff'
        }
      },
      classic: {
        name: 'classic',
        displayName: 'الكلاسيكي',
        colors: {
          primary: '#2563eb',
          secondary: '#dc2626',
          background: '#f8fafc',
          surface: '#ffffff',
          text: '#1e293b'
        }
      }
    };
    
    this.currentTheme = this.loadThemePreference() || 'dark';
  }

  /**
   * تطبيق ثيم محدد
   */
  applyTheme(themeName) {
    if (!this.themes[themeName]) {
      console.warn(`الثيم ${themeName} غير موجود`);
      return false;
    }

    this.currentTheme = themeName;
    const theme = this.themes[themeName];
    
    // تطبيق الثيم حسب النوع
    switch (themeName) {
      case 'neon':
        this.applyNeonTheme();
        break;
      case 'classic':
        this.applyClassicTheme();
        break;
      default:
        this.applyDarkTheme();
    }

    this.saveThemePreference();
    return true;
  }

  /**
   * تطبيق الثيم الداكن (الافتراضي)
   */
  applyDarkTheme() {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add('theme-dark');
    
    // إعادة تعيين الخلفية الأصلية
    document.body.style.background = `
      radial-gradient(circle at 0 0, rgba(129, 140, 248, 0.35), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(236, 72, 153, 0.35), transparent 55%),
      #020617
    `;
  }

  /**
   * تطبيق ثيم النيون
   */
  applyNeonTheme() {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add('theme-neon');
    
    // خلفية نيون
    document.body.style.background = `
      radial-gradient(circle at 0 0, rgba(0, 255, 136, 0.4), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(255, 0, 136, 0.4), transparent 55%),
      #0a0a0a
    `;

    // إضافة تأثيرات النيون
    this.addNeonEffects();
  }

  /**
   * تطبيق الثيم الكلاسيكي
   */
  applyClassicTheme() {
    document.body.className = document.body.className.replace(/theme-\w+/g, '');
    document.body.classList.add('theme-classic');
    
    // خلفية فاتحة
    document.body.style.background = `
      radial-gradient(circle at 0 0, rgba(37, 99, 235, 0.1), transparent 55%),
      radial-gradient(circle at 100% 100%, rgba(220, 38, 38, 0.1), transparent 55%),
      #f8fafc
    `;

    // تحديث الألوان للثيم الفاتح
    this.updateClassicColors();
  }

  /**
   * إضافة تأثيرات النيون
   */
  addNeonEffects() {
    const style = document.createElement('style');
    style.id = 'neon-effects';
    style.textContent = `
      .theme-neon .glass-panel {
        background: linear-gradient(135deg, rgba(26, 26, 26, 0.9), rgba(0, 255, 136, 0.1));
        border: 1px solid rgba(0, 255, 136, 0.3);
        box-shadow: 0 0 30px rgba(0, 255, 136, 0.2);
      }
      
      .theme-neon .cell {
        background: rgba(26, 26, 26, 0.8);
        border: 1px solid rgba(0, 255, 136, 0.2);
        box-shadow: inset 0 0 10px rgba(0, 255, 136, 0.1);
      }
      
      .theme-neon .cell:hover {
        box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
        border-color: rgba(0, 255, 136, 0.6);
      }
      
      .theme-neon .text-sky-400 {
        color: #00ff88 !important;
        text-shadow: 0 0 10px rgba(0, 255, 136, 0.5);
      }
      
      .theme-neon .text-rose-400 {
        color: #ff0088 !important;
        text-shadow: 0 0 10px rgba(255, 0, 136, 0.5);
      }
    `;
    
    // إزالة الستايل القديم إن وجد
    const oldStyle = document.getElementById('neon-effects');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
  }

  /**
   * تحديث ألوان الثيم الكلاسيكي
   */
  updateClassicColors() {
    const style = document.createElement('style');
    style.id = 'classic-theme';
    style.textContent = `
      .theme-classic {
        color: #1e293b;
      }
      
      .theme-classic .glass-panel {
        background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.9));
        border: 1px solid rgba(148, 163, 184, 0.2);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      
      .theme-classic .cell {
        background: rgba(248, 250, 252, 0.8);
        color: #1e293b;
        border: 1px solid rgba(148, 163, 184, 0.2);
      }
      
      .theme-classic .cell:hover {
        background: rgba(241, 245, 249, 0.9);
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      }
      
      .theme-classic .text-slate-100,
      .theme-classic .text-slate-50 {
        color: #1e293b !important;
      }
      
      .theme-classic .text-slate-300,
      .theme-classic .text-slate-400 {
        color: #64748b !important;
      }
      
      .theme-classic .bg-slate-900\\/60,
      .theme-classic .bg-slate-900\\/70 {
        background: rgba(248, 250, 252, 0.8) !important;
        border-color: rgba(148, 163, 184, 0.3) !important;
      }
      
      .theme-classic .bg-slate-800\\/70,
      .theme-classic .bg-slate-800\\/80 {
        background: rgba(255, 255, 255, 0.7) !important;
      }
    `;
    
    // إزالة الستايل القديم إن وجد
    const oldStyle = document.getElementById('classic-theme');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
  }

  /**
   * الحصول على الثيم الحالي
   */
  getCurrentTheme() {
    return this.currentTheme;
  }

  /**
   * الحصول على قائمة الثيمات المتاحة
   */
  getAvailableThemes() {
    return Object.values(this.themes);
  }

  /**
   * حفظ تفضيل الثيم
   */
  saveThemePreference() {
    try {
      localStorage.setItem('xo-theme', this.currentTheme);
    } catch (error) {
      console.warn('فشل في حفظ تفضيل الثيم:', error);
    }
  }

  /**
   * تحميل تفضيل الثيم
   */
  loadThemePreference() {
    try {
      return localStorage.getItem('xo-theme');
    } catch (error) {
      console.warn('فشل في تحميل تفضيل الثيم:', error);
      return null;
    }
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ThemeManager;
}