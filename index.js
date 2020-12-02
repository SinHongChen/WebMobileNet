var express = require("express")
var app = express()
// dbCreate.insertResourceDataSet()
app.use("/images",express.static("asset/images"))
app.use("/src",express.static("src"))

app.get("/",(req,res)=>{
  res.sendFile(__dirname + "/src/mobile.html")
})

app.get("/webRTC",(req,res)=>{
  res.sendFile(__dirname + "/src/webRTC.html")
})

var server = app.listen(3000,()=>{
  console.log(`Server is start port : ${server.address().port}`)
})
