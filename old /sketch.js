// eye lid that covers the eye?

// remember how to get the angle of a point to another point


// notes or speculative to do list
// convert positions to vectors for better movement
// check collisions using specific point @ mouse/center theta
// give each shape a membrane strength that pushes against others/include force
// seperation behaviors between eyes
// avoid touching external walls (rather than bounce)
// maybe put some hairs along the edge of the wall point out?


// let creature1,creature2, creature3
let theta = 0
const thetaInc = 0.0001
// const creatures = []
let creatures

function setup(){
    createCanvas(windowWidth, windowHeight)
    // x, y, size
    // creature1 = new Creature(600, 700, 120)
    // creature2 = new Creature(300, 300, 150)
    // creature3 = new Creature(800, 300, 220)
    // creatures.push(creature1)
    // creatures.push(creature2)
    // creatures.push(creature3)

    creatures = Array.from({length: 4}, () => {
        return new Creature(random(100,width-100), random(100, height - 100), random(60,250))
    })
}

function draw(){
    background(20)

    translate(width/2, height/2)
    rotate(theta)
    translate(-width/2, -height/2)
    creatures.forEach((creature, idx) => {
        creature.update(creatures)
        creature.render()
    })

    theta += thetaInc
}