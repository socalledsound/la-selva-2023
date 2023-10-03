
// should move creature render stuff to creature from noisycircle

// some things to add:

// mouse dragged function to change playback speed

// play sound make waveform around the edge of creature

// figure out how to make a speech bubble?
// https://editor.p5js.org/thechalkface/sketches/DARfHT77m
// periodic move to center of canvas (limelight? light up?)


//let mike

let creatures
const numInitialCreatures = 20
const initTriggerVal = 9999
const triggerValInc = 0.01
let triggerVal = initTriggerVal
let startButton
let snds
let started = false
let timer = 0
let addCreatureVal = 300
const textContainer = document.getElementById('text-container')


function preload(){
    //snd = new Howl({src: 'snds/Misc. Sci-fi Loop_TSTLOP1.M.mp3'})
    snds = Array.from({length: 40}, (el, idx) => {
        const path = `snds/${SOUNDS[idx].name}`
        return new Howl({src: path, loop: true})
    })
}

function setup(){
    createCanvas(windowWidth - windowWidth * .3, windowHeight)
    frameRate(20)
   // mike = new Creature(500, 500, 300)
   creatures = Array.from({length: numInitialCreatures}, (el, idx) => {
    const col = [random(0, 255),random(0, 255),random(0, 255)]
    return new Creature(snds[idx], idx, random(100, 800), random(100, 800), random(100,200), 100, col, 5)
   })

   startButton = createButton('start')
   startButton.position(width/2 - width * 0.15, height/2 - 50)
   startButton.mousePressed(() => {
    textContainer.style.overflow = 'hidden'
    setTimeout(() =>  started = true, 100)
    })
}

function draw(){
    background(20)
   

    if(started){
        startButton.hide()
    // if creature is hovering, move it to the end of the array
    // of creatures ie render it on top of the others
    creatures.sort((a, b) => {
        return (a.random === b.random) ? 0 : a.random ? 1 : -1
    })

    creatures.sort((a, b) => {
        return (a.hover === b.hover) ? 0 : a.hover ? 1 : -1
    })
    

    creatures.forEach(creature => {
        creature.update(creatures)

        if(random(10000) > triggerVal){
            console.log('random click')
            setTimeout(resetTriggerVal, 500)
            
            creature.randomClick()
        }else{
            triggerVal -= triggerValInc
        }

        const someClicked = creatures.find(c => c.clicked === true)
        if(!someClicked){
            if(creature.random){
                push()
                translate(creature.position.x, creature.position.y)
                rotate(creature.theta)
                translate(-creature.position.x, -creature.position.y)
                creature.theta += creature.thetaInc 
                creature.render()
                creature.eyes.forEach(eye => eye.render())
                pop()
            }else{
                creature.render()
                creature.eyes.forEach(eye => eye.render())
            }

        }
        else{
            if(creature.clicked || creature.random){
                push()
                translate(creature.position.x, creature.position.y)
                rotate(creature.theta)
                translate(-creature.position.x, -creature.position.y)
                // creature.theta += creature.thetaInc
                // creature.seperation(creatures)
                // creature.move()
                creature.render()
                creature.eyes.forEach(eye => {
                    eye.twitch()
                    eye.update()
                    eye.render()
                })
                pop()
            }
        }

    })
    //console.log(mike.velocity)
    // mike.update()
    // mike.render()
    // if(mike.eyes){
    //     mike.eyes.forEach(eye => eye.render())
    // }
   

    if(timer > addCreatureVal){
        if(creatures.length < 6){
            const numNewCreatures = int(random(10,30))
            for(let i = 0; i < numNewCreatures; i++){
                addCreature()
            }
        }else{
            addCreature()
        }

        timer = 0
    }

    if(random(1000) > 996){
        const numNewCreatures = int(random(2,10))
        for(let i = 0; i < numNewCreatures; i++){
            addCreature()
        }
    }


    timer++

    const aliveCreatures = creatures.filter(c => !c.dead)
    creatures = aliveCreatures
    if(creatures.length < 10){
        addCreatureVal = 250
    }else if(creatures.length > 20){
        addCreatureVal = 1000
    }else if(creatures.length < 5) {
        addCreatureVal = 150
    }else{
        addCreatureVal = 400
    }

    }else{
        // startTxt.forEach((t, idx) => {
        //     console.log(t)
        //     fill(0)
        //     textSize(62)
        //     text(`${t}`, 100, (idx + 1) * height/7, width * 0.3, 100 )
        //     text(`${t}`, 800, 400)
        // })
        textSize(20)
        fill(210, 190, 20)
        text(`click, drag, etc....it's more fun if you turn your speakers on  `, 200, 650, 600)
        

    }

}

function addCreature(){
    const col = [random(0, 255),random(0, 255),random(0, 255)]
    const id = int(random(0, snds.length))
    const snd = snds[id]
    creatures.push(new Creature(snd, id, width/2, height/2, random(100,200), 100, col, 5))
}

function mouseMoved(){
    creatures.forEach(creature => {
        creature.checkHover(mouseX, mouseY)
    })
}

function mouseDragged(){
    // drag creature
    creatures.forEach(creature => {
        if(creature.clicked){
            creature.drag(mouseX, mouseY)
        }
    })
}

function mousePressed(){
    if(started){
        creatures.forEach(creature => {
            creature.checkClick(mouseX, mouseY)
        })
    }else{
        //startButton.checkClick(mouseX, mouseY)
    }

}

function mouseReleased(){
    creatures.forEach(creature => {
        if(creature.clicked){
            creature.clicked = false
            creature.dragging = false
            creature.dragStart = null
            creature.el.style.color = 'rgb(30, 30, 30)'
            creature.el.style.boxShadow = `0 1px 2px rgb(30, 30, 30)`
        }
        if(creature.isPlaying){
            creature.snd.stop()
            creature.isPlaying = false
        }
        
    })
}

function resetTriggerVal(){
    triggerVal = initTriggerVal
}