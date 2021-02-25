import { rdbms, db } from "../components/firebase"

export const generateOTP = async (value) => {
    const rand = Math.floor(100000 + Math.random() * 900000);
    const pidRef = db.collection('patientIDUID').doc(value.trim());
    const uidDoc = await pidRef.get()
    if (uidDoc.exists) {
        let data = uidDoc.data()['uid'];
        rdbms.ref('otp/' + data).set({
            otp: rand,
        });
    }
    else {
        console.log("No such patient!");
        return -999;
    }
}

