// App.tsx

import React, { useEffect, useState } from 'react';
import { SafeAreaView, TextInput, Button, View, Text, StyleSheet, Image } from 'react-native';
import Card from './card';
import * as ImagePicker from 'expo-image-picker'
import RNPickerSelect from 'react-native-picker-select';

const App: React.FC = () => {
  const [upc, setUpc] = useState<string>('');
  const [generatedUpc, setGeneratedUpc] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [departmentNum, setDepartmentNum] = useState<string>('')
  const [brandName, setBrandName] = useState<string>('');
  const [imageUri, setImageUri]= useState<string | null>(null);
  const [cards, setCards] = useState<Array<{upc: string; type: string; brandName: string; departmentNum: string, imageUri: string | null}>>([]);


  useEffect(() => {
    (async () => {
      const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if(status !== 'granted'){
        alert('Sorry, we need camera roll permissions to make this!');

      }
    })();
  }, []);

  const handleGenerateUpc = () => {
    if(!upc || !type || !brandName || !imageUri){
      alert("Please fill all fields before generating a card")
    } else {
      const newCard = {upc, type, brandName, departmentNum, imageUri}
      setCards([...cards, newCard])
      setUpc('')
      setType('')
      setBrandName('')
      setDepartmentNum('')
      setImageUri(null)
    }
    setGeneratedUpc(upc);
  };

  const handleChooseImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets![0].uri);
    }
  }

  const handleDeleteCard = (index: number) => {
    setCards(cards.filter((_, i) => i !== index));
  }


  

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter UPC"
          keyboardType="numeric"
          value={upc}
          onChangeText={setUpc}
        />

        <RNPickerSelect
          onValueChange={(value) => setType(value)}
          items={[
            { label: 'Home', value: 'Home'},
            { label: 'RTW', value: 'RTW'},
            { label: 'Handbags', value: 'Handbags'},
            { label: 'Shoes', value: 'Shoes'},
            { label: 'Jewelry', value: 'Jewelry'},
            { label: 'Kids', value: 'Kids'},
            { label: 'Mens', value: 'Mens'},
          ]}
          placeholder={ {label: "Select Product Type", value: null}}
          value={type}
          style={pickerSelectStyles}
        />

        <TextInput
          style= {styles.input}
          placeholder='Enter Brand Name'
          value={brandName}
          onChangeText={setBrandName}
        />

        <TextInput
          style= {styles.input}
          placeholder='Enter deparment number'
          value={departmentNum}
          onChangeText={setDepartmentNum}
        />

      </View>
      

      <Button title='Choose Image' onPress={handleChooseImage} />
      <Button title="Generate UPC" onPress={handleGenerateUpc} />
      <Text>Selected Image:</Text>
      {imageUri && (
        <Image source={{uri: imageUri}} style={styles.imageSelect} />
        )}

      


      {cards.map((card, index) => (
        <Card key={index} type={card.type} brandName={card.brandName} departmentNum = {card.departmentNum} upc={card.upc} imageUri={card.imageUri} onDelete={() => handleDeleteCard(index)} />
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    width: '100%',
    paddingHorizontal: 8,
  },
  barcodeContainer: {
    marginTop: 24,
    alignItems: 'center',
  },
  image: {
    width: 100,
    height: 100,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8
  },
  imageSelect:{
    width: 100,
    height: 50,
    marginTop: 12,
    marginBottom: 12,
    borderRadius: 8

  },
  inputContainer:{
    backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
  },
  pickSelect: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
    width: '100%',
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30,
    marginBottom: 12,
    width: '100%',
  },
});
  

export default App;
