class Eye extends NoisyCircle{
    constructor(idx, parentPos, parentSize){
        super()
        this.idx = idx
        this.xMin = parentPos.x - parentSize/2
        this.xMax = parentPos.x + parentSize/2
        this.yMin = parentPos.y - parentSize/2
        this.yMax = parentPos.y + parentSize/2
        this.position = createVector(random(this.xMin, this.xMax), random(this.yMin, this.yMax))
        this.size = parentSize/random(2.0,4.0)
        this.velocity = createVector(-1,0)
        this.acceleration = createVector(0,0)
        this.maxspeed = 2.0
        this.maxForce = 1.0
        this.wallFear = 10
        this.twitchMax = 1.0
        this.strokeWeight = 1
        this.fearOfOthers = this.size * random(0.8, 1.2)
        this.dead = false
        this.pupil = new Pupil(idx, this.position, this.size, this.points)
        this.iris = new Iris(this.position, this.points, 100, 100)
    }

    checkBoundaries(){
        let desired = null;

        if(this.position.x < this.xMin + this.wallFear){
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > this.xMax - this.wallFear) {
          desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.position.y < this.yMin + this.wallFear) {
            desired = createVector(this.velocity.x, this.maxspeed);
          } else if (this.position.y > this.yMax - this.wallFear) {
            desired = createVector(this.velocity.x, -this.maxspeed);
          }

          if (desired !== null) {
            desired.normalize();
            desired.mult(this.maxspeed);
            let steer = p5.Vector.sub(desired, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
          }
    }

    render(){
      if(!this.dead){
        fill(190)
        stroke([220, 90, 190])
        strokeWeight(this.strokeWeight)
        beginShape()
        this.points.forEach(pt => {
            vertex(pt.x, pt.y)
        })
        endShape()
        this.iris.render()
        this.pupil.render()
      }else{
        console.log('dead eye')
      }

        
    }

    // speak(otherEyes, parentCreature){
    //   this.pupil.growInc = 10
    //   this.pupil.maxSize = 500
    //   this.pupil.metamorphing = true
    //   const pupilPoints = this.getPoints(this.numPoints, this.position.x, this.position.y, this.pupil.size)
    //     this.pupil.metamorph(pupilPoints, otherEyes, parentCreature)
    // }

    twitch(){
      this.applyForce(createVector(random(-this.twitchMax, this.twitchMax), random(-this.twitchMax, this.twitchMax)))
    }
    
    updateBoundaries(parentPos, parentSize){
        this.xMin = parentPos.x - parentSize/2
        this.xMax = parentPos.x + parentSize/2
        this.yMin = parentPos.y - parentSize/2
        this.yMax = parentPos.y + parentSize/2
    }

    updatePupil(){
        
        const pupilPoints = this.getPoints(this.numPoints, this.position.x, this.position.y, this.pupil.size)
        this.pupil.update(pupilPoints)
    }

    updateIris(){
      this.iris.update(this.position, this.points)
    }
}