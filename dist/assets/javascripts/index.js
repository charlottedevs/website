"use strict";function logResults(t){function n(t){var e,n='<div class="meetup"><div class="meetup-cont"><h3 class="meetup__title">'+t.name+'</h3><div class="meetup__info-cont"><h4 class="meetup__location">'+t.venue.name+'</h4><h4 class="meetup__address">'+t.venue.address_1+'</h4></div><h4 class="meetup__time">'+(e=new Date(t.time),e.getMonth()+1+"/"+e.getDate()+"/"+e.getFullYear()+" "+(12<e.getHours()?e.getHours()-12:e.getHours())+":"+(12<e.getHours()?e.getMinutes()+" PM":e.getMinutes()+" AM"))+"</h4>"+t.description+"</div></div>";document.querySelector(".meetup-container").innerHTML+=n}!function(t){if(0<t.data.length){document.querySelector("#meetups").classList.remove("hidden");for(var e=0;e<3;e++)n(t.data[e])}}(t)}!function(t){t.fetchJsonP=function(r,t){return new Promise(function(t,e){var n=document.createElement("script"),o="cb"+String(Math.random()).slice(-6);r+=~r.indexOf("?")?"&":"?",r+="callback=fetchJsonP.cbReg."+o,n.src=r,n.onload=function(){delete fetchJsonP.cbReg[o],n.remove()},n.onerror=function(){delete fetchJsonP.cbReg[o],n.remove(),e(new Error("o_O"))},fetchJsonP.cbReg[o]=t,document.body.appendChild(n)})},t.fetchJsonP.cbReg={}}(window),function(m){m.fn.enllax=function(t){var d=m(window).height(),p=m(document).height(),f=m.extend({ratio:0,type:"background",direction:"vertical"},t);m("[data-enllax-ratio]").each(function(){var e,n,o,r=m(this),a=r.offset().top,s=r.outerHeight(),t=r.data("enllax-ratio"),c=r.data("enllax-type"),i=r.data("enllax-direction");e=t||f.ratio,n=c||f.type,o=i||f.direction;var l=Math.round(a*e),u=Math.round((a-d/2+s)*e);"background"==n?"vertical"==o?r.css({"background-position":"center "+-l+"px"}):"horizontal"==o&&r.css({"background-position":-l+"px center"}):"foreground"==n&&("vertical"==o?r.css({"-webkit-transform":"translateY("+u+"px)","-moz-transform":"translateY("+u+"px)",transform:"translateY("+u+"px)"}):"horizontal"==o&&r.css({"-webkit-transform":"translateX("+u+"px)","-moz-transform":"translateX("+u+"px)",transform:"translateX("+u+"px)"})),m(window).on("scroll",function(){var t=m(this).scrollTop();l=Math.round((a-t)*e),u=Math.round((a-d/2+s-t)*e),"background"==n?"vertical"==o?r.css({"background-position":"center "+-l+"px"}):"horizontal"==o&&r.css({"background-position":-l+"px center"}):"foreground"==n&&t<p&&("vertical"==o?r.css({"-webkit-transform":"translateY("+u+"px)","-moz-transform":"translateY("+u+"px)",transform:"translateY("+u+"px)"}):"horizontal"==o&&r.css({"-webkit-transform":"translateX("+u+"px)","-moz-transform":"translateX("+u+"px)",transform:"translateX("+u+"px)"}))})})}}(jQuery),document.addEventListener("DOMContentLoaded",function(){fetchJsonP("https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01").then(function(t){logResults(t)}),$.prototype.enllax&&$(window).enllax()});