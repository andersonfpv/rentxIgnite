import React, { useState, useEffect } from "react";
import { Alert } from "react-native";
import { format } from "date-fns";
import { Feather } from '@expo/vector-icons';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { useNetInfo } from "@react-native-community/netinfo";

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Acessory';
import { Button } from '../../components/Button';
import { CarDTO } from '../../dtos/CarDTO';
import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { getPlatformDate } from "../../utils/getPlatformDate";
import { api } from "../../services/api";

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  RentalPeriod,
  Accessories,
  Footer,
  CalendaIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceDetails,
  RentalPriceQuota,
  RentalPriceTotal
} from "./styles";

interface Params {
  car: CarDTO;
  dates: string[];
}

interface RentalPeriod{
    start: string;
    end: string;

}

export function SchedulingDetails() {
    const [loading, setLoading] = useState(false);
    const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
    const [carUpdate, setCarUpdate] = useState<CarDTO>({} as CarDTO); 

    const netInfo = useNetInfo();
    const theme = useTheme();  
    const navigation = useNavigation();
    const route = useRoute();
    const { car, dates } = route.params as Params;

    const rentTotal = Number(dates.length * car.price);

    async function handleConfirmRental() {
        setLoading(true);
        
        await api.post('rentals', {
            user_id: 1,
            car_id: car.id,
            start_Date: new Date(dates[0]),
            end_Date: new Date(dates[dates.length - 1]),
            total: rentTotal
        })
        .then(() => {
            navigation.navigate('Confirmation', {
                nextScreenRoute: 'Home',
                title: 'Carro Alugado!',
                message: `Agora você só precisa ir\naté a concessionária da RENTX\npegar o seu automóvel.`
            });
        })
        .catch(() => {
            Alert.alert('Não foi possível confirmar o agendamento.');
            setLoading(false);
        })
    }

  function handleBack(){
    navigation.goBack();
  }

  useEffect(() => {
      setRentalPeriod({
          start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
          end: format(getPlatformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'),
      })
  },[]);

   useEffect(() => {
     async function fetchOnlineData() {
       const response = await api.get(`cars/${car.id}`);
       setCarUpdate(response.data);
     }

     if (netInfo.isConnected === true) {
       fetchOnlineData();
     }
   }, [netInfo.isConnected]);

  return (
    <Container>
        <Header>
            <BackButton onPress={handleBack}/>
        </Header>

        <CarImages>
           <ImageSlider 
                imagesUrl={
                    !!carUpdate.photos ? 
                    carUpdate.photos : [{ id: car.thumbnail, photo: car.thumbnail }]
                }          
            />
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>
                <Rent>
                    <Period>{car.period}</Period>
                    <Price>R$ {car.price}</Price>
                </Rent>
            </Details>

            {
                carUpdate.accessories &&
                <Accessories>
                    {
                    carUpdate.accessories.map(accessory => (
                        <Accessory 
                        key={accessory.type}
                        name={accessory.name}
                        icon={getAccessoryIcon(accessory.type)}
                        />
                    ))
                    }
                </Accessories>
            }

            <RentalPeriod>
                <CalendaIcon>
                    <Feather 
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />
                </CalendaIcon>
                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>{rentalPeriod.start}</DateValue>
                </DateInfo>

                <Feather 
                    name="chevron-right"
                    size={RFValue(10)}
                    color={theme.colors.text}
                />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue>{rentalPeriod.end}</DateValue>
                </DateInfo>

            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$ ${car.price} x ${dates.length} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>

        </Content>

        <Footer>
            <Button 
                title="Alugar Agora" 
                color={theme.colors.success} 
                onPress={handleConfirmRental}
                enabled={!loading}
                loading={loading} 
            />
        </Footer>

    </Container>
  );
}