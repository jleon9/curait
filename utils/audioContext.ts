// utils/audioContext.ts

function initAudioContext(): AudioContext {
    // Use the standard AudioContext or the webkitAudioContext for Safari
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  
    // Additional setup or configuration can be added here if needed
  
    return audioContext;
  }
  
  export default initAudioContext;
  