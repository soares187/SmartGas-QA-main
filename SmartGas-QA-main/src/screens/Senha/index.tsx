
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { MyInput } from '../../components/MyInput';
import { styles } from './styles';

export default function EsqueceuSenhaScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [enviado, setEnviado] = useState(false);

  const handleEnviar = () => {
    if (email.includes('@')) {
      
      setEnviado(true);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.blueCard}>
          <Text style={styles.title}>RECUPERAR SENHA</Text>
          
          <Text style={styles.subtitle}>
            Informe seu e-mail para receber as instruções de recuperação.
          </Text>

          <MyInput 
            icon="email-outline" 
            placeholder="Seu e-mail cadastrado" 
            value={email} 
            onChangeText={(t) => { setEmail(t); setEnviado(false); }}
            autoCapitalize="none"
          />

          <TouchableOpacity style={styles.button} onPress={handleEnviar}>
            <Text style={styles.buttonText}>ENVIAR</Text>
          </TouchableOpacity>

          
          {enviado && (
            <Text style={styles.successText}>
              Verifique seu e-mail! Enviamos um link de recuperação.
            </Text>
          )}

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.backText}>Voltar ao Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}