
var mapb = L.map('map').setView([48.44662504010023, 1.4896774291992188], 10);
		L.tileLayer('https://{s}.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoiaW5rc2t1bCIsImEiOiJGbkIzS0tzIn0.TN2mHvnJddvOViOBxdPRbw', {
			maxZoom: 18,
			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
			id: 'inkskul.ldf5pb15'
		}).addTo(mapb);
var infob = L.control();
function stylec(feature) {
    return {
        fillColor: getColorc(feature.properties.insee % 5),
        weight: 1,
        opacity: 1,
        color: 'black',
        dashArray: '3',
        fillOpacity: 0.5
    };
}
function getColorc(d) {
    return d == 0  ? '#f7f7f7' :
           d == 1  ? '#d9d9d9' :
           d == 2  ? '#bdbdbd' :
           d == 3  ? '#969696' :
           d == 4  ? '#636363' :
           d == 5  ? '#252525' :
                      '#FFEDA0';
}

geojson2 = L.geoJson(communes, {
		style: stylec	
		}).addTo(mapb);
		
		
		infob.onAdd = function (mapb) {
			this._div = L.DomUtil.create('div', 'info');
			this.update();
			return this._div;
		};

function nonconnub(result) {
		if (result) {
			return result +' %'
		} else {
			return 'Non connu'
}}
		
		
function listcandb(props) {
	var text='';
	for	(index = 0; index < props.dcandidats.candidats.length; index++) {
		var cdt=props.dcandidats.candidats[index]
		if (cdt.nomp) {
		text +=  cdt.nomp+' ' + nonconnub(cdt.resultat) +'<br />'+
												'<span class="candidat" style="font-size: 8pt;" >'+cdt.couple[0]+ '<br />'+
												cdt.couple[1]+ '<br /><br /></span>';
						}
	}
	return text;
}
		infob.update = function (props) {
			this._div.innerHTML = '<h4>R\u00e9sultats</h4>' +  (props ?
				'<b> canton : ' + props.nom + '</b><br /><br />' + 
				'Inscrits : '+ props.inscrits + '<br />' + 
				'Votants : ' + props.votants +'<br />' + 
				'Blancs et nuls : '+ props.bl_et_nuls +'<br /><br />'+
				listcandb(props)
				: 'd\u00e9placez le curseur <br /> sur la carte');
		};

		infob.addTo(mapb);

function getColorb(d) {
    return d == 2 ? '#800026' :
           d == 4 ? '#E31A1C' :
           d == 5   ? '#FD8D3C' :
           d == 6  ? '#FED976' :
           d == 11 ? '#800026' :
           d == 12  ? '#BD0026' :
                      '#FFEDA0';
}

function styleb(feature) {
    return {
        fillColor: getColorb(feature.properties.num_canton),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.3
    };
}


		function highlightFeatureb(e) {
			var layer = e.target;

			layer.setStyle({
				weight: 5,
				color: '#666',
				dashArray: '',
				fillOpacity: 0.7
			});

			layer.openPopup();
			if (!L.Browser.ie && !L.Browser.opera) {
				layer.bringToFront();
			}

			infob.update(layer.feature.properties);
		}

		var geojsonb;

		function resetHighlightb(e) {
			geojsonb.resetStyle(e.target);
			infob.update();
		}

		function zoomToFeature(e) {
			mapb.fitBounds(e.target.getBounds());
		}

		function onEachFeatureb(feature, layer) {
			layer.on({
				mouseover: highlightFeatureb,
				mouseout: resetHighlightb,
				click: zoomToFeature
			});
			//console.log(feature.properties.geo_point_2d)
			a=L.marker(feature.properties.geo_point_2d,{icon: new L.divIcon({html: '<div>' +  feature.properties.nom + '</di>',iconSize: null, className: 'label'} )}).addTo(mapb);

		}

		geojsonb = L.geoJson(cantons, {
			style: styleb,
			onEachFeature: onEachFeatureb
		}).addTo(mapb);
