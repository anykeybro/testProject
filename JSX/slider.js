/**
 * Created by MBakalov on 22.07.2015.
 */


var sliderElem = document.getElementById('slider');
var thumbElem = sliderElem.children[0];

/**
 * slider moving
 */
thumbElem.onmousedown = function (e) {
    var shiftX = e.pageX - getCoords(thumbElem).left;
    var sliderCoords = getCoords(sliderElem);
    var thumbStartPosition = e.pageX - shiftX - sliderCoords.left;
    var originStartPosition = board.origin.scrCoords[1];

    document.onmousemove = function (e) {
        var newLeft = e.pageX - shiftX - sliderCoords.left;
        if (newLeft < 0) {
            newLeft = 0;
        }
        var rightEdge = sliderElem.offsetWidth - thumbElem.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }

        //set position slider (thumb)
        thumbElem.style.left = newLeft + 'px';

        //set origin coordinates;
        var shiftXBoundBox = newLeft - thumbStartPosition + originStartPosition;
        board.origin.scrCoords[1] = shiftXBoundBox;
        board.moveOrigin();
    };

    document.onmouseup = function () {
        document.onmousemove = document.onmouseup = null;
    };
    return false; // disable selection start (cursor change)
};

thumbElem.ondragstart = function () {
    return false;
};

/**
 * get coordinates for the begin of the slider.
 * @param elem
 * @returns {{top: number, left: number}}
 */
function getCoords(elem) {
    var box = elem.getBoundingClientRect();
    return {
        top: box.top + pageYOffset,
        left: box.left + pageXOffset
    };

}



