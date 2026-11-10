/**
 * واجهات وأنواع البيانات للمكونات الجديدة
 */

/**
 * واجهة حالة اللعبة المحسّنة
 */
const EnhancedGameState = {
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

/**
 * واجهة نتيجة اللعبة
 */
const GameResult = {
  winner: null, // 'X', 'O', أو null للتعادل
  difficulty: 'hard',
  gameMode: 'ai',
  result: 'win' // 'win', 'loss', 'tie'
};

/**
 * واجهة الإنجاز
 */
const Achievement = {
  id: 'achievement-id',
  name: 'اسم الإنجاز',
  description: 'وصف الإنجاز',
  icon: 'fas fa-trophy',
  unlocked: false,
  unlockedAt: null,
  progress: 0,
  target: 1,
  type: 'win'
};

/**
 * واجهة الثيم
 */
const Theme = {
  name: 'theme-name',
  displayName: 'اسم الثيم',
  colors: {
    primary: '#3b82f6',
    secondary: '#ec4899',
    background: '#020617',
    surface: '#0f172a',
    text: '#f1f5f9'
  }
};

/**
 * واجهة مجموعة الرموز
 */
const SymbolSet = {
  name: 'symbol-set-name',
  displayName: 'اسم مجموعة الرموز',
  x: 'X',
  o: 'O'
};

/**
 * واجهة الإحصائيات
 */
const Statistics = {
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

/**
 * أحداث النظام
 */
const SystemEvents = {
  GAME_MODE_CHANGED: 'gameModeChanged',
  THEME_CHANGED: 'themeChanged',
  SYMBOL_SET_CHANGED: 'symbolSetChanged',
  SOUND_TOGGLED: 'soundToggled',
  ACHIEVEMENT_UNLOCKED: 'achievementUnlocked',
  GAME_STATE_SAVED: 'gameStateSaved',
  GAME_STATE_LOADED: 'gameStateLoaded'
};

/**
 * مساعدات التحقق من صحة البيانات
 */
const ValidationHelpers = {
  /**
   * التحقق من صحة وضع اللعبة
   */
  isValidGameMode(mode) {
    return ['ai', 'pvp'].includes(mode);
  },

  /**
   * التحقق من صحة مستوى الصعوبة
   */
  isValidDifficulty(difficulty) {
    return ['easy', 'medium', 'hard'].includes(difficulty);
  },

  /**
   * التحقق من صحة اللاعب
   */
  isValidPlayer(player) {
    return ['X', 'O'].includes(player);
  },

  /**
   * التحقق من صحة حالة اللعبة
   */
  isValidGameState(gameState) {
    return (
      Array.isArray(gameState) &&
      gameState.length === 9 &&
      gameState.every(cell => ['', 'X', 'O'].includes(cell))
    );
  },

  /**
   * التحقق من صحة النقاط
   */
  isValidScores(scores) {
    return (
      scores &&
      typeof scores.player === 'number' &&
      typeof scores.ties === 'number' &&
      typeof scores.ai === 'number' &&
      scores.player >= 0 &&
      scores.ties >= 0 &&
      scores.ai >= 0
    );
  }
};

/**
 * ثوابت النظام
 */
const SystemConstants = {
  STORAGE_KEYS: {
    GAME_STATE: 'xo-game-state',
    SETTINGS: 'xo-game-settings',
    ACHIEVEMENTS: 'xo-achievements',
    STATISTICS: 'xo-statistics',
    THEME: 'xo-theme',
    SYMBOLS: 'xo-symbols',
    SOUND: 'xo-sound-enabled'
  },
  
  DEFAULT_VALUES: {
    GAME_MODE: 'ai',
    DIFFICULTY: 'hard',
    THEME: 'dark',
    SYMBOL_SET: 'classic',
    SOUND_ENABLED: true
  },
  
  GAME_MODES: ['ai', 'pvp'],
  DIFFICULTIES: ['easy', 'medium', 'hard'],
  PLAYERS: ['X', 'O'],
  
  MAX_SAVE_AGE: 24 * 60 * 60 * 1000, // 24 ساعة
  AUTO_SAVE_DELAY: 1000 // 1 ثانية
};

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    EnhancedGameState,
    GameResult,
    Achievement,
    Theme,
    SymbolSet,
    Statistics,
    SystemEvents,
    ValidationHelpers,
    SystemConstants
  };
}