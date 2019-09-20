export let msg: SpeechSynthesisUtterance | undefined = undefined;
export let voices: SpeechSynthesisVoice[] = [];

export const prepareSpeech = () => {
  voices = speechSynthesis.getVoices();
  msg = new SpeechSynthesisUtterance();
  msg.volume = 1;
  msg.pitch = 1;
  msg.rate = 0.8;
  msg.lang = "pl-PL";
};

export const speakText = text => {
  if (msg !== undefined) {
    msg.text = text;
    window.speechSynthesis.speak(msg);
  } else {
    prepareSpeech();
    msg!.text = text;
    window.speechSynthesis.speak(msg!);
  }
};
