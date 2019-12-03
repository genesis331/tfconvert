### Google Code-In 2019 'Tensorflow.js: Convert a model!' challenge.

## Procedures:

(Since my laptop doesn't have enough storage for this, I've decided to use my Azure Ubuntu VM to complete the task.)
1) First of all, I've installed the required programs. I've used `pip` to install `virtualenv` and run the virtualenv. Then, I run the command `pip install tensorflowjs` and `pip install tensorflow` in order to convert models.

2) Since I'm converting a tf_hub model(from the tfhub.dev), I performed:
```
tensorflowjs_converter \
    --input_format=tf_hub \
    'https://tfhub.dev/google/imagenet/mobilenet_v1_100_224/classification/1' \
    /mobilenet/web_model
```
It then generated a `model.json` and some other files which will be used later.

3) I created a HTML file(refer to index.html in this repo) and a script file(index.js in this repo).

4) I've added comments in both files for easier reference.