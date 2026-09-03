export const ANTI_SCAM_WARNING_TEXT =
  'Warning: Official police, court, or government authorities will never demand money transfers over the phone to avoid arrest. Disconnect the call now.';

export function speakAntiScamWarning(onEnd?: () => void): boolean {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    console.warn('Web Speech API is not supported in this environment.');
    return false;
  }

  try {
    // Cancel any ongoing speech synthesis
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(ANTI_SCAM_WARNING_TEXT);
    utterance.rate = 0.92; // Slightly clear and calm speech rate
    utterance.pitch = 1.0;
    utterance.volume = 1.0;
    utterance.lang = 'en-US';

    if (onEnd) {
      utterance.onend = onEnd;
    }

    // Attempt to pick a natural-sounding English voice if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Zira') || v.name.includes('David'))
    );
    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    window.speechSynthesis.speak(utterance);
    return true;
  } catch (err) {
    console.error('Failed to execute Web Speech API:', err);
    return false;
  }
}

export function stopSpeech(): void {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
}
