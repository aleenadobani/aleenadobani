song ="";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;

scorerightwrist = 0;
scoreLeftWrist = 0;

function preload()
{
  song = loadSound("music.mp3");
}
function setup(){
    canvas= createCanvas(600,500);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet =ml5.poseNet(video, modelLoaded);
    poseNet.on('pose',gotPoses);
}

function modelLoaded (){
    console.log('poseNet is intialized')
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log(results);
        leftwristX =results[0].pose.leftWrist.x;
        leftwristY =results[0].pose.leftWrist.y;
        console.log("leftWrist = " + leftwristX + "leftWristY = " + leftwristY);

        rightwristX =results[0].pose.rightWrist.x;
        rightwristY =results[0].pose.rightWrist.y;
        console.log("rightWrist = " + rightwristX + "rightWristY = " + rightwristY)
    }
}


function draw(){
    image(video,0,0,600,500);

    fill("#FF0000");
    stroke("#FF0000");

    if(scoreLeftWrist>0.2)
    {
        circle(leftWristX,leftWristY,20);
        InNumberleftWristY = Number(leftWristY);
        remove_decimals = floor(InNumberleftWristY);
        volume = remove_decimals/500;
        document.getElementById("volume").innerHTML = "volume = " + volume;
        song.setVolume(volume);
    }

}


function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}