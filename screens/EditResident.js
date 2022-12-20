import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, TextInput} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'recordDB',
    location: 'default'
});

const EditResidentScreen = ( {navigation, route} ) => {

    //
    const [id, setId] = useState(route.params.key);
    const [firstname, setFirstname] = useState(route.params.firstname);
    const [middlename, setMiddlename] = useState(route.params.middlename);
    const [lastname, setLastname] = useState(route.params.lastname);
    const [occupation, setOccupation] = useState(route.params.occupation);
    const [birthdate, setBirthdate] = useState(route.params.birthdate);
    const [civilstatus, setCivilStatus] = useState(route.params.civilstatus);
    const [sitio, setSitio] = useState(route.params.sitio);
    const [records, setRecords] = useState([]);

    const updateRecords = () => {
        if(!firstname) {
          alert('Please First Name')
          return false;
        }
    
        db.transaction(txn => {
          txn.executeSql(
            'UPDATE records SET firstname = ?, middlename = ?, lastname = ?, occupation = ?, birthdate = ?, civilstatus = ?, sitio = ? WHERE id = ?',
            [firstname, middlename, lastname, occupation, birthdate, civilstatus, sitio, id],
            (sqlTxn, res) => {
              navigation.navigate('HomeScreen');
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
                <Text style={styles.title2}>Edit Resident</Text>
                <View style={styles.contentBox}>
                    <Text style={styles.contextText}>Firstname</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setFirstname(text)] }
                    placeholder='Enter First Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue ={route.params.firstname}
                    />
                    <Text style={styles.contextText}>Middlename</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setMiddlename(text)] }
                    placeholder='Enter Middle Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.middlename}
                    />
                    <Text style={styles.contextText}>Lastname</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setLastname(text)] }
                    placeholder='Enter Last Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.lastname}
                    />
                    <Text style={styles.contextText}>Occupation</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setOccupation(text)] }
                    placeholder='Enter Occupation'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.occupation}
                    />
                    <Text style={styles.contextText}>Birthday</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setBirthdate(text)] }
                    placeholder='Enter Birthdate'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.birthdate}
                    />
                    <Text style={styles.contextText}>Civil Status</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setCivilStatus(text)] }
                    placeholder='Enter Civil Status'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.civilstatus}
                    />
                    <Text style={styles.contextText}>Sitio</Text>
                    <TextInput 
                    style={styles.inputBox}
                    onChangeText = { (text) => [setSitio(text)] }
                    placeholder='Enter Sitio'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.sitio}
                    />
                </View>
                <TouchableOpacity style ={styles.editBtn} onPress={ updateRecords }>
                    <Text style={styles.editText}>Update Record</Text>
                </TouchableOpacity>
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
    contentBox: {
      backgroundColor: '#E1CEB5',
      margin: 10,
      borderRadius: 5,
      paddingBottom: 10,
    },
    contextText: {
      marginLeft: 10,
      marginTop: 10,
      fontWeight: 'bold',
      fontSize: 15,
    },
    inputBox: {
      borderWidth: 2,
      borderColor: '#00092C',
      borderRadius: 5,
      marginLeft: 8,
      marginRight: 10,
      marginTop: 5,
      backgroundColor: '#F5EDDC',
      height: 40,
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
})

export default EditResidentScreen;