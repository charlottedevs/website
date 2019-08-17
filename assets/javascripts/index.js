'use strict';

/* Meetup API call */

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
        const desc = (data.description.length > 200) ? `${data.description.substring(0, 400)}...` : data.description;
        var meetupStr = `
        <div class="meetup">
            <div class="meetup-cont">
                <h3 class="meetup__title">${data.name} </h3>
                <div class="meetup__info-cont">
                    <h4 class="meetup__location">${data.venue.name}</h4>
                    <h4 class="meetup__address">${data.venue.address_1}</h4>
                </div>
                <h4 class="meetup__time">${formatDate(data)}</h4>
                <div class="meetup__desc">
                    ${desc}
                </div>
                <a href="${data.link}" class="meetup__link">View On Meetup</a>
            </div>
        </div>`;
        document.querySelector('.meetup-container').innerHTML += meetupStr;
    }

    function itData(json) {
        if (json.data.length > 0) {
            // If api has results remove hidden visibility and iterate the data
            var meetupEl = document.querySelector("#meetups");
            meetupEl.classList.remove("hidden");

            for (var i = 0; i < 3; i++) {
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

/* DOMContentLoaded */
document.addEventListener('DOMContentLoaded', function () {

    fetchJsonP('https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01').then(function (data) {
        logResults(data);
    });
    if (!!$.prototype.enllax) {
        $(window).enllax();
    }
});
