class IrisLine {
    
    constructor(startPoint, endPoint, col, size, maxLineSegments){
        this.startPoint = startPoint
        this.endPoint = endPoint
        this.col = col
    }

    getLinePoints(){

    }

    render(){
        noFill()
        strokeWeight(1)
        stroke(this.col)
        
        
        line(this.startPoint.x, this.startPoint.y, this.endPoint.x, this.endPoint.y)
    }

    update(startPoint, endPoint){
        this.startPoint = startPoint
        this.endPoint = endPoint
    }
}