class Iris {
    constructor(pos, points, numPoints, maxLineSegments){
        this.position = pos
        this.numPoints = numPoints/4 || 25
        this.maxLineSegments = maxLineSegments || numPoints || 100
        this.colVals = COLORPALETTE[int(random(0, COLORPALETTE.length))]
        this.colors = Array.from({length: numPoints}, () => {
            return  [random(this.colVals.rMin, this.colVals.rMax), random(this.colVals.gMin, this.colVals.gMax), random(this.colVals.bMin, this.colVals.bMax)]
            
        })
        this.points = points
        this.lines = Array.from({length: this.numPoints}, (e, idx) => {
            //console.log(this.colors[idx])
            // const inc = (2 * PI)/(this.numPoints-1)
            // const theta = idx * inc
            const id = idx * numPoints/this.numPoints

            //return new IrisLine(idx, theta, this.position.x, this.position.y, this.eyePoints[idx], this.numLineSegments, this.colors[idx], this.velocity)
            return new IrisLine(this.position, this.points[id], this.colors[idx], this.size, this.maxLineSegments)
        })
    }

    render(){

        this.lines.forEach(line => {
            line.render()
        })

    }


    update(pos, points){
        this.position = pos
        const id = points.length/this.numPoints
        this.lines.forEach((line, idx) => line.update(this.position, points[id * idx]))
    }
}