'use strict';

function logResults(json) {
    function formatDate(data) {
        var d = new Date(data.time);
        var formattedDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
        var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
        var minutes = d.getHours() > 12 ? d.getMinutes() + ' PM' : d.getMinutes() + ' AM';
        var formattedTime = hours + ':' + minutes;
        formattedDate = formattedDate + ' ' + formattedTime;
        return formattedDate;
    }

    function updateLayout(data) {
        var meetupStr = '<div class="meetup">' + '<h3>' + data.name + '</h3>' + '<h4>' + formatDate(data) + '</h4>' + '<h4>' + data.venue.name + '</h4>' + '<h4>' + data.venue.address_1 + '</h4>' + data.description + '</div>';
        document.querySelector('.meetup-container').innerHTML += meetupStr;
    }

    function itData(json) {
        if (json.data.length > 0) {
            // If api has results remove hidden visibility and iterate the data
            var meetupEl = document.querySelector("#meetups");
            meetupEl.classList.remove("hidden");

            for (var i = 0; i < json.data.length; i++) {
                updateLayout(json.data[i]);
            }
        }
    }

    itData(json);
}

(function (root) {
    root.fetchJsonP = function (url, options) {
        return new Promise(function (resolve, reject) {
            var script = document.createElement('script');
            var callbackName = 'cb' + String(Math.random()).slice(-6);
            url += ~url.indexOf('?') ? '&' : '?';
            url += 'callback=fetchJsonP.cbReg.' + callbackName;
            script.src = url;
            script.onload = function () {
                delete fetchJsonP.cbReg[callbackName];
                script.remove();
            };
            script.onerror = function () {
                delete fetchJsonP.cbReg[callbackName];
                script.remove();
                reject(new Error("o_O"));
            };
            fetchJsonP.cbReg[callbackName] = resolve;
            document.body.appendChild(script);
        });
    };
    root.fetchJsonP.cbReg = {};
})(window);

// function getImages() {
//     let queryUrl = "."
//     fetch(queryUrl)
//     .then(res => {
//         console.log((res))
//         // $(res).find("a:contains(.jpg)").each(function () {
//         //     console.log("yo")
//         // });
//     })
// }

/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {

    fetchJsonP('https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01').then(function (data) {
        logResults(data);
    });
    $(window).enllax();
    // getImages();
});
"use strict";

/* jQuery.enllax.js - v1.1.0 | copyright 2015, MMK Jony | https://github.com/mmkjony/enllax.js | released under the MIT license */

!function (t) {
  "use strict";

  t.fn.enllax = function (r) {
    var a = t(window).height(),
        n = t(document).height(),
        o = t.extend({ ratio: 0, type: "background", direction: "vertical" }, r),
        e = t("[data-enllax-ratio]");e.each(function () {
      var r,
          e,
          s,
          i = t(this),
          c = i.offset().top,
          l = i.outerHeight(),
          p = i.data("enllax-ratio"),
          d = i.data("enllax-type"),
          x = i.data("enllax-direction");r = p ? p : o.ratio, e = d ? d : o.type, s = x ? x : o.direction;var f = Math.round(c * r),
          u = Math.round((c - a / 2 + l) * r);"background" == e ? "vertical" == s ? i.css({ "background-position": "center " + -f + "px" }) : "horizontal" == s && i.css({ "background-position": -f + "px center" }) : "foreground" == e && ("vertical" == s ? i.css({ "-webkit-transform": "translateY(" + u + "px)", "-moz-transform": "translateY(" + u + "px)", transform: "translateY(" + u + "px)" }) : "horizontal" == s && i.css({ "-webkit-transform": "translateX(" + u + "px)", "-moz-transform": "translateX(" + u + "px)", transform: "translateX(" + u + "px)" })), t(window).on("scroll", function () {
        var o = t(this).scrollTop();f = Math.round((c - o) * r), u = Math.round((c - a / 2 + l - o) * r), "background" == e ? "vertical" == s ? i.css({ "background-position": "center " + -f + "px" }) : "horizontal" == s && i.css({ "background-position": -f + "px center" }) : "foreground" == e && n > o && ("vertical" == s ? i.css({ "-webkit-transform": "translateY(" + u + "px)", "-moz-transform": "translateY(" + u + "px)", transform: "translateY(" + u + "px)" }) : "horizontal" == s && i.css({ "-webkit-transform": "translateX(" + u + "px)", "-moz-transform": "translateX(" + u + "px)", transform: "translateX(" + u + "px)" }));
      });
    });
  };
}(jQuery);
