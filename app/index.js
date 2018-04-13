import 'styles/index.scss';
import GoogleMapsLoader from 'google-maps';
import data from './data.js';
import mapstyles from './mapstyles.json';
import googlejson from './geojson.json';
import $ from 'jquery';
import kartanlogo2 from '../assets/images/kartanlogo2.png';
import linksymbol from '../assets/images/linksymbol4.png';

GoogleMapsLoader.KEY = 'AIzaSyC6ab7tJhVBJXSnJKFfKhS0EoMKmedA26o';

var markers = [];

GoogleMapsLoader.load(function(google) {

  const gbg = {lat: 57.70791089999999, lng:11.966317000000004}
  const options = {
    zoom: 14,
    zoomControl: true,
    fullscreenControl: false,
    gestureHandling: 'greedy',
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles: mapstyles,
    center: new google.maps.LatLng(57.703054,11.960645)
  }
  const map = new google.maps.Map(document.getElementById('map'), options);

  var currentInfoWindow = null;

  var infowindow = new google.maps.InfoWindow();

  data.forEach((coord) => {
    const position = new google.maps.LatLng(coord.latitude, coord.longitude);
    const marker = new google.maps.Marker({
      position: position,
      map: map,
      gestureHandling: 'none',
      animation:google.maps.Animation.DROP,
      hyresvardID: coord.hyresvardID,
      icon: {
        url: coord.icon,
        scaledSize: new google.maps.Size(37.3, 55.7)
      }
    });
    markers.push(marker);
    const infowindow = new google.maps.InfoWindow({
      maxWidth: 930,
      content: `
      <div class="infowindow-content">
        <h2 class="infowindow-header"><a href=${coord.hemsida} target="_blank">
        ${coord.hyresvard}<img style="width: 15px;
        padding-left: 5px;
        opacity: 0.8"
        src=${linksymbol}
        />
        </a></h2>
        <h3>${coord.adress}</h3>
      </div>`
    });
    google.maps.event.addListener(marker, 'click', function() {
      if (currentInfoWindow != null) {
        currentInfoWindow.close();
      }
      infowindow.open(map, marker);
      currentInfoWindow = infowindow;
    });
    google.maps.event.addListener(map, "click", function(event) {
      infowindow.close();
    });
  });

  var mcOptions = {gridSize: 10, maxZoom: 12, imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'};
  var markerCluster = new MarkerClusterer(map, markers, mcOptions);

});

window.filterMarkers = function(el){
  let id = el.value;

  if(el.checked){
    let filteredMarkers = markers.filter((item) => {
      return item.hyresvardID == id;
    })
    filteredMarkers.forEach((item) => {
      item.setVisible(true);
    })
  } else {
    let filteredMarkers = markers.filter((item) => {
      return item.hyresvardID == id;
    })
    filteredMarkers.forEach((item) => {
      item.setVisible(false);
    })
  }
}

$(".kartanlogo").attr("src", kartanlogo2.png);


$('.js-navigation__toggle').click(function(){
  $('.navigation__toggle').toggleClass('navigation__toggle--active');
  $(".checkboxes").slideToggle("fast");
});

$(window).resize(function(){
 if($(window).width() > 768){
  $('.checkboxes').css('display', 'block');
  $('.navigation__toggle').removeClass('navigation__toggle--active');
 }
});

$(window).resize(function(){
 if($(window).width() < 768){
  $('.checkboxes').css('display', 'none');
  $('.navigation__toggle').removeClass('navigation__toggle--active');
 }
});
