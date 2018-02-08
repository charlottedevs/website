'use strict';

function logResults(json) {
    function formatDate(data) {
        let d = new Date(data.time);
        let formattedDate = d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear();
        let hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
        let minutes = d.getHours() > 12 ? d.getMinutes() + ' PM' : d.getMinutes() + ' AM';
        let formattedTime = hours + ':' + minutes;
        formattedDate = formattedDate + ' ' + formattedTime;
        return formattedDate;
    }

    function updateLayout(data) {
        let meetupStr = '<div class="meetup">' + '<h3>' + data.name + '</h3>' + '<h4>' + formatDate(data) + '</h4>' + '<h4>' + data.venue.name + '</h4>' + '<h4>' + data.venue.address_1 + '</h4>' + data.description + '</div>';
        document.querySelector('.meetup-container').innerHTML += meetupStr;
    }

    function itData(json) {
        if (json.data.length > 0) {
          // If api has results remove hidden visibility and iterate the data
          let meetupEl = document.querySelector("#meetups");
          meetupEl.classList.remove("hidden");

          for (let i = 0; i < json.data.length; i++) {
              updateLayout(json.data[i]);
          }
        }
    }

    itData(json);
}

(function (root) {
    root.fetchJsonP = function (url, options) {
        return new Promise(function (resolve, reject) {
            let script = document.createElement('script');
            let callbackName = 'cb' + String(Math.random()).slice(-6);
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
    // getImages();
});
