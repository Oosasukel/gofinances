import React from 'react';
import { TextInputProps, TouchableOpacityProps } from 'react-native';
import * as S from './styles';

interface CategorySelectProps {
  title: string;
}

export const CategorySelect = ({ title }: CategorySelectProps) => {
  return (
    <S.Container>
      <S.Category>{title}</S.Category>
      <S.Icon name='chevron-down' />
    </S.Container>
  );
};
