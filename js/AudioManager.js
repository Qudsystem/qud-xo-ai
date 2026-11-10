/**
 * مدير الصوت - يدير التأثيرات الصوتية
 */
class AudioManager {
  constructor() {
    this.enabled = this.loadSoundPreference();
    this.sounds = {};
    this.initializeSounds();
  }

  /**
   * تهيئة الأصوات
   */
  initializeSounds() {
    // إنشاء أصوات بسيطة باستخدام Web Audio API
    this.sounds = {
      click: this.createTone(800, 0.1, 'sine'),
      win: this.createTone(523.25, 0.3, 'triangle'), // نوتة C5
      tie: this.createTone(440, 0.2, 'square'), // نوتة A4
      achievement: this.createTone(659.25, 0.4, 'sine') // نوتة E5
    };
  }

  /**
   * إنشاء نغمة صوتية
   */
  createTone(frequency, duration, type = 'sine') {
    return () => {
      if (!this.enabled) return;
      
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = frequency;
        oscillator.type = type;

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + duration);
      } catch (error) {
        console.warn('فشل في تشغيل الصوت:', error);
      }
    };
  }

  /**
   * تشغيل صوت محدد
   */
  playSound(soundName) {
    if (!this.enabled || !this.sounds[soundName]) return;
    
    try {
      this.sounds[soundName]();
    } catch (error) {
      console.warn(`فشل في تشغيل الصوت ${soundName}:`, error);
    }
  }

  /**
   * تشغيل صوت النقرة
   */
  playClickSound() {
    this.playSound('click');
  }

  /**
   * تشغيل صوت الفوز
   */
  playWinSound() {
    this.playSound('win');
  }

  /**
   * تشغيل صوت التعادل
   */
  playTieSound() {
    this.playSound('tie');
  }

  /**
   * تشغيل صوت الإنجاز
   */
  playAchievementSound() {
    this.playSound('achievement');
  }

  /**
   * تبديل حالة الصوت
   */
  toggleSound() {
    this.enabled = !this.enabled;
    this.saveSoundPreference();
    return this.enabled;
  }

  /**
   * تفعيل الصوت
   */
  enableSound() {
    this.enabled = true;
    this.saveSoundPreference();
  }

  /**
   * إيقاف الصوت
   */
  disableSound() {
    this.enabled = false;
    this.saveSoundPreference();
  }

  /**
   * التحقق من حالة الصوت
   */
  isSoundEnabled() {
    return this.enabled;
  }

  /**
   * حفظ تفضيل الصوت
   */
  saveSoundPreference() {
    try {
      localStorage.setItem('xo-sound-enabled', JSON.stringify(this.enabled));
    } catch (error) {
      console.warn('فشل في حفظ تفضيل الصوت:', error);
    }
  }

  /**
   * تحميل تفضيل الصوت
   */
  loadSoundPreference() {
    try {
      const saved = localStorage.getItem('xo-sound-enabled');
      return saved ? JSON.parse(saved) : true; // افتراضياً مفعل
    } catch (error) {
      console.warn('فشل في تحميل تفضيل الصوت:', error);
      return true;
    }
  }

  /**
   * إنشاء تأثير صوتي معقد للفوز
   */
  playVictoryFanfare() {
    if (!this.enabled) return;

    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    notes.forEach((frequency, index) => {
      setTimeout(() => {
        this.createTone(frequency, 0.3, 'triangle')();
      }, index * 150);
    });
  }

  /**
   * تشغيل تأثير صوتي للإنجاز
   */
  playAchievementFanfare() {
    if (!this.enabled) return;

    const melody = [
      { freq: 523.25, duration: 0.2 }, // C5
      { freq: 659.25, duration: 0.2 }, // E5
      { freq: 783.99, duration: 0.2 }, // G5
      { freq: 1046.5, duration: 0.4 }  // C6
    ];

    melody.forEach((note, index) => {
      setTimeout(() => {
        this.createTone(note.freq, note.duration, 'sine')();
      }, index * 200);
    });
  }
}

// تصدير للاستخدام في ملفات أخرى
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AudioManager;
}