document.onload = init();

var board;
function init() {
    board = JXG.JSXGraph.initBoard('board', {boundingbox: [-4, 4, 4, -4], axis: true});
    board.suspendUpdate();
    console.log(board.getBoundingBox());

    board.getBoundingBox();
    var f = function (x) {
        return x * x;
    };
    var graph = board.create('functiongraph', [f], {
        strokeColor: '#00ff00',
        strokewidth: 3
    });
    var A = board.create('point', [2, 2], {name: "A"}, {
        visible: false
    });
    var line = board.create('line', [ A , [ function () {
        return A.X() - 5
    } , function () {
        return A.Y() + 2
    }]]);
    var p14_1 = board.create('intersection', [line, graph, 0], {
        size: 4,
        face: '[]',
        name: "M"
    });
    var p14_2 = board.create('intersection', [line, graph, 1], {
        size: 4,
        face: '[]',
        name: "N"
    });


    var buttonZoomOut = document.getElementById("buttonZoomOut");
    buttonZoomOut.addEventListener("click", function () {
        board.zoomOut(0, 0)
    });

    var buttonZoomIn = document.getElementById("buttonZoomIn");
    buttonZoomIn.addEventListener("click", function () {
        board.zoomIn(0, 0)
    });

    board.unsuspendUpdate();
}
