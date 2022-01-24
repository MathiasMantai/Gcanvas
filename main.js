let canvas = new Gcanvas("canvas", 500, 500, "test", "2d", null);
let circle = MCircle.drawCircle(canvas.id)

let pieChartOptions  = {
    numberOfElements: 4,
    colors: ["green", "#ff0000", "#0f0f0f", "red"],
    radius: 10,
}

let pieChart = pieChart.draw();