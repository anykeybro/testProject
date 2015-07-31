document.onload = init();

var board;
function init() {
    board = JXG.JSXGraph.initBoard('board', {boundingbox: [-4, 4, 4, -2], axis: true});

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
    var p1 = board.create('point', [2, 1], { visible: false });
    var p2 = board.create('point', [-1, 2], { visible: false });

    var line = board.create('line', [ p1 , p2], {strokewidth: 3, });

    var iPoint_1 = board.create('intersection', [line, graph, 0],{ name : "A" });
    var iPoint_2 = board.create('intersection', [line, graph, 1],{ name : "B" });

    var dotLine = board.create('segment',[iPoint_1,[,0]],{ dash: 3});

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
