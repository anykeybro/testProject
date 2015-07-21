/**
 * Created by MBakalov on 20.07.2015.
 */


//true
console.log(checkEmail("23@mail.com"));
console.log(checkEmail("asd.asd@mail.ru"));
console.log(checkEmail("asd-asd@mail.ru"));
console.log(checkEmail("DDD.123@ma2il.com"));
console.log(checkEmail("DDD-123@ma2il.com.com"));

//false
console.log(checkEmail("asd@mail@ru"));
console.log(checkEmail("asd@ma il.ru"));
console.log(checkEmail("mail.ru"));
console.log(checkEmail("asd@mail...ru"));
console.log(checkEmail("asd..asd@mail.ru"));


function checkEmail(email){
    var re = /^[\w.-]+@[\w-]+\.[\w-]+[\.\w]+$/i;
    return re.test(email);
}

//"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$"
//\S\w+@\w+.\w+.\w+
//[\w.-]+@[\w-]+\.\w+[^.]/