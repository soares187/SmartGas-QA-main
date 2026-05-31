import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState, useEffect } from 'react'; // 👈 Adicionado useEffect aqui
import { Alert, SafeAreaView, ScrollView, StatusBar, Switch, Text, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

export default function HomeScreen() {
  const router = useRouter();
  const [gasLevel, setGasLevel] = useState(0); // 👈 Começa em 0 até carregar o sensor
  const [view, setView] = useState('home'); 
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isConnected, setIsConnected] = useState(false); // 👈 Começa como offline até conectar

  // 🌐 FUNÇÃO QUE BUSCA OS DADOS DA SUA API
 // 🌐 FUNÇÃO QUE BUSCA OS DADOS DA SUA API
  useEffect(() => {
    const buscarDadosDoSensor = async () => {
      try {
       const resposta = await fetch('http://192.168.0.79:3000/api/sensor/atual');
        
        if (!resposta.ok) {
          throw new Error('Erro na requisição');
        }

        const dados = await resposta.json();
        console.log("Dados recebidos da API no Front:", dados);

        if (dados && dados.ppm !== undefined) {
          setGasLevel(dados.ppm); 
          setIsConnected(true);
        }
      } catch (error: any) {
        console.log("Erro ao buscar dados do Arduino:", error.message);
        setIsConnected(false);
      }
    };

    // Busca os dados assim que entra na tela
    buscarDadosDoSensor();

    // ⏱️ Atualiza a tela a cada 2 segundos (2000ms) automaticamente
    const intervalo = setInterval(buscarDadosDoSensor, 2000);

    // Limpa o intervalo se o usuário sair da tela
    return () => clearInterval(intervalo);
  }, []);

  const getStatusData = () => {
    if (gasLevel < 300) {
      return { 
        color: '#2E7D32', 
        cardBg: '#4DA0B0', 
        statusBg: '#E8F5E9',
        label: 'SEGURO',
        instruction: null 
      };
    }
    if (gasLevel < 1000) {
      return { 
        color: '#EF6C00', 
        cardBg: '#FFB74D', 
        statusBg: '#FFF3E0',
        label: 'ALERTA',
        instruction: {
          title: '⚠️ Atenção: Risco Leve',
          text: 'Verifique as bocas do fogão e registros de gás. Ventile o ambiente abrindo janelas.'
        }
      };
    }
    return { 
      color: '#C62828', 
      cardBg: '#E57373', 
      statusBg: '#FFEBEE',
      label: 'PERIGO CRÍTICO!',
      instruction: {
        title: '🚨 EMERGÊNCIA DETECTADA',
        text: 'SAIA DO LOCAL IMEDIATAMENTE! Não acenda luzes ou faíscas. Feche o registro geral se possível e ligue para os bombeiros (193).'
      }
    };
  };

  const handleLogout = () => {
    Alert.alert("Sair", "Deseja realmente desconectar?", [
      { text: "Cancelar", style: "cancel" },
      { text: "Sair", onPress: () => router.replace('/') }
    ]);
  };

  const status = getStatusData();
  const bgColor = isDarkMode ? '#121212' : '#F5F7FA';

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: bgColor }]}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerText}>SMARTGÁS</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {view === 'home' ? (
          <View style={{ flex: 1 }}>
            {/* CARD PRINCIPAL */}
            <View style={[styles.mainCard, { backgroundColor: status.cardBg }]}>
              <View style={styles.gaugeContainer}>
                <Text style={styles.valueText}>{gasLevel}</Text>
                <Text style={styles.unitText}>PPM</Text>
              </View>

              <View style={[styles.statusBadge, { backgroundColor: status.statusBg }]}>
                <MaterialCommunityIcons name="alert-decagram" size={18} color={status.color} />
                <Text style={[styles.statusText, { color: status.color }]}>STATUS: {status.label}</Text>
              </View>
            </View>

            <View style={[styles.connectionCard, isDarkMode && { backgroundColor: '#1E1E1E' }]}>
                <View style={[styles.connectionDot, { backgroundColor: isConnected ? '#4CAF50' : '#F44336' }]} />
                <View style={{ flex: 1 }}>
                    <Text style={[styles.connectionLabel, isDarkMode && { color: '#AAA' }]}>DISPOSITIVO</Text>
                    <Text style={[styles.connectionStatus, { color: isConnected ? '#4CAF50' : '#F44336' }]}>
                        {isConnected ? 'Sensor Conectado' : 'Sensor Offline'}
                    </Text>
                </View>
                <MaterialCommunityIcons 
                    name={isConnected ? "wifi" : "wifi-off"} 
                    size={24} 
                    color={isConnected ? '#4CAF50' : '#F44336'} 
                />
            </View>

            {status.instruction && (
              <View style={[
                styles.instructionCard, 
                { 
                  backgroundColor: status.statusBg + 'CC',
                  borderColor: status.color,
                  alignSelf: 'center'
                }
              ]}>
                <Text style={[styles.instructionTitle, { color: status.color }]}>
                  {status.instruction.title}
                </Text>
                <Text style={[styles.instructionText, { color: status.color }]}>
                  {status.instruction.text}
                </Text>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.settingsContainer}>
            <Text style={[styles.headerText, { color: isDarkMode ? 'white' : '#2E5B9A', marginBottom: 20, textAlign: 'left' }]}>
              Configurações
            </Text>
            <View style={[styles.settingItem, isDarkMode && { backgroundColor: '#1E1E1E' }]}>
              <MaterialCommunityIcons name="theme-light-dark" size={24} color={isDarkMode ? "white" : "#666"} />
              <Text style={[styles.settingLabel, { color: isDarkMode ? 'white' : '#333' }]}>Modo Escuro</Text>
              <Switch value={isDarkMode} onValueChange={setIsDarkMode} />
            </View>
            <TouchableOpacity style={[styles.settingItem, styles.logoutItem]} onPress={handleLogout}>
              <MaterialCommunityIcons name="logout" size={24} color="#C62828" />
              <Text style={[styles.settingLabel, { color: '#C62828', fontWeight: 'bold' }]}>Desconectar</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>

      <View style={[styles.bottomTab, isDarkMode && { backgroundColor: '#1E1E1E', borderTopColor: '#333' }]}>
        <TouchableOpacity style={styles.tabItem} onPress={() => setView('home')}>
          <MaterialCommunityIcons name="home" size={28} color={view === 'home' ? "#2E5B9A" : "#999"} />
          <Text style={[styles.tabText, { color: view === 'home' ? "#2E5B9A" : "#999" }]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem} onPress={() => setView('settings')}>
          <MaterialCommunityIcons name="cog" size={28} color={view === 'settings' ? "#2E5B9A" : "#999"} />
          <Text style={[styles.tabText, { color: view === 'settings' ? "#2E5B9A" : "#999" }]}>Configurações</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}