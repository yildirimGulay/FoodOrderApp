import React from 'react';

import {NavigationContainer} from '@react-navigation/native';

import {StackNav} from './StackNav';


export const Navigator = () => {
  return (
    <NavigationContainer>
      <StackNav />
    </NavigationContainer>
  );
};
