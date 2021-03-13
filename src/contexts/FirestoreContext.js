import React, { useContext, useState, useEffect } from "react"
import { db } from "../components/firebase"

export const checkUser = async (value) => {
    const uidRef = db.collection('registrars').doc(value);
    const doc = await uidRef.get()
    if (doc.exists) {
        return "registered-registrar";
    }
    else {
        const uidRef = db.collection('verifiers').doc(value);
        const doc = await uidRef.get()
        if (doc.exists) {
            return "registered-verifier"
        }
        else {
            return "not-registered";
        }
    }
}

export const createPatientIDUID = async (id, uid, data) => {
    console.log(id);
    console.log(uid);
    try {
        const iduidRef = await db.collection('patientIDUID').doc(id.toString()).set({ "uid": uid.toString() });
        const uiddataRef = await db.collection('patients').doc(uid.toString()).set(data);

    }
    catch (e) {
        console.log(e);
    }
}

export const fetchRegistrarData = async (value) => {
    const uidRef = db.collection('registrars').doc(value);
    const doc = await uidRef.get()
    if (doc.exists) {
        let data = doc.data();
        return data;
    }
    else {
        console.log("No such document!");
        return -999;
    }
}

export const fetchVerifierData = async (value) => {
    const uidRef = db.collection('verifiers').doc(value);
    const doc = await uidRef.get()
    if (doc.exists) {
        let data = doc.data();
        return data;
    }
    else {
        console.log("No such document!");
        return -999;
    }
}


export const fetchDoctorName = async (value) => {
    const uidRef = db.collection('doctors').doc(value);
    const doc = await uidRef.get()
    if (doc.exists) {
        let data = doc.data()['name'];
        return data;
    }
    else {
        console.log("No such document!");
        return -999;
    }
}

export const fetchPatientData = async (value) => {
    const pidRef = db.collection('patientIDUID').doc(value.trim());
    const uidDoc = await pidRef.get()
    if (uidDoc.exists) {
        let data = uidDoc.data()['uid'];
        const uidRef = db.collection('patients').doc(data);
        const doc = await uidRef.get()
        if (doc.exists) {
            let patientData = doc.data();
            console.log(patientData);
            var t = new Date(1970, 0, 1); // Epoch
            t.setSeconds(patientData.dob.seconds);
            patientData.dob.date = t;
            return patientData;
        }
        else {
            console.log("No such patient!");
            return -999;
        }
    }
    else {
        console.log("No such document!");
        return -999;
    }
}

export const getDob = async (value) => {
    const pidRef = db.collection('patientIDUID').doc(value.trim());
    const uidDoc = await pidRef.get()
    if (uidDoc.exists) {
        let data = uidDoc.data()['uid'];
        const uidRef = db.collection('patients').doc(data);
        const doc = await uidRef.get()
        if (doc.exists) {
            let patientData = doc.data();
            console.log(patientData);
            var t = new Date(1970, 0, 2); // Epoch
            t.setSeconds(patientData.dob.seconds);
            console.log(t);
            var date = t.toString().split(' ')[2] + " " + t.toString().split(' ')[1] + " " + t.toString().split(' ')[3]
            return date;
        }
        else {
            console.log("No such patient!");
            return -999;
        }
    }
    else {
        console.log("No such document!");
        return -999;
    }
}