/**
 * Created by MBakalov on 28.07.2015.
 */
window.onload = init();

function init() {
    var JSXbox = "G2Dbox-task-3";

    var Graph = function () {
        var BOARD_OPTIONS = {
            boundingbox: [-5, 5, 5, -5],
            showCopyright: false,
            showNavigation: false
        };

        var AXIS_OPTIONS_Y = {
            highlight:false,
            ticks: {
                highlight:false,
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 1,
                minorHeight:1,
                opacity:0.1,
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
                drawZero:true,
                opacity:0.1,
                drawLabels: true,
                insertTicks: false,
                ticksDistance: 1,
                minorHeight:1,
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

        var SLIDER_OPTIONS = {
            label:{
                highlight:false
            },
            snapwidth: 1,
            name: 'R'
        };

        var FUNC1_OPTIONS = {
            highlight:false,
            strokeColor:'skyblue',
            strokewidth:3
        };

        var FUNC2_OPTIONS = {
            highlight:false,
            strokeColor:'darkblue',
            strokewidth:3
        };

        var INTERSECTION_OPTIONS = {
            highlight:false,
            withLabel:false,
            fillColor:'skyblue',
            strokeColor:'black',
            size:5,
            strokeWidth:1
        };

        var self = this;

        checkAnswer = function () {
            var ANSWER = 16;
            if (rSlider.Value() == ANSWER){
                console.log("answer - true");
            }else{
                console.log("answer - false");
            }

            console.log(funct1a);
        };



        self.board = JXG.JSXGraph.initBoard(JSXbox, BOARD_OPTIONS);
        self.board.create('axis',AXIS_ARR_X,AXIS_OPTIONS_X);
        self.board.create('axis',AXIS_ARR_Y,AXIS_OPTIONS_Y);



        var rSlider = self.board.create('slider', [
            [0.5, -4],
            [3.5, -4],
            [1, 1, 60]
        ], SLIDER_OPTIONS);


        var funct2a = self.board.create('functiongraph',
            [function (x) {
                return Math.sqrt(2 / 7) * Math.sqrt(x * x + 14);
//                return Math.sqrt((28+2*x*x)/7);
            }, -10, 10],FUNC2_OPTIONS
        );
        var funct2b = self.board.create('functiongraph',
            [function (x) {
                return -Math.sqrt(2 / 7) * Math.sqrt(x * x + 14);
//                return Math.sqrt((28+2*x*x)/7);
            }, -10, 10],FUNC2_OPTIONS
        );

        var funct1a = self.board.create('functiongraph', [
                function (x) {
                    return ((1 / 2) * Math.sqrt(rSlider.Value() - 3 * x * x));
                },-4.5,4.5],FUNC1_OPTIONS
        );
        var funct1b = self.board.create('functiongraph', [
                function (x) {
                    return -((1 / 2) * Math.sqrt(rSlider.Value() - 3 * x * x));
                },-4.5,4.5],FUNC1_OPTIONS
        );

        rSlider.on('drag', function(){
            self.board.update();
        });


        self.board.create('intersection',[funct1a, funct2a, 0],INTERSECTION_OPTIONS);
        self.board.create('intersection',[funct1a, funct2a, 1],INTERSECTION_OPTIONS);
        self.board.create('intersection',[funct1b, funct2b, 0],INTERSECTION_OPTIONS);
        self.board.create('intersection',[funct1b, funct2b, 1],INTERSECTION_OPTIONS);


        var buttons = document.querySelectorAll('button:not(.close)');
        for(var i = 0; i < buttons.length;i++ ){
            console.log(buttons[i]);
            buttons[i].addEventListener('click',checkAnswer);
        }

    };

    var graph = new Graph();

}
