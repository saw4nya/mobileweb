<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
<div style="font-weight: bold; font-size: 1.1em;">Photo Gallery</div>        <div style="font-size: 0.7em; font-weight: normal; margin-top: 4px; opacity: 0.8; ">
          โดย ศวรรยา ศิริมูล 663380238-0
        </div>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <ion-grid>
        <ion-row>
          <ion-col size="6" v-for="photo in photos" :key="photo.filepath">
            <ion-img :src="photo.webviewPath"></ion-img>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-fab vertical="bottom" horizontal="center" slot="fixed">
        <ion-fab-button @click="addNewToGallery()">
          <ion-icon :icon="camera"></ion-icon>
        </ion-fab-button>
      </ion-fab>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { camera } from 'ionicons/icons';
// เพิ่ม Component สำหรับแสดงรูปภาพ
import {
  IonPage, IonHeader, IonFab, IonFabButton, IonIcon,
  IonToolbar, IonTitle, IonContent,
  IonGrid, IonRow, IonCol, IonImg
} from '@ionic/vue';

import { usePhotoGallery } from '@/composables/usePhotoGallery';

// CHANGE: ดึงทั้ง addNewToGallery และ photos มาใช้งาน
const { photos, addNewToGallery } = usePhotoGallery();
</script>