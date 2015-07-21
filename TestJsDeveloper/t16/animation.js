/**
 * Created by MBakalov on 21.07.2015.
 */
window.onload=moving();

function moving(){
    var elem = document.getElementById("content2");
    var timer = 5; // 5 seconds
    var originX=200;
    var originY=200;
    var radius = 50;

    var angle = 1; // angle rotation
    var rad=(angle/(180/Math.PI))/timer;
    var speed=1000/(360/angle);
    var currentAngle=0;

    setInterval(function(){
        currentAngle+=rad;
        elem.style.left = originX + radius * Math.sin(currentAngle)  + 'px';
        elem.style.top =  originY + radius * Math.cos(currentAngle)  + 'px';
        console.log(currentAngle);
    },speed);

}