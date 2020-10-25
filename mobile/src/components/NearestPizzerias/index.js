import React, { useState } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHeart, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import ListPizzerias from './ListPizzerias';

const Separator = () => (
  <View style={ styles.separator } />
);

const NearestPizzerias = (props) => {
  const [showDropdownButton, setShowDropdownButton] = useState(false);

  return (
    <View style={ styles.container }>
      <TouchableOpacity
        style={ styles.button }
        onPress={() => (setShowDropdownButton(!showDropdownButton)) }
      >
        <Text style={ styles.text }>Find My Pizza</Text>
        <FontAwesomeIcon icon={ faHeart } color='white' style={{ marginRight: 5 }} />
        <FontAwesomeIcon icon={ faAngleDown } color='white' />

      </TouchableOpacity>
      {
        showDropdownButton == true &&
        <View style={ styles.nearestPizzerias }>
          <Text style={ styles.title }>Pizzarias mais populares próximas a você</Text>

          <Separator />

          <ListPizzerias latitude={ props.latitude } longitude={ props.longitude } />
        </View>
      }
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
    flex: 1,
    width: 370,
  },
  button: {
    height: 30,
    backgroundColor: '#ffc107',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    justifyContent: 'space-between',
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 20,
  },
  nearestPizzerias: {
    backgroundColor: '#343a40',
    width: 190,
    marginTop: 5,
    borderRadius: 5,
    padding: 10,
  },
  title: {
    color: '#ffc107',
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: 'white',
    borderBottomWidth: StyleSheet.hairlineWidth,
  }
})

export default NearestPizzerias;