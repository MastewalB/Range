class Range {
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }

    has(x) {
        return typeof x === "number" && this.from <= x && x <= this.to;
    }

    //String representation
    toString() { return `{ x | ${this.from} ≤ x ≤ ${this.to}}`; }

    [Symbol.iterator]() {
        let next = Math.ceil(this.from);
        let last = this.to;

        return {
            next() {
                return (next <= last) ? { value: next++ } : { done: true };
            },
            [Symbol.iterator]() { return this; }
        };
    }



    //from returns a function that returns increasing value of numbers 
    from(start) {
        return function () {
            var next = start;
            start += 1;
            return next;
        };
    }

    //takes from as an argument and generates values up to an end value
    to(from, end) {
        return function () {
            let value = from();
            if (value < end) {
                return value;
            }
            return undefined;
        };
    }

    //arranges start end call by calling from() from to()
    fromTo(start, end) {
        return to(from(start), end);
    }

    //accenps an array and a generator(optional) then executes the genertor on the array
    //the generator field is provided by closure, i.e the internal state of the function includes 
    //a reference to the scope in which the function definition appears
    element(array, gen) {
        if (gen === undefined) {
            gen = fromTo(0, array.length);
        }
        return function () {
            let index = gen();
            if (index !== undefined) {
                return array[index];
            }
            return undefined;
        };

    }

    /*Tagged Template to represent the Range*/
    represent(strings, ...values) {
        let str = '';
        strings.forEach((string, i) => {
            str += string + values[i] || '';
        });
        return str;
    }
}

//tagged templates enable to control the creation of a string literal
//the position of the string and the variables that are passed
function represent(strings, ...values) {
    let str = '';
    strings.forEach((string, i) => {
        str += string + values[i] || '';
    });
    return str;
}
//tagged template usage
let from = 2;
let to = 4;
const sentence = represent`The Range class starts from ${from} and ends at ${to}`;
//console.log(sentence);



//console.log([...new Range(-2, 2)]);


//sets and maps
//A set is a collection of values. but unlike an array, sets don't store duplicate elements 
//and don't have ordering and indexing
let set = new Set();
for (let x of new Range(1, 10)) {
    set.add(x);
}
//console.log(set);

let map = new Map()
for (let x of new Range(1, 10)) {
    map.set(x, Math.pow(x, 2));
}
//console.log(map);

function add(...values) {
    let total = 0;
    for (let x of values) {
        total += x;
    }
    return total;
}



///Reflect API
/*
it defines an API for "reflecting upon" objects and their properties.
helps to handle a dynamic code
 */
//construct
let reflect = Reflect.construct(Range, [1, 5]);
console.log(reflect);

//method call
let reflect_method = Reflect.apply(add, Range, [2, 4]);
console.log(reflect_method);




export default Range;