import React from 'react';
import { categories } from '../../utils/categories';
import * as S from './styles';

export interface TransactionCardData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard = ({
  data: { amount, category: categoryKey, date, name: title, type },
}: TransactionCardProps) => {
  const [category] = categories.filter((item) => item.key === categoryKey);

  return (
    <S.Container>
      <S.Title>{title}</S.Title>

      <S.Amount type={type}>
        {type === 'negative' && '- '}
        {amount}
      </S.Amount>

      <S.Footer>
        <S.Category>
          <S.Icon name={category.icon} />
          <S.CategoryName>{category.name}</S.CategoryName>
        </S.Category>
        <S.Date>{date}</S.Date>
      </S.Footer>
    </S.Container>
  );
};
