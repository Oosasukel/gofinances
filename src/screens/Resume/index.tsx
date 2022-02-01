import React from 'react';
import { HistoryCard } from '../../components/HistoryCard';
import * as S from './styles';

export const Resume = () => {
  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      <HistoryCard title='Compras' amount='R$ 150,50' color='red' />
    </S.Container>
  );
};
