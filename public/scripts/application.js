(function(g) {
    function h(a) {
        if (/^#/.test(a)) return document.getElementById(a.substring(1));
        a = i(a);
        return a.space == null ? document.createElement(a.local) : document.createElementNS(a.space, a.local)
    }
    function i(a) {
        var b = a.indexOf(":");
        return {
            space: d.prefix[a.substring(0, b)],
            local: a.substring(b + 1)
        }
    }
    function j(a) {
        this.element = a
    }
    function d(a) {
        return a == null || a.element ? a: new j(typeof a == "string" ? h(a) : a)
    }
    function e(a) {
        return a && a.element || a
    }
    j.prototype = {
        add: function(a, b) {
            return d(this.element.insertBefore(typeof a ==
            "string" ? h(a) : e(a), arguments.length == 1 ? null: e(b)))
        },
        remove: function(a) {
            this.element.removeChild(e(a));
            return this
        },
        parent: function() {
            return d(this.element.parentNode)
        },
        child: function(a) {
            var b = this.element.childNodes;
            return d(b[a < 0 ? b.length - a - 1: a])
        },
        previous: function() {
            return d(this.element.previousSibling)
        },
        next: function() {
            return d(this.element.nextSibling)
        },
        attr: function(a, b) {
            var c = this.element;
            a = i(a);
            if (arguments.length == 1) return a.space == null ? c.getAttribute(a.local) : c.getAttributeNS(a.space, a.local);
            if (a.space == null) b == null ? c.removeAttribute(a.local) : c.setAttribute(a.local, b);
            else b == null ? c.removeAttributeNS(a.space, a.local) : c.setAttributeNS(a.space, a.local, b);
            return this
        },
        css: function(a, b, c) {
            var f = this.element.style;
            if (arguments.length == 1) return f.getPropertyValue(a);
            b == null ? f.removeProperty(a) : f.setProperty(a, b, arguments.length == 3 ? c: null);
            return this
        },
        on: function(a, b, c) {
            this.element.addEventListener(a, b, arguments.length == 3 ? c: false);
            return this
        },
        off: function(a, b, c) {
            this.element.removeEventListener(a,
            b, arguments.length == 3 ? c: false);
            return this
        },
        text: function(a) {
            var b = this.element.firstChild;
            if (!arguments.length) return b && b.nodeValue;
            if (b) b.nodeValue = a;
            else a != null && this.element.appendChild(document.createTextNode(a));
            return this
        }
    };
    d.prefix = {
        svg: "http://www.w3.org/2000/svg",
        xlink: "http://www.w3.org/1999/xlink",
        xml: "http://www.w3.org/XML/1998/namespace",
        xmlns: "http://www.w3.org/2000/xmlns/"
    };
    d.version = "1.1.0";
    g.n$ = d;
    g.$n = e
})(this);

var po = org.polymaps;

var map = po.map();
map.container($("#map-container").get(0).appendChild(po.svg("svg")))
   .add(po.interact())
   .add(po.hash())
   .add(po.image().url(po.url("/maps/control_room/{Z}/{X}/{Y}.png")));

map.compass = po.compass().zoom("small").pan("none");
map.add(map.compass);

(function() {
  map.toggleFullscreen = function() {
    if ($('#map-container').hasClass("fullscreen")) {
      $('#map-container').removeClass("fullscreen");
      arrow.attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)");
      map.compass.zoom("small");
    } else {
      $('#map-container').addClass("fullscreen");
      arrow.attr("transform", "translate(16,16)rotate(135)scale(5)translate(-1.85,0)");
      map.compass.zoom("big");
    }
    map.resize();
  }
  
  var button = n$("#map-container").add("svg:svg")
    .attr("id", "fullscreen-toggle").attr('width', 32).attr('height', 32)
    .on("mousedown", map.toggleFullscreen);
  var circle = button.add("svg:circle").attr('cx', 16).attr('cy', 16).attr('r', 14);
  circle.add("svg:title").text("Toggle fullscreen. (ESC)")
  var arrow = button.add("svg:path")
    .attr("transform", "translate(16,16)rotate(-45)scale(5)translate(-1.85,0)")
    .attr("d", "M0,0L0,.5 2,.5 2,1.5 4,0 2,-1.5 2,-.5 0,-.5Z")
    .attr("pointer-events", "none").attr("fill", "#AAA");
  
  window.addEventListener("keydown", function(key) {
    key.keyCode == 27 && $('#map-container').hasClass("fullscreen") && map.toggleFullscreen();
  },false);
})();