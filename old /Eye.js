class Eye {
    constructor(x, y, size, numPoints, vel){
        this.numPoints = numPoints || 100
        // this.x = x
        // this.y = y
        this.pos = createVector(x, y)
        // this.velocity =  createVector(0,0)
        // this.velocity.add(vel)
        this.velocity=  createVector(random(-0.002,0.002), random(-0.002,0.002))
        this.acceleration = createVector(0,0)
        this.maxspeed = 1; 
        this.maxforce = 0.2;  
        this.size = size
        this.res = 0.002
        this.anim = 0
        this.animInc = 0.001
        this.col =  [30,10,10]
        this.innerLineCol = [50,30,30]
        // numPoints, x, y, size, eyePoints
        this.points = noisyCirclePoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.res, this.anim)
        this.iris = new Iris(this.pos.x, this.pos.y, this.size, this.points, this.numPoints, this.velocity)
        //this.pupil = new Pupil(this.x, this.y, this.size/6, this.numPoints)
        this.theta = 0
        this.thetaInc = random(-0.001,0.001)
    }

    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);
        this.iris.applyForce(f)
      }

      keepCentered(pos, size){
        let d = p5.Vector.dist(pos, this.pos);

        if(d > this.size * 2){
            let diff = p5.Vector.sub(pos, this.pos);
            diff.normalize();
            diff.mult(this.maxspeed);
            // Implement Reynolds: Steering = Desired - Velocity
            let steer = p5.Vector.sub(diff, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
        }
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
       // noisyCircle(this.numPoints, this.x, this.y, this.size, this.res,this.anim, this.col)
        
        stroke(30,10,10)
        strokeWeight(3)
        fill(this.col)

        push()
        translate(this.pos.x, this.pos.y)
        rotate(this.theta)
        translate(-this.pos.x, -this.pos.y)


        beginShape()
            this.points.forEach(pt => {
                vertex(pt.x, pt.y)
            })
        endShape()

        this.points.forEach(pt => {
            strokeWeight(2)
            stroke('yellow')
            point(pt.x, pt.y)
            strokeWeight(1)
            stroke(this.innerLineCol)
            line(pt.x, pt.y, this.pos.x, this.pos.y)
            stroke(30,10,10)
        })
        
        this.iris.render()
        
        pop()


       //this.pupil.render()
    }


    seperation(others){
        let desiredseparation = this.size/4
        let sum = createVector();
        let count = 0;

        others.forEach(other => {
            let d = p5.Vector.dist(this.pos, other.pos);
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.pos, other.pos);
                diff.normalize();
                diff.div(d); // Weight by distance
                sum.add(diff);
                count++; // Keep track of how many
              }
        })

        if (count > 0) {
            sum.div(count);
            // Our desired vector is the average scaled to maximum speed
            sum.normalize();
            sum.mult(this.maxspeed);
            // Implement Reynolds: Steering = Desired - Velocity
            let steer = p5.Vector.sub(sum, this.velocity);
            steer.limit(this.maxforce);
            this.applyForce(steer);
          }
    }



    update(){
        this.move()
        this.drag()
        this.anim += this.animInc
        this.points = noisyCirclePoints(this.numPoints, this.pos.x, this.pos.y, this.size, this.res, this.anim)
        this.iris.update(this.points)
        //this.pupil.update()

        this.theta += this.thetaInc
    }
}