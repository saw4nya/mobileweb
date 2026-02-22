export interface AuthUser {
  uid: string;
  email?: string | null;
  phoneNumber?: string | null;
  displayName?: string | null;
  photoUrl?: string | null;
}


export interface EmailPasswordCredentials {
  email: string;
  password: string;
}


export interface PhoneCredentials {
  phoneNumberE164: string; // เช่น +66812345678
}


export type AuthProvider = "email" | "phone" | "google";


export interface IAuthService {
  getCurrentUser(): Promise<AuthUser | null>;


  loginWithEmailPassword(creds: EmailPasswordCredentials): Promise<AuthUser>;
  loginWithGoogle(): Promise<AuthUser>;


  // phone: แยกเป็น 2 ขั้น: ส่ง OTP และยืนยัน OTP
  startPhoneLogin(creds: PhoneCredentials): Promise<{ verificationId: string }>;
  confirmPhoneCode(payload: { verificationId: string; verificationCode: string }): Promise<AuthUser>;


  logout(): Promise<void>;
}
