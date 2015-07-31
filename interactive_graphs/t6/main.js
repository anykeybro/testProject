/**
 * Created by MBakalov on 28.07.2015.
 */
window.onload = init();

function init() {
    var JSXbox = "G2Dbox-task-3";

    var Graph = function () {
        var BOARD_OPTIONS = {
            boundingbox: [8.5, 0.3, 22.5, -0.05],
            showCopyright: false,
            showNavigation: false
        };

        var AXIS_OPTIONS_Y = {
            straightFirst: false,
            straightLast: false,
            ticks: {
                drawLabels: true,
                majorHeight: 805,
                label: {
                    offset: [-25, 5],
                    highlight: false
                }
            },
            highlight: false
        };
        var AXIS_OPTIONS_X = {
            straightFirst: false,
            straightLast: false,
            ticks: {
                majorHeight: 505,
                tickEndings: [0, -1],
                opacity: 0.2,
                label: {
                    highlight: false
                }
            },
            highlight: false
        };
        var AXIS_ARR_Y = [
            [10, -0.02],
            [10, 0.3]
        ];
        var AXIS_ARR_X = [
            [9.5, 0],
            [22, 0]
        ];

        var FUNC1_OPTIONS = {
            strokeColor: 'darkblue',
            strokewidth: 3,
            highlight: false
        };

        var BACKLINE_OPTIONS = {
            strokeColor: '#999',
            strokeWidth: 3,
            fixed: true,
            highlightColor: '#999',
            highlightStrokeWidth: 3,
            opacity: 0.4,
            highlightOpacity: 0.4,
            highlight: false
        };

        var DASHED_LINE_OPTIONS = {
            snapToGrid: true,
            snapSizeX: 0.2,
            opacity: 0.9,
            strokeColor: 'red',
            dash: 2,
            highlight: false,
            point1: {
                snapToGrid: true,
                snapSizeX: 0.25
            },
            point2: {
                snapToGrid: true,
                snapSizeX: 0.25
            },
            strokeWidth: 2
        };

        var POINT_OPTIONS = {
            name: '',
            opacity: 0,
            showInfobox: false,
            snapToGrid: true,
            snapSizeX:0.25


        };

        var DRAG_POLYGON_OPTIONS= {
            hasInnerPoints: true,
            opacity:0,
            strokeOpacity:0,
            withLines:false,
            highlight:false

        };

        var RIEMANN_OPTIONS = {
            fillOpacity: 0.5,
            fillColor: 'lime',
            strokeopacity: 0,
            highlightStrokeWidth: 0,
            highlightOpacity: 0,
            withLines: true,
            highlight: false
        };

        var RIEMANN2_OPTIONS = {
            fillOpacity: 0,
            fillColor: '#fff',
            strokeopacity: 1,
            strokeColor: '#444',
            highlightStrokeWidth: 2,
            dash: 2,
            highlightOpacity: 0,
            withLines: true,
            highlight: false
        };

        var TEXT_OPTIONS = {
            fontSize: 14,
            fixed: true,
            anchorX: 'left',
            cssClass: 'mytext',
            highlight: false
        };

        var self = this;


        self.board = JXG.JSXGraph.initBoard(JSXbox, BOARD_OPTIONS);
        var xAxis = self.board.create('axis', AXIS_ARR_X, AXIS_OPTIONS_X);
        var yAxis = self.board.create('axis', AXIS_ARR_Y, AXIS_OPTIONS_Y);
        console.log(yAxis);

        JXG.Options.layer['line'] = 7;
        JXG.Options.layer['polygon'] = 5;

        var q = 2;
        var m = 16;
        var f = function (x) {
            var a = 1 / (q * Math.sqrt(2 * Math.PI)) * Math.exp(-((Math.pow(x - m, 2)) / (2 * Math.pow(q, 2))));
            return  a;
        };

        var backFunc = self.board.create('functiongraph', [f], FUNC1_OPTIONS);

        var dashLine1 = self.board.create('line', [[14,-1],[14,1]], DASHED_LINE_OPTIONS);
        var dashLine2 = self.board.create('line', [[17,-1],[17,1]], DASHED_LINE_OPTIONS);

//        var p1 = [];
//        p1.push(self.board.create('point',[14,-1],POINT_OPTIONS));
//        p1.push(self.board.create('point',[14,1],POINT_OPTIONS));
//        p1.push(self.board.create('point',[15,1],POINT_OPTIONS));
//        p1.push(self.board.create('point',[15,-1],POINT_OPTIONS));
//
//        var p2 = [];
//        p2.push(self.board.create('point',[17,-1],POINT_OPTIONS));
//        p2.push(self.board.create('point',[17,1],POINT_OPTIONS));
//        p2.push(self.board.create('point',[18,1],POINT_OPTIONS));
//        p2.push(self.board.create('point',[18,-1],POINT_OPTIONS));
//
//        var pGroup1 = self.board.create('group',p1);
//        var pGroup2 = self.board.create('group',p2);
//
//
//        var dashLine1 = self.board.create('line', [
//            [function(){return p1[0].X()+0.5},
//                function(){return p1[0].Y()}],
//            [function(){return p1[1].X()+0.5},
//                function(){return p1[1].Y()}]
//        ], DASHED_LINE_OPTIONS);
//
//
//
//        var dashLine2 = self.board.create('line', [
//            [function(){return p2[0].X()+0.5},
//                function(){return p2[0].Y()}],
//            [function(){return p2[1].X()+0.5},
//                function(){return p2[1].Y()}]
//        ], DASHED_LINE_OPTIONS);
//
//        var dragPoly1 = self.board.create('polygon',p1,DRAG_POLYGON_OPTIONS);
//        var dragPoly2 = self.board.create('polygon',p2,DRAG_POLYGON_OPTIONS);
//



        var x1Text = self.board.create('text', [function () {
            return dashLine1.point1.X() + 0.2
        }, 0.23, function () {
            return 'x_1 = ' + dashLine1.point1.X().toFixed(2)
        }], TEXT_OPTIONS);

        var x2Text = self.board.create('text', [function () {
            return dashLine2.point1.X() + 0.2
        }, 0.217, function () {
            return 'x_2 = ' + dashLine2.point1.X().toFixed(2)
        }], TEXT_OPTIONS);

        var riemann = self.board.create('riemannsum',
            [f, 24, 'trapezoidal', function () {
                return dashLine1.point1.X();
            }, function () {
                return dashLine2.point1.X();
            }], RIEMANN_OPTIONS
        );
        var riemannGrid = self.board.create('riemannsum',
            [f, 8, 'trapezoidal', 12, 20], RIEMANN2_OPTIONS
        );

        var sumText = self.board.create('text', [19.5, 0.27, function () {
            return 'Sum = ' + Math.abs(riemann.Value().toFixed(4));
        }], TEXT_OPTIONS);

        checkAnswer = function () {
            var answer = {
                min: 2.0,
                max: 2.0
            };
            var input = document.getElementsByClassName('answer-input-q1');
            var userAnswer = parseFloat(input[0].value);

            if ((userAnswer >= answer.min) && (userAnswer <= answer.max)) {
                console.log('answer true');
            } else {
                console.log('answer false');
            }

        };
        var buttons = document.querySelectorAll('button:not(.close)');
        for (var i = 0; i < buttons.length; i++) {
            console.log(buttons[i]);
            buttons[i].addEventListener('click', checkAnswer);
        }

    };

    var graph = new Graph();

}
