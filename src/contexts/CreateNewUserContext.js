import { auth } from "../components/firebase"


function generatePassword(length) {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}


const CreateUser = async (email) => {
    const password = generatePassword(10);
    await auth.createUserWithEmailAndPassword(email, password)
    return password;
}

export default CreateUser;