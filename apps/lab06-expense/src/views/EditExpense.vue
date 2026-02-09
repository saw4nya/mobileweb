<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="warning">
        <ion-buttons slot="start">
          <ion-back-button default-href="/tabs/tab1"></ion-back-button>
        </ion-buttons>
        <ion-title>แก้ไขรายการ</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-input label="ชื่อรายการ" label-placement="floating" v-model="expense.title"></ion-input>
      </ion-item>

      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-input label="จำนวนเงิน" label-placement="floating" type="number" v-model="expense.amount"></ion-input>
      </ion-item>

      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-select label="ประเภท" label-placement="floating" v-model="expense.type">
          <ion-select-option value="income">รายรับ</ion-select-option>
          <ion-select-option value="expense">รายจ่าย</ion-select-option>
        </ion-select>
      </ion-item>

      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-input label="หมวดหมู่" label-placement="floating" v-model="expense.category"></ion-input>
      </ion-item>

      <ion-item fill="outline" class="ion-margin-bottom">
        <ion-textarea label="หมายเหตุ" label-placement="floating" v-model="expense.note"></ion-textarea>
      </ion-item>

      <ion-button expand="block" color="warning" @click="updateExpense">
        อัปเดตข้อมูล
      </ion-button>

      <ion-button expand="block" fill="clear" color="danger" @click="confirmDelete">
        ลบรายการนี้
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '@/firebase';
import { 
  IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonInput, 
  IonSelect, IonSelectOption, IonTextarea, IonButton, IonItem, 
  IonBackButton, IonButtons, alertController 
} from '@ionic/vue';

const route = useRoute();
const router = useRouter();
const id = route.params.id as string; // รับค่า id จาก URL

const expense = ref({
  title: '',
  amount: 0,
  type: 'expense',
  category: '',
  note: ''
});

// ดึงข้อมูลเดิมจาก Firestore มาโชว์ในฟอร์ม
onMounted(async () => {
  if (id) {
    const docRef = doc(db, "expenses", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      expense.value = docSnap.data() as any;
    }
  }
});

// ขั้นตอนที่ 5: ฟังก์ชันอัปเดตข้อมูล (updateDoc)
const updateExpense = async () => {
  try {
    const docRef = doc(db, "expenses", id);
    await updateDoc(docRef, {
      ...expense.value,
      amount: Number(expense.value.amount)
    });
    router.push('/tabs/tab1'); // แก้เสร็จแล้วกลับไปหน้าหลัก
  } catch (error) {
    console.error("Error updating:", error);
  }
};

// ขั้นตอนที่ 6: ฟังก์ชันลบข้อมูล (deleteDoc) พร้อมกล่องยืนยัน
const confirmDelete = async () => {
  const alert = await alertController.create({
    header: 'ยืนยันการลบ?',
    message: 'คุณต้องการลบรายการนี้ใช่หรือไม่?',
    buttons: [
      { text: 'ยกเลิก', role: 'cancel' },
      {
        text: 'ลบ',
        role: 'destructive',
        handler: async () => {
          await deleteDoc(doc(db, "expenses", id));
          router.push('/tabs/tab1');
        }
      }
    ]
  });
  await alert.present();
};
</script>