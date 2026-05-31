import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { MyInput } from '../../components/MyInput';
import { theme } from '../../styles/theme';
import { styles } from './styles';

export default function LoginScreen() {
  const router = useRouter(); 
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState(false);

  // Validação simples
  const isEmailValid = email.includes('@') && email.includes('.com');

  const handleLogin = () => {
    if (isEmailValid && password.length >= 6) {
      setLoginError(false);
      router.push('/home'); 
    } else {
      setLoginError(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
          
          <Text style={styles.headerTitle}>PÁGINA DE LOGIN</Text>

          <View style={styles.blueCard}>
            <View style={styles.logoContainer}>
              <Text style={styles.brandName}>SMARTGÁS</Text>
              <MaterialCommunityIcons name="fire" size={35} color={theme.colors.secondary} />
            </View>

            <Text style={styles.subtitle}>
              Bem-vindo ao SmartGás!{"\n"}Acompanhe o seu consumo com segurança.
            </Text>

           
            {email.length > 0 && !isEmailValid && (
              <Text style={styles.requirementText}>E-mail inválido</Text>
            )}

            <MyInput 
              icon="account-outline"
              placeholder="E-mail"
              value={email}
              onChangeText={(t) => { setEmail(t); setLoginError(false); }}
              autoCapitalize="none"
            />

            <MyInput 
              icon="lock-outline"
              placeholder="Senha"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(t) => { setPassword(t); setLoginError(false); }}
              rightIcon={showPassword ? "eye-off" : "eye"}
              onIconPress={() => setShowPassword(!showPassword)}
            />

            
            {loginError && (
              <Text style={styles.errorText}>E-mail ou senha incorretos</Text>
            )}

            <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
              <Text style={styles.loginButtonText}>ENTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push('/senha')}>
              <Text style={styles.linkText}>Esqueceu a senha?</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.createAccountBtn} 
              onPress={() => router.push('/cadastro')}
            >
              <Text style={styles.createAccountText}>Criar conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}