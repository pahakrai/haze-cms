import React from 'react';
import ScriptLoader from '../../../Components/Common/ScriptLoader';
// get searchAddress array {value,text}, by regionsDisplay + inputValue
const searchAddress = (regionsDisplay = [], inputValue, resCallback) => {
  const GoogleMaps = window.google && window.google.maps;
  if (GoogleMaps) {
    const displaySuggestions = (predictions, status) => {
      if (status !== GoogleMaps.places.PlacesServiceStatus.OK) {
        return;
      } else {
        let data = predictions.map(prediction => ({
          value: prediction.place_id,
          label: prediction.description
        }));
        data = data.filter(d => d.value && d.label);
        if (resCallback) resCallback(data);
      }
    };

    // remove region text if inputValue already include
    const _regions = regionsDisplay.filter(region => {
      return !inputValue.includes(region);
    });

    const service = new GoogleMaps.places.AutocompleteService();
    service.getQueryPredictions(
      {
        input: _regions.length
          ? _regions.join(' ') + ' ' + inputValue
          : inputValue
      },
      displaySuggestions
    );
  }
};

// get coordinates, by selectedValue
const selectAddress = (selectedValue, resCallback) => {
  const request = {
    placeId: selectedValue,
    fields: ['geometry']
  };
  const GoogleMaps = window.google && window.google.maps;
  if (GoogleMaps) {
    const map = new GoogleMaps.Map(document.getElementById('map'));
    const service = new GoogleMaps.places.PlacesService(map);
    service.getDetails(request, (place, status) => {
      if (status === GoogleMaps.places.PlacesServiceStatus.OK) {
        var latitude = place.geometry.location.lat();
        var longitude = place.geometry.location.lng();
        if (resCallback) {
          resCallback({
            coordinates: [longitude, latitude]
          });
        }
      }
    });
  }
};

// Get location by coordinates
// @coordinates Array [lat, lng]
const getLocationByCoordinates = (map, coordinates, callback) => {
  try {
    const [lat, lng] = coordinates;
    const GoogleMaps = window.google && window.google.maps;
    if (!GoogleMaps) {
      console.log('GoogleMaps services no found!');
    }
    const service = new GoogleMaps.places.PlacesService(map);
    const request = {
      query: ' ',
      locationBias: { lat, lng }, //new GoogleMaps.LatLng({ lat, lng }),
      fields: [
        'formatted_address',
        'geometry',
        'icon',
        'name',
        'business_status',
        'photos',
        'place_id',
        'plus_code',
        'types'
      ]
    };
    service.findPlaceFromQuery(request, function (results, status) {
      if (typeof callback === 'function') {
        callback(results, status);
      }
    });
  } catch (e) {
    console.log('getLocationByCoordinates error ' + e);
    return undefined;
  }
};

const GOOGLE_MAP_SRC = `https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAP_API_KEY}&libraries=places&language=`;

// need render script tag or other render Comp
const loadMapEngineScript = (display_language = 'en', onLoad) => (
  <ScriptLoader
    src={GOOGLE_MAP_SRC + display_language}
    type="text/javascript"
    async
    onLoad={onLoad}
  />
);

export default {
  self: () => window.google,
  searchAddress,
  selectAddress,
  loadMapEngineScript,
  getLocationByCoordinates
};
