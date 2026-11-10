/**
 * متتبع الإحصائيات - يتتبع إحصائيات اللعبة المفصلة
 */
class StatisticsTracker {
  constructor() {
    this.stats = {
      totalGames: 0,
      wins: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      losses: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      ties: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      longestWinStreak: 0,
      currentWinStreak: 0,
      totalPlayTime: 0,
      sessionStartTime: null,
      gamesPerDifficulty: { easy: 0, medium: 0, hard: 0, pvp: 0 }
    };
    
    this.loadStats();
  }

  /**
   * بدء جلسة لعب جديدة
   */
  startSession() {
    this.stats.sessionStartTime = Date.now();
  }

  /**
   * إنهاء جلسة اللعب
   */
  endSession() {
    if (this.stats.sessionStartTime) {
      const sessionTime = Date.now() - this.stats.sessionStartTime;
      this.stats.totalPlayTime += sessionTime;
      this.stats.sessionStartTime = null;
      this.saveStats();
    }
  }

  /**
   * تحديث الإحصائيات بناءً على نتيجة اللعبة
   */
  updateStats(gameResult) {
    const { winner, difficulty, gameMode } = gameResult;
    const difficultyKey = gameMode === 'pvp' ? 'pvp' : difficulty;
    
    // زيادة إجمالي الألعاب
    this.stats.totalGames++;
    this.stats.gamesPerDifficulty[difficultyKey]++;

    // تحديث النتائج
    if (winner === 'X') {
      // فوز اللاعب
      this.stats.wins[difficultyKey]++;
      this.stats.currentWinStreak++;
      
      // تحديث أطول سلسلة انتصارات
      if (this.stats.currentWinStreak > this.stats.longestWinStreak) {
        this.stats.longestWinStreak = this.stats.currentWinStreak;
      }
    } else if (winner === 'O') {
      // فوز الخصم
      this.stats.losses[difficultyKey]++;
      this.stats.currentWinStreak = 0;
    } else {
      // تعادل
      this.stats.ties[difficultyKey]++;
      this.stats.currentWinStreak = 0;
    }

    this.saveStats();
    return this.stats.currentWinStreak;
  }

  /**
   * حساب معدل الفوز لمستوى صعوبة معين
   */
  getWinRate(difficulty) {
    const totalGames = this.stats.gamesPerDifficulty[difficulty];
    if (totalGames === 0) return 0;
    
    const wins = this.stats.wins[difficulty];
    return Math.round((wins / totalGames) * 100);
  }

  /**
   * الحصول على إحصائيات مفصلة
   */
  getDetailedStats() {
    return {
      totalGames: this.stats.totalGames,
      winRates: {
        easy: this.getWinRate('easy'),
        medium: this.getWinRate('medium'),
        hard: this.getWinRate('hard'),
        pvp: this.getWinRate('pvp')
      },
      longestWinStreak: this.stats.longestWinStreak,
      currentWinStreak: this.stats.currentWinStreak,
      totalPlayTime: this.formatPlayTime(this.stats.totalPlayTime),
      gamesPerDifficulty: { ...this.stats.gamesPerDifficulty },
      detailedResults: {
        wins: { ...this.stats.wins },
        losses: { ...this.stats.losses },
        ties: { ...this.stats.ties }
      }
    };
  }

  /**
   * تنسيق وقت اللعب
   */
  formatPlayTime(milliseconds) {
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `${hours}س ${minutes % 60}د`;
    } else if (minutes > 0) {
      return `${minutes}د ${seconds % 60}ث`;
    } else {
      return `${seconds}ث`;
    }
  }

  /**
   * إعادة تعيين الإحصائيات
   */
  resetStats() {
    this.stats = {
      totalGames: 0,
      wins: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      losses: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      ties: { easy: 0, medium: 0, hard: 0, pvp: 0 },
      longestWinStreak: 0,
      currentWinStreak: 0,
      totalPlayTime: 0,
      sessionStartTime: null,
      gamesPerDifficulty: { easy: 0, medium: 0, hard: 0, pvp: 0 }
    };
    
    this.saveStats();
  }

  /**
   * الحصول على إحصائيات سريعة للعرض
   */
  getQuickStats() {
    const totalWins = Object.values(this.stats.wins).reduce((sum, wins) => sum + wins, 0);
    const totalLosses = Object.values(this.stats.losses).reduce((sum, losses) => sum + losses, 0);
    const totalTies = Object.values(this.stats.ties).reduce((sum, ties) => sum + ties, 0);
    
    return {
      totalGames: this.stats.totalGames,
      totalWins,
      totalLosses,
      totalTies,
      overallWinRate: this.stats.totalGames > 0 ? Math.round((totalWins / this.stats.totalGames) * 100) : 0,
      currentStreak: this.stats.currentWinStreak,
      bestStreak: this.stats.longestWinStreak
    };
  }

  /**
   * حفظ الإحصائيات في التخزين المحلي
   */
  saveStats() {
    try {
      localStorage.setItem('xo-statistics', JSON.stringify(this.stats));
    } catch (error) {
      console.warn('فشل في حفظ الإحصائيات:', error);
    }
  }

  /**
   * تحميل الإحصائيات من التخزين المحلي
   */
  loadStats() {
    try {
      const saved = localStorage.getItem('xo-statistics');
      if (saved) {
        const loadedStats = JSON.parse(saved);
        this.stats = { ...this.stats, ...loadedStats };
      }
    } catch (error) {
      console.warn('فشل في تحميل الإحصائيات:', error);
    }
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = StatisticsTracker;
}