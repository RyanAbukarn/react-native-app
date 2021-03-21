import React from 'react';
import { Ionicons } from '@expo/vector-icons';


export default function LeftHeaderButton( {navigation} ) {

  const openMenu = () => {
    navigation.openDrawer()
  }
  return (
    <Ionicons
    name={'md-menu'}
    size={24}
    style={{ marginLeft: 10 }}
    onPress={openMenu}/>
  );
}
