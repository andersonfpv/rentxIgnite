import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg'

import { Car } from '../../components/Car';

import {
    Container, 
    Header, 
    TotalCars,
    HeaderContent,
    CarList
} from './styles';

export function Home(){
    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
    },
    thumbnail: 'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png'
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

            <CarList
                data={[1,2,3,4,5,6]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={carData}/>} 
            />

        </Container>
    );
}