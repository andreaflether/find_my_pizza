import React, { Fragment, useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import Establishment from './components/Establishment';
import NearestPizzerias from './components/NearestPizzerias';

import EstablishmentsService from './services/google_establishments';

function App() {
  const  { REACT_APP_GOOGLE_KEY } = process.env;

  const [latitude, setLatitude] = useState(0); 
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState({});

  useEffect(() => {
    setCurrentLocation();
  }, [])

  async function setCurrentLocation() {
    await navigator.geolocation.getCurrentPosition(function(position) {
      setLatitude(position.coords.latitude);
      setLongitude(position.coords.longitude);
      loadPizzerias();
    }, function(error) {
      alert("É necessário habilitar a localização para utilizar este app corretamente.");
    })
  }

  async function loadPizzerias() {
    const response = await EstablishmentsService.index(latitude, longitude);
    setLocations(response.data.results);
  }

  return (
    <Fragment>
      <LoadScript googleMapsApiKey={ REACT_APP_GOOGLE_KEY }>
        <GoogleMap 
          mapContainerStyle={{ height: '100vh', width: '100%' }}
          zoom={ 15 }
          center={{ lat: latitude, lng: longitude }}
        >
          { 
            locations.map((item, index) => {
              return(
                <Marker 
                  key={ index } 
                  icon="/images/pizza-pin.png" 
                  title={ item.name } 
                  animation="4" 
                  position={{ lat: item.geometry.location.lat, lng: item.geometry.location.lng}}
                  onClick={() => setSelected(item)}
                />
              )
            })
          }
          {
            selected.place_id && (
              <Establishment place={selected} />
            )
          }
          <Marker 
            key="Minha localização" 
            title="Seu local" 
            animation="2"
            icon="/images/pin-map.png"
            position={{ lat: latitude, lng: longitude }}
          />

          {
            (latitude != 0 && longitude != 0) &&
              <NearestPizzerias latitude={ latitude} longitude={ longitude }/>
          }
        </GoogleMap>
      </LoadScript>
    </Fragment>
  );
}

export default App;
