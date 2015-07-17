/**
 * Created by MBakalov on 17.07.2015.
 */
window.onload=drawAll;


//drawing star on canvas
function drawStar(ctx,cx,cy,spikes,outerRadius,innerRadius){
    var rot=Math.PI/2*3;
    var x=cx;
    var y=cy;
    var step=Math.PI/spikes;

    ctx.strokeSyle="#000";
    ctx.beginPath();
    ctx.moveTo(cx,cy-outerRadius)
    for(i=0;i<spikes;i++){
        x=cx+Math.cos(rot)*outerRadius;
        y=cy+Math.sin(rot)*outerRadius;
        ctx.lineTo(x,y)
        rot+=step

        x=cx+Math.cos(rot)*innerRadius;
        y=cy+Math.sin(rot)*innerRadius;
        ctx.lineTo(x,y)
        rot+=step
    }
    ctx.lineTo(cx,cy-outerRadius)
    ctx.stroke();
    ctx.closePath();
}

//drawing circle on canvas
function drawCircle(ctx,cx,cy,radius){

    //begin
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, 2 * Math.PI, false);
    ctx.lineWidth = 2;
    ctx.strokeStyle = '#003300';
    ctx.stroke();
    //end
}

//drawing all star and circle on canvas
function drawAll(){
    var  canvas=document.getElementById("my-canvas");;
    var  ctx=canvas.getContext("2d");;
    drawCircle(ctx,200,200,200);
    drawStar(ctx,200,200,7,200,100);
}


