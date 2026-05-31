
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: theme.colors.background },
  scrollContainer: { flexGrow: 1, justifyContent: 'center', alignItems: 'center' },
  blueCard: { 
    width: '90%', 
    backgroundColor: theme.colors.primary, 
    borderRadius: 35, 
    padding: 25, 
    alignItems: 'center',
    elevation: 5 
  },
  title: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 15 },
  subtitle: { color: 'white', textAlign: 'center', marginBottom: 25, fontSize: 16 },
  successText: { 
    color: theme.colors.secondary, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    marginTop: 20,
    fontSize: 14 
  },
  button: { 
    backgroundColor: theme.colors.secondary, 
    width: '100%', 
    height: 55, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  backText: { color: 'white', marginTop: 20, textDecorationLine: 'underline' },
});