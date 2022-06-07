//Arrays
//in JS array is just a container that can contain any type , including Object or another array or a function

var arr=[1,"2",{val:3},[3],function four(){}];
console.log(arr.length);

//no need to presize the array like in Java , just keep adding things
//leaving an empty slot can lead to problems
var empty=[];
empty[0]=0;
empty[2]=2;
//slot 1 is left empty
console.log(empty[1]) //undefined , basivally slot doesn't exist , it's not like slot 1 has value "undefined"


//Arrays are numerically indexed , but we can also have string keys/property defined, but it woul not count towards length of the array
var truelength=[]
truelength["football"]="kick it";
truelength[0]=0;
console.log(truelength);
console.log(truelength.length);   //1


//if the string property you  addedcan be coerced to a standard base 10 number, then it is assumed that is what you wanted

truelength["13"]=42;
console.log(truelength.length); //14

//convert array like values to array 
// concat , indexOf  and forEach


console.log('------------------------------------------------------------------------------------------------');

//strings
//in js string is not like an array of characters

//both have concat() , indexOf(), and length property

//JS string are immutable while the array are quite mutable.
//all modification requite create and return of new String, by contrast array modify in place

//reverse the string using reverse()


//a lot of hasstle is saved if you convert string to array

console.log('------------------------------------------------------------------------------------------------');

//Numbers
var a=42;
var b=0.42;
var c=42.0;

//numbers outputter to base deciamal 10 with trailing zeroes
var d=5E10;
// Very large or very small numbers will by default be outputted in exponent form, the same as the output of the toExponential() method, like:
console.log(d.toExponential());


//repersentation of a very large number
var onethousand= 1E3;
var onemilliononehunderedthousand=1.1E6;

0xf3  // Hexadeciaml for 243
0363 //octal for 243
//read the document


console.log('------------------------------------------------------------------------------------------------');
//Special values

//the non-value values
    //null- is an empty value
    //undefined - is a missing value
        //or
    //undefined - hasn't had a value
    //null - had a value and doesn't anymore

//undefined , 
function foo(){
    undefined=2;       // in normal mode , it shows no error, but in "strict mode" it is TypeError
    console.log('12');
}
foo();
//obviously we can have a named variable "undefined"  which can have any value 


//Special Numbers

var aa= 2/"foo";      //NaN          literally means not a number

console.log(typeof a);       // true
// NaN is a kind of "sentinel value" (an otherwise normal value that's assigned a special meaning) 
// that represents a special kind of error condition within the number set.

//cannnot directly compare NaN itself like we can do with undefined or null
console.log(aa=== NaN);  //false
console.log(aa== NaN); //false

// Q- how do we compare then?
//ans use a function isNaN();

console.log(isNaN(aa));  //true

//flaws of isNaN() ,  It appears it tried to take the meaning of NaN ("Not a Number") too literally -- 
//that its job is basically: "test if the thing passed in is either not a number or is a number." But that's not quite accurate.

var ab="foo";
console.log(isNaN(ab));       ///true

    //infinity
var ac=-1/0;
console.log(ac);

// negative zero -0

console.log(0/-3);

console.log('------------------------------------------------------------------------------------------------');

//Value vs Reference

//in js there is no syntax hinting towards value or reference

var main=2;
var copyVar=main;   // copyVar is a value copy of main
//how to find out
copyVar++;
console.log(copyVar); //3


var arr=[1,2,3,4];
var copyArr=arr;  //here copyArr is just a reference to the actual array
console.log(copyArr);
copyArr.push(5);
console.log("copy "+copyArr);
console.log("main "+arr);

var newArr=arr;
newArr=[5,6,7,8]; //here we are not changing the 'arr' we are just assigning a new value to newArr (so the arr is not going to change its value)


//same logic when passing array as a argument, until you assign a new value to the parameter it will make the change in old array
//until you assign a new value using '='

function changearr(x){
    x.push(6);       //change to the main array
    console.log(x); 

    x=[6,7,8,9];
    x.push(10);      //change only to x bcz at re-initialization you lost the reference to the old array
    console.log(x);
}

changearr(arr);
console.log("outside function "+ arr); // 1,2,3,4,5,6