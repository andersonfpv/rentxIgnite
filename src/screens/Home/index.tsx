import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
    Container, 
    Header, 
    TotalCars,
    HeaderContent,
    CarList
} from './styles';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation();

    const carData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent: {
            period: 'Ao dia',
            price: 120,
    },
    thumbnail: 'https://www.motortrend.com/uploads/sites/10/2018/05/2018-audi-rs5-4wd-coupe-angular-front.png'
    }

    function handleCarDetails() {
        navigation.navigate('CarDetails');
    }

    useEffect(() => {
        async function fetchCars() {
            try{
                const response = await api.get('/cars');
                setCars(response.data);
            }catch (error){
                console.log(error)
            }finally{
                setLoading(false);
            }
        }

        fetchCars();
    },[]);

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

            { loading ? <Load /> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <Car data={item} onPress={handleCarDetails}/>
                    } 
                />
            }

        </Container>
    );
}