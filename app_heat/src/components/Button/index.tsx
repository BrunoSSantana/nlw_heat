import React from 'react';

import { ColorValue, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { styles } from './styles';

type Props = TouchableOpacityProps & {
  title: string
  color: ColorValue
  backgroundColor: ColorValue
}

export function Button({ backgroundColor, color, title, ...rest }: Props){
  return (
    <TouchableOpacity
      style={[styles.container, { backgroundColor }]}
      {...rest}
    >
      <Text style={[styles.title, { color }]}>
        {title}
      </Text>
    </TouchableOpacity>
  );  
}