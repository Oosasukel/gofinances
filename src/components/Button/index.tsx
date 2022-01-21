import React from 'react';
import { TextInputProps, TouchableOpacityProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import * as S from './styles';

interface ButtonProps extends RectButtonProps {
  title: string;
}

export const Button = ({ title, onPress, ...rest }: ButtonProps) => {
  return (
    <S.Container {...rest} onPress={onPress}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
