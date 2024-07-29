import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const Header = ({ currentDate, totalIncome, totalExpenses, changeDate }) => {
  const netBalance = totalIncome - Math.abs(totalExpenses);
  const monthName = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  return (
    <View style={styles.header}>
      <View style={styles.dateNav}>
        <TouchableOpacity style={styles.arrow} onPress={() => changeDate(-1)}>
          <Icon name="chevron-left" size={100} color="green" />
        </TouchableOpacity>
        <View>

          <Text style={styles.date}>{monthName[currentDate.getMonth()]} {currentDate.getDate()},{currentDate.getFullYear()}</Text>
          <Text style={styles.dateText}>{weekday[currentDate.getDay()]}</Text>
        </View>
        <TouchableOpacity style={styles.arrow} onPress={() => changeDate(1)}>
          <Icon name="chevron-right" size={100} color="green" />
        </TouchableOpacity>
      </View>
      <View style={styles.balanceContainer}>
        <View style={styles.balanceColumn}>
          <Text style={styles.label}>Income: </Text>
          <Text style={styles.balance}>{totalIncome.toFixed(2)}</Text>
        </View>
        <View style={styles.balanceColumn}>
          <Text style={styles.label}> Expenses: </Text>
          <Text style={styles.expense}>{Math.abs(totalExpenses.toFixed(2))}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    padding: 20,
    backgroundColor: '#d9f9d9',
    alignItems: 'center',
  },
  dateNav: {
    flexDirection: 'row',
  },
  date: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign:'center'
  },
  balanceColumn: {
    flex: 1, 
    alignItems: 'center',
  },
  dateText:{
    fontSize:40,
    textAlign:'center',
    fontWeight:'bold'
  },
  balanceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
    width: '100%', 
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  expense: {
    fontSize: 22,
    fontWeight: 'bold',
    color:'red'
  },
  balance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'green',
  },
  negativeBalance: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'red',
  }
});

export default Header;