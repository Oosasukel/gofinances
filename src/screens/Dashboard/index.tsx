import React from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import * as S from './styles';

export const Dashboard = () => {
  return (
    <S.Container>
      <S.Header>
        <S.UserWrapper>
          <S.UserInfo>
            <S.Photo
              source={{
                uri: 'https://avatars.githubusercontent.com/u/58633356?v=4',
              }}
            />

            <S.User>
              <S.UserGreeting>Olá,</S.UserGreeting>
              <S.UserName>Rodrigo</S.UserName>
            </S.User>
          </S.UserInfo>

          <S.Icon name='power' />
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          amount='R$ 17.400,00'
          lastTransaction='Última entrada dia 13 de abril'
          title='Entradas'
          type='up'
        />
        <HighlightCard
          amount='R$ 1.259,00'
          lastTransaction='Última saída dia 13 de abril'
          title='Saídas'
          type='down'
        />
        <HighlightCard
          amount='R$ 16.141,00'
          lastTransaction='01 à 16 de abril'
          title='Total'
          type='total'
        />
      </S.HighlightCards>
    </S.Container>
  );
};
