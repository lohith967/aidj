song = "";
leftWristX = 0;
leftWristY = 0;
rightWristY = 0;
rightWristX = 0;
scoreleftWrist= 0;
scorerightWrist = 0;

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    canvas = createCanvas(600,500);
    canvas.center();
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose', gotposes);
}
function modelLoaded(){
    console.log("PoseNet Is Initialized");
}

function draw(){
    image(video ,0 ,0 ,600 ,500);
    fill("red");
    stroke("red");
    if(scoreleftWrist >0.2){
        circle(leftWristX,leftWristY,20.4);
        innumberleftWristY = Number(leftWristY);
        remove_decimals = floor(innumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML="volume = "+volume;
        song.setVolume(volume);
    
    }
  if(scorerightWrist > 0.2){
    circle(rightWristX,rightWristY,20.4);
   
    if(rightWristY > 0 && rightWristY <=100){
    document.getElementById("speed").innerHTML="speed = 0.5x";
    song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <=200){
        document.getElementById("speed").innerHTML="speed = 1x";
        song.rate(1);
        }
   
    else if(rightWristY > 200 && rightWristY <=300){
            document.getElementById("speed").innerHTML="speed = 1.5x";
            song.rate(1.5);
            }

            else if(rightWristY > 300 && rightWristY <=400){
                document.getElementById("speed").innerHTML="speed = 2x";
                song.rate(2);
                }
    
                else if(rightWristY > 400 && rightWristY <=500){
                    document.getElementById("speed").innerHTML="speed = 2.5x";
                    song.rate(2.5);
                    }
  } 

   
}

function play_sound(){
    song.play();
    song.setVolume(0.456);
    song.rate(1);
}

function gotposes(results){
    if(results.length >0){
    console.log(results);
    scoreleftWrist = results[0].pose.keypoints[9].score;
    scorelrighttWrist = results[0].pose.keypoints[10].score;
    console.log("scorerightWrist ="+ scorerightWrist+"scoreleftWrist = "+ scoreleftWrist);
    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;

    console.log("leftWristX = "+leftWristX+"leftWristY = "+leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;

    console.log("rightWristX = "+rightWristX+"rightWristY = "+rightWristY);
    
    
    }
}

