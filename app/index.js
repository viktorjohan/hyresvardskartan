import 'styles/index.scss';
import GoogleMapsLoader from 'google-maps';
import data from './data.js';
import mapstyles from './mapstyles.json';
import googlejson from './geojson.json';


GoogleMapsLoader.KEY = 'AIzaSyC6ab7tJhVBJXSnJKFfKhS0EoMKmedA26o';

var markers = [];

GoogleMapsLoader.load(function(google) {

  const gbg = {lat: 57.70791089999999, lng:11.966317000000004}
  const options = {
    zoom: 16,
    zoomControl: true,
    fullscreenControl: false,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles: mapstyles,
    center: new google.maps.LatLng(57.70791089999999,11.966317000000004)
  }
  const map = new google.maps.Map(document.getElementById('map'), options);

  var currentInfoWindow = null;

  map.data.addGeoJson(googlejson);


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
      maxWidth: 230,
      content: `<h3>${coord.adress}</h3>
                <h4><a>${coord.fastighetsbeteckning}</a></h4>
                <p><a href=${coord.hemsida} target="_blank">${coord.hyresvard}</a></p>`
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


  // var mcOptions = {gridSize: 40, maxZoom: 12, imagePath: 'https://cdn.rawgit.com/googlemaps/js-marker-clusterer/gh-pages/images/m'};
  // var markerCluster = new MarkerClusterer(map, markers, mcOptions);


  window.filterMarkers = function(el){
    let id = el.value;
    // markers.forEach((item) => {
    //   if(el.checked){
    //     if(item.hyresvardID == el.value){
    //       markers.setVisible(true)
    //     }
    //   }
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
    //   markers = filteredMarkers;
    //   // console.log(this.stateMarkers);
    // }
  }



});
