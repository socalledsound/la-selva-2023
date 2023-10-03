class Pupil{
    constructor(numPoints, x, y, size){
        this.numPoints = numPoints
        this.x = x
        this.y = y
        this.size = size
        this.res = 0.002
        this.anim = 0
        this.animInc = 0.001
        this.col = 40
        this.points = noisyCirclePoints(this.numPoints, this.x, this.y, this.size, this.res, this.anim)
    }



    render(){
        // noisyCircle(500, 500, 420, 0.002, 0, 300)
        //noisyCircle(this.numPoints, this.x, this.y, this.size, this.res,this.anim, this.col)
       
        //noFill()
        stroke(150)
        strokeWeight(2)
        fill(this.col)
        beginShape()
            this.points.forEach(point => {
                vertex(point.x, point.y)
            })
        endShape()

    }

    update(){
        this.anim += this.animInc
        this.points = noisyCirclePoints(this.numPoints, this.x, this.y, this.size, this.res, this.anim)
    }
}