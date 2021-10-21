import React from 'react';
import { LinearGradient } from 'expo-linear-gradient'
import { Image } from 'react-native';

import avatarImg from '../../assets/avatar.png'

import { styles } from './styles';
import { COLORS } from '../../theme';

const sizes = {
  small: {
    containerSize: 32,
    avatarSize: 28
  },
  normal: {
    containerSize: 48,
    avatarSize: 42
  }
}

const avatarDefault = Image.resolveAssetSource(avatarImg).uri

type Props = {
  imageUri: string | undefined
  size?: 'small' | 'normal'
}

export function UserPhoto({ imageUri, size = 'normal' }: Props){
  const { avatarSize, containerSize } = sizes[size]
  return (

    <LinearGradient
      colors={[COLORS.PINK, COLORS.YELLOW]}
      start={{x: 0, y: 0.8}}
      end={{x: 0.9, y: 1}}
      style={[
        styles.container,
        {
          width: containerSize,
          height: containerSize,
          borderRadius: containerSize / 2,
        }
      ]}
    >
      <Image 
      source={{ uri: imageUri || avatarDefault }}
      style={[
        styles.avatar,
        {
          width: avatarSize,
          height: avatarSize,
          borderRadius: avatarSize / 2,
        }
      ]}
      />
    </LinearGradient>

  );
}