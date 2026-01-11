import { db } from "../firebase";
import { doc, setDoc, getDoc, serverTimestamp } from "firebase/firestore";

interface UserData {
    mobile: string;
    name?: string;
    // Add other fields as needed
}

export async function saveUserWithMobile(mobile: string, name?: string) {
    console.log("Attempting to save user:", mobile, name);
    try {
        const userRef = doc(db, "users", mobile);
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
        console.error("Error saving user to Firestore:", error);
        return false;
    }
}
