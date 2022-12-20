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
            <Text>Barangay Information Management System</Text>
            <View>
                <Text>Edit Resident</Text>
                <View>
                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setFirstname(text)] }
                    placeholder='Enter First Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.firstname}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setMiddlename(text)] }
                    placeholder='Enter Middle Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.middlename}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setLastname(text)] }
                    placeholder='Enter Last Name'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.lastname}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setOccupation(text)] }
                    placeholder='Enter Occupation'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.occupation}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setBirthdate(text)] }
                    placeholder='Enter Birthdate'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.birthdate}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setCivilStatus(text)] }
                    placeholder='Enter Civil Status'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.civilstatus}
                    />

                    <TextInput 
                    style = { styles.input }
                    onChangeText = { (text) => [setSitio(text)] }
                    placeholder='Enter Sitio'
                    placeholderTextColor= 'gray'
                    maxLength={30} 
                    defaultValue = {route.params.sitio}
                    />

                    <TouchableOpacity style = {styles.btn} onPress={ updateRecords }>
                        <Text style = { styles.btnText }>Update Record</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'rgb(80, 140, 2)',
    color: 'white',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 100
    },
})

export default EditResidentScreen;