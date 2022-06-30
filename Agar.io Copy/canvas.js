const init = () => {
  draw()
}

const startX = Math.floor(500*Math.random()+100)
const startY = Math.floor(500*Math.random()+100)

console.log(startX,startY)

const draw = () => {
  context.beginPath()
  context.fillStyle = "rgb(0,255,100)"
  context.arc(startX,startY,10,0,Math.PI*2)
  context.fill()
  context.lineWidth = 3
  context.strokeStyle= "rgb(0,100,255)"
  context.stroke()
  requestAnimationFrame(draw)
}


canvas.addEventListener('mousemove',(event)=>{
  console.log(event)
  const mousePosition = {
      x: event.clientX,
      y: event.clientY
  };
  const angleDeg = Math.atan2(mousePosition.y - (canvas.height/2), mousePosition.x - (canvas.width/2)) * 180 / Math.PI;
  if(angleDeg >= 0 && angleDeg < 90){
      xVector = 1 - (angleDeg/90);
      yVector = -(angleDeg/90);
  }else if(angleDeg >= 90 && angleDeg <= 180){
      xVector = -(angleDeg-90)/90;
      yVector = -(1 - ((angleDeg-90)/90));
  }else if(angleDeg >= -180 && angleDeg < -90){
      xVector = (angleDeg+90)/90;
      yVector = (1 + ((angleDeg+90)/90));
  }else if(angleDeg < 0 && angleDeg >= -90){
      xVector = (angleDeg+90)/90;
      yVector = (1 - ((angleDeg+90)/90));
  }

  speed = 10
  xV = xVector;
  yV = yVector;

  if((player.locX < 5 && player.xVector < 0) || (player.locX > 500) && (xV > 0)){
      player.locY -= speed * yV;
  }else if((player.locY < 5 && yV > 0) || (player.locY > 500) && (yV < 0)){
      player.locX += speed * xV;
  }else{
      player.locX += speed * xV;
      player.locY -= speed * yV;
  }    
})