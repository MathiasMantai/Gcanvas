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
        origin_y: 130
    },
    labels: [
        "Spieler1",
        "Spieler2",
        "Spieler3",
        "Spieler4"
    ],
    data: [
        30,
        50,
        10,
        10
    ],
    colors: [
        "#0080FF",
        "#B649FF",
        "#47C168",
        "#ff00ff"
    ]
}

canvas.drawRingChart(ringChart);
