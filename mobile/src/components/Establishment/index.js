import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Image, ScrollView, Button, Linking, Platform, TouchableOpacity } from 'react-native';

import EstablishmentService from '../../services/establishment_service';
import Ratings from './Ratings';
import openMap from 'react-native-open-maps';

import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight, faTimes, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Env from '../../../env';

const googleKey = Env.googleKey;

console.log(Env.googleKey)
const Separator = () => (
  <View style={ styles.separator } />
  )

  const Establishment = (props) => {
  function dialCall(number) {
    let phoneNumber = '';
    if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
    else {phoneNumber = `telprompt:${number}`; }
    Linking.openURL(phoneNumber);
  };

  function openGps() {
    openMap({ 
      latitude: establishment.geometry.location.lat,  
      longitude: establishment.geometry.location.lng, 
      end: establishment.formatted_address });
}

  const [establishment, setEstablishment] = useState(null);

  useEffect(() => {
    getEstablishmentInfo();
  }, [props.place]); 

  async function getEstablishmentInfo() {
    try {
      const response = await EstablishmentService.show(props.place.place_id);
      setEstablishment(response.data.result);
    } catch (error) {
      setEstablishment([]);
    }
  }

  console.log(establishment);

  return (
    <View style={ styles.container }>
      {
        establishment != null &&
        <View style={ styles.background }>
          <ScrollView style={{ height: 600 }}>
            <View style={{ marginHorizontal: 25 }}>
              <View style={{ alignSelf: 'flex-end' }}>
                <TouchableOpacity 
                  onPress={ () => setEstablishment(null) } 
                >
                  <FontAwesomeIcon 
                    icon={ faTimes } 
                    color='white' size={ 20 } 
                    style={{ marginBottom: 10 }} 
                  />
                  
                </TouchableOpacity>
              </View>

              {
                ( establishment.photos ) ? 
                  <Image 
                    style={ styles.photo } 
                    source={{ uri: `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${establishment.photos[0].photo_reference}&sensor=false&key=${googleKey}` }}
                    alt="Perfil do Estabelecimento"
                  />
                  :
                  <Image style={ styles.photo } source={ require('../../images/no-image.jpg')} />
              }

              <Text style={ styles.title }>{ props.place.name }</Text>

              {
                ( establishment.opening_hours ) ? 
                  <View>
                    <View style={
                      styles.inlineItems
                    }> 
                    
                    <View style={( establishment.opening_hours.open_now === true ) ? styles.opened : styles.closed }>
                      <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 12 }}>
                        {( establishment.opening_hours.open_now === true ) ? 'Aberto' : 'Fechado' }
                      </Text> 
                    </View>
                    {
                      ( establishment.price_level ) ?
                      <Text style={{ color: 'white', marginTop: 8 }}>
                        &nbsp; · &nbsp;Faixa de preço:&nbsp;
                        <Text style={{ fontWeight: 'bold', color: '#ffc107' }}>
                          { '$'.repeat(Number(establishment.price_level)) }
                        </Text>
                      </Text>
                      :
                      null
                    }           
                    </View>
                    
                    <Separator />

                    {
                      establishment.opening_hours.weekday_text.map(schedule => {
                        return (
                          <Text 
                          key={ schedule } 
                          style={{ color: 'white' }}
                          >
                              { schedule }
                          </Text>
                        )
                      })
                    }
                  </View>
                : 
                <View>
                  <Separator />

                  <Text style={{ color: 'white' }}>Não há informações sobre o horário de funcionamento.</Text>
                </View>
              }

              <Separator />
              
              <View style={{ 
                justifyContent: 'flex-start', 
                flexDirection: 'row', 
                display: 'flex', 
              }}>
                <FontAwesomeIcon icon={ faMapMarkerAlt } style= {{ color: '#ffc107', marginTop: 5, marginRight: 7 }} />
                <Text style={{ color: 'white', fontSize: 15 }}>
                  { establishment.formatted_address }
                </Text>
              </View>
              <TouchableOpacity     
                onPress={ () => openGps() }
              >
              <View style={{ 
                flexDirection: 'row', 
                display: 'flex', 
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: 5
              }}>

                <Text style={{ 
                  color: '#ffc107', 
                  fontWeight: 'bold', 
                  marginRight: 5,
                }}
                >
                  Abrir local no mapa
                </Text>
                <FontAwesomeIcon icon={ faArrowRight } color='#ffc107' />
              </View>
              </TouchableOpacity>

              <Separator />
              
              {
                (establishment.formatted_phone_number) ? 
                <TouchableOpacity
                  style={ styles.button }
                  onPress={ ()=> { dialCall(establishment.formatted_phone_number) }}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  Entrar em contato
                </Text>
              </TouchableOpacity>
                :
                null
              } 
              
              <Separator />

              <Ratings place={ props.place } />
            </View>
          </ScrollView>
          <View style={ styles.footer }>
            <Text style={{ color: 'white', marginLeft: 10, fontSize: 11}}>Pizzaria selecionada</Text>
          </View>
        </View>
      }
    </View>    
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 40,
    zIndex: 1,
    flex: 1,
    width: '80%',
    alignSelf: 'center'
  },
  background: {
    backgroundColor: '#212529',
    paddingTop: 20,
    borderRadius: 20
  },
  photo: {
    height: 200,
    width: '100%'
  },
  title: {
    color: '#ffc107',
    fontSize: 20,
    marginTop: 10,
    fontWeight: 'bold'
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  footer: {
    flexDirection: 'row',
    paddingLeft: 20,
    backgroundColor: '#393939',
    padding: 10,
    marginTop: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20
  },
  opened: {
    backgroundColor: '#28a745',
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 10,
    borderRadius: 5
  },
  closed: {
    backgroundColor: '#dc3545',
    flexDirection: 'row', 
    alignSelf: 'flex-start',
    paddingHorizontal: 5,
    paddingVertical: 2,
    marginTop: 10,
    borderRadius: 5
  },
  button: {
    height: 30,
    backgroundColor: '#ffc107',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginVertical: 10
  },
  inlineItems: { 
    justifyContent: 'flex-start', 
    flexDirection: 'row', 
    display: 'flex',
    alignItems: 'center' 
  }
});

export default Establishment;