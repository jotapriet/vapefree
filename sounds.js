// Audio sintetizado localmente: no necesita archivos ni conexión.
let context;
let muted = false;
try { muted = localStorage.getItem('vapefree-sound-muted') === 'true'; } catch {}

export const isSoundMuted = () => muted;
export function toggleSound() {
  muted = !muted;
  try { localStorage.setItem('vapefree-sound-muted', String(muted)); } catch {}
  // Silencia también cualquier efecto que todavía esté sonando.
  if (muted && context?.state === 'running') context.suspend().catch(() => {});
  return muted;
}

export async function playBubblePop(volume = 0.5) {
  if (muted || volume <= 0) return;
  try {
    const Audio = window.AudioContext || window.webkitAudioContext;
    if (!Audio) return;
    context ??= new Audio();
    if (context.state === 'suspended') await context.resume();
    if (muted || context.state !== 'running') return;
    const now = context.currentTime;
    const oscillator = context.createOscillator();
    const gain = context.createGain();
    const pitch = 480 + Math.random() * 240;
    oscillator.type = 'sine';
    oscillator.frequency.setValueAtTime(pitch, now);
    oscillator.frequency.exponentialRampToValueAtTime(90, now + 0.11);
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.12 * Math.min(1, volume), now + 0.006);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    oscillator.connect(gain);
    gain.connect(context.destination);
    oscillator.start(now);
    oscillator.stop(now + 0.16);
    oscillator.onended = () => { oscillator.disconnect(); gain.disconnect(); };
  } catch {
    // Si el navegador bloquea el audio, el juego sigue funcionando.
  }
}
