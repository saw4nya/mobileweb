<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>รายการรายรับ-รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-grid>
        <ion-row>
          <ion-col size="6">
            <ion-card color="success" class="ion-no-margin">
              <ion-card-header>
                <ion-card-subtitle>รายรับรวม</ion-card-subtitle>
                <ion-card-title>{{ totalIncome.toLocaleString() }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
          <ion-col size="6">
            <ion-card color="danger" class="ion-no-margin">
              <ion-card-header>
                <ion-card-subtitle>รายจ่ายรวม</ion-card-subtitle>
                <ion-card-title>{{ totalExpense.toLocaleString() }}</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="12">
            <ion-card :color="totalBalance >= 0 ? 'light' : 'warning'" class="ion-no-margin ion-margin-top">
              <ion-card-header>
                <ion-card-subtitle>คงเหลือสุทธิ</ion-card-subtitle>
                <ion-card-title>{{ totalBalance.toLocaleString() }} บาท</ion-card-title>
              </ion-card-header>
            </ion-card>
          </ion-col>
        </ion-row>
      </ion-grid>

      <ion-list class="ion-margin-top">
        <ion-list-header>
          <ion-label>ประวัติรายการ</ion-label>
        </ion-list-header>

        <ion-item v-for="item in expenses" :key="item.id" @click="goToEdit(item.id)" button>
          <ion-label>
            <h2>{{ item.title }}</h2>
            <p>{{ item.category }} <span v-if="item.note">({{ item.note }})</span></p>
          </ion-label>
          <ion-note slot="end" :color="item.type === 'income' ? 'success' : 'danger'" class="ion-text-bold">
            {{ item.type === 'income' ? '+' : '-' }}{{ item.amount.toLocaleString() }}
          </ion-note>
        </ion-item>
      </ion-list>

      <div v-if="expenses.length === 0" class="ion-text-center ion-padding">
        <p>ยังไม่มีรายการบันทึกในขณะนี้</p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, 
  IonList, IonItem, IonLabel, IonNote, IonGrid, IonRow, 
  IonCol, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle, IonListHeader 
} from '@ionic/vue';
import { collection, query, onSnapshot, orderBy } from 'firebase/firestore';
import { db } from '@/firebase'; // ตรวจสอบว่าไฟล์ firebase.ts มีการ export db นะครับ
import { useRouter } from 'vue-router';

const router = useRouter();
const expenses = ref<any[]>([]);

// ส่วนที่ 2: ใช้ onSnapshot ดึงข้อมูลจาก Firestore แบบ Realtime
onMounted(() => {
  const q = query(collection(db, "expenses"), orderBy("createdAt", "desc"));
  
  onSnapshot(q, (snapshot) => {
    expenses.value = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  });
});

// ส่วนที่ 4: คำนวณสรุปผลรวมรายรับ
const totalIncome = computed(() => {
  return expenses.value
    .filter(item => item.type === 'income')
    .reduce((sum, item) => sum + Number(item.amount), 0);
});

// ส่วนที่ 4: คำนวณสรุปผลรวมรายจ่าย
const totalExpense = computed(() => {
  return expenses.value
    .filter(item => item.type === 'expense')
    .reduce((sum, item) => sum + Number(item.amount), 0);
});

// คำนวณยอดคงเหลือสุทธิ
const totalBalance = computed(() => totalIncome.value - totalExpense.value);

// ฟังก์ชันสำหรับกดไปหน้าแก้ไข
const goToEdit = (id: string) => {
  router.push(`/edit-expense/${id}`); // ปรับ path ตามที่ลูกพี่ตั้งใน router
};
</script>

<style scoped>
.ion-text-bold {
  font-weight: bold;
  font-size: 1.1em;
}
</style>