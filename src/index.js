import "./css/styles.css";

import tt from "@tomtom-international/web-sdk-maps"
import toxicStyle from "./js/toxic";
import ipLocation from "./js/ipLocation";
import jsLocation from "./js/jsLocation";
import jsWatchLocation from "./js/jsWatchLocation";

import templateRoot from './hbs/root.hbs';
import templateMap from './hbs/map.hbs';

// use root template, apply to "app" div
let appEl = document.getElementById("app");
let mainEl;
appEl.innerHTML = templateRoot({ siteInfo: { title: "Map" } });

window.onload = () => {
	mainEl = document.getElementById("main");
	mainEl.innerHTML = templateMap({});


	ipLocation().then((json) => {
		initMap(json);
	});
};

let map;
let initMap = (location) => {
	tt.setProductInfo("test-demo", "0.0.1");
	map = tt.map({
		key: "yGAHDK7KSva4J6KDjwBtsLmFGFb0AHE9",
		container: "map",
		style: toxicStyle,
		center: [location.lng, location.lat],
		zoom: 12,
		pitch: 10
	});

	// jsWatchLocation((pos) => {
	// let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
	// 	// console.log(pos);
	// });


	jsLocation((pos) => {
		let jsMarker = new tt.Marker().setLngLat([pos.longitude, pos.latitude]).addTo(map);
	});

	let marker = new tt.Marker().setLngLat([location.lng, location.lat]).addTo(map);
	marker.getElement().addEventListener('click', function (e) {
		map.easeTo({ center: marker.getLngLat(), zoom: 14, pitch: 45, bearing: 45, duration: 2000 });
		e.stopPropagation();
	});

	// document.getElementById("map").addEventListener('click', function () {
	// 	map.easeTo({ center: marker.getLngLat(), zoom: 12, pitch: 10, bearing: 0, duration: 2000 });
	// });



	// map.setBearing(0);

	// var marker = new tt.Marker().setLngLat([-75.737609, 45.455313]).addTo(map);


	var popup = new tt.Popup({ className: 'popup' })
		.setHTML("<h1>Hello I'm a Popup!</h1>")
		.addTo(map);

	// marker.setPopup(popup);
	// marker.getElement().addEventListener("click", function () {
	// 	console.log("marker clicked");
	// });

};