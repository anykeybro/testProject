/**
 * Player main proto definition
 * @param node
 * @constructor
 */
var Player;
Player = function (node) {
    //this = {}
    this._node = node;
    this.playButton = document.querySelector('.play-pause');
    this.playButton.addEventListener('click', this.playPause.bind(node));

    this.rewindBackwardButton = document.querySelector('.rewind-backward');
    this.rewindBackwardButton.addEventListener('click', this.rewindBackward.bind(node));

    this.rewindForwardButton = document.querySelector('.rewind-forward');
    this.rewindForwardButton.addEventListener('click', this.rewindForward.bind(node));

};

/**
 * play or pause video
 */
Player.prototype.playPause = function (nodeBtnPlay) {
    var btn = nodeBtnPlay.target;
    if (this.paused) {
        this.play();
        console.log('played');
        btn.style.backgroundImage = "url('images/pause.png')";

    } else {
        this.pause();
        console.log('pause');
        btn.style.backgroundImage = "url('images/play.png')";
    }
    console.log(btn.style.background);
};

/**
 * rewind backward
 */
Player.prototype.rewindBackward = function () {
    this.currentTime -= 3;
};

/**
 * rewind forward
 */
Player.prototype.rewindForward = function () {
    this.currentTime += 3;
};


videoNode = document.querySelector('#video');
var myPlayer = new Player(videoNode);






