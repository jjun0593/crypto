import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { fetchCoins } from '../api';

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;
const Header = styled.header`
    height: 10vh;
    display: flex;
    align-items: center;
    justify-content: center;
`;
const CoinsList = styled.ul``;
const Coin = styled.li`
    background-color: white;
    font-weight: bold;
    color: ${props => props.theme.bgColor};
    margin-bottom: 10px;
    border-radius: 15px ;
    a{
        transition: color 0.3s ease-in;
        display: flex;
        align-items: center;
        padding: 20px;
    }
    &:hover {
        a{
            color: ${props => props.theme.accentColor};
        }
    }
`;
const Title = styled.h1`
    color: ${props => props.theme.accentColor};
`;
const Loader = styled.span`
    text-align: center;
    display: block;
`;
const Img = styled.img`
    width: 25px;
    height: 25px;
    margin-right: 10px;
`;


interface ICoins {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

function Coins() {
    const { isLoading, data } = useQuery<ICoins[]>("allCoins", fetchCoins);

    return (

        <Container>
            <Header>
                <Title>Coins</Title>
            </Header>
            {isLoading ? <Loader>Loading....</Loader> : (
                <CoinsList>
                    {data?.slice(0, 100).map(coin => (
                        <Coin key={coin.id}>
                            <Link to={`/${coin.id}`} state={{ name: coin.name }} >
                                <Img src={`https://cryptocurrencyliveprices.com/img/${coin.id}.png`} />
                                {coin.name} &rarr;</Link>
                        </Coin>
                    ))}
                </CoinsList>
            )
            }
        </Container >
    );
}

export default Coins;