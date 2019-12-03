## Google Code-In 2019 'Tensorflow.js: Convert a model!' challenge.


### Procedures:

1) Install the Tensorflow and TensorFlow.js pip packages.

```
$ pip install tensorflow
$ pip install tensorflowjs
```

<br>

2) Convert the model using the following command:
```
tensorflowjs_converter \
    --input_format=tf_hub \
    'https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1' \
    /mobilenet/web_model
```
It generates a `model.json` and some other files which will be used later.

<br>

3) Create a HTML file and include `tfjs` and `tfjs-converter` in the `<head>` tag.
```
<script src="https://unpkg.com/@tensorflow/tfjs"></script>
```
```
<script src="https://unpkg.com/@tensorflow/tfjs-converter"></script>
```

<br>

4) Append an `<img/>` tag inside the `<body>` tag and include an image in it.

<br>

5) Create a JavaScript(JS) file and include it in the HTML `<head>` tag.

<br>

6) In the script file, import the converted model.
```
const modelUrl = './model/model.json';
```

<br>

7) Load the imported model.
```
const model = await tf.loadGraphModel(modelUrl);
```

<br>

8) Create a tf.Tensor using the image.
```
const pixels = tf.browser.fromPixels(imgElem).expandDims(0);
```

<br>

9) Cast the tf.Tensor to dtype `float32`.
```
const imgPredict = tf.cast(pixels, 'float32');
```

<br>

10) Finally, predict what's the object in the image.
```
const result = await model.execute(imgPredict);
```

<br>

11) Log the result in the console.
```
console.log(result);
```

<br>

That's all!

<br>

### Differences between `tfjs layers model` and `tfjs graph model`

 To have the output_format of `tfjs_layers_model`, the input_format must be `keras` or `keras_saved_model`. To have the output_format of `tfjs_graph_model`, the input_format must be `tf_hub` or `tf_saved_model`.

 Learn more from here: https://github.com/tensorflow/tfjs-converter/tree/master/tfjs-converter#format-conversion-support-tables