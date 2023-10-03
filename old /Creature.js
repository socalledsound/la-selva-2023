class Creature{
    constructor(x, y, size, numPoints){
        this.numPoints = numPoints || 50
        this.size = size
        this.pos = createVector(x, y)
        this.velocity =  createVector(random(-2.0, 2.0),random(-2.0, 2.0))
        this.acceleration = createVector(0,0)
        this.maxspeed = 1; 
        this.maxforce = 0.02; 
        this.wallFear = this.size
        this.body = new Body(x, y, size, this.numPoints, this.velocity)
        this.drag = 0.99
    }

    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);
        this.body.applyForce(f);
      }

      checkBoundaries(){
        let desired = null;

        if(this.pos.x < this.wallFear){
            desired = createVector(this.maxspeed, this.velocity.y);
        } else if (this.pos.x > width - this.wallFear) {
          desired = createVector(-this.maxspeed, this.velocity.y);
        }

        if (this.pos.y < this.wallFear) {
            desired = createVector(this.velocity.x, this.maxspeed);
          } else if (this.pos.y > height - this.wallFear) {
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

      


    move(){
      // console.log('move!')
      //console.log(this.acceleration)
         // Update velocity
    this.velocity.add(this.acceleration);
    // this.body.velocity.add(this.acceleration)
    // Limit speed
    this.velocity.limit(this.maxspeed);
    this.pos.add(this.velocity);
   
    // Reset accelertion to 0 each cycle
    this.acceleration.mult(0);
    }


    render(){
        this.body.render()
    }

    seperation(others){
        let desiredseparation = this.size * 2
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


    

    update(creatures){
        this.checkBoundaries()
        this.seperation(creatures)
        this.move()
        this.body.update()
        this.velocity.mult(this.drag)
    }
}