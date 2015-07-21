/**
 * Created by MBakalov on 20.07.2015.
 */

var arr = ["111","222","333"];

console.log("array map");
arr.map(single);


console.log("my map");
myMap(arr,single);


function myMap(array, callback){
    array.forEach(callback);
}

function single(elem,elem2)
{
    console.log(elem,elem2);
}



