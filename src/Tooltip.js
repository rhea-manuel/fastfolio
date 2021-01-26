(function() {
  "use strict";

  var tooltipDelay = 500;
  var timer = null;

  document.body.addEventListener("mouseout", function() {
    window.clearTimeout(timer);
  });

  document.body.addEventListener("mousemove", function(e) {
    var el = e.target;

    if (el != document.body && (el.hasAttribute("title") || el.hasAttribute("data-styletip"))) {
      if (el.title) {
        el["tt-title"] = el.title;
        el["tt-show"] = function(pos) {
          var tip = document.createElement("div");
          tip.classList.add("style-tip");

          if (el.hasAttribute("data-styletip-class")) {
            tip.classList.add(el.getAttribute("data-styletip-class"));
          }

          tip.innerText = el["tt-title"];
          tip.style.zIndex = 9e9;
          tip.style.pointerEvents = "none";
          tip.style.position = "absolute";
          tip.style.left = pos.x + "px";
          tip.style.top = pos.y + "px";

          document.body.appendChild(tip);

          el["tt-tip"] = tip;
          this.addEventListener("mouseout", el["tt-destroy"]);
        };

        el["tt-destroy"] = function() {
          if (el["tt-tip"]) {
            document.body.removeChild(el["tt-tip"]);
            delete el["tt-tip"];
          }
        };

        el.removeAttribute("title");
        el.setAttribute("data-styletip", true);
      }

      clearTimeout(timer);
      timer = window.setTimeout(function() {
        el["tt-destroy"]();
        el["tt-show"]({
          x: e.pageX,
          y: e.pageY
        });
      }, tooltipDelay);
    }
  });

})();