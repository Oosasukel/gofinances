import React from 'react';
import * as S from './styles';

interface Category {
  name: string;
  icon: string;
}

export interface TransactionCardData {
  type: 'positive' | 'negative';
  title: string;
  amount: string;
  category: Category;
  date: string;
}

interface TransactionCardProps {
  data: TransactionCardData;
}

export const TransactionCard = ({
  data: { amount, category, date, title, type },
}: TransactionCardProps) => {
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
