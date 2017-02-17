let scr2 = 'two';


let arr = [
  ['mark doe', 'waffle', 50, 2],
  ['mark doe', 'sphone', 890, 1],
  ['mark doe', 'kitty', 90, 4],
  ['ann sterling', 'halls', 90, 9],
  ['ann sterling', 'lipton', 400, 5]
]

// let reduced = arr.reduce((customers, line) => {
//   customers[line[0]] = customers[line[0]] || []
//   customers[line[0]].push({
//     item: line[1],
//     price: line[2],
//     quantity: line[3]
//   })
//
//   return customers
// }, {})
let reduced = arr.reduce((customers, [name, item, price, qunatity]) => {
  customers[name] = customers[name] || []
  customers[name].push({
    item,
    price,
    qunatity
  })

  return customers
}, {})

// console.log(JSON.stringify(reduced, null, 2));
