import { FirebaseAuthentication } from "@capacitor-firebase/authentication";
import type { IAuthService } from "./auth-interface";
import type { AuthUser, EmailPasswordCredentials, PhoneCredentials } from "./auth-interface";


function mapUser(u: any): AuthUser {
  return {
    uid: u.uid,
    email: u.email ?? null,
    phoneNumber: u.phoneNumber ?? null,
    displayName: u.displayName ?? null,
    photoUrl: u.photoUrl ?? null,
  };
}


export class FirebaseAppAuthService implements IAuthService {
  async getCurrentUser(): Promise<AuthUser | null> {
    const { user } = await FirebaseAuthentication.getCurrentUser();
    return user ? mapUser(user) : null;
  }


  async loginWithEmailPassword(creds: EmailPasswordCredentials): Promise<AuthUser> {
    const { user } = await FirebaseAuthentication.signInWithEmailAndPassword(creds);
    return mapUser(user);
  }


  async loginWithGoogle(): Promise<AuthUser> {
    const { user } = await FirebaseAuthentication.signInWithGoogle();
    return mapUser(user);
  }


  //ให้ UI คุม state เอง แต่ service คุม listener/flow ให้
  async startPhoneLogin(creds: PhoneCredentials): Promise<{ verificationId: string }> {
    // จะได้ verificationId ผ่าน event phoneCodeSent
    return new Promise(async (resolve, reject) => {
      const offFailed = await FirebaseAuthentication.addListener("phoneVerificationFailed", (e) => {
        reject(new Error(e.message ?? "Phone verification failed"));
      });


      const offSent = await FirebaseAuthentication.addListener("phoneCodeSent", (e) => {
        // cleanup listener ฝั่ง success step 1
        offFailed.remove();
        offSent.remove();
        resolve({ verificationId: e.verificationId });
      });


      await FirebaseAuthentication.signInWithPhoneNumber({
        phoneNumber: creds.phoneNumberE164,
      });
    });
  }


  async confirmPhoneCode(payload: { verificationId: string; verificationCode: string }): Promise<AuthUser> {
    const { user } = await FirebaseAuthentication.confirmVerificationCode(payload);
    return mapUser(user);
  }


  async logout(): Promise<void> {
    await FirebaseAuthentication.signOut();
  }
}