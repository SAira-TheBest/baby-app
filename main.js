status1 ="";
Objects=[];

function setup()
{
    canvas = createCanvas(380,380)
    canvas.center()

    video = createCapture(VIDEO)
    video.hide()

    objectDetector = ml5.objectDetector('cocossd',modelLoaded)
   
}

function modelLoaded(){
    console.log("Model loaded :)")
    status1 = true
    console.log(status1)
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}

function gotResult(error, results){
 
    if(error){
        console.error(error);
    }
    console.log(results)
    Objects = results;
}

function preload()
{
  sound = loadSound("ringing_old_phone.mp3")
}

function draw()
{
image(video, 0, 0, 600, 500)

if(status1 != "")
{
    objectDetector.detect(video, gotResult)
    R = random(255)
    G = random(255)
    B = random(255)


  for(i= 0; i<Objects.length; i++)
  {
      document.getElementById("status").innerHTML="Status : Object Detected"
      document.getElementById("number_of_objects").innerHTML="Number of Objects Detected:" + Objects[i].length;
      fill(R,G,B)
      percent = floor(Objects[i].confidence * 100)
      console.log(percent)
      text(Objects[i].label + " " + percent + "%", Objects[i].x, Objects[i].y)
      noFill()
      stroke(R,G,B)
      rect(Objects[i].x, Objects[i].y, Objects[i].width, Objects[i].height)

  }
}

else{
   
    sound.play()

}
}