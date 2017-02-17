function setHint(help) {
  document.getElementById('hint').innerHTML = help
}

function setHints() {
  let hints = [
    { id: 'name', hint: 'name hint' },
    { id: 'email', hint: 'email hint' },
    { id: 'age', hint: 'age hint' }
  ]

  hints.map(({ id, hint }) => {
    document.getElementById(id).onfocus = () => setHint(hint)
  })
  // for (var i = 0; i < hints.length; i++) {
  //   let item = hints[i]
  //   document.getElementById(item.id).onfocus = function () {
  //     setHint(item.hint)
  //   }
  // }

}

setHints();
