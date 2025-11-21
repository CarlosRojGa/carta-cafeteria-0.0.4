import { View, StyleSheet } from 'react-native';

function Spacer() {
  return <View style={styles.spacer} />;
}

const styles = StyleSheet.create({
  spacer: {
    backgroundColor: 'red',
    height: 2,
    width: '90%',
    alignSelf: 'center',
    marginVertical: 8,
  },
});

export default Spacer;
