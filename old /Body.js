class Body{
    constructor(x, y, size, numPoints, vel){
        this.numPoints = numPoints || 100
        this.pos = createVector(x, y)
        this.velocity = vel
        this.acceleration = createVector(0,0)
        this.maxspeed = 1; 
        this.maxforce = 0.02;  
        this.size = size
        this.res = 0.002
        this.anim = 0
        this.animInc = 0.001
        this.col = 300
        this.hairLengths = Array.from({length: this.numPoints}, () => random(3,6))
        this.points = noisyCirclePoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.res, this.anim, 30)
        this.hairPoints = hairPoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.hairLengths)
        this.numEyes = random(3,6)
        this.eyes = Array.from({length: this.numEyes}, () => {
            return new Eye( 
                            random(this.pos.x - this.size/2, this.pos.x + this.size/2),
                            random(this.pos.y - this.size/2, this.pos.y + this.size/2),
                            this.size/2,
                            this.numPoints,
                            this.velocity)
        })

        this.theta = 0
        this.thetaInc = random(-0.001,0.001)
    }


    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);
        // this.eyes.forEach(eye => {
        //     eye.applyForce(f);
        // })
      }

      drag(){
        if(this.velocity.x > 1.0){
            this.velocity.x -= 0.01
        }else if(this.velocity.x < -1.0){
            this.velocity.x += 0.01
        }

        if(this.velocity.y > 1.0){
            this.velocity.y -= 0.01
        }else if(this.velocity.y < -1.0){
            this.velocity.y += 0.01
        }
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
        // noisyCircle(500, 500, 420, 0.002, 0, 300)
       // noisyCircle(this.numPoints, this.x, this.y, this.size, this.res, this.anim, this.col)

       push()
       translate(this.pos.x, this.pos.y)
       rotate(this.theta)
       translate(-this.pos.x, -this.pos.y)
       


        noFill()
        fill(50)
        stroke(250)
        strokeWeight(1)

        beginShape()
            this.points.forEach(point => {
                vertex(point.x, point.y)
            })
        endShape()
        this.eyes.forEach(eye => {
            eye.render()
        })
        pop()
        // hairpoints - these don't orient correctly for some reason
        this.points.forEach((point, idx) => { 
            //line(point.x, point.y, this.hairPoints[idx].x, this.hairPoints[idx].y)
        })

        

    }

    update(){
        this.move()
        this.drag()

        this.theta += this.thetaInc
        this.anim += this.animInc
        this.points = noisyCirclePoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.res, this.anim, 30, 1.5)
        this.hairPoints = hairPoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.hairLengths)
        this.eyes.forEach(eye => {
            eye.keepCentered(this.pos, this.size)
            eye.seperation(this.eyes)
            eye.update()
        })
    }
}