let canvas = new Gcanvas("canvas", 500, 500, "test", "2d", null);
//canvas.drawLine(5,5,100,100,10,"blue");

let pieChart = {
    origin_x: 250,
    origin_y: 250,
    radius: 15,
    labels: [
        "Hans",
        "Bob",
        "s"
    ],
    data: [
        30,
        50,
        20
    ],
    colors: [

    ]
}

canvas.drawPieChart(pieChart);
