
function makeAdder(x) {
  return function(y) {
    return x + y;
  }
}

let addToFive = makeAdder(5);
let addToMinusFive = makeAdder(-5);

// console.log(addToFive(5));
// console.log(addToMinusFive(5));


function makeSizer(size) {
  return function() {
    document.body.style.fontSize = size + 'px'
  }
}

let size12 = makeSizer(12);
let size15 = makeSizer(15);
let size18 = makeSizer(18);

document.getElementById('size-12').onclick = size12;
document.getElementById('size-15').onclick = size15;
document.getElementById('size-18').onclick = size18;
