async function app() {
    const modelUrl = './model/model.json';
    const model = await tf.loadGraphModel(modelUrl);
    const imgElem = document.getElementById('img');
    const pixels = tf.browser.fromPixels(imgElem).expandDims(0);
    const resized = tf.cast(pixels, 'float32');
    const result = await model.execute(resized);
    console.log(result);
}

app();