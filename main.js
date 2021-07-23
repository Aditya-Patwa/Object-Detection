let img;
let objDetector;

function preload() {
    detector = ml5.objectDetector('cocossd', {}, () => console.log("Yay! We load's up the model..."));
}

const getDetection = (err, results) => {
    if(err) {
        console.log(err);
    } else {
        for(let i = 0; i<results.length; i++) {
            let object = results[i];
            stroke(255, 0, 0);
            strokeWeight(2);
            noFill();
            rect(object.x, object.y, object.width, object.height);
            noStroke();
            fill(255, 0, 0);
            textSize(25);
            text(object.label, object.x + 15, object.y + 30);
        }
    }
    objDetector.detect(img, getDetection);
};

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    img = createCapture(VIDEO);
    img.size(window.innerWidth, window.innerHeight);
    img.hide();
    objDetector.detect(img, getDetection);
}

function draw() {
    image(img, 0, 0, window.innerWidth, window.innerHeight);
}

document.addEventListener("resize", () => {
    setup();
});