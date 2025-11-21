/**
 * Notification Sound System
 * Plays sound for messages, meetings, and other notifications
 */

class NotificationSoundManager {
  private audioContext: AudioContext | null = null;
  private enabled: boolean = true;

  constructor() {
    // Initialize AudioContext on first user interaction
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  /**
   * Enable/disable notification sounds
   */
  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('notificationSoundsEnabled', enabled.toString());
    }
  }

  /**
   * Check if sounds are enabled
   */
  isEnabled(): boolean {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('notificationSoundsEnabled');
      if (stored !== null) {
        this.enabled = stored === 'true';
      }
    }
    return this.enabled;
  }

  /**
   * Play message notification sound (soft, pleasant tone)
   */
  playMessageSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Message sound: Two soft tones
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.3);
  }

  /**
   * Play meeting notification sound (attention-grabbing)
   */
  playMeetingSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Meeting sound: Rising tone
    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime);
    oscillator.frequency.linearRampToValueAtTime(1200, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.4, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  /**
   * Play agreement notification sound (formal)
   */
  playAgreementSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Agreement sound: Three distinct tones
    oscillator.frequency.setValueAtTime(700, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(900, this.audioContext.currentTime + 0.1);
    oscillator.frequency.setValueAtTime(1100, this.audioContext.currentTime + 0.2);

    gainNode.gain.setValueAtTime(0.35, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.5);
  }

  /**
   * Play payment notification sound (success)
   */
  playPaymentSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    // Payment sound: Cheerful ascending tones
    oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime + 0.08);
    oscillator.frequency.setValueAtTime(1200, this.audioContext.currentTime + 0.16);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.4);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.4);
  }

  /**
   * Play generic notification sound
   */
  playNotificationSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(1000, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.2);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.2);
  }

  /**
   * Play typing indicator sound (subtle)
   */
  playTypingSound() {
    if (!this.isEnabled() || !this.audioContext) return;

    const oscillator = this.audioContext.createOscillator();
    const gainNode = this.audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(this.audioContext.destination);

    oscillator.frequency.setValueAtTime(400, this.audioContext.currentTime);

    gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + 0.05);
  }

  /**
   * Resume audio context (needed for Safari and some browsers)
   */
  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      await this.audioContext.resume();
    }
  }
}

// Export singleton instance
export const notificationSound = new NotificationSoundManager();

// Auto-resume on user interaction
if (typeof window !== 'undefined') {
  ['click', 'touchstart', 'keydown'].forEach(event => {
    window.addEventListener(event, () => {
      notificationSound.resume();
    }, { once: true });
  });
}
