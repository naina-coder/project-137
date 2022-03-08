status = "";
objects = [];


function setup()
{
    video = createCapture(VIDEO)
    video.size(480,380);

    video.hide()
    canvas = createCanvas(480, 380);
    canvas.center();

}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status: Detecting Objects";
    

    object_name =document.getElementById("object_name").value;

    
}

function modelLoaded()
{
    console.log("modelLoaded");
    status = true;
}


function draw()
{
    image(video, 0, 0, 480,380);

    
    if (status != "")
    {
        objectDetector.detect(video, gotResult);
            for(i=0; i<objects.length; i++)
            {
                fill('red');
                noFill('red');
                stroke('red');

                percent = floor(objects[i].confidence * 100);
                text(objects[i].label + " " + percent + "%", objects[i].x +15,objects[i].y +15, objects[i].height,objects[i].width);            
            rect(objects[i].x ,objects[i].y,objects[i].width,objects[i].height);
            if(objects[i].label == object_name)
            {
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("object_status").innerHTML = object_name +" "+"Found";

                synth = window.speechSynthesis;
                utterThis = new SpeechSynthesisUtterance(object_name+ "Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("object_status").innerHTML = object_name+ " "+"Not Found";
        
            }

            }
     }
}

function gotResult(error,results)
{


        if(error)
        {
            console.log(error);

        }
        
        console.log(results);

        objects = results;
    }