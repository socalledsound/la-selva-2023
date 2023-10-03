class Pupil extends NoisyCircle{
    constructor(idx, eyePos, eyeSize, eyePoints){
        super()
        this.idx = idx
        this.position = eyePos
        this.maxSize = eyeSize * 0.9
        this.minSize = eyeSize/3
        this.points = eyePoints
        this.size = this.minSize
        this.growDir = 1
        this.growInc = 0.05
        this.col = [20, 20, 20]
        this.metamorphing = false
        this.dead = false
    }

    die(){
        this.dead = true
    }

    render(){
        if(!this.dead){
            fill(this.col)
            noStroke()
            beginShape()
            this.points.forEach(pt => {
                vertex(pt.x, pt.y)
            })
            endShape()
        }

    }

    metamorph(lidPoints, eyes, parentCreature){
        this.points = lidPoints
        this.size += this.growDir * this.growInc
            if(this.size > this.maxSize){
                this.die()
                const deadEye = eyes.filter(eye => eye.idx === this.idx)[0]
                deadEye.dead = true
                console.log(deadEye)
                parentCreature.clicked = false
                eyes.forEach(eye => {
                    eye.clicked = false
                })
                
            }
        
    }

    update(lidPoints){
    
        this.points = lidPoints
            if(this.size < this.minSize || this.size > this.maxSize){
                this.growDir *= -1
            }
        

        this.size += this.growDir * this.growInc
    }
}