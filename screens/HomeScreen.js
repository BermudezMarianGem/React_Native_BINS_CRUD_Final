import React, {useState, useEffect} from 'react';
import {View, RefreshControl, SafeAreaView, Button, Text, ScrollView, TouchableOpacity, StyleSheet, ActivityIndicator, FlatList} from 'react-native';
import { openDatabase } from 'react-native-sqlite-storage';

const db = openDatabase({
    name: 'recordDB',
    location: 'default'
});

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const HomeScreen = ( {navigation} ) => {

    //
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        getRecords();
        wait(1000).then(()=> setRefreshing(false));
    },[]);
    //
    const [firstname, setFirstname] = useState('');
    const [middlename, setMiddlename] = useState('');
    const [lastname, setLastname] = useState('');
    const [occupation, setOccupation] = useState('');
    const [birthdate, setBirthdate] = useState('');
    const [civilstatus, setCivilStatus] = useState('');
    const [sitio, setSitio] = useState('');
    const [records, setRecords] = useState([]);

    const createTable = () => {
        db.transaction(txn => {
            txn.executeSql(
                'CREATE TABLE IF NOT EXISTS records (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname VARCHAR(50), middlename VARCHAR(50), lastname VARCHAR(50), occupation VARCHAR(50), birthdate VARCHAR(50), civilstatus VARCHAR(50), sitio VARCHAR(50))',
                [],
                (sqlTxn, res) => {
                  //console.log("table created successfully");
                },
                error => {
                  console.log("error: " + error.message)
                }
            );
        });
    }

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

    useEffect(() => {
        createTable();
        getRecords();
      }); 

    return(
        <View>
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}>
            <Text>Barangay Information Management System</Text>
            <View>
                <Text>Resident Record List</Text>
                <View>
                <FlatList 
                    data={ records }
                    renderItem = {({ item }) => (
                    <View>
                        <TouchableOpacity onPress={() => { navigation.navigate('RecordDetailScreen', {item:item} ); }}>
                        <Text style={{ color: item.color }}>{ item.firstname }</Text>
                        </TouchableOpacity>
                    </View>
                    )}
                    />
                </View>
            </View>
            </ScrollView>
            <TouchableOpacity style = {styles.addButton} onPress={() => { navigation.navigate('AddResident'); }}>
                <Text style = {{ color: 'white' }}>Add Record</Text>
            </TouchableOpacity>
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
    addButton: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    right: 30,
    bottom: -50,
    backgroundColor: '#15D005',
    borderRadius: 50,
    },
    input: {
    padding: 2,
    height: 40,
    backgroundColor: '#E8E8E8',
    borderRadius: 10,
    shadowRadius: 10,
    fontSize: 14,
    textAlign:'center',
    color: 'black',
    },
})

export default HomeScreen;