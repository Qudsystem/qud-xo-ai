/**
 * مدير أوضاع اللعب - يدير التبديل بين وضع AI ووضع PvP
 */
class GameModeManager {
  constructor() {
    this.currentMode = 'ai'; // 'ai' أو 'pvp' أو 'ai-vs-ai'
    this.playerNames = { 
      player1: 'أنت', 
      player2: 'الذكاء الاصطناعي' 
    };
    this.aiDifficulties = {
      ai1: 'medium',
      ai2: 'hard'
    };
  }

  /**
   * تبديل وضع اللعبة
   */
  switchMode() {
    this.currentMode = this.currentMode === 'ai' ? 'pvp' : 'ai';
    this.updatePlayerNames();
    return this.currentMode;
  }

  /**
   * الحصول على الوضع الحالي
   */
  getCurrentMode() {
    return this.currentMode;
  }

  /**
   * تعيين أسماء اللاعبين
   */
  setPlayerNames(names) {
    this.playerNames = { ...this.playerNames, ...names };
  }

  /**
   * تحديث أسماء اللاعبين حسب الوضع
   */
  updatePlayerNames() {
    if (this.currentMode === 'pvp') {
      this.playerNames = {
        player1: 'اللاعب 1',
        player2: 'اللاعب 2'
      };
    } else if (this.currentMode === 'ai-vs-ai') {
      this.playerNames = {
        player1: `AI 1 (${this.getDifficultyLabel(this.aiDifficulties.ai1)})`,
        player2: `AI 2 (${this.getDifficultyLabel(this.aiDifficulties.ai2)})`
      };
    } else {
      this.playerNames = {
        player1: 'أنت',
        player2: 'الذكاء الاصطناعي'
      };
    }
  }

  /**
   * الحصول على تسمية مستوى الصعوبة
   */
  getDifficultyLabel(difficulty) {
    const labels = {
      easy: 'سهل',
      medium: 'متوسط',
      hard: 'صعب'
    };
    return labels[difficulty] || difficulty;
  }

  /**
   * تعيين صعوبة AI
   */
  setAIDifficulty(aiNumber, difficulty) {
    if (aiNumber === 1) {
      this.aiDifficulties.ai1 = difficulty;
    } else if (aiNumber === 2) {
      this.aiDifficulties.ai2 = difficulty;
    }
    this.updatePlayerNames();
  }

  /**
   * الحصول على صعوبة AI
   */
  getAIDifficulty(aiNumber) {
    return aiNumber === 1 ? this.aiDifficulties.ai1 : this.aiDifficulties.ai2;
  }

  /**
   * التحقق من كون الوضع AI vs AI
   */
  isAIvsAIMode() {
    return this.currentMode === 'ai-vs-ai';
  }

  /**
   * الحصول على اسم اللاعب
   */
  getPlayerName(player) {
    return player === 'X' ? this.playerNames.player1 : this.playerNames.player2;
  }

  /**
   * التحقق من كون الوضع PvP
   */
  isPvPMode() {
    return this.currentMode === 'pvp';
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = GameModeManager;
}