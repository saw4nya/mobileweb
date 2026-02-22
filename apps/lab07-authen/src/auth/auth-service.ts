import { Capacitor } from "@capacitor/core";
import type { IAuthService } from "./auth-interface";
import { FirebaseWebAuthService } from "./auth-web";
import { FirebaseAppAuthService } from "./auth-app";


export const authService: IAuthService =
  Capacitor.isNativePlatform()
    ? new FirebaseAppAuthService()      // Android / iOS
    : new FirebaseWebAuthService();     // Web