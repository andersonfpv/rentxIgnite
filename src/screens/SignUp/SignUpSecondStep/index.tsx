import React, { useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import * as Yup from "yup";
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import {
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";

import {
  Container,
  Header,
  Steps,
  Title,
  Subtitle,
  Form,
  FormTitle
} from "./styles";

interface Params {
  user: {
    name: string;
    email: string;
    driverLicense: string;
  }

}

export function SignUpSecondStep() {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const navigation = useNavigation();
  const route = useRoute();
  const theme = useTheme();

  const { user } = route.params as Params;

  function handleBack() {
    navigation.goBack();
  }
  
  function handleRegister() {
    if(!password || !passwordConfirm){
      return Alert.alert('Informe a senha e a confirmação');
    }

    if(password != passwordConfirm){
      return Alert.alert('As senhas não são iguais');
    }
  }

  return (

    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Container>
          <Header>
            <BackButton onPress={handleBack} />
            <Steps>
              <Bullet active />
              <Bullet />
            </Steps>
          </Header>

          <Title>Crie sua {"\n"}conta</Title>
          <Subtitle>
            Faça seu cadastro de{"\n"}
            forma rápida e fácil
          </Subtitle>

          <Form>
            <FormTitle>2. Senha</FormTitle>

            <PasswordInput 
              iconName="lock" 
              placeholder="Senha" 
              onChangeText={setPassword}
              value={password}
            />
            
            <PasswordInput 
              iconName="lock" 
              placeholder="Repetir Senha" 
              onChangeText={setPasswordConfirm}
              value={passwordConfirm}
            />

          </Form>

          <Button 
            title="Cadastrar" 
            color={theme.colors.success}
          />
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}