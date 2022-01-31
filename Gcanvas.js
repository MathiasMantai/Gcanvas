class Gcanvas {
    constructor(id, width, height, parent, context, contextAttributes) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.parent = parent;
        this.context = context;
        this.contextAttributes = contextAttributes;

        //create the canvas
        this.init();

        console.log("%cGcanvas loaded","color:black");
    }


    /**
     * Calculation Functions
     */
     static calcPercentOfWhole(total, part) {
        return (part * 100) / total;
    }

    static newEndPoint(percent, startingPoint) {
        return startingPoint + (2 / 100 * percent);
    }



    //init canvas
    init() {
        this.canvas = document.createElement("canvas");
        let error = 0;

        //define context
        if(this.context != "2d" && this.context != "webgl" && this.context != "webgl2" && this.context != "webgl-experimental") error++;
        else this.canvas.getContext(this.context, this.contextAttributes);
        if(error == 1) console.log("Error: Wrong Canvas context");

        //attributes of the canvas
        this.canvas.setAttribute("id", this.id);
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);

        //append to parent
        if(this.parent != '') document.getElementById(this.parent).appendChild(this.canvas);
        //or to the document, if parent is empty
        else document.appendChild(this.canvas);
    }







    /**
     *  
     * @param {number} origin_x 
     * @param {number} origin_y 
     * @param {number} target_x 
     * @param {number} target_y 
     * @param {string} color color of the line
     */
    drawLine(origin_x, origin_y, target_x, target_y, lineWidth = 2, color = "black") {
        let Gcontext = this.canvas.getContext(this.context);
        Gcontext.moveTo(origin_x, origin_y);
        Gcontext.lineTo(target_x, target_y);
        Gcontext.lineWidth = lineWidth;
        Gcontext.strokeStyle = color;
        Gcontext.stroke();
    }

    static errorLog() {
        
    }

    /**
     * Draws a pie chart with the given data object
     * @param {object} dataArray object that contains all data for the chart
     * structure;
     * - "labels" (array): labels of the pie slices
     * - "data" (array): specific data of each slice
     * - "colors" (array): color of each pie slice
     */
    drawPieChart(object) {
        let GContext = this.canvas.getContext(this.context);

        let dataSet = object["data"];
        let dataLength = dataSet.length;
        console.log(dataSet);

        let standardLabels = false;
        let labelSet = object["labels"];
        let labelLength = labelSet.length;

        //if no labels are specified, we use standard labels in the form of label1, ..., labeln
        if(labelSet == null || labelLength == 0 || labelSet == undefined) {
            standardLabels = true;
        }

        if(labelSet != null && labelLength > 0 && labelLength != dataLength) {
            console.log("ERROR: data and label arrays do not match")
        }
        console.log(standardLabels);
        
        let total = 0;
        for(let i = 0; i < dataLength; i++) {
            total+= dataSet[i];
        }
        let startingPoint = 0;
        for(let i = 0; i < dataLength; i++) {
            let percent = calcPercentOfWhole(total, dataSet[i]);
            let endPoint = newEndPoint(percent, startingPoint);

            //draw Pie slice

            //set new satrtingPoint to endPoint
            startingPoint = endPoint;

        }
    }
    
    
    static drawPieSlice() {

    }
    
    drawRingChart(origin_x, origin_y, radiusRing, radiusMax, dataArray) {


        //set new satrtingPoint to endPoint
        startingPoint = endPoint;

        //draw transparent circle to create ring
        let radiusTrans = radiusMax - radiusRing;
    }

 






}
