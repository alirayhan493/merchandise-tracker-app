import { Image, StyleSheet, Platform, Text, View, AppRegistry} from 'react-native';

import App from './app'
import { registerRootComponent } from 'expo';
 
export default function HomeScreen() {
    return (
      <View style={{ flex: 1 }}>
        <View style={styles.container}>
          <App/>
        </View>
      </View>
    );
  }
  
  
        
        
  
  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'white',
    },
});
