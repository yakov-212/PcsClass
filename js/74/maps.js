(async function () {
  'use strict';


  const { Map, InfoWindow } = await google.maps.importLibrary('maps');
  const { AdvancedMarkerElement/*, PinElement*/ } = await google.maps.importLibrary('marker');
  const bmg = { lat: 40.096044749672394, lng: -74.22197586384449 };
  const searchInput = document.querySelector('#search');
  const geonamesApiKey = 'slubowsky';
  const placesList = document.querySelector('#places');


  const map = new Map(document.getElementById('map'), {
    center: bmg,
    zoom: 18,
    mapTypeId: google.maps.MapTypeId.SATELLITE,
    mapId: 'DEMO_MAP_ID'
  });


  const infoWindow = new InfoWindow();


  document.querySelector('#go').addEventListener('click', async () => {
    try {
      const r = await fetch(`http://api.geonames.org/wikipediaSearch?q=${searchInput.value}&maxRows=10&username=${geonamesApiKey}&type=json`);
      if (!r.ok) {
        throw new Error(`${r.status} - ${r.statusText}`);
      }
      const places = await r.json();
      console.log(places);


      const bounds = new google.maps.LatLngBounds();


      places.geonames.forEach(place => {
        const position = { lat: place.lat, lng: place.lng };


        /*const pin = new PinElement({
          scale: 1.5,
          background: '#FBBC04',
          borderColor: '#137333',
          glyphColor: 'white',
          glyphText: place.title
        });*/


        let img;
        if (place.thumbnailImg) {
          img = document.createElement('img');
          img.src = place.thumbnailImg;
          img.alt = place.title;
          img.className = 'place-picture';
        }


        const marker = new AdvancedMarkerElement({
          map,
          position,
          title: place.title,
          //content: pin.element
          content: img
        });


        marker.addListener('click', () => {
          infoWindow.setContent(`${place.summary} <a href="https://${place.wikipediaUrl}" target="_blank">more info...</a>`);
          infoWindow.open({
            anchor: marker
          });
        });


        bounds.extend(position);


        const li = document.createElement('li');
        li.innerHTML = `<div><span>${place.title}</span>
                        <img src="${place.thumbnailImg || 'default.jpeg'}"/></div>
                        <div class="summary">${place.summary}</div>`;


        li.addEventListener('click', async () => {
          const currentSummary = document.querySelector('.active .summary');
          if (currentSummary) {
            currentSummary.parentElement.className = 'visited';
            //currentSummary.style.display = 'none';
          }


          li.className = 'active';
          //li.querySelector('.summary').style.display = 'block';


          map.setZoom(3);
          //setTimeout(() => map.panTo(position), 1500);
          //setTimeout(() => map.setZoom(18), 3000);


          await doAfter(() => map.panTo(position), 1500);
          await doAfter(() => map.setZoom(18), 1500);
        });


        placesList.appendChild(li);
      });


      map.fitBounds(bounds);
    } catch (e) {
      console.error(e);
    }
  });




  function doAfter(action, after) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        action();
        resolve();
      }, after);
    });
  }
}());
