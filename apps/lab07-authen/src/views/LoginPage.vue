<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>Login</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">

            <!-- Email / Password -->
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Email Login</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-input label="Email" label-placement="floating" v-model="email" type="email" />

                    <ion-input label="Password" label-placement="floating" v-model="password" type="password" />

                    <ion-button expand="block" @click="loginEmail">
                        Login with Email
                    </ion-button>
                    <!-- Google Login -->
                    <ion-button expand="block" color="danger" @click="loginGoogle">
                        Login with Google
                    </ion-button>
                </ion-card-content>
            </ion-card>



            <!-- Phone Login -->
            <ion-card>
                <ion-card-header>
                    <ion-card-title>Phone Login</ion-card-title>
                </ion-card-header>

                <ion-card-content>
                    <ion-input label="Phone (+66xxxxxxxxx)" label-placement="floating" v-model="phone" />

                    <ion-button expand="block" @click="sendOTP">
                        Send OTP
                    </ion-button>

                    <ion-input v-if="verificationId" label="OTP Code" label-placement="floating" v-model="otp" />

                    <ion-button v-if="verificationId" expand="block" color="success" @click="confirmOTP">
                        Confirm OTP
                    </ion-button>

                    <!-- reCAPTCHA container (สำคัญสำหรับ Web) -->
                    <div id="recaptcha-container"></div>
                </ion-card-content>
            </ion-card>

            <ion-text color="danger">
                <p>{{ error }}</p>
            </ion-text>

        </ion-content>
    </ion-page>
    <div id="recaptcha-container"></div>
</template>

<script setup lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle,
    IonContent, IonInput, IonButton, IonCard,
    IonCardHeader, IonCardTitle, IonCardContent,
    IonText
} from '@ionic/vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { authService } from '@/auth/auth-service'

const router = useRouter()

const email = ref('')
const password = ref('')
const phone = ref('')
const otp = ref('')
const verificationId = ref<string | null>(null)
const error = ref('')

const goToHome = () => {
    router.replace('/tabs/tab1')
}

// Email login
const loginEmail = async () => {
    try {
        error.value = ''
        await authService.loginWithEmailPassword({
            email: email.value,
            password: password.value
        })
        goToHome()
    } catch (e: any) {
        error.value = e.message
    }
}

// Google login
const loginGoogle = async () => {
    try {
        error.value = ''
        await authService.loginWithGoogle()
        goToHome()
    } catch (e: any) {
        error.value = e.message
    }
}

// Send OTP
const sendOTP = async () => {
    try {
        error.value = ''
        const result = await authService.startPhoneLogin({
            phoneNumberE164: phone.value
        })
        verificationId.value = result.verificationId
    } catch (e: any) {
        error.value = e.message
    }
}

// Confirm OTP
const confirmOTP = async () => {
    try {
        error.value = ''
        if (!verificationId.value) return

        await authService.confirmPhoneCode({
            verificationId: verificationId.value,
            verificationCode: otp.value
        })

        goToHome()
    } catch (e: any) {
        error.value = e.message
    }
}
</script>