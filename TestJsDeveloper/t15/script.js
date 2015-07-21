/**
 * Created by MBakalov on 20.07.2015.
 */
window.onload=gen;

var count =100;


function gen(){
var mainContainer = document.getElementById("main-container");

    for(var i=0;i<count;i++){
        var d = document.createElement("div");
        d.id="content"+i;
        d.className="block";
        d.addEventListener("click", getName);
        mainContainer.appendChild(d);
    }
}

function getName(){

    var id = this.id;
    id = id.replace("content","");
    console.log(id);

}

