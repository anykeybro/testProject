/**
 * Created by MBakalov on 28.07.2015.
 */
window.onload = init();

function init() {
    var JSXbox = "G2Dbox-task-3";

    var Graph = function () {
        var BOARD_OPTIONS = {
            boundingbox: [-5, 1.5, 5, -0.2],
            showCopyright: false,
            showNavigation: false
//            originX:250,
//            originY:170,
//            unitX:30,
//            unitY:30,
        };

        var AXIS_OPTIONS_Y = {
            ticks: {
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 0.5,
                minorHeight: 0.1,
                opacity: 0.2,
                label: {
                    highlight:false,
                    offset: [-18, 5]
                }
            },
            highlight:false
        };
        var AXIS_OPTIONS_X = {
            ticks: {
                drawZero: true,
                opacity: 0.1,
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 1,
                minorHeight: 1,
                label:{
                    highlight:false
                }
            },


            highlight:false
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
            strokeColor: 'skyblue',
            strokewidth: 3,
            highlight:false
        };

        var POINT_INVISIBLE_OPTIONS = {
            visible:false
        };

        var TEXT_OPTIONS = {
            fontSize: 12,
            fixed: true,
            highlight:false,
            anchorX: 'middle'
        };
        var TEXT_LEGEND_OPTIONS = {
            fontSize: 14,
            fixed: true,
            highlight:false,
            anchorX: 'left'
        };


        var LEGEND_ICO_OPTIONS = {
            face: '[]',
            size: 5,
            fillColor: 'skyblue',
            withLabel: false,
            strokecolor: 'skyblue',
            fixed: true,
            highlight:false,
            showInfobox:false
        };

        var TANGENT_OPTIONS = {
            dash: 2,
            strokeColor: 'darkblue',
            highlight:false
        };

        var GLIDER_OPTIONS = {
            name: '',
            style: 8,
            showInfobox:false,
            label:{
                highlight:false
            }
        };

        var POLYGON_OPTIONS = {
            highlight:false,
            borders:{
                highlight:false
            }
        };

        var self = this;

        checkAnswer = function () {
            var ANSWER = 16;
            if (rSlider.Value() == ANSWER) {
                console.log("answer - true");

            } else {
                console.log("answer - false");

            }
        };

        self.board = JXG.JSXGraph.initBoard(JSXbox, BOARD_OPTIONS);
        self.board.create('axis', AXIS_ARR_X, AXIS_OPTIONS_X);
        self.board.create('axis', AXIS_ARR_Y, AXIS_OPTIONS_Y);

        var func1 = self.board.create('functiongraph', [
                function (x) {
                    return 1 / (1 + x * x);
                },
                -10, 10],
            FUNC1_OPTIONS
        );
        var glider = self.board.create('glider', [0, 1, func1],GLIDER_OPTIONS);
        var tangent = self.board.create('tangent', [glider], TANGENT_OPTIONS);
        var p2 = self.board.create('point', [function() { return glider.X()+1;}, function() {return glider.Y()+JXG.Math.Numerics.D(func1.Y)(glider.X());}],POINT_INVISIBLE_OPTIONS);
        var p3 = self.board.create('point', [function() { return p2.X();}, function() {return glider.Y();}],POINT_INVISIBLE_OPTIONS);
        var pol = self.board.create('polygon', [glider,p2,p3], POLYGON_OPTIONS);

        var xTerm = 'y = 1/(1+x^2)';
        self.board.create('text', [3, 1.3, xTerm], TEXT_LEGEND_OPTIONS);
        self.board.create('point', [2.7, 1.3], LEGEND_ICO_OPTIONS);


        textValueM = self.board.create('text',[function(){
            return glider.X()
        },function() {
            return glider.Y() + 0.3
        }, function(){
            currentAnswer=(p2.Y()-p3.Y()).toFixed(2);
            return 'm = '+currentAnswer;
        }],TEXT_OPTIONS);

        textValueM = self.board.create('text',[function(){
            return glider.X()
        },function() {
            return glider.Y() + 0.2
        }, function(){
            return '('+glider.X().toFixed(2)+', '+glider.Y().toFixed(2)+')';
        }],TEXT_OPTIONS);

//        glider.on('drag', function(){
//            console.log('gl');
//            if (this.X()>4) this.coords.usrCoords[1]=4;
//        });

        glider.updateConstraint = function(){
            if (this.X()>4) this.coords.usrCoords[1]=4;
        };



        var currentAnswer = 0;
        checkAnswer = function () {
            var answer = {
                min: 0.49,
                max: 0.51
            };

            currentAnswer=Math.abs(currentAnswer);
            if ((currentAnswer <= answer.max) && (currentAnswer >= answer.min)) {
                console.log('answer true');
            } else {
                console.log('answer false');
            }

        };

        glider.on('drag', function(){
            var x= glider.X().toFixed(1);
            var y=glider.Y().toFixed(1);

        });
        glider.on('mouseup', function () {

        });

        var buttons = document.querySelectorAll('button:not(.close)');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', checkAnswer);
        }

    };

    var graph = new Graph();

}
