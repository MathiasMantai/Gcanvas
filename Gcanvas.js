class Gcanvas {
    constructor(id, width, height, backGroundColor, parent, context, contextAttributes) {
        this.id = id;
        this.width = width;
        this.height = height;
        this.backGroundColor = backGroundColor;
        this.parent = parent;
        this.context = context;
        this.contextAttributes = contextAttributes;
        this.canvas;
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
        if(error == 1) {
            this.errorLog("correct context was not found");
            return;
        }

        //attributes of the canvas
        this.canvas.setAttribute("id", this.id);
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);

        if(this.backGroundColor != '' && this.backGroundColor != undefined && this.backGroundColor != null) {
            this.canvas.style.backgroundColor = this.backGroundColor;
        }
        else {
            this.canvas.style.backGroundColor = '#fff';
            this.backGroundColor = '#fff';
        }

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

        //add space if declared in object
        let space = 0;
        if(object["space"] != undefined && object["space"] != null && object["space"] == "yes") {
            space = 0.01;
        }

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
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, pieNumbers.radius, (startingPoint+space)*Math.PI, endPoint*Math.PI);
            Gcontext.fill();

            //set new satrtingPoint to endPoint
            startingPoint = endPoint;
        }
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
        for(let color in colorSet) {
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
            radius_max: (object["radius_max"] == undefined) ? ((this.width+this.height)*2) : object["radius_max"],
            radius_circle: (object["radius_circle"] == undefined) ? 20 : object["radius_circle"]
        };

        //add space if declared in object
        let space = 0;
        if(object["space"] != undefined && object["space"] != null && object["space"] == "yes") {
            space = 0.01;
        }

        let total = this.totalNumber(dataSet);

        let startingPoint = 0;
        for(let i = 0; i < dataLength; i++) {
            let percent = this.calcPercentOfWhole(total, dataSet[i]);
            let endPoint = this.newEndPoint(percent, startingPoint);
            
            //draw Pie slice
            Gcontext.beginPath();
            Gcontext.fillStyle = colorSet[i];
            Gcontext.moveTo(pieNumbers.origin_x, pieNumbers.origin_y);
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, pieNumbers.radius_max, (startingPoint+space)*Math.PI, endPoint*Math.PI);
            Gcontext.fill();

            //set new satrtingPoint to endPoint
            startingPoint = endPoint;
        }
        //draw transparent circle

        let radiusTrans = pieNumbers.radius_max - pieNumbers.radius_circle;

        if(radiusTrans > 0 && radiusTrans < pieNumbers.radius_max) {
            Gcontext.beginPath();
            Gcontext.fillStyle = this.backGroundColor;
            Gcontext.globalAlpha = 1;
            Gcontext.moveTo(pieNumbers.origin_x, pieNumbers.origin_y);
            Gcontext.arc(pieNumbers.origin_x, pieNumbers.origin_y, radiusTrans, 0, 2*Math.PI);
            Gcontext.fill();
        }
         
        //create legend, if legendarray exists
        if(object["legend"] != null && object["legend"] != undefined && this.objectLength(object["legend"])> 0) {
            this.addLegendToChart("ring", labelSet, standardLabels, colorSet, standardColors, object["legend"], dataLength, pieNumbers, dataSet);
            this.infoLog("legend added");
        }
    }

    drawQuadraticCurve() {
        var points = [{x:1,y:1},{x:2,y:3},{x:3,y:4},{x:4,y:2},{x:5,y:6}] //took 5 example points
        let Gcontext = this.canvas.getContext(this.context);
        Gcontext.moveTo((points[0].x), points[0].y);
        for(var i = 0; i < points.length-1; i ++) {
            var x_mid = (points[i].x + points[i+1].x) / 2;
            var y_mid = (points[i].y + points[i+1].y) / 2;
            var cp_x1 = (x_mid + points[i].x) / 2;
            var cp_x2 = (x_mid + points[i+1].x) / 2;
            Gcontext.quadraticCurveTo(cp_x1,points[i].y ,x_mid, y_mid);
            Gcontext.quadraticCurveTo(cp_x2,points[i+1].y ,points[i+1].x,points[i+1].y);
        }
    }

    svgToImage() {

    }

    imageToCanvas() {
        
    }
  
    addLegendToChart(chartType, labelsArray, standardLabels, colorArray, standardColors, legendObject, dataLength, pieNumbers, dataSet) {
        let Gcontext = this.canvas.getContext(this.context);

        //create new object instead of referencing to existing one (solved error, which impacted the legend coordinates)
        let object = new Object();
        Object.entries(legendObject).forEach(entry => {
            const[key, value] = entry;
            object[key] = value;
        });

        //error handling for legend object
        if(legendObject["origin_x"] == '' || legendObject["origin_x"] == null || legendObject["origin_x"] == undefined || legendObject["origin_y"] == '' || legendObject["origin_y"] == null || legendObject["origin_y"] == undefined) {
            this.errorLog("coordinates for legend not defined or false");
            return;
        }

        let dataBox = document.createElement("div");
        dataBox.style.border = "1px solid black";
        dataBox.style.width = "50px";
        dataBox.style.height = "50px";
        dataBox.style.position = "absolute";
        dataBox.style.display = "none";
        document.getElementById(this.parent).appendChild(dataBox);

        //arrays for labels and colors
        let labels = [];
        let colors = [];

        
        //handle labels
        if(standardLabels == false) labels = labelsArray;
        else if(standardLabels == true) {
            for(let i = 1; i <= dataLength; i++) {
                labels.push("Label"+i);
            }
        }

        //handle colors
        if(standardColors == false) colors = colorArray;
        else if(standardColors == true) {
            for(let i = 1; i <= dataLength; i++) {
                colors.push("#000");
            }
        }

        //draw legend
        for(let i = 0; i < dataLength; i++) {
            Gcontext.font = object["fontSize"] + " " + object["font"];
            //draw a rectangle representing the color of the dataset
            Gcontext.fillStyle = colors[i];
            Gcontext.fillRect(object["origin_x"]-(parseInt(object["fontSize"].replace("px", ""))/2), object["origin_y"]-(parseInt(object["fontSize"].replace("px", ""))/2), parseInt(object["fontSize"].replace("px", ""))/2.5, parseInt(object["fontSize"].replace("px", ""))/2.5);



            //draw the text
            Gcontext.fillStyle = object["textColor"];
            Gcontext.fillText(labels[i],object["origin_x"],object["origin_y"]);
            //change coordinates for next label
            object["origin_y"]+= parseInt(object["fontSize"].replace("px", ""));
        }


        //add mouseover event
        this.canvas.addEventListener('mousemove', (e) => {

            let rect = this.canvas.getBoundingClientRect();
            let scaleX = this.canvas.width / rect.width;
            let scaleY = this.canvas.height / rect.height;
    
            let mouse = {
                x: (e.clientX - rect.left) * scaleX,
                y: (e.clientY - rect.top) * scaleY
            }
            console.log(e.pageX+ " " +mouse.x);
            dataBox.style.left = mouse.x + 'px' ;
            dataBox.style.top = mouse.y + 'px';

           //if inside ring, determine what data the mouse is hovering over
           if(this.isInsideRing(pieNumbers.origin_x,pieNumbers.origin_y,mouse.x,mouse.y, pieNumbers.radius_circle, pieNumbers.radius_max)) {
               //determine the angle between starting point line and line that connects the mouse position with the diagramm origin

               //vector for originLine
               let originLine = {
                   x: (pieNumbers.origin_x+pieNumbers.radius_max) - pieNumbers.origin_x,
                   y: 0
               };

               //vector for line connecting origin point and mouse coordinates
               let mouseLine = {
                   x: mouse.x - pieNumbers.origin_x,
                   y: mouse.y - pieNumbers.origin_y
               };

               //calculate the scalarproduct
               //use Math.acos(zahl) for calculation
               const mouseAngleTop = (originLine.x*mouseLine.x) + (originLine.y*mouseLine.y);
               const mouseAngleBottom = Math.sqrt(originLine.x*originLine.x + originLine.y*originLine.y) * Math.sqrt(mouseLine.x*mouseLine.x + mouseLine.y*mouseLine.y); 
               let mouseAngle = Math.acos(mouseAngleTop / mouseAngleBottom) * (180/Math.PI);
               if(mouseLine.y < 0) mouseAngle = 360-mouseAngle;


               //transfer angle into percent
               let anglePercent = (100*mouseAngle)/360;

               //compare angle percent to each percentage of data (added on top) to determine which pie slice is currenty mouseovered
               let mouseTouchingData = 0;
               let foundCorrectTouchData = false;
               let tmp = 0;
               while(foundCorrectTouchData == false) {
                   let total = this.totalNumber(dataSet);
                   let percent = this.calcPercentOfWhole(total, dataSet[mouseTouchingData]);
                   if(anglePercent <= percent+tmp) {
                       foundCorrectTouchData = true;
                   }
                   else {
                       tmp += percent;
                       mouseTouchingData++;
                   }
               }

               //IT FUCKING  WORKS!!!!!

               //tutorial for circle following mouse on canvas
               // https://www.educative.io/collection/page/10370001/5712018204000256/4730262499885056

               //show dataBox
               dataBox.style.display = "";



               
               console.log(originLine.x + " " + originLine.y + " " + mouseLine.x + " " + mouseLine.y + " " + mouseAngle + " " + anglePercent + " " + mouseTouchingData);  
           }
           else {
               //make the dataBox hidden again
               dataBox.style.display = "none";
           }
        });
    }

    //svg -> image -> canvas 
    //https://levelup.gitconnected.com/draw-an-svg-to-canvas-and-download-it-as-image-in-javascript-f7f7713cf81f

    //maybe solution: draw another canvas on top to display stuff

    /**
     * Helper Functions
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

    drawPieSlice() {
        //todo
        //helper function for drawPieChart and drawRingChart
    }

    objectLength(object) {
        return Object.keys(object).length;
    }

    totalNumber(dataSet) {
        let total = 0;
        for(let i = 0; i < dataSet.length; i++) {
            total+= dataSet[i];
        }
        return total;
    }

    isInsideCircle(origin_x, origin_y, mouse_x, mouse_y, radius) {
        
        let a = Math.abs(origin_x - mouse_x);
        let b = Math.abs(origin_y - mouse_y);
        let c = Math.sqrt(a*a + b*b);
        return (c <= radius);
    }

    isInsideRing(origin_x, origin_y, mouse_x, mouse_y, radius_circle, radius_max) {
        let isInCircleMax = this.isInsideCircle(origin_x, origin_y, mouse_x, mouse_y, radius_max);
        let isInCirceMin = this.isInsideCircle(origin_x, origin_y, mouse_x, mouse_y, (radius_max-radius_circle));
        return (isInCircleMax && !isInCirceMin);
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


};


//
console.log("Gcanvas Version 0.0.3");    
