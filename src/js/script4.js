const incDecrement =(function(){

  let _privateCounter = 0;
  let _counter = document.getElementById('inc-dec-value');

  function _changeBy(val) {
    _privateCounter += val;
    _setCounter();
  }

  function _setCounter() {
    _counter.innerHTML = _privateCounter;
  }

  return {
    incrementation: function () {
      _changeBy(1);
    },
    decrementation: function () {
      _changeBy(-1);
    },
    value: function () {
      return _privateCounter;
    }
  }

})();
