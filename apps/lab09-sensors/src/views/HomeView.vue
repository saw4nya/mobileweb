<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Lab09 Sensors</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <h1>{{ state?.repDisplay ?? 0 }}</h1>
      <p>คะแนน: {{ state?.stats.score ?? 0 }}</p>
      <p>{{ state?.stats.lastMessage }}</p>

      <ion-button expand="block" @click="start">Start</ion-button>
      <ion-button expand="block" color="medium" @click="stop">Stop</ion-button>
    </ion-content>

    <ion-footer class="ion-padding">
      663380238-0 นางสาวศวรรยา ศิริมูล
    </ion-footer>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { MotionService } from "../core/MotionService";
import { TtsService } from "../core/TtsService";
import { ArmWorkoutEngine } from "../core/ArmWorkoutEngine";
import type { WorkoutState } from "../core/types";

const state = ref<WorkoutState | null>(null);

const engine = new ArmWorkoutEngine();
const motion = new MotionService();
const tts = new TtsService();

onMounted(() => {
  engine.onChange((s) => (state.value = s));
});

async function start() {
  await tts.speak("เริ่มกายบริหารแขน ยกขึ้นจนสุดแล้วลดลง");
  engine.start();
  await motion.start((s) => engine.process(s));
}

async function stop() {
  await motion.stop();
  engine.stop();
}
</script>