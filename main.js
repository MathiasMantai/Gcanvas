let canvas = new Gcanvas("canvas", 500, 500, "white", "test", "2d", null);
//canvas.drawLine(5,5,100,100,10,"blue");

let pieChart = {
    origin_x: 250,
    origin_y: 250,
    radius_max: 80,
    radius_circle: 30,
    labels: [
        "Hans",
        "Bob",
        "Dietrich"
    ],
    data: [
        30,
        50,
        20
    ],
    colors: [
        "#3488D8",
        "#825DA4",
        "#A99E6D"
    ]
}

//canvas.drawRingChart(pieChart);
canvas.drawQuadraticCurve();