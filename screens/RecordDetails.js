import React, {useState, useEffect} from 'react';
import {View, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList, Alert} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'recordDB',
    location: 'default'
});

const RecordDetailScreen = ( {navigation, route} ) => {

    //
    const [id, setId] = useState(route.params.item.key);
    const [firstname, setFirstname] = useState(route.params.item.firstname);
    const [middlename, setMiddlename] = useState(route.params.item.middlename);
    const [lastname, setLastname] = useState(route.params.item.lastname);
    const [occupation, setOccupation] = useState(route.params.item.occupation);
    const [birthdate, setBirthdate] = useState(route.params.item.birthdate);
    const [civilstatus, setCivilStatus] = useState(route.params.item.civilstatus);
    const [sitio, setSitio] = useState(route.params.item.sitio);

    deleteRecord = () => {
        db.transaction(txn => {
          txn.executeSql(
            'DELETE FROM records WHERE id = ?',
            [id],
            (sqlTxn, res) => {
                Alert.alert('Resident Record Deleted successfully!')
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
            <Text>Barangay Information Management System</Text>
            <View>
                <Text>Resident Details</Text>
                <View>
                    <Text>{id}</Text>
                    <Text>{firstname}</Text>
                    <Text>{middlename}</Text>
                    <Text>{lastname}</Text>
                    <Text>{occupation}</Text>
                    <Text>{birthdate}</Text>
                    <Text>{civilstatus}</Text>
                    <Text>{sitio}</Text>

                    <TouchableOpacity onPress={() => { navigation.navigate('EditResident', {
                        key:id, 
                        firstname:firstname, 
                        middlename:middlename, 
                        lastname:lastname, 
                        occupation:occupation,
                        birthdate:birthdate,
                        civilstatus:civilstatus,
                        sitio:sitio
                        } ); }}>
                        <Text style={{ color: 'black' }}>Edit</Text>
                    </TouchableOpacity>
                    <Button
                        title="Delete"
                        color="darkred" 
                        onPress={ () => { deleteRecord() }}
                    />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
    padding: 2,
    height: 40,
    marginBottom: 5,
    marginTop: 5,
    borderColor: 'gray',
    borderBottomWidth: 1.5,
    shadowRadius: 10,
    fontSize: 16,
    color: 'black',
    },
    btnText:{
    color: 'white',
    fontSize: 14,
    padding: 8,
    textAlign: 'center',
    fontWeight: 'bold',
    },
    btn:{
    backgroundColor: 'orange',
    width: 150,
    height: 35,
    borderRadius: 5,
    alignSelf: 'center',
    marginBottom: 100
    },
})

export default RecordDetailScreen;