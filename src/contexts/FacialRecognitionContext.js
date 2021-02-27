import * as tf from '@tensorflow/tfjs';

export const loadTFModel = async () => {
    const model = await tf.loadLayersModel('https://storage.googleapis.com/modelfr/tfjs/model.json');

}
