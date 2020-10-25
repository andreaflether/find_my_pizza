import React, { useState, useEffect } from 'react';  
import EstablishmentsService from '../../services/google_establishments';
import Ratings from './Ratings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import '../../styles.css';

import styled from 'styled-components';

const LeftBar = styled.div`
  height: 100%;
  overflow-y: auto; 
  width: 250px;
  position: absolute;
  color: white;
  background-color: rgba(10, 10, 10, 0.95);
  padding: 20px;
`

const Title = styled.h1`
  font-size: 20px; 
  color: #ffc107;
`

const Paragraph = styled.p`
  font-size: 13px; 
  line-height: 14px; 
`

const Image = styled.img`
  height: 150px;
  width: 100%;
`

const Badge = styled.span`
  padding: 2px 5px;
  border-radius: 5px;
  font-size: 15px;
  font-weight: bold;
`

const Info = styled.span`
  display: flex;
`

const Span = styled.span`
  display: inline;
  font-size: 15px;
`

const Establishment = (props) => {
  const  { REACT_APP_GOOGLE_KEY } = process.env;
  const [ establishment, setEstablishment ] = useState([]);

  useEffect(() => {
    getEstablishmentInfo();
  }, [props.place]);

  async function getEstablishmentInfo() {
    try {
      const response = await EstablishmentsService.show(props.place.place_id);
      setEstablishment(response.data.result);

    } catch(error) {
      setEstablishment([]);
      alert("Erro ao carregar estabelecimento.")
    }
  }

  return (
    <LeftBar>
      {
        (establishment.photos) ? 
          <Image src={`
            https://maps.googleapis.com/maps/api/place/photo?photoreference=${establishment.photos[0].photo_reference}&key=${REACT_APP_GOOGLE_KEY}&maxwidth=400
           `}
           alt="Foto do estabelecimento" 
          /> 
          :
          <Image src="/images/no-image.jpg" alt="Nenhuma imagem disponível para este estabelecimento." />
      }
      <Title>{ establishment.name }</Title>

      {
        (establishment.opening_hours) ? 
        <div>
          <Info>
            <Badge className={`badge ${establishment.opening_hours.open_now === true ? "opened" : "closed"}`}>
              { ( establishment.opening_hours.open_now === true ) ? "Aberto" : "Fechado" } 
            </Badge>

            {
              ( establishment.price_level ) ?
              <Span>
                &nbsp; · &nbsp;Faixa de preço:&nbsp;
                  <span className="text-brand bold">
                    { '$'.repeat(Number(establishment.price_level)) }
                  </span>
              </Span>
              :
              null
            }      

          </Info>
          
          <hr />
          {
            establishment.opening_hours.weekday_text.map((schedule, index) => {
              return(
              <Paragraph key={ index }>{ schedule }</Paragraph>
              )
            })
          }
        </div>
        : <Paragraph>Não há registro de horários para este estabelecimento.</Paragraph>
      }
    
    <hr />

    <Info>
      <FontAwesomeIcon icon={ faMapMarkerAlt } color="#ffc107" />
      &nbsp; <p className="medium m-0">{ establishment.formatted_address }</p>

    </Info>

    <hr />
    {
      (establishment.formatted_phone_number) ? 
      <Paragraph>
        <FontAwesomeIcon icon={faPhone} color="#ffc107" />
        &nbsp; { establishment.formatted_phone_number }
      </Paragraph>
      :
      null
    } 

    <Ratings place={ props.place } />
    </LeftBar>
  )
}

export default Establishment;