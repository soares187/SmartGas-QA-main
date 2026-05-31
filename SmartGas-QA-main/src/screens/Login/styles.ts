
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
    paddingVertical: 20 
  },
  headerTitle: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    color: theme.colors.header, 
    marginBottom: 20 
  },
  blueCard: { 
    width: '90%', 
    minHeight: 580, 
    backgroundColor: theme.colors.primary, 
    borderRadius: 35, 
    padding: 25, 
    alignItems: 'center' 
  },
  logoContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginTop: 20 
  },
  brandName: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: 'white' 
  },
  subtitle: { 
    color: 'white', 
    textAlign: 'center', 
    marginVertical: 20, 
    fontSize: 16 
  },
  requirementText: { 
    color: theme.colors.secondary, 
    fontSize: 12, 
    fontWeight: 'bold', 
    marginBottom: 5, 
    alignSelf: 'flex-start' 
  },
  errorText: { 
    color: 'white', 
    backgroundColor: theme.colors.errorBg, 
    padding: 5, 
    borderRadius: 5, 
    fontSize: 12, 
    textAlign: 'center', 
    marginBottom: 10, 
    width: '100%' 
  },
  loginButton: { 
    backgroundColor: theme.colors.secondary, 
    width: '100%', 
    height: 55, 
    borderRadius: 10, 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginTop: 10 
  },
  loginButtonText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold' 
  },
  linkText: { 
    color: 'white', 
    marginTop: 20, 
    textDecorationLine: 'underline' 
  },
  createAccountBtn: { 
    marginTop: 40, 
    marginBottom: 20 
  },
  createAccountText: { 
    color: 'white', 
    fontSize: 18, 
    fontWeight: 'bold', 
    textDecorationLine: 'underline' 
  },
});