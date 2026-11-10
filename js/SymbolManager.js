/**
 * مدير الرموز - يدير مجموعات الرموز المختلفة
 */
class SymbolManager {
  constructor() {
    this.symbolSets = {
      classic: {
        name: 'classic',
        displayName: 'كلاسيكي',
        x: 'X',
        o: 'O'
      },
      shapes: {
        name: 'shapes',
        displayName: 'أشكال هندسية',
        x: '●',
        o: '■'
      },
      emoji: {
        name: 'emoji',
        displayName: 'رموز تعبيرية',
        x: '😊',
        o: '😎'
      },
      icons: {
        name: 'icons',
        displayName: 'أيقونات',
        x: 'fas fa-times',
        o: 'far fa-circle'
      }
    };
    
    this.currentSet = this.loadSymbolPreference() || 'classic';
  }

  /**
   * تعيين مجموعة الرموز
   */
  setSymbolSet(setName) {
    if (!this.symbolSets[setName]) {
      console.warn(`مجموعة الرموز ${setName} غير موجودة`);
      return false;
    }

    this.currentSet = setName;
    this.saveSymbolPreference();
    return true;
  }

  /**
   * الحصول على رمز اللاعب
   */
  getSymbol(player) {
    const symbolSet = this.symbolSets[this.currentSet];
    return player === 'X' ? symbolSet.x : symbolSet.o;
  }

  /**
   * تطبيق الرمز على عنصر DOM
   */
  applySymbolToElement(element, player) {
    const symbol = this.getSymbol(player);
    
    if (this.currentSet === 'icons') {
      // استخدام أيقونات Font Awesome
      element.innerHTML = `<i class="${symbol}"></i>`;
    } else {
      // استخدام نص عادي
      element.textContent = symbol;
    }

    // إضافة فئة CSS للتنسيق
    element.classList.add(`symbol-${this.currentSet}`);
  }

  /**
   * الحصول على مجموعة الرموز الحالية
   */
  getCurrentSet() {
    return this.currentSet;
  }

  /**
   * الحصول على قائمة مجموعات الرموز المتاحة
   */
  getAvailableSymbolSets() {
    return Object.values(this.symbolSets);
  }

  /**
   * التحقق من كون الرمز أيقونة
   */
  isIconSet() {
    return this.currentSet === 'icons';
  }

  /**
   * حفظ تفضيل الرموز
   */
  saveSymbolPreference() {
    try {
      localStorage.setItem('xo-symbols', this.currentSet);
    } catch (error) {
      console.warn('فشل في حفظ تفضيل الرموز:', error);
    }
  }

  /**
   * تحميل تفضيل الرموز
   */
  loadSymbolPreference() {
    try {
      return localStorage.getItem('xo-symbols');
    } catch (error) {
      console.warn('فشل في تحميل تفضيل الرموز:', error);
      return null;
    }
  }

  /**
   * إضافة أنماط CSS للرموز
   */
  addSymbolStyles() {
    const style = document.createElement('style');
    style.id = 'symbol-styles';
    style.textContent = `
      .symbol-emoji {
        font-size: 0.8em;
      }
      
      .symbol-shapes {
        font-weight: bold;
        font-size: 1.1em;
      }
      
      .symbol-icons i {
        font-size: 0.9em;
      }
      
      .symbol-classic {
        font-weight: bold;
      }
    `;
    
    // إزالة الستايل القديم إن وجد
    const oldStyle = document.getElementById('symbol-styles');
    if (oldStyle) oldStyle.remove();
    
    document.head.appendChild(style);
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SymbolManager;
}