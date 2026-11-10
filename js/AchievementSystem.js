/**
 * نظام الإنجازات - يدير تتبع ومنح الإنجازات
 */
class AchievementSystem {
  constructor() {
    this.achievements = new Map();
    this.progress = new Map();
    this.initializeAchievements();
    this.loadProgress();
  }

  /**
   * تهيئة الإنجازات المتاحة
   */
  initializeAchievements() {
    const achievements = [
      {
        id: 'win-streak-3',
        name: 'سلسلة الانتصارات',
        description: 'فز بثلاث جولات متتالية',
        icon: 'fas fa-fire',
        target: 3,
        type: 'streak'
      },
      {
        id: 'hard-ties-5',
        name: 'المدافع الصلب',
        description: 'تعادل مع الذكاء الاصطناعي الصعب خمس مرات',
        icon: 'fas fa-shield-alt',
        target: 5,
        type: 'ties'
      },
      {
        id: 'games-10',
        name: 'اللاعب المثابر',
        description: 'العب 10 جولات',
        icon: 'fas fa-trophy',
        target: 10,
        type: 'games'
      },
      {
        id: 'beat-hard-ai',
        name: 'قاهر الآلة',
        description: 'فز على الذكاء الاصطناعي الصعب',
        icon: 'fas fa-robot',
        target: 1,
        type: 'hard-win'
      }
    ];

    achievements.forEach(achievement => {
      this.achievements.set(achievement.id, {
        ...achievement,
        unlocked: false,
        unlockedAt: null
      });
      this.progress.set(achievement.id, 0);
    });
  }

  /**
   * فحص الإنجازات بناءً على حدث اللعبة
   */
  checkAchievement(type, data) {
    const unlockedAchievements = [];

    switch (type) {
      case 'game-end':
        unlockedAchievements.push(...this.checkGameEndAchievements(data));
        break;
      case 'win-streak':
        unlockedAchievements.push(...this.checkWinStreakAchievements(data));
        break;
    }

    this.saveProgress();
    return unlockedAchievements;
  }

  /**
   * فحص إنجازات نهاية اللعبة
   */
  checkGameEndAchievements(data) {
    const unlocked = [];
    
    // إنجاز اللاعب المثابر
    this.progress.set('games-10', this.progress.get('games-10') + 1);
    if (this.progress.get('games-10') >= 10) {
      unlocked.push(this.unlockAchievement('games-10'));
    }

    // إنجاز قاهر الآلة
    if (data.winner === 'X' && data.difficulty === 'hard') {
      unlocked.push(this.unlockAchievement('beat-hard-ai'));
    }

    // إنجاز المدافع الصلب
    if (data.result === 'tie' && data.difficulty === 'hard') {
      this.progress.set('hard-ties-5', this.progress.get('hard-ties-5') + 1);
      if (this.progress.get('hard-ties-5') >= 5) {
        unlocked.push(this.unlockAchievement('hard-ties-5'));
      }
    }

    return unlocked.filter(Boolean);
  }

  /**
   * فحص إنجازات سلسلة الانتصارات
   */
  checkWinStreakAchievements(data) {
    const unlocked = [];
    
    if (data.streak >= 3) {
      unlocked.push(this.unlockAchievement('win-streak-3'));
    }

    return unlocked.filter(Boolean);
  }

  /**
   * إلغاء قفل الإنجاز
   */
  unlockAchievement(id) {
    const achievement = this.achievements.get(id);
    if (achievement && !achievement.unlocked) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date();
      this.achievements.set(id, achievement);
      return achievement;
    }
    return null;
  }

  /**
   * الحصول على جميع الإنجازات
   */
  getAchievements() {
    return Array.from(this.achievements.values());
  }

  /**
   * الحصول على الإنجازات المفتوحة
   */
  getUnlockedAchievements() {
    return this.getAchievements().filter(achievement => achievement.unlocked);
  }

  /**
   * حفظ التقدم في التخزين المحلي
   */
  saveProgress() {
    const data = {
      achievements: Object.fromEntries(this.achievements),
      progress: Object.fromEntries(this.progress)
    };
    localStorage.setItem('xo-achievements', JSON.stringify(data));
  }

  /**
   * تحميل التقدم من التخزين المحلي
   */
  loadProgress() {
    try {
      const saved = localStorage.getItem('xo-achievements');
      if (saved) {
        const data = JSON.parse(saved);
        if (data.achievements) {
          this.achievements = new Map(Object.entries(data.achievements));
        }
        if (data.progress) {
          this.progress = new Map(Object.entries(data.progress));
        }
      }
    } catch (error) {
      console.warn('فشل في تحميل بيانات الإنجازات:', error);
    }
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AchievementSystem;
}