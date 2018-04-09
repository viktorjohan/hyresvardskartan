import 'styles/index.scss';
import GoogleMapsLoader from 'google-maps';
import data from './data.js';
import mapstyles from './mapstyles.json';
import googlejson from './geojson.json';
import $ from 'jquery';

GoogleMapsLoader.KEY = 'AIzaSyC6ab7tJhVBJXSnJKFfKhS0EoMKmedA26o';


var markers = [];

GoogleMapsLoader.load(function(google) {

  const gbg = {lat: 57.70791089999999, lng:11.966317000000004}
  const options = {
    zoom: 14,
    zoomControl: true,
    fullscreenControl: false,
    mapTypeControlOptions: {
      mapTypeIds: []
    },
    styles: mapstyles,
    center: new google.maps.LatLng(57.703054,11.960645)
  }
  const map = new google.maps.Map(document.getElementById('map'), options);

  var currentInfoWindow = null;

  // map.data.addGeoJson(googlejson);
  //
  // map.data.setStyle(function(feature) {
  //   var color;
  //   if (feature.getProperty('color')) {
  //     color = feature.getProperty('color');
  //   }
  //   return ({
  //     fillColor: color,
  //     fillOpacity: 0.6,
  //     strokeColor: "lightgrey",
  //     strokeWeight: 5
  //   });
  // });


  // map.data.addListener('click', function(event) {
  //   document.getElementById('info-box').textContent =
  //   event.feature.getProperty('hyresvard');
  // });
  //
  // map.data.addListener('click', function(event) {
  //   document.getElementById('info-box2').textContent =
  //   event.feature.getProperty('fastighetsbeteckning');
  // });
  //
  // map.data.addListener('click', function(event) {
  //   document.getElementById('iconen').src =
  //   event.feature.getProperty('icon');
  // });

  var infowindow = new google.maps.InfoWindow();

  // map.data.addListener('click', function(event) {
  //   var myIcon = event.feature.getProperty("icon");
  // 	var myHyresvard = event.feature.getProperty("hyresvard");
  //   var myAdress = event.feature.getProperty("adress");
  //   var myHemsida = event.feature.getProperty("hemsida");
  //   var myFastighetsbeteckning = event.feature.getProperty("fastighetsbeteckning");
  //   var myContent = `
  //     <div class="infowindow">
  //       <h1>
  //         <a href="${myHemsida}" target='_blank'>
  //           <img style="width: 17px; padding-right: 1px; opacity: 0.7" src="../assets/images/linksymbol.svg" />
  //           ${myHyresvard}
  //         </a>
  //       </h1>
  //       <h3>${myAdress}</h3>
  //     </div>`
  // 	infowindow.setContent(myContent);
  // 	// infowindow.setPosition(event.feature.getGeometry().get());
  //   infowindow.setPosition(event.feature.getProperty("LatLng"));
  // 	infowindow.setOptions({pixelOffset: new google.maps.Size(0,-5)});
  // 	infowindow.open(map);
  //   google.maps.event.addListener(map, "click", function(event) {
  //     infowindow.close();
  //   });
  // });





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
        ${coord.hyresvard}<img style="width: 15px; padding-left: 5px; opacity: 0.8" src="../assets/images/linksymbol2.svg" /></a></h2>
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

// console.log(googlejson.features);

// document.getElementById('tabort').addEventListener('click', function(){
//   googlejson.features['0'].setStyle({visible: false});
// })
//
//   document.getElementById('visa').addEventListener('click', function(){
//     map.data.setStyle(function(feature) {
//       var color;
//       if (feature.getProperty('color')) {
//         color = feature.getProperty('color');
//       }
//       return ({
//         fillColor: color,
//         fillOpacity: 0.6,
//         strokeColor: "lightgrey",
//         strokeWeight: 5
//       });
//     });
//   })



  // console.log(googlejson.features);

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
  }

});



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
