class NoisyCircle{
    constructor(x, y, size, numPoints, col, weight){
        this.position = createVector(x, y)
        this.size = size
        this.numPoints = numPoints || 100
        //(numPoints, centerX, centerY, rad , [res, animInc, scl, extra])
        this.points = this.getPoints(this.numPoints, this.position.x, this.position.y, this.size)
        this.strokeCol = col || [120, 200, 180] 
        this.strokeWeight = weight || 1
        this.velocity = createVector(0,0)
        this.acceleration = createVector(0,0)
        this.maxspeed = 2.0
        this.maxForce = 0.2
        this.wallFear = 20
        this.wallExtra = 200
        this.fearOfOthers = this.size


    }

    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);

      }

      checkBoundaries(){
        let desired = null;

        if((this.position.x + this.wallExtra) < 0 + this.wallFear){
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.position.x > (width + this.wallExtra) - this.wallFear) {
          desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if ((this.position.y + this.wallExtra) < this.wallFear) {
            desired = createVector(this.velocity.x, this.maxspeed);
          } else if (this.position.y > (height + this.wallExtra) - this.wallFear) {
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



      getPoints(numPoints, centerX, centerY, rad , res, animInc, scl, extra){
            const points = []
            const ns = res || 0.002
            const anim = animInc || 0
            const scale = scl || 100
            const xtra = extra || 1

            for(let i=0; i < numPoints; i++){     
                const inc = (2 * PI)/(numPoints-1)
                const theta = i * inc
                const x = centerX + rad * cos(theta)
                const y = centerY + rad * sin(theta)
                // noiseSeed(1)
                const n = map(noise(x * ns + anim, y * ns + anim), 0, 1, -scale * xtra, scale * xtra)
                points[i] = {x: x + n, y: y + n}
                
            }
            return points
      }


    move(){
      // console.log('move!')
      //console.log(this.acceleration)
         // Update velocity
         
    this.velocity.add(this.acceleration);
    // this.body.velocity.add(this.acceleration)
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.position.add(this.velocity);
    
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
    }


    render(){
      
        stroke(this.strokeCol)
        if(this.hover){
          strokeWeight(this.strokeWeight/4)
          fill(random(200,250), random(170,230), random(0, 150))
          }else if(this.random){
            strokeWeight(this.strokeWeight/4)
            fill(random(70,120),30,random(70,120))
          }else{
          strokeWeight(this.strokeWeight)
          fill(50, 50, 50,80)
        }
              
       
        beginShape()
        this.points.forEach(pt => {
            vertex(pt.x, pt.y)
        })
        endShape()

        if(this.name){
          fill(20)
          noStroke()
          textSize(this.size/4)
          text(this.name, this.position.x - this.size/2, this.position.y - this.size/1.5, this.size * 1.2)
        }

        fill(10, 10, 10, 200)

        ellipse(this.position.x, this.position.y, 40)
        // fill(10, 10, 10)
        // ellipse(this.position.x, this.position.y, 10)
    }

// steering force == desired minus velocity
    seek(target){
      // get vector to desired target from current position
      const desired = p5.Vector.sub(target, this.position)
      //scale to max speed
      //desired.setMag(this.maxspeed)
      //desired minus velocity == steering force
      const steer = p5.Vector.sub(desired, this.velocity)
     // limit force
      //steer.limit(this.maxforce)
      // apply force
      this.applyForce(steer)
    }

    seperation(others){
        let desiredseparation = this.fearOfOthers
        let sum = createVector();
        let count = 0;

        others.forEach(other => {
            let d = p5.Vector.dist(this.position, other.position);
            if ((d > 0) && (d < desiredseparation)) {
                // Calculate vector pointing away from neighbor
                let diff = p5.Vector.sub(this.position, other.position);
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

    update(others){
        if(others){
          if(others.length > 0){
            this.seperation(others)
          }
        }
        this.checkBoundaries()
        this.move()
        this.points = this.getPoints(this.numPoints, this.position.x, this.position.y, this.size)
        //this.velocity.mult(this.drag)
    }

}