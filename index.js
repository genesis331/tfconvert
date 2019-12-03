async function app() {
    // Import converted model
    const modelUrl = './model/model.json';
    // Load model using tf.loadGraphModel()
    const model = await tf.loadGraphModel(modelUrl);
    // Get image from the HTML img element
    const imgElem = document.getElementById('img');
    // Convert to pixels and used expandDims() to fix weird error 
    const pixels = tf.browser.fromPixels(imgElem).expandDims(0);
    // Convert to float32 instead of int32
    const resized = tf.cast(pixels, 'float32');
    // Let the prediction starts!
    const result = await model.execute(resized);
    // Log out result in the console.
    console.log(result);
}

app();