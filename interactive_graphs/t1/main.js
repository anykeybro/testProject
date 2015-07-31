/**
 * Created by MBakalov on 23.07.2015.
 */
window.onload = init();

function init() {
    var JSXbox = "G2Dbox-task-1";

    var Graph = function () {
        var AXIS_OPTIONS = {};
        var GRAPH_OPTIONS = {};
        var POINT_OPTIONS = { visible: false };

        var TEXT_OPTIONS = {
            highlight:false,
            anchorY: 'bottom',
            fontSize: 22,
//              anchor:"bottom",
//            anchor:"top",
//            cssClass:"text-column-value-y"
            visible: false
        };

        var TEXT_LABEL_OPTIONS = {
            highlight:false,
            fixed: true,
            visible: true

        };


        var LINE_OPTIONS = {
            highlight:false,
            straightFirst: false,
            straightLast: false,
            strokewidth: 40,
            strokeopacity: 0,
            visible: true,
            highlightStrokeOpacity: 0,
            snapSizeX: 1,
            snapToGrid: true
        };

        var DASH_LINE_OPTIONS = {
            highlight:false,
            straightFirst: false,
            straightLast: false,
            strokeWidth: 2,
            visible: false,
            fixed: true,
            dash: 2,
            strokecolor: "#999"
        };

        var POLY_OPTIONS = {
            withLines: false,
            fillcolor: "blue",
            opacity: 1
        };


        this.board = JXG.JSXGraph.initBoard(JSXbox, {boundingbox: [-100, 500, 600, -100],
            axis: false,
            grid: false,
            showCopyright: false
        });
        this.board.create('axis', [
            [0, 0],
            [0, 1]
        ]);
        this.board.create('axis', [
            [0, 0],
            [1, 0]
        ], { ticks: { drawLabels: false}});

        var self = this;



        var createPoly = function (data, colorColumn) {
            var points = [];
            var isVisibleDashedLine = false;

            for (var i = 0; i < data.length; i++) {
                points.push(
                    self.board.create('point', [ data[i][0], data[i][1] ], { visible: false })
                );
            }
            var lineCoords = [
                [
                    points[1].coords.usrCoords[1],
                    points[1].coords.usrCoords[2]
                ],
                [
                    points[2].coords.usrCoords[1],
                    points[2].coords.usrCoords[2]
                ]
            ];


            var dragableLine = self.board.create('line', lineCoords, LINE_OPTIONS);
            var dashedLine = self.board.create('line', [
                [0, 200],
                points[1]
            ], DASH_LINE_OPTIONS);
            //var textValueY = self.board.create('text', [dragableLine.point1.coords.usrCoords[1], dragableLine.point1.coords.usrCoords[2]+50, "Multiline text<br>anchorY top"], {anchorY:'top', cssClass:'mytext'});
            var textColumnValueY = self.board.create('text', [0, 0, " count "], TEXT_OPTIONS);


            var column = self.board.create('polygon', [points[0],
                dragableLine.point1,
                dragableLine.point2,
                points[3]
            ], {
                withLines: false,
                fillcolor: colorColumn,
                opacity: 1
            });

            /**
             * drag line
             */
            var maxValue = 400;

            dragableLine.on('drag', function (e) {
                dashedLine.visible(true);
                textColumnValueY.visible(true);
                var y = dragableLine.point1.coords.usrCoords[2];


                //console.log(dashedLine.visible);

                dashedLine.point1.coords.usrCoords[1] = 0;
                dashedLine.point1.coords.usrCoords[2] = dragableLine.point1.coords.usrCoords[2];
                dashedLine.point2.coords.usrCoords[2] = dragableLine.point1.coords.usrCoords[2];

                dragableLine.point1.coords.usrCoords[1] = lineCoords[0][0];
                dragableLine.point2.coords.usrCoords[1] = lineCoords[1][0];


//              console.log();

                if (y <= 0) {
                    dragableLine.point1.coords.usrCoords[2] = 0;
                    dragableLine.point2.coords.usrCoords[2] = 0;
                } else if (y > maxValue) {
                    dragableLine.point1.coords.usrCoords[2] = maxValue;
                    dragableLine.point2.coords.usrCoords[2] = maxValue;
                }

                dragableLine.point1.coords.usrCoords[2] = Math.round(dragableLine.point1.coords.usrCoords[2]);
                dragableLine.point2.coords.usrCoords[2] = Math.round(dragableLine.point1.coords.usrCoords[2]);
                textColumnValueY.coords = dragableLine.point1.coords;
                textColumnValueY._setText(dragableLine.point1.coords.usrCoords[2]);


            });



            dragableLine.on('mouseup', function (e) {
                console.log(dashedLine);

                dashedLine.visible(false);
                textColumnValueY.visible(false);

                console.log(column_A);

                checkAnswer(column_A,column_B,column_C);
            });


            return column;
        };

        var label_A = self.board.create('text', [150, -20, "A"],TEXT_LABEL_OPTIONS);
        var label_B = self.board.create('text', [300, -20, "B"],TEXT_LABEL_OPTIONS);
        var label_C = self.board.create('text', [450, -20, "C"],TEXT_LABEL_OPTIONS);

        var column_A = createPoly([
            [100, 0],
            [100, 200],
            [200, 200],
            [200, 0]
        ], "darkblue");
        var column_B = createPoly([
            [250, 0],
            [250, 200],
            [350, 200],
            [350, 0]
        ], "skyblue");
        var column_C = createPoly([
            [400, 0],
            [400, 200],
            [500, 200],
            [500, 0]
        ], "lightgreen");
    };




    function getCoords(point) {
        var coords = [];
        coords.push(point.coords.usrCoords[1]);
        coords.push(point.coords.usrCoords[2]);
        return coords;
    }

    function getX(point) {
        return point.coords.usrCoords[1];
    }

    function getY(point) {
        return point.coords.usrCoords[2];
    }

    var graph = new Graph();


    var checkAnswer = function (a,b,c) {
        var ANSWER = {
            A: 309,
            B: 130,
            C: 226
        };

        if((a.vertices[1].coords.usrCoords[2]==ANSWER["A"])&&
            b.vertices[1].coords.usrCoords[2]==ANSWER["B"]&&
            c.vertices[1].coords.usrCoords[2]==ANSWER["C"]){
            console.log("true");
            return true;
        }else{
            console.log("false");
            return false;
        }



    };


};