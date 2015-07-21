/**
 * Created by MBakalov on 20.07.2015.
 */


var factorial={
    hash:[],


    /**
     * hash factorial
     * @type {{hash: Array, fact: fact}}
     */
    hashFact:function(n) {
        var f=1;
        if (this.hash[n] > 0) {
            console.log("read - "+n);
            return this.hash[n];
        } else {
            for(var i=1; i<=n; i++){
                f=f*i;
                if(this.hash!=null){
                    this.hash[i]=f;
                    console.log("write - "+f);
                }
            }
        }

        return f;
    },

    /**
     * classic factorial
     * @param n
     * @returns {number}
     */
    fact:function(n){
        var f=1;
        for(var i=1;i<=n;i++){
            f=f*i;
        }
        return f;
    }
};







console.log("fact() = "+factorial.fact(4));

console.log("hashFact() = "+ factorial.hashFact(4));
console.log("hashFact() = "+ factorial.hashFact(4));
console.log("hashFact() = "+ factorial.hashFact(3));