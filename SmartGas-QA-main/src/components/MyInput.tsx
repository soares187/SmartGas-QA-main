
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity, View } from 'react-native';
import { theme } from '../styles/theme';

interface Props extends TextInputProps {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  onIconPress?: () => void;
  rightIcon?: keyof typeof MaterialCommunityIcons.glyphMap;
}

export function MyInput({ icon, onIconPress, rightIcon, ...rest }: Props) {
  return (
    <View style={styles.wrapper}>
      <MaterialCommunityIcons name={icon} size={24} color="white" />
      <TextInput 
        style={styles.input} 
        placeholderTextColor={theme.colors.textLight} 
        {...rest} 
      />
      {rightIcon && (
        <TouchableOpacity onPress={onIconPress}>
          <MaterialCommunityIcons name={rightIcon} size={24} color="white" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: 10,
    width: '100%',
    paddingHorizontal: 15,
    height: 55,
    marginBottom: 15,
    backgroundColor: theme.colors.inputBg,
  },
  input: { flex: 1, color: 'white', marginLeft: 10, fontSize: 16 },
});