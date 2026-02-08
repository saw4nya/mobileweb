import { camera } from 'ionicons/icons';
import { 
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar, 
  IonFab, IonFabButton, IonIcon, 
  IonGrid, IonRow, IonCol, IonImg // เพิ่ม Grid เพื่อแสดงรูป
} from '@ionic/react';
import './Tab2.css';

// 1. นำเข้า Hook ที่เราเพิ่งสร้าง
import { usePhotoGallery } from '../hooks/usePhotoGallery';

const Tab2: React.FC = () => {
  // 2. ดึง photos และ addNewToGallery ออกมาจาก Hook
  const { photos, addNewToGallery } = usePhotoGallery();

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Photo Gallery</IonTitle>
          {/* ข้อมูล Lab ของคุณ */}
          <IonTitle size="small">Lab 05 - โดย ศวรรยา ศิริมูล รหัส 663380238-0</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        
        {/* 3. เพิ่มส่วนการแสดงผลรูปภาพที่ถ่ายแล้ว */}
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="2" key={index}>
                <IonImg src={photo.webviewPath} />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        {/* 4. เปลี่ยนมาเรียกใช้ addNewToGallery แทน takePhoto อันเดิม */}
        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => addNewToGallery()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

      </IonContent>
    </IonPage>
  );
};

export default Tab2;