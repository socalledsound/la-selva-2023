function generateColor({rMin, rMax, gMin, gMax, bMin, bMax}){
    return [random(rMin, rMax), random(gMin, gMax), random(bMin, bMax)]
}


function makeLinePoints(idx, theta, centerX, centerY, endPoint, lineRes,colVals){
    const lineLength = dist(centerX, centerY, endPoint.x, endPoint.y)/1.6
    return({
        points: makeRadialLinePoints(theta, centerX, centerY, lineLength, lineRes),
        // col: generateColor(colVals),
        col: colors[idx],
        lineWeight: 1,
    })
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

function noisyRadialLinePoints(theta, cX, cY, len, numPoints){
    const arr = []
    const inc = len/numPoints
    for(let i=0; i< numPoints; i++){
        const x = cX + (i*inc) * cos(theta + random(-0.05,0.05))
        const y = cY + (i*inc) * sin(theta + random(-0.05,0.05))
        arr[i] = {x, y}
    }
    return arr
}