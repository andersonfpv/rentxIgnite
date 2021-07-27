import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {
    Container, 
    Header, 
    TotalCars,
    HeaderContent
} from './styles';

export function Home(){
    const carDataOne = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
    },
    thumbnail: 'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png'
    }

    const carDatatwo = {
        brand: 'Porsche',
        name: 'Panamera',
        rent: {
            period: 'Ao dia',
            price: 120,
    },
    thumbnail: 'https://catalogo.webmotors.com.br/imagens/prod/347468/PORSCHE_PANAMERA_2.9_V6_EHYBRID_4_PDK_3474681900348621.png?s=fill&w=440&h=330&q=80&t=true'
    }

    return (
        <Container>
            <StatusBar 
                barStyle="light-content"
                backgroundColor="transparent"
                translucent // faz com que o Header comece a partir do inicio da tela e não depois do statusbar
            />
            <Header>
                <HeaderContent>
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de 12 Carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <Car data={carDataOne}/>
            <Car data={carDatatwo}/>
        </Container>
    );
}
