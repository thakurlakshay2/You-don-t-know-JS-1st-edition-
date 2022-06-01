// Call-site
//see in debugger , ctrl+p in console in Browser
function baz(){
    //call-stack only has 'baz'
    console.log('baz');
    bar();  //<- call site for 'bar'      
}


function bar(){
    //call-stack = baz -> bar 
    //call-site for bar is baz;
    console.log('bar');
    foo();  //<- call site for 'foo'  
}

function foo(){
    //call-stack = baz -> bar -> foo
    //call-site for foo is bar;
    console.log('foo');
}

baz();  //<- call site for 'baz'  

console.log('----------------------------------------------------------------------------------');
//Nothing But rules

    //1. Default Binding

function foo1(){
    console.log(this.a);  //searches global object for the property of this
}

var a =2; // var is in global scope  , it becomes global object property ,
//NOTE: if we use 'let' instead of 'var' , then a will not become global object proerty and answer of 'this.a' will be undefined (let and const are block scoped)
foo1();  //2   // this function is un-decorated  hence default binding, meaning global Object given to 'this'
//or in 'strict mode' undefined is given (strict mode of call-site is irrelevant , it is dependent oin content of called function)

    //2. Implicit Binding

function implicitBinding(){
    console.log(this.implicit);
}
var implicitBindingObj={
    implicit:'This has implicit binding',
    implicitBinding,
    implicitBindingObj2  //undefined
};
implicitBindingObj.implicitBinding(); // 'This has implicit binding'  // using the object to reference the function hence , this points to obj

var implicitBindingObj2={
    implicit:'here this is implicitBinding2 object',
    implicitBinding,
    implicitBindingObj
}
//Only the top/last level of an object property reference chain matters to the call-site.
implicitBindingObj2.implicitBindingObj.implicitBinding(); // answer still same, now this is 
implicitBindingObj2.implicitBinding(); //          -- 'this' will reference to the 2nd object

//implicity lost

function losingImplicity() {
	console.log( this.a );
}

function doFoo(fn) {
	// `fn` is just another reference to `foo`

	fn(); // <-- call-site!
}

var obj = {
	a: 2,
	losingImplicity
};

var a = "oops, global"; // `a` also property on global object

doFoo( obj.losingImplicity ); 
 
//or

var bar=obj.losingImplicity;
bar(); // "oops, global";

//when we gave out function as an agrument(show functions are first class citizens) it lost it's implicity and took global as value of 'this'

// in second exapmple  bar is basically referncing to the function , even thought it is written as Object.function .. 

//what about callBack , does the implicit binding work there? Ans- same outcome , NO

// setTimeout(obj.losingImplicity,0); //lost 

    //3.Explicit Binding          (highest priority , overrides all binding )

// what if you want to force a function call to use a particular object for the this binding,
// without putting a property function reference on the object?

//explicit binding using //.bind   //.apply //.call  (provided to us by the JS environment)


function explicitBinding(){
    console.log(this.explicit);
}

const explicitObj={
    explicit:'this is explicit binding'
}

explicitBinding.call(explicitObj);  //'this is explicit binding' -explicit binding 


//problem - explicit binding still doesn't offer us any solution to the issue of losing this binding

    //4. Hard Binding   (variation of explicit binding) (solving the above problem)
   
function hardBinding(){
    console.log(this.hardExplicit)
}

var hardBindingObj={
    hardExplicit:'this is hard binding'
}

//it doesnt matter if you call this function as a callBack , the explicit binding inside will still remain
var callFun= function(){
    hardBinding.call(hardBindingObj);  
}
 
callFun();

//using .bind()    --returns a function bound with given Object  by default

const boundFunction = hardBinding.bind(hardBindingObj);

boundFunction();

//Q- What abou8t api calls , what happens there?

//4. 'new' Binding

//4 things happen when we write new
// When a function is invoked with new in front of it, otherwise known as a constructor call, the following things are done automatically:
    // a brand new object is created (aka, constructed) out of thin air
    // the newly constructed object is [[Prototype]]-linked
    // the newly constructed object is set as the this binding for that function call
    // unless the function returns its own alternate object, the new-invoked function call will automatically return the newly constructed object.

console.log('-------------------------------------------------------------------------------------------------------');

//Everything in Order
    //Priority of Binding
    // default binding << implicit Binding << Explicit Binding << new Binding

function bindingOrder(){
    console.log(this.bindingOrder);
}

var implicitObjBind={
    bindingOrder:'implicit order has higher priority',
    bindingOrder
}

var explicitObjBinding={
    bindingOrder:'explicit order has higher priority'
}

implicitObjBind.bindingOrder.call(explicitObjBinding);

// Determining this
// Now, we can summarize the rules for determining this from a function call's call-site, in their order of precedence. 
// Ask these questions in this order, and stop when the first rule applies.

// Is the function called with new (new binding)? If so, this is the newly constructed object.
    // var bar = new foo()

// Is the function called with call or apply (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.
    // var bar = foo.call( obj2 )

// Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.
    // var bar = obj1.foo()

// Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise pick the global object.
    // var bar = foo()

console.log('-------------------------------------------------------------------------------------------------------');


//Binding Exceptions

//Ignored this

function ignore(){
    console.log(this.message);

}
const ignoreObject={
    message:'I am ignored'
}

ignoreObject.call(null);
