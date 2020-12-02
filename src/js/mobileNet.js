function drawBBox(predictions){
    var canvas = document.getElementById('canvas'),
      context = canvas.getContext('2d'),
      image = new Image();


      image.onload = function() {
        var w = document.getElementById("blah").offsetWidth,
            h = document.getElementById("blah").offsetHeight;
          
        canvas.width = w;
        canvas.height = h;
        context.drawImage(this, 0, 0, w, h);
        for(let i = 0;i < predictions.length;i++){
          var bbox = predictions[i].bbox
          var label = predictions[i].class
          context.beginPath();
          context.strokeStyle="red";
          context.rect(bbox[0],bbox[1],bbox[2],bbox[3]);
          context.stroke();
          
          context.font = "18px Comic Sans MS";
          context.fillStyle = "red";
          context.fillText(label,bbox[0],bbox[1]+20);
        }
      }

    console.log()
    var img_src = document.getElementById("blah").getAttribute("src")
    image.src = img_src
  }

function objectDetector(){
  const img = document.getElementById('blah');
  console.log("start detector")
  // Load the model.
  cocoSsd.load().then(model => {
    // detect objects in the image.
    model.detect(img).then(predictions => {
      // console.log('Predictions: ', predictions);
      drawBBox(predictions)
    });
  });
}


function download () {
      console.log("download")
      const canvas = document.getElementById("canvas")
      var src = canvas.toDataURL('image/jpeg')
      if (!src) return;
      const a = document.createElement('a');
      a.setAttribute('download', "../assets/images/" + new Date());
      a.href = src;
      a.click();
}


window.onload = ()=>{
  objectDetector()
  $("#btnDetector").click(objectDetector)
  $("#btnDownload").click(download)
}
