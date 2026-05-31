
import { StyleSheet } from 'react-native';
import { theme } from '../../styles/theme';

export const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: theme.colors.background 
  },
  scrollContainer: { 
    flexGrow: 1, 
    justifyContent: 'center', 
    alignItems: 'center', 
    paddingVertical: 40 
  },
  blueCard: { 
    width: '90%', 
    backgroundColor: theme.colors.primary, 
    borderRadius: 35, 
    padding: 25, 
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  title: { 
    fontSize: 28, 
    fontWeight: 'bold', 
    color: 'white', 
    marginBottom: 10 
  },
  subtitle: { 
    color: 'white', 
    textAlign: 'center', 
    marginBottom: 30, 
    fontSize: 14,
    lineHeight: 20
  },
  requirementText: { 
    color: theme.colors.secondary, 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    alignSelf: 'flex-start' 
  },
  button: { 
    backgroundColor: theme.colors.secondary, 
    width: '100%', 
    height: 55, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 20 
  },
  buttonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  backText: { 
    color: 'white', 
    marginTop: 20, 
    textDecorationLine: 'underline',
    fontSize: 16
  },
});