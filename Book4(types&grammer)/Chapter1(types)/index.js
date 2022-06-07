//Build-in-types

console.log(typeof undefined);        //undefined
console.log(typeof true);           // boolean
console.log(typeof 42);             //number
console.log(typeof "42");           //String
console.log(typeof {life:42});      //Object

//new in ES6
console.log(typeof Symbol());       // symbol

//typeof  is buggy when it comes to null
console.log(typeof null);       //Object

//function is basically a callable object
function a(b,c){

}
console.log(a.length);    //2          (number of parameter it has)

//arry is just objects where the values are just numerically indexed and to acces number property we use 'object_name[]'
console.log(typeof [1,2,3]);    //Object

console.log('-------------------------------------------------------------------------------------------------------');

    //Values as Types

//In JavaScript, variables don't have types -- values have types. Variables can hold any value, at any time.

//we can coerce a value to change it's type from one to another, variable can hold any type
// process is called coersion
var a=42;
console.log(typeof a);  //number
a=true;
console.log(typeof a); //boolean

//typeof operator always runs a string

console.log(typeof typeof 42);   //string


//undefined vs undeclared

var a1; 
//var when declared , goes in the environment variable of its, execution context with value 'undefined'

console.log(typeof a1); //undefined
console.log( b);   //undeclared - referenceError: b is not defined