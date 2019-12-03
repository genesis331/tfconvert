### Google Code-In 2019 'Tensorflow.js: Convert a model!' challenge.

## Procedures:

1) First of all, I've installed the required programs. (Since my laptop doesn't have enough storage for this, I've decided to use my Azure Ubuntu VM to complete the task.) I've used `pip` to install `virtualenv` and run the virtualenv. Then, I run the command `pip install tensorflowjs` and `pip install tensorflow` in order to convert models.

2) Since I'm converting a tf_hub model(from the tfhub.dev), I performed:
```
tensorflowjs_converter \
    --input_format=tf_hub \
    'https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1' \
    /mobilenet/web_model
```
It then generated a `model.json` and some other files which will be used later.

3) I created a HTML file(refer to index.html in this repo) and a script file(index.js in this repo).

4) First, I included an image in the HTML. 

5) In the script file, I imported and loaded my converted model using `tf.loadGraphModel()`. Then, convert image using `tf.browser.fromPixels().expandDims(0);` and convert to float32 using `tf.cast();`.

6) Finally, let the model to predict(`model.execute();`) what's the object in the image and log the result in the console.


When I tried to set the output_format of the `tensorflowjs_converter` to `tfjs_layers_model`, it failed.
But after some searching on the Internet, I realized that to have the output_format of `tfjs_layers_model`, the input_format must be `keras` or `keras_saved_model`. To have the output_format of `tfjs_graph_model`, the input_format must be `tf_hub` or `tf_saved_model`.


Here's the whole code:
`index.html`
```
<!DOCTYPE html>
<html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>MobileNet tfjsgci19</title>
    <script src="https://unpkg.com/@tensorflow/tfjs"></script>
    <script src="https://unpkg.com/@tensorflow/tfjs-converter"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
</head>

<body>
    <img id="img" crossorigin src="./test/test.jpg" height="224" width="224"/>
    <script src="index.js"></script>
</body>

</html>
```

`index.js`
```
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
```


That's all!