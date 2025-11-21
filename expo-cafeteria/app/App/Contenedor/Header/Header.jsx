import { View, Text, StyleSheet } from 'react-native';

function Header() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>CAMPER CAFE</Text>
      <Text style={styles.h2}>Est. 2020</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  h1: {
    textAlign: 'center',
    paddingTop: 10,
    marginBottom: 0,
    fontSize: 32,
    fontWeight: 'bold',
  },
  h2: {
    textAlign: 'center',
    fontStyle: 'italic',
    fontWeight: '300',
    fontSize: 16,
    marginTop: 0,
  },
});

export default Header;

