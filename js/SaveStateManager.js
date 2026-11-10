/**
 * مدير حفظ الحالة - يدير حفظ واستعادة حالة اللعبة
 */
class SaveStateManager {
  constructor() {
    this.storageKey = 'xo-game-state';
    this.settingsKey = 'xo-game-settings';
  }

  /**
   * حفظ حالة اللعبة
   */
  saveGameState(gameState) {
    try {
      const stateToSave = {
        currentPlayer: gameState.currentPlayer,
        gameActive: gameState.gameActive,
        gameState: gameState.gameState,
        difficulty: gameState.difficulty,
        scores: gameState.scores,
        round: gameState.round,
        gameMode: gameState.gameMode,
        playerNames: gameState.playerNames,
        timestamp: Date.now()
      };

      localStorage.setItem(this.storageKey, JSON.stringify(stateToSave));
      return true;
    } catch (error) {
      console.warn('فشل في حفظ حالة اللعبة:', error);
      return false;
    }
  }

  /**
   * تحميل حالة اللعبة
   */
  loadGameState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      if (!saved) return null;

      const gameState = JSON.parse(saved);
      
      // التحقق من صحة البيانات
      if (!this.isValidGameState(gameState)) {
        console.warn('حالة اللعبة المحفوظة غير صالحة');
        this.clearSavedState();
        return null;
      }

      // التحقق من عمر الحفظ (24 ساعة كحد أقصى)
      const maxAge = 24 * 60 * 60 * 1000; // 24 ساعة
      if (Date.now() - gameState.timestamp > maxAge) {
        console.log('حالة اللعبة المحفوظة منتهية الصلاحية');
        this.clearSavedState();
        return null;
      }

      return gameState;
    } catch (error) {
      console.warn('فشل في تحميل حالة اللعبة:', error);
      this.clearSavedState();
      return null;
    }
  }

  /**
   * التحقق من صحة حالة اللعبة
   */
  isValidGameState(gameState) {
    return (
      gameState &&
      typeof gameState.currentPlayer === 'string' &&
      typeof gameState.gameActive === 'boolean' &&
      Array.isArray(gameState.gameState) &&
      gameState.gameState.length === 9 &&
      typeof gameState.difficulty === 'string' &&
      typeof gameState.scores === 'object' &&
      typeof gameState.round === 'number'
    );
  }

  /**
   * مسح الحالة المحفوظة
   */
  clearSavedState() {
    try {
      localStorage.removeItem(this.storageKey);
      return true;
    } catch (error) {
      console.warn('فشل في مسح الحالة المحفوظة:', error);
      return false;
    }
  }

  /**
   * التحقق من وجود حالة محفوظة
   */
  hasSavedState() {
    try {
      const saved = localStorage.getItem(this.storageKey);
      return saved !== null;
    } catch (error) {
      return false;
    }
  }

  /**
   * حفظ إعدادات اللعبة
   */
  saveGameSettings(settings) {
    try {
      const settingsToSave = {
        theme: settings.theme,
        symbolSet: settings.symbolSet,
        soundEnabled: settings.soundEnabled,
        timestamp: Date.now()
      };

      localStorage.setItem(this.settingsKey, JSON.stringify(settingsToSave));
      return true;
    } catch (error) {
      console.warn('فشل في حفظ إعدادات اللعبة:', error);
      return false;
    }
  }

  /**
   * تحميل إعدادات اللعبة
   */
  loadGameSettings() {
    try {
      const saved = localStorage.getItem(this.settingsKey);
      if (!saved) return null;

      return JSON.parse(saved);
    } catch (error) {
      console.warn('فشل في تحميل إعدادات اللعبة:', error);
      return null;
    }
  }

  /**
   * حفظ تلقائي للحالة (يتم استدعاؤه عند كل تغيير)
   */
  autoSave(gameState) {
    // حفظ فقط إذا كانت اللعبة نشطة ولم تنته
    if (gameState.gameActive && gameState.gameState.some(cell => cell !== '')) {
      return this.saveGameState(gameState);
    }
    return false;
  }

  /**
   * إنشاء نسخة احتياطية من جميع البيانات
   */
  createBackup() {
    try {
      const backup = {
        gameState: localStorage.getItem(this.storageKey),
        settings: localStorage.getItem(this.settingsKey),
        achievements: localStorage.getItem('xo-achievements'),
        statistics: localStorage.getItem('xo-statistics'),
        theme: localStorage.getItem('xo-theme'),
        symbols: localStorage.getItem('xo-symbols'),
        sound: localStorage.getItem('xo-sound-enabled'),
        timestamp: Date.now()
      };

      return JSON.stringify(backup);
    } catch (error) {
      console.warn('فشل في إنشاء النسخة الاحتياطية:', error);
      return null;
    }
  }

  /**
   * استعادة من النسخة الاحتياطية
   */
  restoreFromBackup(backupData) {
    try {
      const backup = JSON.parse(backupData);
      
      // استعادة البيانات
      if (backup.gameState) localStorage.setItem(this.storageKey, backup.gameState);
      if (backup.settings) localStorage.setItem(this.settingsKey, backup.settings);
      if (backup.achievements) localStorage.setItem('xo-achievements', backup.achievements);
      if (backup.statistics) localStorage.setItem('xo-statistics', backup.statistics);
      if (backup.theme) localStorage.setItem('xo-theme', backup.theme);
      if (backup.symbols) localStorage.setItem('xo-symbols', backup.symbols);
      if (backup.sound) localStorage.setItem('xo-sound-enabled', backup.sound);

      return true;
    } catch (error) {
      console.warn('فشل في استعادة النسخة الاحتياطية:', error);
      return false;
    }
  }

  /**
   * مسح جميع البيانات المحفوظة
   */
  clearAllData() {
    try {
      const keys = [
        this.storageKey,
        this.settingsKey,
        'xo-achievements',
        'xo-statistics',
        'xo-theme',
        'xo-symbols',
        'xo-sound-enabled'
      ];

      keys.forEach(key => {
        localStorage.removeItem(key);
      });

      return true;
    } catch (error) {
      console.warn('فشل في مسح البيانات:', error);
      return false;
    }
  }

  /**
   * الحصول على معلومات التخزين
   */
  getStorageInfo() {
    try {
      let totalSize = 0;
      const items = {};

      for (let key in localStorage) {
        if (localStorage.hasOwnProperty(key) && key.startsWith('xo-')) {
          const size = localStorage[key].length;
          items[key] = size;
          totalSize += size;
        }
      }

      return {
        totalSize,
        items,
        available: true
      };
    } catch (error) {
      return {
        totalSize: 0,
        items: {},
        available: false,
        error: error.message
      };
    }
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = SaveStateManager;
}