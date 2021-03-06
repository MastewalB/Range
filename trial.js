import { Range } from "./Range_iterable_class.js";

let range = new Range(5, 10)
console.log(range);
console.log(range.set());
console.log(range.has(2));

/*
Takes a function that returns the square of a number and calls it on the numbers in the range
*/
console.log(range.map((x) => {
    return x * x;
}, 6, 8));




///Reflect API
/*
it defines an API for "reflecting upon" objects and their properties.
helps to handle a dynamic code
 */
//construct
let reflect = Reflect.construct(Range, [1, 5]);
console.log(reflect);


function add(...values) {
    let total = 0;
    for (let x of values) {
        total += x;
    }
    return total;
}
//method call
let reflect_method = Reflect.apply(add, Range, [2, 4]);
console.log(reflect_method);