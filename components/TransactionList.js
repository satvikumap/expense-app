import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const TransactionList = ({ transactions, onSelect, selectedTransactions }) => {
  return (
    <View style={styles.listContainer}>
      {transactions.map((transaction, index) => {
        const isSelected = selectedTransactions.includes(transaction);
        return (
          <TouchableOpacity 
            key={index} 
            onPress={() => onSelect(transaction)} 
            style={[styles.transaction, isSelected && styles.selectedTransaction]}
          >
            <Text style={styles.name}>{transaction.name}</Text>
            <Text style={styles.amount}>{parseFloat(transaction.amount).toFixed(2)}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listContainer: {
    padding: 10,
    backgroundColor: '#f5fff5',
  },
  transaction: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  name: {
    fontSize: 16,
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  selectedTransaction: {
    backgroundColor: '#f0a1a1',
  },
});

export default TransactionList;