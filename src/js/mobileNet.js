function cropImage(bbox,label,score,img){
  var canvas = document.createElement("canvas")
  var hr = document.createElement("hr")
  var h3 = document.createElement("h3")
  h3.innerHTML = `${label} score : ${Math.ceil(score*100)/100}`
  document.getElementById("cropImgBlock").appendChild(h3)
  document.getElementById("cropImgBlock").appendChild(canvas)
  document.getElementById("cropImgBlock").appendChild(hr)

  context = canvas.getContext('2d')
  var w_scalar = img.width/document.getElementById("blah").offsetWidth
  var h_scalar = img.height/document.getElementById("blah").offsetHeight
  var crop = {
    source_x:bbox[0] * w_scalar,
    source_y:bbox[1] * h_scalar,
    source_w:bbox[2] * w_scalar,
    source_h:bbox[3] * h_scalar,
    destination_x:0,
    destination_y:0,
    destination_w:  document.getElementById("cropImgBlock").offsetWidth*0.8,
    destination_h: document.getElementById("cropImgBlock").offsetWidth*0.8/(bbox[2] * w_scalar)* (bbox[3] * h_scalar)
  }

  canvas.width =  crop.destination_w
  canvas.height =  crop.destination_h

  context.drawImage(img,crop.source_x,crop.source_y,crop.source_w,crop.source_h,
    crop.destination_x,crop.destination_y,crop.destination_w,crop.destination_h)
}


function drawBBox(predictions){
  $("#cropImgBlock").empty()
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
          cropImage(bbox,predictions[i].class,predictions[i].score,image)

        }
      }
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

function initRWD(){
  var h = document.body.clientHeight
  $("body").css("height",h)
}
 
function getInfo()
{
var s = "";
s += " 網頁可見區域寬："+ document.body.clientWidth;
s += " 網頁可見區域高："+ document.body.clientHeight;
s += " 網頁可見區域寬："+ document.body.offsetWidth + " (包括邊線和捲軸的寬)";
s += " 網頁可見區域高："+ document.body.offsetHeight + " (包括邊線的寬)";
s += " 網頁正文全文寬："+ document.body.scrollWidth;
s += " 網頁正文全文高："+ document.body.scrollHeight;
s += " 網頁被卷去的高(ff)："+ document.body.scrollTop;
s += " 網頁被卷去的高(ie)："+ document.documentElement.scrollTop;
s += " 網頁被卷去的左："+ document.body.scrollLeft;
s += " 網頁正文部分上："+ window.screenTop;
s += " 網頁正文部分左："+ window.screenLeft;
s += " 螢幕解析度的高："+ window.screen.height;
s += " 螢幕解析度的寬："+ window.screen.width;
s += " 螢幕可用工作區高度："+ window.screen.availHeight;
s += " 螢幕可用工作區寬度："+ window.screen.availWidth;
s += " 你的螢幕設置是 "+ window.screen.colorDepth +" 位彩色";
s += " 你的螢幕設置 "+ window.screen.deviceXDPI +" 像素/英寸";
//alert (s);
console.log(s)
}

$(document).ready(()=>{
  console.log($("#imgInpIcon").parent())
  $("#imgInpIcon").parent().click(()=>{
    $("#imgInp").click()
  })
})

window.onload = ()=>{
  $("#btnDetector").click(objectDetector)
  $("#btnDownload").click(download)
  initRWD()
  objectDetector()
}
