var img="";
var status="";
var objects=[];

function preload() {
    img=loadImage("bowl of fruit.jpg");
}

function setup() {
    canvas=createCanvas(640,420);
    canvas.center();
    objectdetecter=ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML="Object currently is trying to be detected.";
}

function draw() {
    image(img,0,0,640,420);
    if (status!="") {
        r=random(255);
        g=random(255);
        b=random(255);
        objectdetecter.detect(img,gotResult);
        for(i=0; i<objects.length; i++){
            document.getElementById("status").innerHTML="Object has finally been detected."
            fill(r,g,b);
            accuracypercent=floor(objects[i].confidence*100);
            noFill();
            text(objects[i].label+" "+accuracypercent+"%",objects[i].x+50,objects[i].y+50);
            stroke(r,g,b);
            rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
        }
    }
}

function modelLoaded() {
    console.log("model is loaded");
    status=true;
}
function gotResult(error,results) {
    if (error) {
        console.error(error);
    }
    else{
        console.log(results);
        objects=results;
    }
}