import { cadastrar } from '../../services/api';
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
import { styles } from './styles';

export default function CadastroScreen() {
  const router = useRouter();
  
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erroSenha, setErroSenha] = useState(false);

  const handleCadastro = async () => {
    if (senha !== confirmaSenha || senha === '') {
      setErroSenha(true);
      return;
    }

    setErroSenha(false);

    try {
      const resultado = await cadastrar(email, senha);

      if (resultado.erro) {
        alert(resultado.erro);
        return;
      }

      alert('Conta criada com sucesso!');
      router.back();
    } catch (err) {
      alert('Erro ao conectar com o servidor. Verifique sua conexão.');
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
          <View style={styles.blueCard}>
            <Text style={styles.title}>CRIAR CONTA</Text>
            <Text style={styles.subtitle}>Preencha seus dados abaixo</Text>

            <MyInput icon="account-outline" placeholder="Nome Completo" value={nome} onChangeText={setNome} />
            
            <MyInput 
              icon="email-outline" 
              placeholder="E-mail" 
              value={email} 
              onChangeText={setEmail} 
              autoCapitalize="none"
            />

            <MyInput 
              icon="lock-outline" 
              placeholder="Senha" 
              secureTextEntry 
              value={senha} 
              onChangeText={(t) => { setSenha(t); setErroSenha(false); }} 
            />

            <MyInput 
              icon="lock-check-outline" 
              placeholder="Confirmar Senha" 
              secureTextEntry 
              value={confirmaSenha} 
              onChangeText={(t) => { setConfirmaSenha(t); setErroSenha(false); }} 
            />

            {erroSenha && (
              <Text style={styles.requirementText}>As senhas devem ser iguais!</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleCadastro}>
              <Text style={styles.buttonText}>CADASTRAR</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.back()}>
              <Text style={styles.backText}>Voltar</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}