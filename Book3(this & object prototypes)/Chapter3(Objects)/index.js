//Objects
//  mostly theory better to read from the book (https://github.com/getify/You-Dont-Know-JS/blob/1st-ed/this%20%26%20object%20prototypes/ch3.md)
//Objects come in 2 form , Declarative and constructive

let declarativeObj = {
    key: 'value'
}

let constructiveObj= new Object();
constructiveObj.key='value';

//Built in OBjects
// String
// Number
// Boolean
// Object
// Function
// Array
// Date
// RegExp
// Error

//Computed Property Names
//we can have computed property names 

let prefix='prop';

let myObj= {
    [prefix+'bar']:'hello',
    [prefix+'perty']:'dynamic'
}
console.log(myObj);


//Property vs Method
// if the value being accessed happens to be a function. Because it's tempting to think of the function as belonging to the object, 
// and in other languages, functions which belong to objects (aka, "classes") are referred to as "methods", it's not uncommon to hear, 
// "method access" as opposed to "property access".

//Every time you access a property on an object, that is a property access, regardless of the type of value you get back. 
//If you happen to get a function from that property access, it's not magically a "method" at that point.

function foo() {
	console.log( "foo" );
}

var someFoo = foo;	// variable reference to `foo`

var myObject = {
	someFoo: foo
};

foo;				// function foo(){..}

someFoo;			// function foo(){..}

myObject.someFoo;	

//here somefoo and myObject..somefoo are just to seperate refernces to he same function , neither means function is owned by object

//ARRAY
//array is basically Object , with keys being numeric indexing  so to access it we use  square brackets

// Arrays have slightly more structured organization for how and where values are stored . 
// Arrays assume numeric indexing, which means that values are stored in locations,
//  usually called indices, at non-negative integers, such as 0 and 42.
let myArray = ["here", "am" , "i"];
console.log(myArray.length);
console.log(myArray[0]);

//proof of array are objects
myArray.baz='baz';
console.log(myArray.baz);


//Duplicate Objects
 
// 2 typs of copy , shallow copy , and deep copy
// objects mostly have references so , when you put an object inside another object like
const obj1={
    myArray
};
// this is not a copy ,basically you are just referncing the array 


//for deepcopy 
let newObj= JSON.parse(JSON.stringify(obj1));

//for shallow copy one of the way is
const newObjShallow=Object.assign({},newObj);

//Property Descriptors
let propDescrip = {
    a:2
}

Object.getOwnPropertyDescriptor(propDescrip,"a");
// {
//    value: 2,
//    writable: true,
//    enumerable: true,
//    configurable: true
// }
console.log(propDescrip);
Object.defineProperty(propDescrip,"b",{
    value:2,
    writable:true,            // true- meaning you can change the value of the porperty
    configurable:true,        // true - As long as a property is currently configurable, we can modify its descriptor definition, using the same defineProperty(..) utility.
    enumerable:true           //true - enumerable meaning  that property will be visible when you loop through it
})
console.log(propDescrip);

//if writable is false , our modification of the value will silently fail. If we try in strict mode, we get an error: type Error

//now all this approach create shallow immutability`
// myImmutableObject.foo; // [1,2,3]        //even if the object property foo is non-writable still it changes 
// myImmutableObject.foo.push( 4 );
// myImmutableObject.foo; // [1,2,3,4]

//to creat e object constant  do "writable"- false and "configurable"- false

//Prevent Extensions  usinf preventExtensions
let myObject2={
    a:2
}
Object.preventExtensions(myObject2);
myObject2.b=4;
console.log(myObject2.b);

// In non-strict mode, the creation of b fails silently. In strict mode, it throws a TypeError.

//enumeration 
const enumera={
    a:2,
    b:3,
    c:3
}
Object.defineProperty(enumera,"d",{
    value:4,
    writable:false,
    enumerable:false
});

for(let key in enumera){
    console.log(key);
}
console.log('Object d is missing');

//looping array forEach(..) every(..) some(..) for in, for of, 