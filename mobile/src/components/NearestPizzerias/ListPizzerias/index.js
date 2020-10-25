import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import StoreService from '../../../services/store_service';
import StarRating from 'react-native-star-rating';

const Separator = () => {
  <View style={ styles.separator } />
}

const ListPizzerias = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearestStores();
  }, []);

  async function loadNearestStores() {
    try {
      const response = await StoreService.index(props.latitude, props.longitude);
      setStores(response.data);
    } catch (error) {
      setStores([]);
    }
  }

  return (
    <ScrollView style={ styles.container }>
      {
        stores.map((store, index) => {
          return (
            <View style={{ flex: 1 }} key={ index }>
              <Text style={ styles.store_name }>{ store.name }</Text>

              <Text style={ styles.store_address }>{ store.address }</Text>

              <View style={{ flexDirection: 'row' }}>
                <StarRating 
                  disabled={ true }
                  maxStars={ 5 }
                  rating={ store.average_rating }
                  fullStarColor='yellow'
                  starSize={ 20 }
                />  

                <Text style={{ color: 'white', marginLeft: 10, fontSize: 12 }}>
                  { store.ratings_count } opiniões
                </Text>
              </View>
            </View>
          )
        })
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 300
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  store_name: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12
  },
  store_address: {
    color: 'white',
    fontSize: 9
  }
})

export default ListPizzerias;