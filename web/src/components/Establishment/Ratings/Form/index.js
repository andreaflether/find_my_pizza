import React, { useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import styled from 'styled-components';
import RatingService from '../../../../services/ratings';

const Title = styled.h4`
  margin-bottom: 10px;
`

const NewRating = styled.div`
  padding-bottom: 50px;
`

const Input = styled.input`
  margin-bottom: 10px;
  padding: 8px;
  height: 20px;
  width: 90%;
  border-width: 0;
  border-radius: 3px;
`

const TextArea = styled.textarea`
  margin-bottom: 10px; 
  padding: 8px;
  min-height: 40px;
  width: 90%;
  border-width: 0;
  border-radius: 3px;
  resize: vertical;
`

const Button = styled.button`
  color: white;
  background-color: #ffc107;
  width: 90px;
  height: 30px;
  margin-top: 15px;
  border-color: #ffc107;
  font-weight: 800;
  border-radius: 5px;
`

const Form = (props) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [value, setValue] = useState(1);

  async function handleSubmit(e) {
    e.preventDefault();

    const store_params = {
      latitude: props.place.geometry.location.lat, 
      longitude: props.place.geometry.location.lng,
      name: props.place.name,
      address: props.place.formatted_address,
      google_place_id: props.place.place_id
    }

    const rating_params = {
      value: (value == null) ? 1 : value, 
      opinion: message, 
      user_name: name
    }

    await RatingService.create(store_params, rating_params);

    props.loadStore();

    setName('');
    setMessage('');
  }

  return (
    <div>
      <Title>Deixe sua opinião</Title>

      <form onSubmit={ handleSubmit }>
        <Input name="name" 
          type="text"
          placeholder="Seu primeiro nome"
          onChange={(e) => setName(e.target.value)}
          value={name}
        />

        <TextArea name="message" 
          placeholder="Sua opinião"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />

        <div>
          <ReactStars 
            count={5}
            value={value}
            size={24}
            activeColor="#ffd700"
            onChange={(newValue) => {
              setValue(newValue);
            }}
          />

          <Button type="submit">Enviar</Button>
        </div>
      </form>
    </div>
  )
}

export default Form;