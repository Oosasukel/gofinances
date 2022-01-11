import React from 'react';
import { TextInputProps, TouchableOpacityProps } from 'react-native';
import * as S from './styles';

interface ButtonProps extends TouchableOpacityProps {
  title: string;
}

export const Button = ({ title, ...rest }: ButtonProps) => {
  return (
    <S.Container {...rest}>
      <S.Title>{title}</S.Title>
    </S.Container>
  );
};
