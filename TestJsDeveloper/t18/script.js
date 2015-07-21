var a = 5;
var thisObj = { a: 10 };

function sum(n) {
    console.log( this.sum + n );
}

function bind( myFunct, thisObj, arg ) {
    myFunct.apply( thisObj, [ arg ] );
}

var pBind = function( func, obj, arg ) {
   var tempObj = {};
   for ( var key in obj ) {
       tempObj[ key ] = obj[ key ];
   }

   var ID = (function() { return +( new Date() ) + "-" + (~~(Math.random() * 100)).toString( 16 ) })();
   tempObj[ ID ] = func;
   tempObj[ ID ]( arg );
    return tempObj[ID]();
};

bind(sum, thisObj, 5 );