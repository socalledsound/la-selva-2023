class IrisLine{
    constructor(idx, theta, x, y, endPoint, numLineSegments, col, vel){
        this.idx = idx
        this.theta = theta
        this.pos = createVector(x, y)
        this.velocity =  vel
        this.acceleration = createVector(0,0)
        this.maxspeed = 1; 
        this.maxforce = 0.02; 
        this.scale = random(2.0,3.0)
        this.endPoint = endPoint
        this.lineLength = dist(this.pos.x, this.pos.y, this.endPoint.x, this.endPoint.y)/this.scale
        this.numLineSegments = numLineSegments
        this.col = col
        this.anim = 0
        this.animInc = 0.001
        this.res = random(0.001,0.002)
        this.res = 0.0001
        this.points = noisyRadialLinePoints(this.theta, this.pos.x, this.pos.y, this.lineLength, this.numLineSegments, this.anim, this.res)
    }

    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);
      }

    move(){
        // Update velocity
   this.velocity.add(this.acceleration);
   // Limit speed
   this.velocity.limit(this.maxspeed);
   this.pos.add(this.velocity);
   // Reset accelertion to 0 each cycle
   this.acceleration.mult(0);
   }
    render(){
    
        stroke(this.col)
        strokeWeight(1)
        noFill()
        beginShape()
            this.points.forEach(pt => {
                vertex(pt.x, pt.y)
            })
        endShape()
    }

    update(endPoint){
        this.move()
        this.endPoint = endPoint
        this.lineLength = dist(this.pos.x, this.pos.y, this.endPoint.x, this.endPoint.y)/this.scale
        this.anim += this.animInc
        this.points = noisyRadialLinePoints(this.theta, this.pos.x, this.pos.y, this.lineLength, this.numLineSegments, this.anim, this.res)
    }
}