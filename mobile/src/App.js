import React, { useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Alert, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import EstablishmentService from './services/establishment_service';
import Establishment from './components/Establishment';
import NearestPizzerias from './components/NearestPizzerias';

export default function App() {
  const [latitude, setLatitude] = useState(0);
  const [longitude, setLongitude] = useState(0);
  const [locations, setLocations] = useState([]);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('É necessário habilitar a localização para utilizar este app corretamente.')
      } else {
        let location = await Location.getCurrentPositionAsync({});
        setLatitude(location.coords.latitude);
        setLongitude(location.coords.longitude);
      }
    })();

    loadPizzerias();
  }, [])

  async function loadPizzerias() {
    try {
      const response = await EstablishmentService.index(latitude, longitude);
      setLocations(response.data.results);
      console.log(response.data);
    } catch(erro) {
      setLocations([]);
      Alert.alert('Erro ao carregar pizzarias.')
    }
  }
  
  return (
    <View style={ styles.container }>
      <NearestPizzerias latitude={ latitude } longitude={ longitude } />
      { (selected) && <Establishment place={ selected } /> }
      <MapView 
        style={ styles.map }
        region={ 
          {
            latitude: latitude,
            longitude: longitude,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }
        }
      >
        <Marker 
          title="Sua localização" 
          coordinate= {
            {
              latitude: latitude,
              longitude: longitude
            }
          }
        >
          <Image     
            source={require('./images/pin_map.png')}
          />
        </Marker> 

        {
          locations.map(item => {
            return ( 
              <Marker 
                key={ item.place_id }
                title={ item.name }
                coordinate= {
                  {
                    latitude: item.geometry.location.lat,
                    longitude: item.geometry.location.lng
                  }
                }
                onPress={ () => setSelected(item) }
              >
                <Image 
                  source={require('./images/pizza.png')}
                />
              </Marker>
            )
          })
        }

       
        
      </MapView>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    zIndex: 0
  },
  map: {
    height: '100%',
    width: '100%'
  }
});
