function noisyCirclePoints(numPoints, centerX, centerY, rad , ns, anim, scl, extra){
    const points = []
    const scale = scl || 100
    
    for(let i=0; i < numPoints; i++){ 
        const xtra = extra || 1
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

function hairPoints(numPoints, centerX, centerY, rad , hairLengths){
    const points = []
    
    for(let i=0; i < numPoints; i++){ 
        
        const inc = (2 * PI)/(numPoints-1)
        const theta = i * inc
        const x = centerX + hairLengths[i] + rad * cos(theta) 
        const y = centerY + hairLengths[i] + rad * sin(theta) 
        // noiseSeed(1)
        points[i] = {x: x, y: y}
        
    }
    return points
}


function noisyRadialLinePoints(theta, cX, cY, len, numPoints, anim, scl){
    const points = []
    const scale = scl || 10
    const res = 0.002
    const inc = len/numPoints
    for(let i=0; i< numPoints; i++){
        const x = cX + (i*inc) * cos(theta)
        const y = cY + (i*inc) * sin(theta)
        const n = map(noise(x * res + anim + i/100, y * res + anim), 0.3, 0.7, -scale, scale)
        points[i] = {x: x + n, y: y}
    }
    return points
}

function radialLinePoints(theta, cX, cY, len, numPoints){
    const arr = []
    const inc = len/numPoints
    for(let i=0; i< numPoints; i++){
        const x = cX + (i*inc) * cos(theta + random(-0.05,0.05))
        const y = cY + (i*inc) * sin(theta + random(-0.05,0.05))
        arr[i] = {x, y}
    }
    return arr
}