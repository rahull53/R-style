import { db } from "../firebase";
import { doc, setDoc, getDoc, deleteDoc, serverTimestamp } from "firebase/firestore";

const OTP_COLLECTION = "otps";
const OTP_EXPIRY_MINUTES = 10;

export async function saveOTPToDb(identifier: string, otp: string) {
    try {
        const otpRef = doc(db, OTP_COLLECTION, identifier);
        await setDoc(otpRef, {
            otp,
            createdAt: serverTimestamp(),
            expiresAt: new Date(Date.now() + OTP_EXPIRY_MINUTES * 60000)
        });
        return true;
    } catch (error) {
        console.error("Error saving OTP to Firestore:", error);
        return false;
    }
}

export async function verifyOTPFromDb(identifier: string, providedOtp: string) {
    try {
        const otpRef = doc(db, OTP_COLLECTION, identifier);
        const otpSnap = await getDoc(otpRef);

        if (!otpSnap.exists()) return { success: false, error: "OTP expired or not found" };

        const data = otpSnap.data();
        const now = new Date();
        const expiresAt = data.expiresAt.toDate();

        if (now > expiresAt) {
            await deleteDoc(otpRef);
            return { success: false, error: "OTP expired" };
        }

        if (data.otp === providedOtp) {
            // Delete OTP after successful verification
            await deleteDoc(otpRef);
            return { success: true };
        }

        return { success: false, error: "Invalid OTP" };
    } catch (error) {
        console.error("Error verifying OTP in Firestore:", error);
        return { success: false, error: "Verification system error" };
    }
}
