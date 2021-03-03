import { rdbms, db } from "../components/firebase"


export const compareFromDatabase = async (faceprint) => {
    var data;

    let name = await rdbms.ref('registered_fid/').once("value", snapshot => {
    });
    data = name.val();
    for (var i = 0; i < data.length; i++) {
        var sum = 0.0
        for (var j = 0; j < 128; j++) {
            sum = sum + Math.pow(JSON.parse("[" + data[i] + "]")[0][j] - faceprint[j], 2)
        }
        sum = Math.sqrt(sum)
        console.log(sum)
        if (sum < 1) {
            return "duplicate-registration"
        }
    }
    return "new-registration"
}

export const fetchRegistrationRecords = async () => {
    let records = await rdbms.ref('pending_registrations/').once("value", snapshot => {
    });
    const data = records.val();
    return data
}


export const updateFacialRecords = async (data) => {
    let name = await rdbms.ref('registered_fid/').once("value", snapshot => {
    }
    );
    let len = await name.val().length
    let datum = {}
    datum[len] = JSON.stringify(data)

    rdbms.ref('registered_fid/').update(datum);

}

export const addRegistration = async (data) => {
    let name = await rdbms.ref('pending_registrations/').once("value", snapshot => {
    }
    );
    let len = await name.val().length
    let datum = {}
    datum[len] = data

    rdbms.ref('pending_registrations/').update(datum);

}

