import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'recordDB',
    location: 'default'
});

const AddResidentScreen = ( {navigation} ) => {

    //
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [occupation, setOccupation] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [civilstatus, setCivilStatus] = useState('');
    const [sitio, setSitio] = useState('');
    const [records, setRecords] = useState([]);

    const getRecords = () => {
        db.transaction(txn => {
          txn.executeSql(
            'SELECT * FROM records ORDER BY id DESC',
            [],
            (sqlTxn, res) => {
    
              let len = res.rows.length;
    
              if(len > 0){
                let results = [];
    
                for (let i = 0; i < len; i++){
                  let item = res.rows.item(i);
    
                  results.push({ key: item.id, firstname: item.firstname, middlename: item.middlename, lastname: item.lastname, occupation: item.occupation, birthdate: item.birthdate, civilstatus: item.civilstatus, sitio: item.sitio });
                }
    
                setRecords(results);
              }
              
            },
            error => {
              console.log("error: " + error.message)
            }
          );
        });
    }

    const addResident = () => {
        if(firstname.length == 0) {
            alert('Enter First Name')
            return false;
        }
        if(middlename.length == 0) {
            alert('Enter Middle Name')
            return false;
        }
        if(lastname.length == 0) {
            alert('Enter Last Name')
            return false;
        }
        if(occupation.length == 0) {
            alert('Enter Occupation')
            return false;
        }
        if(birthdate.length == 0) {
            alert('Enter Birthdate (MM/DD/YYYY)')
            return false;
        }
        if(civilstatus.length == 0) {
            alert('Enter Civil Status')
            return false;
        }
        if(sitio.length == 0) {
            alert('Enter Sitio')
            return false;
        }
    
        db.transaction(txn => {
          txn.executeSql(
            'INSERT INTO records (firstname, middlename, lastname, occupation, birthdate, civilstatus, sitio) VALUES (?, ?, ?, ?, ?, ?, ?)',
            [firstname, middlename, lastname, occupation, birthdate, civilstatus, sitio],
            (sqlTxn, res) => {
                setFirstname('');
                setMiddlename('');
                setLastname('');
                setOccupation('');
                setBirthdate('');
                setCivilStatus('');
                setSitio('');
                getRecords();
                alert('Resident Successfully Saved!');
                navigation.goBack();
            },
            error => {
              console.log("may error: " + error.message)
            }
          );
        });
    } 

    return(
        <View>
            <Text style={styles.title1}>Barangay Information Management System</Text>
            <View>
                <Text style={styles.title2}>Add Resident</Text>
                <View>
                    <Text style={styles.contextText}>Firstname: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setFirstname(text)] }
                        placeholder='Enter Firstname'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Middlename: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setMiddlename(text)] }
                        placeholder='Enter Middlename'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Lastname: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setLastname(text)] }
                        placeholder='Enter Lastname'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Occupation: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setOccupation(text)] }
                        placeholder='Enter Occupation'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Birthday: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setBirthdate(text)] }
                        placeholder='Enter Birthdate'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Civil Status: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setCivilStatus(text)] }
                        placeholder='Enter Civil Status'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />
                    <Text style={styles.contextText}>Sitio: </Text>
                    <TextInput 
                        style = { styles.input }
                        onChangeText = { (text) => [setSitio(text)] }
                        placeholder='Enter Sitio'
                        placeholderTextColor= 'gray'
                        maxLength={30} 
                    />

                    <TouchableOpacity style = {styles.editBtn} onPress={ addResident }>
                        <Text style = {styles.editText}>Add Record</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    title1: {
        fontWeight: 'bold',
        fontSize: 18,
        alignSelf: 'center',
        padding: 10,
        backgroundColor: '#002E94',
        color: 'white',
        borderRadius: 10,
        marginTop: 10,
    },
    title2:{
        fontWeight: 'bold',
        fontSize: 17,
        marginTop: 20,
        marginLeft: 10,
    },
    contextText: {
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        fontSize: 16,
    },
    input: {
    padding: 2,
    height: 40,
    marginBottom: 5,
    marginLeft: 10,
    marginRight: 10,
    marginTop: 5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    fontSize: 16,
    color: 'black',
    },
    editBtn: {
    backgroundColor: '#2192FF',
    width: 120,
    height: 35,
    borderRadius: 5,
    marginLeft: 130,
    },
    editText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        marginTop: 5,
    },
    dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    },
    placeholderStyle: {
    fontSize: 16,
    color: 'gray',
    },
    selectedTextStyle: {
    fontSize: 16,
    color: 'black',
    },
})

export default AddResidentScreen;