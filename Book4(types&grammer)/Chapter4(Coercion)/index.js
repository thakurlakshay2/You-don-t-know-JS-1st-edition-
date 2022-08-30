                                //NOTE for whole document, Object.toString() returns [object Object], unless you specify your own
//Coercion

//converting value from one type to another is often called "type casting" when done explicitly and coersion when done implicitly

//coersion doesn' lead to complex values like Objct and function


//type casting - occurs in statically typed languages at compile time 
//coercion -occurs in runtime conversiond

var a=22;

var b=a+"";  //implicit coercion

var c= String(a);  //explicit coercion
console.log("explicit coercion "+c);
console.log("implicit coercion "+ b);

console.log('-----------------------------------------------------------------------------------');

//Abstract value operation

//basic knowledge of how a value become  a string , number or boolean

    //ToString---------------------- 

//ToString is used when a non string value is coerced into a string

//natural stringification for built in values
//null -> "null"
//undefined ->"undefined"
//true ->"true"

//NOTE: vaer small or very large numbers are denoted in exponential form

var largeNo= 1.07*10000*10000*1000*1000*10000*10000;

console.log(largeNo.toString());  //1.07e+22;

//array have an overridden toString method that signifies as the strig concatinationof all it's values  with "," in between them

console.log([1,2,3,4,5].toString());

//so either toString will be called explicitly or will be called automatically if an non-string is used in a string context


    //JSON stringification--------------------

//JSON.stringify() seems related to toString() but not exactly same as coercion, JSON stringify even a string
console.log(JSON.stringify(42));    //"42"
console.log(JSON.stringify("42")); //""42""   (a string with qouted string value in it )
console.log(JSON.stringify(true)); //"true"
console.log(JSON.stringify(null)); //"null"

//JSON.stringify omits not JSON-safe values , even if they are in a array , 
//(non JSON safe- functions , Objects with circular reference, Symbols and undefined)
console.log(JSON.stringify([1,"42",function(){},undefined]));  //[1,"42",null.null]


//JSON stringification has a special behaviour that if an object has a toJSON() method defined then, that is called first for serialization
//define a toJSON method in Object containing non JSON-safe value

var obj={

}
var obj1={
    b:42,
    c:obj,
    d:function(){},
    e:'12'
}

obj.e=obj1;  //creating a circular reference
// console.log(JSON.stringify(obj1));      //TypeError: Converting circular structure to JSON

//define a custom JSON value serialization

obj1.toJSON =function(){
    return {b:this.b}; // only include the `b` property for serialization
}

console.log(JSON.stringify(obj1));


    //ToNumber-----------------------------

//If any non-number value is used in a way that requires it to be a number, such as a mathematical operation,
// the ES5 spec defines the ToNumber abstract operation in section 9.3.

//true -> 1
//false -> 0
//undefined -> NaN
//null -> 0  //weird?

//for a string  if ToNumber fails it gives NaN

//Object will first be converted to their primitive value equivalent, and the resulting value is coerced to a number according to the ToNumber
//to convert to primitive value the ToPromitive will consult the value in question to see if it has valueOf() method ,if available and it 
//returns a primitive value,then that value is used in coercion,if not , bt toString is user for coercion
//If neither operation can provide a primitive value, a TypeError is thrown.

var numObj ={
    valueOf:function(){
        return "42";
    }
}

var numObj2={
    toString: function(){
        return "42";
    }
}

var numObj3=[4,2];
numObj3.toString=function(){
    return this.join(""); //42
}

console.log(Number(numObj));   //42
console.log(Number(numObj2)); //42
console.log(Number(numObj3)); //42
console.log(Number("")); //0
console.log(Number([])); //0
console.log(Number(["abc"])); //NaN


    //ToBoolean---------------------------

// First and foremost, JS has actual keywords true and false, and they behave exactly as you'd expect of boolean values. 
// It's a common misconception that the values 1 and 0 are identical to true/false. While that may be true in other languages, 
// in JS the numbers are numbers and the booleans are booleans.
//  You can coerce 1 to true (and vice versa) or 0 to false (and vice versa). But they're not the same.

//falsy values
//undefined , null , false , +0 , -0 or NaN , ""

//all these value will be coerced to be false

//falsy Objects

var o1=new Boolean(false);
var o2=new Number(0);
var o3=new String("");

console.log(Boolean(o1&&o2&&o3));  //true , even though they may contain falsy values ,their value is true

//basically falsy Objects are made by browsrs ,( not even in JS) , to be like any other object but when coerced to boolaen it gives false

//why make it ? because of depricated "document.all" property

//truthy values
//"false" , "0", "''" , basically a non empty string 

//[] , {} ,function(){} all truthy values


console.log('------------------------------------------------------------------------------------------------');

//Explicit Coercion

    //String <-> Numbers ---------------------
var s1=42;
var s2=String(s1);
console.log(s2+ " "+ typeof s2);

var s3="3.14";
var s4=Number(s3);
var s5=+s3;
console.log(s4+ " "+ typeof s4);

//here "+s3" explicitly coerce its operand s3 to a number value

//coercing date to a number
 console.log(+(new Date("Mon, 18 Aug 2014 08:53:06 CDT")))

    //curious case of ~
//simple it performs 2's compliment

    // Parsing Numeric String ----------------------------

var par1="42";
var par2="42px";

console.log(Number(par1)); //42
console.log(parseInt(par1));  //42

console.log(Number(par2));  //NaN
console.log(parseInt(par2));  //42

//Parsing a numeric value out of a string is tolerant of non-numeric characters -- 
//it just stops parsing left-to-right when encountered -- whereas coercion is not tolerant and fails resulting in the NaN value.

    //parsing Non-strings

console.log(parseInt(1/0,19));      //18 ,, why?
//first of all , parseInt takes string , not a number, JS coerces the input to String and then parses it .

//parseInt  coerces its value to a string and then parse it , so even if you are giving a String Object , it doesnt matter

//I think it's a good thing that all values in JS have some sort of default string representation, 
// so that they aren't mysterious black boxes that we can't debug and reason about.

//so what is happening is console.log above??
//It's essentially parseInt( "Infinity", 19 ), the first parsed character is "I" which is value 18 in the silly base-19, 2nd value "n"
// is not in the valid set of numneric character . so it stops just like in "p" in "42px"

console.log(parseInt( 0.000008 ));		// 0   ("0" from "0.000008")
console.log(parseInt( 0.0000008 ));		// 8   ("8" from "8e-7")
console.log(parseInt( false, 16) );		// 250 ("fa" from "false")
console.log(parseInt( parseInt, 16) );	// 15  ("f" from "function..")

console.log(parseInt( "0x10" ));			// 16
console.log(parseInt( "103", 2 ));		// 2

    //Explicity -> Boolean

var a = "0";
var b = [];
var c = {};

var d = "";
var e = 0;
var f = null;
var g;

Boolean( a ); // true
Boolean( b ); // true
Boolean( c ); // true

Boolean( d ); // false
Boolean( e ); // false
Boolean( f ); // false
Boolean( g ); // false

//just like we corece a value to number using '+' , we coerce a value to boolean using '!!' operator, converting it tot troothy or falsy value

console.log(!!a);  //implicit coercion

var ternary=a?true: false;  // this ternary operation might look explicit m but actually has a hidden implicity
//'a' expression has to first be coerced to boolean to perform the truthiness test.

console.log('-----------------------------------------------------------------------------------------------------');

//Implicit Coercion

//hidden with non-obvious side effects , 

    //String <--> Numbers----------------

var a1="42";
var b1="0";

var c1=42;
var d1=0;

console.log(a1+b1+" "+ typeof (a1+b1));      //String  "420"
console.log(c1+d1 +" "+ typeof (c1+d1));    //number 42;

var a2=[1,2];
var b2=[3,4];
//--------------
console.log(a2+b2);     //1,23,4  // WTF happened here??

//According to ES5 spec section 11.6.1, the + algorithm (when an object value is an operand) will concatenate if either operand is either already
// a string, or if the following steps produce a string representation. So, when + receives an object (including array) for either operand, 
//it first calls the ToPrimitive abstract operation (section 9.1) on the value, which then calls the [[DefaultValue]] algorithm (section 8.12.8)
// with a context hint of number.

//If you're paying close attention, you'll notice that this operation is now identical to how the ToNumber abstract operation handles objects 
//(see the "ToNumber"" section earlier). The valueOf() operation on the array will fail to produce a simple primitive, 
//so it then falls to a toString() representation. The two arrays thus become "1,2" and "3,4", respectively. 
//Now, + concatenates the two strings as you'd normally expect: "1,23,4".

//----------------

// if either operand to + is a string (or becomes one with the above steps!), the operation will be string concatenation. 
//Otherwise, it's always numeric addition.


var a3="3.14";
var b3=a3-0;

console.log(b3+" "+ typeof b3);  //3.14 number
// the - operator is defined only for numeric subtraction, so a - 0 forces a's value to be coerced to a number. While far less common,
//  a * 1 or a / 1 would accomplish the same result, as those operators are also only defined for numeric operations.

    //* --> Boolean -------------


//Remember, implicit coercion is what kicks in when you use a value in such a way that it forces the value to be converted. 
// For numeric and string operations, it's fairly easy to see how the coercions can occur.

//Experssion for implicit boolean coercion

// The test expression in an if (..) statement.
// The test expression (second clause) in a for ( .. ; .. ; .. ) header.
// The test expression in while (..) and do..while(..) loops.
// The test expression (first clause) in ? : ternary expressions.
//The left-hand operand (which serves as a test expression -- see below!) to the || ("logical or") and && ("logical and") operators.

    //operators && ||

//they dont result in logical value(aka boolean) as answer like they do in some other languages,
//in JS They result in the value of one (and only one) of their two operands. In other words, they select one of the two operand's values.

var val1=42;
var val2="abc";
var val3=null;

console.log(val1|| val2);   //42
console.log(val1 && val2);  //abc
console.log(val3|| val2);   //abc
console.log(val3 && val2);  //null

//WTF just happened above, how is this making sense?

// Both || and && operators perform a boolean test on the first operand (a or c). If the operand is not already boolean (as it's not, here),
//  a normal ToBoolean coercion occurs, so that the test can be performed.

// For the || operator, if the test is true, the || expression results in the value of the first operand (a or c). 
// If the test is false, the || expression results in the value of the second operand (b).

//Inversely, for the && operator, if the test is true, the && expression results in the value of the second operand (b). 
// If the test is false, the && expression results in the value of the first operand (a or c).

a || b;
// roughly equivalent to:
a ? a : b;

a && b;
// roughly equivalent to:
a ? b : a;


function foot(a,b) {
	a = a || "hello";
	b = b || "world";

	console.log( a + " " + b );
}

foot();					// "hello world"
foot( "yeah", "yeah!" );	// "yeah yeah!"

console.log("------------------------------------------------------------------------------");

//loose Equals vs Strick Equals


    //Equality performance  -(copmare == and ===)  no measurable difference , barely a millionth of a second, microsecond of a difference

    //Abstract Equality-------------------------

//some  minor exceptions
    // NaN is never equal to itself (see Chapter 2)
    // +0 and -0 are equal to each other (see Chapter 2)

// NOTE: '==' & '===' both behave identically in case of comparing 2 Objects

//'!' version of '=='(!=) or '==='(!==) behave exactly the same as == or === , and just negate the result

//comparing string to numbers--------

var v1="42";
var v2=42;

console.log(v1==v2);  //true
console.log(v1===v2); //false

//according to ES5 comparing number to string , string is converted to number using ToNumber abstract operation


//Comparing anything to boolean

//here is a confusion
var a4="42";
var b4=true;
console.log(a4==b4); //fasle   , wait false? why? isn't a4 a truthy value

//because of coercion , the boolean is converted to  a Number , so True becomes 1 , and 1!= 42, hence false


//Comparing null to undefined
    // If x is null and y is undefined, return true.
    // If x is undefined and y is null, return true.
//when using  == , there will be mutual implicit coercion 

// var a = null;
// var b;

// a == b;		// true
// a == null;	// true
// b == null;	// true

// a == false;	// false
// b == false;	// false
// a == "";	// false
// b == "";	// false
// a == 0;		// false
// b == 0;		// false

//with each other null and undefined gives true , rest everyone , they give false

//Comparing Objects and non-Objects
    // If Type(x) is either String or Number and Type(y) is Object, return the result of the comparison x == ToPrimitive(y).
    // If Type(x) is Object and Type(y) is either String or Number, return the result of the comparison ToPrimitive(x) == y.

    //In case of Boolean , any boolean is first coerced into a number

var a5=42;
var b5=[42];

console.log(a5==b5); //true  , why? because b5 is coerced to a string and then to a number, hence true

//EDGE CASES----
Number.prototype.valueOf = function() {
	return 3;
};

new Number( 2 ) == 3; //true


"0" == null;			// false
"0" == undefined;		// false
"0" == false;			// true -- UH OH!
"0" == NaN;				// false
"0" == 0;				// true
"0" == "";				// false

    // fasly comparison
false == null;			// false
false == undefined;		// false
false == NaN;			// false
false == 0;				// true -- UH OH!
false == "";			// true -- UH OH!
false == [];			// true -- UH OH!
false == {};			// false

"" == null;				// false
"" == undefined;		// false
"" == NaN;				// false
"" == 0;				// true -- UH OH!
"" == [];				// true -- UH OH!
"" == {};				// false

0 == null;				// false
0 == undefined;			// false
0 == NaN;				// false
0 == [];				// true -- UH OH!
0 == {};				// false

//and many more , read Edge cases to know all

console.log('----------------------------------------------------------------------------------------------')
//Abstract relational Comparison 

//NOTE: a < b is the only one defined, so b > a , is actually converted to a < b

// only two cases , what if both string (a & b) , and the anything else

// algorithm call Toprimitive coercion on both values, if return of either call is not a string then both is converted to a number using ToNumber 
//operation rule and then compared numberically

//if both are string they re compared lexicographically,

//if both are array , they are coerced to string and then compared , such are the rules of array

//there is a slight problem with the object
var ax = { b: 42 };
var bx = { b: 43 };

ax < bx;	// ?? 
//a < b is also false, because a becomes [object Object] and b becomes [object Object], and so clearly a is not lexicographically less than b

ax == bx;	// false
ax > bx;	// false

ax <= bx;	// true
ax >= bx;	// true

//wtf is going on here , a<b is false & a==b is false but a<=b is true
//Because the spec says for a <= b, it will actually evaluate b < a first, 
// and then negate that result. Since b < a is also false, the result of a <= b is true.