document.querySelector(".btn").addEventListener("click", function() {
  document
    .querySelector(".nav__burger")
    .classList.toggle("nav__burger--opened");
  document
    .querySelector(".nav__opened-list")
    .classList.toggle("nav__opened-active");
});

document.addEventListener("DOMContentLoaded", function() {
  var btc = "https://api.cryptonator.com/api/ticker/btc-usd";
  var eth = "https://api.cryptonator.com/api/ticker/eth-usd";
  var ltc = "https://api.cryptonator.com/api/ticker/ltc-usd";

  // New style
  // fetch(btc).then(result => {
  //   console.log(result);
  // });

  function getCurrency(url, callback) {
    if (!url) return false;
    // Old style
    var request = new XMLHttpRequest();

    request.addEventListener("load", function() {
      var pars = JSON.parse(request.response);
      var result = Math.floor(pars.ticker.price);

      callback(result);
    });

    request.open("GET", url);
    request.send();
  }

  getCurrency(btc, function(result) {
    document
      .querySelector("#btc")
      .querySelector(".story__performance-price").innerText = "$ " + result;
  });

  getCurrency(eth, function(result) {
    document
      .querySelector("#eth")
      .querySelector(".story__performance-price").innerText = "$ " + result;
  });

  getCurrency(ltc, function(result) {
    document
      .querySelector("#ltc")
      .querySelector(".story__performance-price").innerText = "$ " + result;
  });
});
