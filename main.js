let canvas = new Gcanvas("canvas", 300, 200, "white", "test", "2d", null);
//canvas.drawLine(5,5,100,100,10,"blue");

let ringChart = {
    space: "yes",
    origin_x: 100,
    origin_y: 100,
    radius_max: 80,
    radius_circle: 30,
    legend: {
        font: "Arial",
        fontSize: "18px",
        textColor: "black",
        origin_x: 190,
        origin_y: 150
    },
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

canvas.drawRingChart(ringChart);
