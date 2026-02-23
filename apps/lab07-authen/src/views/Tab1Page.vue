<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>User Profile</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">

      <ion-card v-if="user">
        <ion-card-header class="ion-text-center">

          <!-- รูปโปรไฟล์ -->
          <ion-avatar v-if="user.photoUrl" class="center-avatar">
            <img :src="user.photoUrl" />
          </ion-avatar>

          <ion-card-title>
            {{ user.displayName || 'No Name' }}
          </ion-card-title>

          <ion-card-subtitle>
            {{ user.email || user.phoneNumber }}
          </ion-card-subtitle>

        </ion-card-header>

        <ion-card-content>
          <p><strong>UID:</strong> {{ user.uid }}</p>
          <p v-if="user.email"><strong>Email:</strong> {{ user.email }}</p>
          <p v-if="user.phoneNumber"><strong>Phone:</strong> {{ user.phoneNumber }}</p>
        </ion-card-content>
      </ion-card>

      <ion-button expand="block" color="danger" @click="logout">
        Logout
      </ion-button>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonCard, IonCardHeader,
  IonCardTitle, IonCardSubtitle, IonCardContent,
  IonAvatar, IonButton
} from '@ionic/vue'
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/auth/auth-service'
import type { AuthUser } from '@/auth/auth-interface'

const user = ref<AuthUser | null>(null)
const router = useRouter()

onMounted(async () => {
  user.value = await authService.getCurrentUser()
})

const logout = async () => {
  await authService.logout()
  router.replace('/login')
}
</script>

<style scoped>
.center-avatar {
  margin: 0 auto 10px auto;
  width: 90px;
  height: 90px;
}
</style>