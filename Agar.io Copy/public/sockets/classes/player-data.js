//data all sockets need to know

class PlayerData {
  
  constructor(username="terrysu64", settings) {
    this.name=username
    this.locX = Math.floor(Math.random()*settings.worldWidth)
    this.locY = Math.floor(Math.random()*settings.worldHeight)
    this.radius = settings.size
    this.color = this.getRandomColor()
    this.score = 0
    this.orbsAbsorbed = 0
  }

  getRandomColor() {
    const r = Math.floor(Math.random()*200 + 50)
    const g = Math.floor(Math.random()*200 + 50)
    const b = Math.floor(Math.random()*200 + 50)
    return `rgb(${r},${g},${b})`
  }
}

export default PlayerData