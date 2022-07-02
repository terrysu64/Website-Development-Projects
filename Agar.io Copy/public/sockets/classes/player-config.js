//private data
class PlayerConfig {
  constructor(settings) {
    this.xVector = 0
    this.yVector = 0
    this.speed = settings.speed
    this.zoom = settings.zoom
  }
}

export default PlayerConfig