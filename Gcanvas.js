class Gcanvas {
    constructor(id, width, height, backGroundColor, parent, context, contextAttributes) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.backGroundColor = backGroundColor;
        this.parent = parent;
        this.context = context;
        this.contextAttributes = contextAttributes;
        //create the canvas
        this.init();
    }

    //init canvas
    init() {
        this.canvas = document.createElement("canvas");
        let error = 0;

        //define context
        if(this.context != "2d" && this.context != "webgl" && this.context != "webgl2" && this.context != "webgl-experimental") error++;
        else this.canvas.getContext(this.context, this.contextAttributes);
        if(error == 1) this.errorLog("correct context was not found")

        //attributes of the canvas
        this.canvas.setAttribute("id", this.id);
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);

        if(this.backGroundColor != '' && this.backGroundColor != undefined && this.backGroundColor != null) {
            this.canvas.style.backgroundColor = this.backGroundColor;
        }
        else this.canvas.style.backGroundColor = '#fff';

        //append to parent
        if(this.parent != '') document.getElementById(this.parent).appendChild(this.canvas);
        //or to the document, if parent is empty
        else document.appendChild(this.canvas);

        //scale by devicepixelration to get crisp image;
        this.canvas.style.height = this.canvas.height / window.devicePixelRatio + "px";
        this.canvas.style.width  = this.canvas.width  / window.devicePixelRatio + "px";

        if(error == 0) this.infoLog("Gcanvas successfully initialized");
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



    /**
     * Draws a pie chart with the given data object
     * @param {object} dataArray object that contains all data for the chart
     * structure;
     * - "labels" (array): labels of the pie slices
     * - "data" (array): specific data of each slice
     * - "colors" (array): color of each pie slice
     */
    drawPieChart(object) {
        let Gcontext = this.canvas.getContext(this.context);
        let error = 0;

        let dataSet = object["data"];
        let dataLength = dataSet.length;

        let standardLabels = false;
        let labelSet = object["labels"];
        let labelLength = labelSet.length;

        //if no labels are specified, we use standard labels in the form of label1, ..., labeln
        if(labelSet == null || labelLength == 0 || labelSet == undefined) {
            standardLabels = true;
            this.infoLog("standard labels will be used, since no or empty label array was found");
        }

        //error when label array exists and has content, but label and data dont match in length, we throw an error
        if(labelSet != null && labelSet != undefined && labelLength > 0 && labelLength != dataLength) {
          this.errorLog("data and label arrays do not match");
          return;
        }

        //colors
        let standardColors = false;
        let colorSet = object["colors"];
        let colorLength = colorSet.length;


        //check if all given colors are valid
        for(var color in colorSet) {
            if(!this.isValidColor(color)) {
                error++;
            }
        };
        if(error > 0) this.errorLog("non valid color has been given in color array");


        //standard colors, when color array is empty or was not found
        if(colorSet == undefined || colorSet == null || colorLength == 0) {
            standardColors = true;
            this.infoLog("standard colors will be used, since no or empty color array was found");
        }

        //error handling when color array is not correct
        if(colorSet != null && colorSet != undefined && colorLength > 0 && colorLength != dataLength) {
            this.errorLog("color and data arrays do not match");
            return;
        }

        //standard data for the appearance of the pie chart
        let pieNumbers = {
            origin_x: (object["origin_x"] == undefined) ? (this.width / 2) : object["origin_x"],
            origin_y: (object["origin_y"] == undefined) ? (this.height / 2) : object["origin_y"],
            radius: (object["radius"] == undefined) ? (10) : object["radius"]
        };



        let total = 0;
        for(let i = 0; i < dataLength; i++) {
            total+= dataSet[i];
        }
        let startingPoint = 0;
        for(let i = 0; i < dataLength; i++) {
            let percent = this.calcPercentOfWhole(total, dataSet[i]);
            let endPoint = this.newEndPoint(percent, startingPoint);
            

            //draw Pie slice
            Gcontext.beginPath();
            Gcontext.fillStyle = colorSet[i];
            Gcontext.moveTo(pieNumbers.origin_x, pieNumbers.origin_y);
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, pieNumbers.radius, startingPoint*Math.PI, endPoint*Math.PI);
            Gcontext.fill();

            //set new satrtingPoint to endPoint
            startingPoint = endPoint;
            // fix the blur
            // https://medium.com/wdstack/fixing-html5-2d-canvas-blur-8ebe27db07da

        }
    }
    
    
    drawPieSlice() {

    }
    
    drawRingChart(object) {
        let Gcontext = this.canvas.getContext(this.context);
        let error = 0;

        let dataSet = object["data"];
        let dataLength = dataSet.length;

        let standardLabels = false;
        let labelSet = object["labels"];
        let labelLength = labelSet.length;

        //if no labels are specified, we use standard labels in the form of label1, ..., labeln
        if(labelSet == null || labelLength == 0 || labelSet == undefined) {
            standardLabels = true;
            this.infoLog("standard labels will be used, since no or empty label array was found");
        }

        //error when label array exists and has content, but label and data dont match in length, we throw an error
        if(labelSet != null && labelSet != undefined && labelLength > 0 && labelLength != dataLength) {
          this.errorLog("data and label arrays do not match");
          return;
        }

        //colors
        let standardColors = false;
        let colorSet = object["colors"];
        let colorLength = colorSet.length;


        //check if all given colors are valid
        for(var color in colorSet) {
            if(!this.isValidColor(color)) {
                error++;
            }
        };
        if(error > 0) this.errorLog("non valid color has been given in color array");


        //standard colors, when color array is empty or was not found
        if(colorSet == undefined || colorSet == null || colorLength == 0) {
            standardColors = true;
            this.infoLog("standard colors will be used, since no or empty color array was found");
        }

        //error handling when color array is not correct
        if(colorSet != null && colorSet != undefined && colorLength > 0 && colorLength != dataLength) {
            this.errorLog("color and data arrays do not match");
            return;
        }

        //standard data for the appearance of the pie chart
        let pieNumbers = {
            origin_x: (object["origin_x"] == undefined) ? (this.width / 2) : object["origin_x"],
            origin_y: (object["origin_y"] == undefined) ? (this.height / 2) : object["origin_y"],
            radius_max: (object["radius_max"] == undefined) ? (10) : object["radius_max"],
            radius_circle: (object["radius_circle"] == undefined) ? (5) : object["radius_circle"]
        };



        let total = 0;
        for(let i = 0; i < dataLength; i++) {
            total+= dataSet[i];
        }
        let startingPoint = 0;
        for(let i = 0; i < dataLength; i++) {
            let percent = this.calcPercentOfWhole(total, dataSet[i]);
            let endPoint = this.newEndPoint(percent, startingPoint);
            

            //draw Pie slice
            Gcontext.beginPath();
            Gcontext.fillStyle = colorSet[i];
            Gcontext.moveTo(pieNumbers.origin_x, pieNumbers.origin_y);
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, pieNumbers.radius_max, startingPoint*Math.PI, endPoint*Math.PI);
            Gcontext.fill();

            //set new satrtingPoint to endPoint
            startingPoint = endPoint;

        }
        //draw transparent circle

        let radiusTrans = pieNumbers.radius_max - pieNumbers.radius_circle;
        if(radiusTrans > 0 && radiusTrans < pieNumbers.radius_max) {
            Gcontext.beginPath();
            Gcontext.fillStyle = this.backGroundColor;
            Gcontext.moveTo(pieNumbers.origin_x, pieNumbers.origin_y);
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, radiusTrans, 0, 2*Math.PI);
            Gcontext.fill();
        }

    }


    /**
     * HelperFunctions
     */
    calcPercentOfWhole(total, part) {
        return (part * 100) / total;
    }
    
    newEndPoint(percent, startingPoint) {
        return startingPoint + (2 / 100 * percent);
    }

    isValidColor(colorToCheck) {
        let s = new Option().style;
        s.color = colorToCheck;
        return s.color !== '';
    }

    /**
     * Logs
     */
    errorLog(errorMessage) {
        console.error("%c"+ "ERROR: " +errorMessage, "color: red");
    }

    infoLog(infoMessage) {
        console.log(infoMessage);
    }
}