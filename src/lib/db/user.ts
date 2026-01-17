import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface UserData {
    mobile: string;
    name?: string;
    // Add other fields as needed
}

export async function saveMobileUser(mobile: string, name?: string) {
    try {
        const userRef = doc(db, "mobile_users", mobile);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                mobile,
                name: name || `User ${mobile.slice(-4)}`,
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                role: 'customer'
            });
        } else {
            await setDoc(userRef, {
                lastLogin: serverTimestamp()
            }, { merge: true });
        }
        return true;
    } catch (error: any) {
        console.error("Error saving mobile user:", error);
        return false;
    }
}

export async function saveEmailUser(email: string, name?: string) {
    try {
        const userRef = doc(db, "email_users", email);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
            await setDoc(userRef, {
                email,
                name: name || email.split('@')[0],
                createdAt: serverTimestamp(),
                lastLogin: serverTimestamp(),
                role: 'customer'
            });
        } else {
            await setDoc(userRef, {
                lastLogin: serverTimestamp()
            }, { merge: true });
        }
        return true;
    } catch (error: any) {
        console.error("Error saving email user:", error);
        return false;
    }
}
