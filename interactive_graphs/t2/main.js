/**
 * Created by MBakalov on 27.07.2015.
 */
window.onload = init();


function init() {
    var JSXbox = "G2Dbox-task-2";
    var dataArray = [];
    var Graph = function () {
        var city_names = [
            "Monterey",
            "San Luis Obispo",
            "Santa Barbara",
            "Ventura"

        ];
        var legend_colors = [
            "#0066CC",
            "#990000",
            "green",
            "darkmagenta",
            "skyblue"

        ];

        var AXIS_TEXT_Y_OPTIONS = {
            highlight:false,
            display: 'internal',
            rotate: 90,
            fontSize: 20,
            anchorX: 'middle',
            fixed:true
        };
        var LEGEND_POINT_OPTIONS = {
            showInfobox:false,
            highlight:false,
            face: '[]',
            withLabel: false,
            fixed: true
        };
        var LEGEND_LABEL_OPTIONS = {
            highlight:false,
            fontSize: 12,
            fixed: true
        };
        var LABEL_OPTIONS = {
            highlight:false,
            anchorX: 'middle',
            fontSize: 16,
            fixed: true,
            width:30


        };

        var BUTTON_BACK_OPTIONS = {
            cssClass:'button-back',
            fixed:true


        };
        var COLUMN_OPTIONS = {
            highlight:false,
            chartStyle: 'bar',
            width: 1,
            opacity: 0.9,
            colors: legend_colors,
            hasInnerPoints:true
        };
        var BOARD_OPTIONS = {
            boundingbox: [-2, 510, 21, -50],
            axis: false,
            showCopyright: false,
            showNavigation: false
        };
        var AXIS_OPTIONS_Y = {
            highlight:false,
            ticks: {
                drawLabels: true,
                majorHeight: 850,
                insertTicks: false,
                ticksDistance: 50,
                label: {
                    highlight:false,
                    offset: [-23, -5]
                }
            }
        };
        var AXIS_OPTIONS_X = {
            highlight:false,
            ticks: {
                drawLabels: false,
                minTicksDistance: 40,
                insertTick: false,
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
        var TEXT_BOARD_OPTIONS = {
            highlight:false,
            anchorX: 'middle',
            fontSize: 16,
            fixed: true,
            color: '#bbb'
        };


        var positionGroups = [
            [1, 2, 3, 4, 5],
            [7, 8, 9, 10, 11],
            [13, 14, 15, 16, 17],
            [19, 20, 21, 22, 23]
        ];
        var dataGroups = [
            [163, 139, 24, 39, 4],
            [173, 40, 5, 8, 4],
            [230, 120, 15, 25, 10],
            [440, 230, 20, 50, 10]
        ];

        var legendLabels = [
            "Caucasian",
            "Hispanic",
            "Black",
            "Asian",
            "Am. Indian"
        ];

        var ANSWER = {
            q1: {
                min: 0.3947,
                max: 0.4447
            },
            q2: {
                min: 0.2939,
                max: 0.3339
            },
            q3: {
                min: 0.0042,
                max: 0.0062
            },
            q4: {
                min: 0.2754,
                max: 0.3154
            }
        };

        var self = this;
        var polygons = [];

        showLegend = function () {
            var box = self.board.getBoundingBox();
            var padd = box[1] / 30;
            var height = 10;
            for (var i = 0; i < 5; i++) {
                var p = self.board.create('point', [box[2] - box[2] / 6 , -i * padd + box[1] / 2 + box[1] / 15], LEGEND_POINT_OPTIONS);
                p.fillColor(legend_colors[i]);
                p.strokeColor(legend_colors[i]);
                self.board.create('text', [box[2] - box[2] / 7, -i * padd + box[1] / 2 + box[1] / 15, legendLabels[i] ], LEGEND_LABEL_OPTIONS);
            }
        };

        createNewBoard = function (data) {

            self.board = JXG.JSXGraph.initBoard(JSXbox, BOARD_OPTIONS);
            self.board.setBoundingBox(data);

            if (data[1] > 300) {
                AXIS_OPTIONS_Y.ticks.ticksDistance = 50
            } else {
                AXIS_OPTIONS_Y.ticks.ticksDistance = 20;
            }

            self.board.create('axis', AXIS_ARR_Y, AXIS_OPTIONS_Y);
            self.board.create('axis', AXIS_ARR_X, AXIS_OPTIONS_X);

        };

        showAllDataGroups = function () {
            createNewBoard([-3.8, 530, 30, -50]);
            showLegend();
            showAxisLeftText();
            self.board.create('text', [10, 475, 'Click on each county to view enlarged bar<br> chart for this county'], TEXT_BOARD_OPTIONS);

            polygons = [];
            for (var i = 0; i < 4; i++) {
                var c = self.board.create('chart', [positionGroups[i], dataGroups[i]], COLUMN_OPTIONS);
                self.board.create('text', [3 + i * 6, -10, city_names[i]], LABEL_OPTIONS);
                for (var j = 0; j < 5; j++) {
                    polygons.push(c[0][j]);
//                    c[0][j].on('up',testfun);
                }
            }
            self.board.suspendUpdate();
        };

//        testfun = function(){
//            pl = this;
//            var viewType = 0;
//            var group_num;
//            polygons.forEach(function (poly, i) {
//                if(pl==poly) {
//                    group_num = Math.ceil((1 + i) / 5) - 1;
//                    viewType = 1;
//                }
//            });
//            if(viewType==1) showDataGroup(group_num);
//        };

        showLabelOnBar = function (val) {
            for (var i = 0; i < 5; i++) {
                self.board.create('text', [
                        positionGroups[0][i],
                            dataGroups[val][i] + 10,
                        dataGroups[val][i]
                    ],
                    LABEL_OPTIONS
                );

            }
        };

        getMaxValueBar = function (val) {
            var max = 0;
            dataGroups[val].forEach(function (item) {
                if (item > max) {
                    max = item;
                }
            });
            return max;
        };

        showAxisLeftText = function (val) {
            var max = 50;
            var b = self.board.getBoundingBox();
            if (val >= 0) {
                max = getMaxValueBar(val);
            } else {
                max = 500;
            }


            self.board.create('text', [b[0] / 2, max - max / 2, 'Value in thousands'], AXIS_TEXT_Y_OPTIONS);
        };

        showDataGroup = function (val) {
            var b = self.board.getBoundingBox();
            var max = getMaxValueBar(val);

            createNewBoard([-b[2] / 30, max + 20, 8, -max / 10]);
            b=self.board.getBoundingBox();
            self.board.create('chart', [positionGroups[0], dataGroups[val]], COLUMN_OPTIONS);
            self.board.create('text', [3, -7, city_names[val]], LABEL_OPTIONS);
            var btn=self.board.create('button', [7, b[1]-b[1]/15, 'back', showAllDataGroups], BUTTON_BACK_OPTIONS);
            console.log(btn);

            showAxisLeftText(val);
            showLabelOnBar(val);
            showLegend();
            self.board.suspendUpdate();
        };

        checkAnswer = function () {
            var data = this.getAttribute('data-value');
            var answer = ANSWER[data];
            var input = document.getElementsByClassName('answer-input-' + data);


            var userAnswer = parseFloat(input[0].value);
            if ((userAnswer >= answer.min) && (userAnswer <= answer.max)) {
                console.log("answer true");
            } else {
                console.log("answer false");
            }

        };

        showAllDataGroups();


        var buttons = document.querySelectorAll('button:not(.close)');

        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', checkAnswer);
        }

        self.board.on('mouseup', function (event) {
            var viewType = 0;
            var group_num;
            polygons.forEach(function (poly, i) {
                if (poly.rendNode === event.target) {
                    group_num = Math.ceil((1 + i) / 5) - 1;
                    viewType = 1;
                }
            });
            if(viewType==1) showDataGroup(group_num);
        });
    };

    var graph = new Graph();


}