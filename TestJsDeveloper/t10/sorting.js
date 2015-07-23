/**
 * Created by MBakalov on 20.07.2015.
 */



function sort(arr) {
    var tmp;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] > arr[i + 1]) {
            tmp = arr[i];
            arr[i] = arr[i + 1];
            arr[i + 1] = tmp;
            i = -1;
        }
    }

    return arr;
}

function bubbleSort(arr) {
    var tmp;
    for (var j = 0; j < arr.length; j++) {
        for (var i = 0; i < arr.length - j - 1; i++) {
            if (arr[i] > arr[i + 1]) {
                tmp = arr[i];
                arr[i] = arr[i + 1];
                arr[i + 1] = tmp;
            }
        }
    }

    return arr;
}
function bubbleSort2(arr) {
    var tmp;
    for (var j = 0; j < arr.length; j++) {
        for (var i = j + 1; i < arr.length ; i++) {
            if (arr[ j ] > arr[ i ]) {
                tmp = arr[ j ];
                arr[ j]  = arr[ i ];
                arr[ i ] = tmp;
            }
        }
    }

    return arr;
}

function selectionSort( arr ){
    var min;
    var temp;
    for (var i = 0; i < arr.length - 1; i++) {
        min = i;
        for (var j = i + 1; j < arr.length; j++) {
            if ( arr[ j ] < arr[ min ] ) {
                min = j;
            }
        }

        if (min != i) {
            temp = arr[i];
            arr[i] = arr[min];
            arr[min] = temp;
        }
    }

    return arr;
}

function merge(left, right){
    var result = [];
    while ((left.length > 0) && (right.length > 0)){
        if (left[0] < right[0]){
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    return result.concat(left).concat(right);
}

function sortMerge(items){
    if(items.length<=1) return items;
    var middle = Math.floor(items.length / 2);
    var left    = items.slice(0, middle);
    var right   = items.slice(middle);
    return merge(sortMerge(left), sortMerge(right));
}




var numbers = [5, 8, 0, 4, 6, -2, 7, 1];


//console.log(sort(numbers));          //count=16  tick=66
//console.log(bubbleSort(numbers));    //count=16   tick=32;
//console.log(selectionSort(numbers)); //count = 4 tick=35;
console.log(sortMerge(numbers));
