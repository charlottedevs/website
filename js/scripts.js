
function logResults(json){
  var d = new Date(json.data[0].time);
var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
var hours = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours();
var minutes = (d.getHours() >12) ? (d.getMinutes() + " PM") : d.getMinutes() + " AM";
var formattedTime = hours + ":" + minutes;

formattedDate1 = formattedDate + " " + formattedTime;

var d = new Date(json.data[1].time);
var formattedDate = (d.getMonth() + 1) + "/" + d.getDate() + "/" + d.getFullYear();
var hours = (d.getHours() > 12) ? d.getHours() - 12 : d.getHours() ;
var minutes = (d.getHours() >12) ? (d.getMinutes() + " PM") : d.getMinutes() + " AM";
var formattedTime = hours + ":" + minutes;

formattedDate2 = formattedDate + " " + formattedTime;
console.log(json);

document.getElementById("meetups").innerHTML = "<h1>Upcoming Meetups</h1><h2>"+
json.data[0].name+"</h2><h3>"+formattedDate1+"</h3><h3>"+
json.data[0].venue.name+"</h3><h3>"+json.data[0].venue.address_1+"</h3><h5>"+
json.data[0].description+"</h5><hr><h2>"+
json.data[1].name+"</h2><h3>"+formattedDate2+"</h3><h3>"+
json.data[1].venue.name+"</h3><h3>"+json.data[1].venue.address_1+"</h3><h5>"+
json.data[1].description+"</h5>";



}

$.ajax({
  url: "https://api.meetup.com/charlottejuniordevs/events?photo-host=public&sig_id=182549128&sig=5e13646fba70874a21074c50827a5e377722fd01",
  dataType: "jsonp",
  jsonpCallback: "logResults"
});
