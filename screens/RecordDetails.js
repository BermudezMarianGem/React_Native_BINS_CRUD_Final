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

    const deleteRecord = () => {
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
            <Text style={styles.title1}>Barangay Information Management System</Text>
            <View>
                <Text style={styles.title2}>Resident Details</Text>
                <View style={styles.contentBox}>
                    <Text style={styles.contentText}>Resident ID: {id}</Text>
                    <Text style={styles.contentText2}>Name: {firstname} {middlename} {lastname}</Text>
                    <Text style={styles.contentText2}>Occupation: {occupation}</Text>
                    <Text style={styles.contentText2}>Birthday: {birthdate}</Text>
                    <Text style={styles.contentText2}>Civil Status: {civilstatus}</Text>
                    <Text style={styles.contentText2}>Sitio: {sitio}</Text>
                </View>
                
                <TouchableOpacity style ={styles.editBtn} onPress={() => { navigation.navigate('EditResident', {
                        key:id, 
                        firstname:firstname, 
                        middlename:middlename, 
                        lastname:lastname, 
                        occupation:occupation,
                        birthdate:birthdate,
                        civilstatus:civilstatus,
                        sitio:sitio
                        } ); }}>
                    <Text style={styles.editText}>Edit Record</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBtn} onPress={ deleteRecord }>
                    <Text style={styles.editText}>Delete Record</Text>
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
    contentText: {
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 10,
        fontSize: 15,
    },
    contentText2:{
        fontWeight: 'bold',
        marginLeft: 10,
        marginTop: 3,
        fontSize: 15,
    },
    editBtn: {
        backgroundColor: '#2192FF',
        width: 120,
        height: 35,
        borderRadius: 5,
        marginLeft: 10,
    },
    editText: {
        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 15,
        color: 'white',
        marginTop: 5,
    },
    deleteBtn: {
        backgroundColor: '#850000',
        width: 120,
        height: 35,
        borderRadius: 5,
        marginLeft: 140,
        marginTop: -35,
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