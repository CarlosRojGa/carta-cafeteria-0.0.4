import { Text, StyleSheet } from 'react-native';

function Footer() {
  return (
    <Text style={styles.footer}>Esto es el footer</Text>
  );
}

const styles = StyleSheet.create({
  footer: {
    textAlign: 'center',
  },
});

export default Footer;

