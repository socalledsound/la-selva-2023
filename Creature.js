class Creature extends NoisyCircle{
    constructor(snd, sndId, x, y, size, numPoints, col, weight){
        super(x, y, size, numPoints)
        this.theta = 0
        this.thetaInc = random(0.08, 0.12)
        this.position = createVector(x, y)
        this.velocity = createVector(random(-1.0,1.0),random(-1.0,1.0))
        this.acceleration = createVector(0,0)
        this.maxspeed = 2.0
        this.maxForce = 0.2
        this.wallFear = this.size - this.size/10
        this.strokeCol = col
        this.strokeWeight = weight
        this.numEyes = random(2,6)
        this.eyes = Array.from({length: this.numEyes}, (e, idx) => {
            return new Eye(idx, this.position, this.size)
        })
        this.clicked = false
        this.hover = false
        this.found = false
        // this.name = 'the name of a sound here'
        this.snd = snd
        this.sndId = sndId
        this.playingId = null
        this.isPlaying = false
        this.lifespan = 3000
        this.ageInc = random(5, 15)
        this.dragStart = null
        this.dragging = true
    }

    castText(){
        this.el = document.createElement('div')
        this.el.className = 'text-item'
        this.el.innerText = SOUNDS[this.sndId].name
        this.el.addEventListener('click', () => {
            if(!this.playing){
                this.el.style.color = `rgb(20,200,20)`
                this.el.style.boxShadow = `0 1px 2px rgb(250, 230, 30)`
                this.snd.play()
                this.isPlaying = true
                console.log(this.snd.duration())
                setTimeout(() => {
                    this.el.style.color = 'rgb(60, 60, 60)'
                    this.el.style.boxShadow = `0 1px 2px rgb(30, 30, 30)`
                    this.snd.stop()
                    this.isPlaying = false
                }, this.snd.duration() * 2000)
            }
        })
        textContainer.insertBefore(this.el, textContainer.firstChild)
    }

    checkClick(mx, my){
            const d = dist(this.position.x,this.position.y, mx, my)       
            if(d < this.size * 0.9){
                this.clicked = true
                
                
                if(!this.isPlaying){
                    this.playingId = this.snd.play()
                    this.isPlaying = true
                    this.castText()
                    this.el.style.color = 'rgb(250, 230, 30)'
                    this.el.style.boxShadow = `0 1px 2px rgb(250, 230, 30)`
                }

            }
        
    }

    drag(mx, my){
        if(!this.dragging){
            this.dragStart = createVector(mx, my)
            this.dragging = true
        }else{
            const current = createVector(mx, my)
            if(this.dragStart){
                const change = p5.Vector.sub(current, this.dragStart)
                const rateVal = map(change.x, -500, 500, 0.1, 4.0)
                const volVal = map(change.y, 400, -400, 0.3, 1.0)
                this.theta = map(change.x, -200, 200, -2 * PI, 2 * PI)
                this.size = map(change.y, 500, -500, 20, 500)
                this.eyes.forEach(eye => {
                    eye.size = map(change.y, 500, -500, 10, 120)
                })
                
                this.snd.rate(rateVal, this.playingId) 
                this.snd.volume(volVal, this.playingId) 
            }else{
                this.dragStart = current
            }

        }
            
            this.playingId
        
    }

    // old eye version
    // checkClick(mx, my){
    //     console.log(this.found)
    //     this.eyes.forEach(eye => {
    //         const d = dist(eye.position.x,eye.position.y, mx, my)
            
    //         if(d < eye.pupil.size){
    //             eye.clicked = true
    //             // this.found = true
    //         }
            
    //     })
        
    // }


    checkHover(mx, my){
        const d = dist(this.position.x,this.position.y, mx, my)       
        if(d < this.size * 0.9){
            this.hover = true
        }else{
            this.hover = false
        }
    }

    randomClick(){
        
        this.random = true
       // console.log(this.snd, snd)
       this.playingId = this.snd.play()
        const rateVal = random(0.1,2.0)
        this.thetaInc *= map(rateVal, 0.1, 2.0, -0.3,0.3)
        console.log(rateVal)
        this.snd.rate(rateVal, this.playingId)
        this.snd.volume(random(0.3,0.7), this.playingId)
        this.isPlaying = true
        this.castText()
        this.el.style.boxShadow = `0 1px 2px rgb(250, 30, 30)`
        setTimeout(() => {
        
            this.random = false
            this.snd.stop()
            this.isPlaying = false
            this.dead = true
            this.el.style.boxShadow = `0 1px 2px rgb(150, 150, 150)`
            this.el.style.color = 'rgb(60, 60, 60)'
        }, 1000 * random(1.0, 10.0))
    }

    update(others){

        this.points = this.getPoints(this.numPoints, this.position.x, this.position.y, this.size)

     
        if(!this.clicked){
            this.eyes.forEach(eye => {
                // if(eye.clicked){
                //     this.clicked = true 
                // }
                // if(!eye.dead){
                    eye.update(this.eyes)
                    eye.updateBoundaries(this.position, this.size)
                    if(random(100) > 50){
                        eye.twitch()
                    }
                    eye.updatePupil()
                    eye.updateIris()
                // }
    
            })
        if(others){
          if(others.length > 0){
            this.seperation(others)
          }
        }
        this.checkBoundaries()

        this.move()
        if(this.clicked){
            console.log(this.size)
        }
        
        
        //this.velocity.mult(this.drag)
        // }else{
        //     this.eyes.forEach(eye => {
        //         if(eye.clicked){
        //             eye.speak(this.eyes, this)
        //         }
        //     })
        // }
        }
        if(this.random){
           
            const center = createVector(width/2, height/2)
            this.seek(center)
            this.move()
           
        }
        this.lifespan -= this.ageInc
        if(this.lifespan < 0){
            this.snd.stop()
            this.dead = true
        }
    }
  
}