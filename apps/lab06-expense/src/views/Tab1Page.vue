<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>เพิ่มรายการรายรับ–รายจ่าย</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content class="ion-padding">
      <ion-input label="ชื่อรายการ" v-model="title"></ion-input>

      <ion-input
        label="จำนวนเงิน"
        type="number"
        v-model="amount">
      </ion-input>

      <ion-select label="ประเภท" v-model="type">
        <ion-select-option value="income">รายรับ</ion-select-option>
        <ion-select-option value="expense">รายจ่าย</ion-select-option>
      </ion-select>

      <ion-input label="หมวดหมู่" v-model="category"></ion-input>

      <ion-textarea label="หมายเหตุ" v-model="note"></ion-textarea>

      <ion-button expand="block" @click="saveExpense">
        บันทึกข้อมูล
      </ion-button>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { useRouter } from "vue-router";

const router = useRouter();

const title = ref("");
const amount = ref(0);
const type = ref("expense");
const category = ref("");
const note = ref("");

const saveExpense = async () => {
  await addDoc(collection(db, "expenses"), {
    title: title.value,
    amount: Number(amount.value),
    type: type.value,
    category: category.value,
    note: note.value,
    createdAt: new Date()
  });

  router.push("/tabs/tab1");
};
</script>
