import React, {useContext,useState} from 'react';
import {Text,ScrollView,RefreshControl,SectionList,View,TouchableOpacity} from 'react-native';
import {UserLoginInfo} from '../context/userLoginInfo'
import axios from 'axios'
import Book from './book'
import {useQuery,queryCache} from 'react-query'
import ListOfBooksStyle from '../styles/listOfBooks'
const allBookReservationAPI = async (token) => {
    const response =  await axios.get("http://localhost:3000/api/v1/my_library", 
        {headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
    }});
    return response;
}
const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}
const MyLibrary = ({navigation}) => {
    const {userLoginInfo} = useContext(UserLoginInfo);
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(2000).then(() => {
          setRefreshing(false);
          queryCache.invalidateQueries('books');
        });
      }, []);

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={()=>{navigation.push("OrderDetails", item)}}>
          <Book book={item}/>
        </TouchableOpacity>
    );

    const {data, status} = useQuery("books", async ()=>{ 
        const {data} = await allBookReservationAPI(userLoginInfo.token);
        return data;
    });
    return( 
        
<>
        {status === "error" && <Text>Error fetching data</Text>}
        {status === "loading" && <Text>Fetching data...</Text>}
        {status === "success" &&
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />
            }>         
            <View style={ListOfBooksStyle.container}>
                <SectionList
                sections={[
                    {title: 'Book you will have', data: data["BookedRegistrations"]},
                    {title: 'Books you have', data: data["HasRegistrations"]},
                ]}
                renderItem={renderItem}
                renderSectionHeader={({section}) => <Text style={ListOfBooksStyle.sectionHeader}>{section.title}</Text>}
                keyExtractor={(item, index) => item.id}
                />  
            </View>
            </ScrollView> 

        }
      
</>
    );
}

export default MyLibrary;
