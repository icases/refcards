// Simple sound utility for game feedback
export const playSound = (type) => {
  if (typeof window === 'undefined') return;
  
  // Create audio context if it doesn't exist
  if (!window.audioContext) {
    window.audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  
  const ctx = window.audioContext;
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);
  
  // Different sounds for different actions
  switch (type) {
    case 'correct':
      oscillator.frequency.setValueAtTime(523.25, ctx.currentTime); // C5
      oscillator.frequency.setValueAtTime(659.25, ctx.currentTime + 0.1); // E5
      oscillator.frequency.setValueAtTime(783.99, ctx.currentTime + 0.2); // G5
      break;
    case 'incorrect':
      oscillator.frequency.setValueAtTime(220, ctx.currentTime); // A3
      oscillator.frequency.setValueAtTime(196, ctx.currentTime + 0.15); // G3
      break;
    case 'click':
      oscillator.frequency.setValueAtTime(800, ctx.currentTime);
      break;
    default:
      oscillator.frequency.setValueAtTime(440, ctx.currentTime);
  }
  
  oscillator.type = 'sine';
  gainNode.gain.setValueAtTime(0, ctx.currentTime);
  gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.01);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
  
  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + 0.3);
};
