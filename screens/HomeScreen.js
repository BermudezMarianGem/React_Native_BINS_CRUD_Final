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
            <Text style = {styles.title1}>Barangay Information Management System</Text>
            <View>
                <Text style = {styles.title2}>Resident Record List</Text>
                <TouchableOpacity style = {styles.addButton} onPress={() => { navigation.navigate('AddResident'); }}>
                  <Text style={styles.btnText}>Add Record</Text>
                </TouchableOpacity>
                  <FlatList 
                      data={ records }
                      renderItem = {({ item }) => (
                        <TouchableOpacity onPress={() => { navigation.navigate('RecordDetailScreen', {item:item} ); }}>
                        <View  style={styles.contentBox}>
                          <Text style={styles.contextText}>{ item.firstname }</Text>
                        </View>
                        </TouchableOpacity>
                      )}
                  />
            </View>
          </ScrollView>
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
    addButton: {
      position: 'absolute',
      width: 133,
      height: 30,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#5F9DF7',
      borderRadius: 10,
      marginTop: 18,
      marginLeft: 250,
    },
    btnText: {
      fontWeight: 'bold',
      color: 'white',
    },
    contentBox: {
      backgroundColor: '#E1CEB5',
      height: 50,
      marginTop: 15,
      marginLeft: 10,
      marginRight: 10,
      borderRadius: 5,
    },
    contextText: {
      fontWeight: 'bold',
      fontSize: 15,
      marginLeft: 10,
      marginTop: 12,
    }
})

export default HomeScreen;