import React, { useEffect, useState } from 'react';
import StoreService from '../../services/store';
import styled from 'styled-components';
import ReactStars from 'react-rating-stars-component';
import '../../styles.css';

const RightBar = styled.div`
  width: 250px;
  position: absolute;
  color: white;
  right: 0;
  top: 0;
`

const Head = styled.div`
  background-color: rgba(10, 10, 10, 0.9);
  border-radius: 6px;
  padding: 2px;
  text-align: center;
  margin: 10px;
`

const Body = styled.div`
  background-color: rgba(10, 10, 10, 0.9);
  border-radius: 6px;
  padding: 20px;
  height: 450px;
  overflow-y: auto;
  margin: 10px;
`

const Footer = styled.div`
  background-color: rgba(10, 10, 10, 0.9);
  border-radius: 6px;
  padding: 10px 20px 20px 20px;
  font-size: 13px;
  margin: 10px;
`

const EstablishmentItem = styled.div`
  cursor: pointer;
`

const Title = styled.h1`
  font-size: 18px;
  color: #ffc107;
`

const Paragraph = styled.p`
  font-size: 13px;
  line-height: 14px;
` 

const Info = styled.span`
  display: flex;
`

const NearestPizzerias = (props) => {
  const [stores, setStores] = useState([]);

  useEffect(() => {
    loadNearestStores();
  }, [props.latitude]);

  async function loadNearestStores() {
    const response = await StoreService.index(props.latitude, props.longitude);
    setStores(response.data);
  }

  return (
    <RightBar>
      <Head>
        <h3 className="text-brand">Find My Pizza</h3>
      </Head>

      <Body>
        <strong>Populares na região</strong>
        <hr />

        {
          stores.map(store => {
            return (
              <EstablishmentItem key={store.name}>
                <Title>{ store.name }</Title>

                <Paragraph>{ store.address }</Paragraph>

                <Info>
                  <ReactStars size={18} edit={ false } value={ store.rating_average || 0 } />
                  &nbsp; ({ store.total_ratings || 0 } opiniões)

                </Info>
                <hr />
              </EstablishmentItem>
            )
          })
        }
      </Body>

      <Footer>
        <h2>@andreaflether</h2>
        <Paragraph>
          Projeto desenvolvido na Semana Super Full Stack - OneBitCode
        </Paragraph>
      </Footer>
    </RightBar>
  )
}

export default NearestPizzerias;