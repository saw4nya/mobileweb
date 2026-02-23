import { TextToSpeech } from "@capacitor-community/text-to-speech";

export class TtsService {
  async speak(text: string) {
    await TextToSpeech.speak({
      text,
      lang: "th-TH",
      rate: 1.0,
    });
  }

  async stop() {
    await TextToSpeech.stop();
  }
}
