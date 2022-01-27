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

        console.log("%cMcanvas loaded","color:black");
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
        let Mcontext = this.canvas.getContext(this.context);
        Mcontext.moveTo(origin_x, origin_y);
        Mcontext.lineTo(target_x, target_y);
        Mcontext.lineWidth = lineWidth;
        Mcontext.strokeStyle = color;
        Mcontext.stroke();
    }
}
