/**
 * Created by MBakalov on 28.07.2015.
 */
window.onload = init();

function init() {
    var JSXbox = "G2Dbox-task-3";

    var Graph = function () {
        var BOARD_OPTIONS = {
            boundingbox: [-8, 6, 8, -6],
            showCopyright: false,
            showNavigation: false
//            originX:250,
//            originY:170,
//            unitX:30,
//            unitY:30,
        };

        var AXIS_OPTIONS_Y = {
            highlight:false,
            ticks: {
                highlight:false,
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 1,
                minorHeight: 1,
                opacity: 0.1,
                label: {
                    highlight:false,
                    offset: [-18, 5]
                }
            }
        };
        var AXIS_OPTIONS_X = {
            highlight:false,
            ticks: {
                highlight:false,
                drawZero: true,
                opacity: 0.1,
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 1,
                minorHeight: 1,
                label:{
                    highlight:false
                }
            }
        };
        var AXIS_ARR_Y = [
            [0, 0],
            [0, 1]
        ];
        var AXIS_ARR_X = [
            [0, 0],
            [1, 0]
        ];

        var FUNC1_OPTIONS = {
            highlight:false,
            strokeColor: 'skyblue',
            strokewidth: 2
        };

        var LINE_OPTIONS = {
            strokewidth: 3,
            highlightStrokeWidth: 3,
            strokeColor:'darkblue',
            snapToGrid: true,
            snapSizeY:0.1,
            point1:{
                snapToGrid: true,
                snapSizeY:0.1,
                snapSizeX:0.1
            },
            point2:{
                snapToGrid:true,
                snapSizeY:0.1,
                snapSizeX:0.1
            }
        };

        var self = this;

        var getDifferenceXY = function (x, y) {
            return x - y;
        };
        var getXLine = function (line) {
            return line.point1.coords.usrCoords[1].toFixed(2);
        };
        var getYLine = function (line) {
            return line.point1.coords.usrCoords[2].toFixed(2);
        };

        self.board = JXG.JSXGraph.initBoard(JSXbox, BOARD_OPTIONS);
        self.board.create('axis', AXIS_ARR_X, AXIS_OPTIONS_X);
        self.board.create('axis', AXIS_ARR_Y, AXIS_OPTIONS_Y);

        var func1 = self.board.create('functiongraph', [
                function (x) {
                    return x * x * x - 3 * x;
                },
                -10, 10],
            FUNC1_OPTIONS
        );

        var line = self.board.create('line', [
            [0, 0],
            [1, 1]
        ], LINE_OPTIONS);

        var currentAnswer = 0;
        checkAnswer = function () {
            var answer = {
                min: 3.00,
                max: 3.15
            };

            currentAnswer = Math.abs(currentAnswer);
            if((currentAnswer <= answer.max)&&(currentAnswer >= answer.min))
                {
                console.log('answer - true');
            }else{
                console.log('answer - false');
            }
        };

        line.on('mouseup', function () {
            var x = getXLine(line);
            var y = getYLine(line);

            currentAnswer = getDifferenceXY(x, y);
            console.log(currentAnswer);
        });




        var buttons = document.querySelectorAll('button:not(.close)');
        for (var i = 0; i < buttons.length; i++) {
            console.log(buttons[i]);
            buttons[i].addEventListener('click', checkAnswer);
        }

    };

    var graph = new Graph();

}
