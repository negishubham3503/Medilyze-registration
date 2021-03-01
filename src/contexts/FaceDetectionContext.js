import * as faceApi from "face-api.js";

export const getFace = async () => {
    const result = await faceApi.detectSingleFace(document.getElementById('webimage'), new faceApi.TinyFaceDetectorOptions({
        inputSize: 320,
        scoreThreshold: 0.5
    }));
    if (result != undefined) {
        return result.box;
    }
    else {
        return -999;
    }
}
