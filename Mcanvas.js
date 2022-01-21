class Mcanvas {
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
        document.getElementById(this.parent).appendChild(this.canvas);
    }

    addImage(url, x, y, width, height) {
        let Mcontext = this.canvas.getContext(this.context);

    }


    /**
     * 
     * @param {*} x 
     * @param {*} y 
     * @param {*} width 
     * @param {*} height 
     * @param {string} mode mode of reactangle creation. "fill" = filled rectangle, "outline" = outlined rectangle, "transparent" = transparent rectangle
     * @param {string} color 
     */
    drawRect(x, y, width, height, mode, color) {
        let Mcontext = this.canvas.getContext(this.context);
        switch(mode) {
            case "fill":
                break;
            case "outline":
                break;
            case "transparent":
                break;
        }
    }

    drawCircle() {
        let Mcontext = this.canvas.getContext(this.context);

    }

    /**
     * 
     * @param {*} origin_x 
     * @param {*} origin_y 
     * @param {*} target_x 
     * @param {*} target_y 
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

//END CLASS MCanvas
}

