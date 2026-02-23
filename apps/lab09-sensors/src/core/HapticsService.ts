import { Haptics, NotificationType } from "@capacitor/haptics";

export class HapticsService {
  async success() {
    await Haptics.notification({ type: NotificationType.Success });
  }

  async warning() {
    await Haptics.notification({ type: NotificationType.Warning });
  }
}
