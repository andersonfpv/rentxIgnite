import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';

import Animated, { 
    useSharedValue
 } from 'react-native-reanimated';

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
    CarList,
    MyCarsButton
} from './styles';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);


    const navigation = useNavigation();
    const theme = useTheme();

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetails', { car });
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
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
                        Total de {cars.length} Carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            { loading ? <Load /> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                        <Car data={item} onPress={() => handleCarDetails(item)}/>
                    } 
                />
            }

            <MyCarsButton onPress={handleOpenMyCars}>
                <Ionicons 
                    size={32}
                    name="ios-car-sport"
                    color={theme.colors.shape}
                />
            </MyCarsButton>

        </Container>
    );
}