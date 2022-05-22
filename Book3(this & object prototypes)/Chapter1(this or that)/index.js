
// WHY THIS?

function identify(){
    return this.name.toUpperCase();
}

function speak(){
    let greeting = "Hello, I'm " + identify.call(this);
    console.log(greeting);
}

let me={
    name:'lakshay'
};

let you={
    name:'The one reading'
}
// .call , like .bind  and .apply uses explicit binding to bind the function with our given 'this', 
//which in this case is Object 'me' and 'you'.
identify.call(me);
identify.call(you);

speak.call(me);
speak.call(you);

speak();  //because i have not used "use strict which is given in the ES6" this === global object  (in use strict this === undefined)
//answer to above is ==== 'Hello I'm ' (no name)

console.log('------------------------------------------------------------------------------------------');
//'this' does not refer to the function itself.

function foo(num){
    console.log('foo:'+ num);
    this.count++;
}

foo.count=0;
let i=0;
for( i=0;i<3;i++){
    foo(i);
}

console.log(foo.count);  // coming out 0 - wtf? why?
//Ans- Problem is out literal intrepretation of the word 'this' , this is not referring to 'foo' object.

console.log(this.count); //NaN
//Q- What is 'this' referring to then?
//A- Global object - windows  (we accidentally  created the global varaible count) (why did it have Nan  value - see chapter 2);

//Easy solution is make an object to hold the property count; but doesn't solve our problem
const data={
    count:0
}

function foo1(num){
    console.log('foo:'+ num);
    data.count++;
}
foo1(1);
console.log(data.count);

//to use foo, just replace the word 'this' with foo, make sure the foo is referencing itself when calling count
//or when calling just use foo.call(foo,i);


console.log('------------------------------------------------------------------------------------------');
//It's scope


//'this' does not refer to the function's scope
//the scope "object" is not accessible to JavaScript code. It's an inner part of the Engine's implementation.

function thisNotScope(){
     let a=2;
     this.bar();
}

function bar(){
    console.log(this.a);
}

foo(); // undefined

//no bridging of scopes for 2 function will happen here


//NOTE - 'this' is runtime binding not author-time binding, it is decided on runtime (execution time)
//When a function is invoked, an activation record, otherwise known as an execution context, is created. 
//This record contains information about where the function was called from (the call-stack), how the function was 
//invoked, what parameters were passed, etc.
// One of the properties of this record is the this reference which will be used for the duration of that function's execution.