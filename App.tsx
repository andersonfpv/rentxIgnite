import React from 'react';
import AppLoading from 'expo-app-loading';
import { ThemeProvider } from 'styled-components';
import { 
  useFonts,
  Inter_400Regular,
  Inter_500Medium
} from '@expo-google-fonts/inter';
import { 
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
} from '@expo-google-fonts/archivo';
import { SchedulingDetails } from './src/screens/SchedulingDetails';
import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({ // carrega as fontes e disponibiliza para toda a aplicação
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  });

  if(!fontsLoaded){ //Se as fontes não forem carregadas vamos segurar a tela de splash até que mude essa condição
    return <AppLoading />;
  }
  
  return (
    <ThemeProvider theme={theme}>
      <SchedulingDetails />
    </ThemeProvider>
  )
}
