import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet ,Text} from 'react-native';

const TransactionInput = ({  onSave }) => {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');


  const handleSave = () => {
    if (name && amount) {
      onSave({ name, amount: parseFloat(amount) });
      setName('');
      setAmount('');
    }
  };

  return (
    <View style={styles.inputContainer}>
    <View>
      <Text style={styles.text}>New:-</Text>
    </View>
    <View style={{flexDirection:'row'}}> 
    <TextInput
        style={styles.input}
        placeholder="Detail"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Price"
        value={amount}
        onChangeText={setAmount}
        keyboardType="numeric"
      />
      <Button title="Save" onPress={handleSave} color="green" /></View>
     
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#d9f9d9',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  text:{
      textAlign:'left',
      fontWeight: 'bold',
      paddingBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    flex: 1,
    marginRight: 10,
    backgroundColor: '#fff',
  },
});

export default TransactionInput;
