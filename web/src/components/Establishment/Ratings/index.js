import React, { Fragment, useEffect, useState } from 'react';
import Form from './Form';
import StoreService from '../../../services/store';
import ReactStars from 'react-rating-stars-component';

import styled from 'styled-components';

const Title = styled.h4`
  margin-bottom: 10px;
` 

const Ratings = (props) => {
  const [store, setStore] = useState([]);

  useEffect(() => {
    loadStore();
  }, [props.place]);

  async function loadStore() {
    setStore([]);
    try {
      const response = await StoreService.show(props.place.place_id);
      setStore(response.data);
    } catch (error) {
      setStore([]);
    }
  }

  return (
    <Fragment>
      <Title>
        { store.total_ratings || 0 } opiniões
        { store.average_rating && <ReactStars edit={ false } value={ store.average_rating || 0 } /> }
      </Title>

      <hr />

      {
        store.ratings &&
        <div>
          {
            store.ratings.map((rating, index) => {
              return (
                <div key={ index }>
                  <strong>{ rating.user_name }</strong>
                  <ReactStars edit={ false } value={ rating.value } />
                  <p>{ rating.opinion }</p>
                  <small>{ rating.created_at }</small>
                  <hr />
                </div>
              )
            })
          }
        </div>
      }

      <Form place={props.place} loadStore={loadStore}/>
    </Fragment>
  )
}

export default Ratings;
