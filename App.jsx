import React, { useState, useEffect } from 'react';
import { View, ScrollView, StyleSheet, Alert, StatusBar, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from './components/Header';
import TransactionList from './components/TransactionList';
import TransactionInput from './components/TransactionInput';

const App = () => {
  const [transactions, setTransactions] = useState({});
  const [selectedTransactions, setSelectedTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const itemCount = (transactions[currentDate.toDateString()] || []).length;

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('transactions');
        if (jsonValue != null) {
          setTransactions(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error('Failed to load transactions.');
      }
    };
    loadTransactions();
  }, []);

  useEffect(() => {
    const saveTransactions = async () => {
      try {
        const jsonValue = JSON.stringify(transactions);
        await AsyncStorage.setItem('transactions', jsonValue);
      } catch (e) {
        console.error('Failed to save transactions.');
      }
    };
    saveTransactions();
  }, [transactions]);

  const handleSaveTransaction = (transaction) => {
    const dateString = currentDate.toDateString();
    const dateTransactions = transactions[dateString] || [];

    const type = transaction.amount < 0 ? 'expense' : 'income';
    const formattedTransaction = { ...transaction, type };

    const totalIncome = dateTransactions.filter(t => t.type === 'income').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);
    const totalExpenses = dateTransactions.filter(t => t.type === 'expense').reduce((acc, curr) => acc + parseFloat(curr.amount), 0);


    setTransactions({ ...transactions, [dateString]: [...dateTransactions, formattedTransaction] });
  
    setSelectedTransactions([]);
  };

  const handleDeleteTransaction = () => {
    const dateString = currentDate.toDateString();
    const dateTransactions = transactions[dateString] || [];
    const updatedTransactions = dateTransactions.filter(item => !selectedTransactions.includes(item));
    setTransactions({ ...transactions, [dateString]: updatedTransactions });
    setSelectedTransactions([]);
  };

  const handleSelectTransaction = (transaction) => {
    setSelectedTransactions((prevSelected) => {
      if (prevSelected.includes(transaction)) {
        return prevSelected.filter(item => item !== transaction);
      } else {
        return [...prevSelected, transaction];
      }
    });
  };

  const totalIncome = (transactions[currentDate.toDateString()] || [])
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const totalExpenses = (transactions[currentDate.toDateString()] || [])
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + parseFloat(curr.amount), 0);

  const changeDate = (days) => {
    const newDate = new Date(currentDate);
    newDate.setDate(newDate.getDate() + days);
    setCurrentDate(newDate);
    setSelectedTransactions([]);
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="green"/>
      <Header 
        currentDate={currentDate} 
        totalIncome={totalIncome} 
        totalExpenses={totalExpenses} 
        changeDate={changeDate}
        itemCount={itemCount}
        onDelete={handleDeleteTransaction}
      />
      <View style={styles.border}></View>
      <View style={styles.itemCountContainer}>
        <Text style={styles.itemCount}>Items: {itemCount}</Text>
        <Button 
          title="Delete" 
          onPress={handleDeleteTransaction} 
          color={selectedTransactions.length > 0 ? 'red' : 'gray'} 
          disabled={selectedTransactions.length === 0}
        />
      </View>
      <ScrollView style={styles.transactionListContainer}>
        <TransactionList 
          transactions={transactions[currentDate.toDateString()] || []} 
          onSelect={handleSelectTransaction} 
          selectedTransactions={selectedTransactions}
        />
      </ScrollView>
      <TransactionInput 
        onSave={handleSaveTransaction} 
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  border: {
    margin: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#ddd',
  },
  transactionListContainer: {
    flex: 1,
  },
  itemCountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  itemCount: {
    fontSize: 16,
    marginRight: 10,
  },
});

export default App;
