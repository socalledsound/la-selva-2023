class Iris{
    constructor(x, y, size, eyePoints, numPoints, vel){
        this.numPoints = numPoints || 100
        // this.x = x
        // this.y = y
        this.pos = createVector(x, y)
        this.velocity =  vel
        this.acceleration = createVector(0,0)
        this.maxspeed = 1; 
        this.maxforce = 0.2;  
        this.size = size
        this.eyePoints = eyePoints
        this.numLineSegments = this.numPoints
        this.colVals = COLORPALETTE[int(random(0, COLORPALETTE.length))]
        this.colors = Array.from({length: numPoints}, () => {
            return  [random(this.colVals.rMin, this.colVals.rMax), random(this.colVals.gMin, this.colVals.gMax), random(this.colVals.bMin, this.colVals.bMax)]
            
        })
        this.irisLines = Array.from({length: this.numPoints}, (el, idx) => {
            const inc = (2 * PI)/(this.numPoints-1)
            const theta = idx * inc
            return new IrisLine(idx, theta, this.pos.x, this.pos.y, this.eyePoints[idx], this.numLineSegments, this.colors[idx], this.velocity)
        })

    }

    applyForce(f) {
        // We could add mass here if we want A = F / M
        this.acceleration.add(f);
        this.irisLines.forEach(il => {
            il.applyForce(f)
        })
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

        this.irisLines.forEach(iLine => {
            iLine.render()
        })

    }

    update(pts){
        this.move()
        this.irisLines.forEach((iLine, idx) => {
            iLine.update(pts[idx])
        })
    }

}