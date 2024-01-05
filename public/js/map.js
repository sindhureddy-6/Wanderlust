mapboxgl.accessToken = mapToken;
  const map = new mapboxgl.Map({
    container: "map", // container ID
    center: coordinates, // starting position [lng, lat]
    zoom: 9, // starting zoom
  });
const popup = new mapboxgl.Popup({ className: 'my-class' }).setText("exact location will be seen after booking!")

// Create a new marker.
const marker = new mapboxgl.Marker({color:"red"})
    .setLngLat(coordinates)
    .setPopup(popup) 
    .addTo(map);
