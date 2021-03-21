import React, {useContext} from 'react';
import {Text,RefreshControl,SectionList,View,ScrollView,TouchableOpacity} from 'react-native';
import {UserLoginInfo} from '../context/userLoginInfo'
import axios from 'axios'
import Book from './book'
import ListOfBooksStyle from '../styles/listOfBooks'
import {useQuery,queryCache} from 'react-query'

const AllAvalibaleBooksAPI = (token) => {
   return axios
    .get("http://localhost:3000/api/v1/all_books", {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })

}
const wait = (timeout) => {
  return new Promise(resolve => setTimeout(resolve, timeout));
}
const Library = ({navigation}) => {
  const {userLoginInfo} = useContext(UserLoginInfo);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => {
      setRefreshing(false);
      queryCache.invalidateQueries('AllBooks');
    });
  }, []);

  const {data, status} = useQuery("AllBooks", async ()=>{ 
      const {data} = await AllAvalibaleBooksAPI(userLoginInfo.token);
      return data;
  });

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={()=>{navigation.push("BookDetails", item)}}>
      <Book  book={item}/>
    </TouchableOpacity>
  );

  
  return (
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
                {title: 'Available', data: data["books"]},
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

export default Library;