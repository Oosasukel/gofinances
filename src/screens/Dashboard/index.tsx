import React, { useCallback, useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TransactionCard,
  TransactionCardData,
} from '../../components/TransactionCard';
import * as S from './styles';
import { useFocusEffect } from '@react-navigation/native';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const [transactions, SetTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as HighlightData);

  const loadTransactions = useCallback(async () => {
    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const transactionsSaved = response ? JSON.parse(response) : [];

    let entriesTotal = 0;
    let expenseTotal = 0;

    const transactionsFormatted: DataListProps[] = transactionsSaved.map(
      (item: DataListProps) => {
        if (item.type === 'positive') {
          entriesTotal += Number(item.amount);
        } else {
          expenseTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const date = Intl.DateTimeFormat('pt-BR', {
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        }).format(new Date(item.date));

        return {
          id: item.id,
          type: item.type,
          category: item.category,
          name: item.name,
          amount,
          date,
        };
      }
    );

    SetTransactions(transactionsFormatted);
    setHighlightData({
      expenses: {
        amount: expenseTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
      total: {
        amount: (entriesTotal - expenseTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
      },
    });
  }, []);

  useEffect(() => {
    loadTransactions();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

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

          <S.LogoutButton onPress={() => {}}>
            <S.Icon name='power' />
          </S.LogoutButton>
        </S.UserWrapper>
      </S.Header>

      <S.HighlightCards>
        <HighlightCard
          amount={highlightData.entries.amount}
          lastTransaction='Última entrada dia 13 de abril'
          title='Entradas'
          type='up'
        />
        <HighlightCard
          amount={highlightData.expenses.amount}
          lastTransaction='Última saída dia 13 de abril'
          title='Saídas'
          type='down'
        />
        <HighlightCard
          amount={highlightData.total.amount}
          lastTransaction='01 à 16 de abril'
          title='Total'
          type='total'
        />
      </S.HighlightCards>

      <S.Transactions>
        <S.Title>Listagem</S.Title>

        <S.TransactionList
          data={transactions}
          keyExtractor={(item) => (item as DataListProps).id}
          renderItem={({ item }) => (
            <TransactionCard data={item as DataListProps} />
          )}
        />
      </S.Transactions>
    </S.Container>
  );
};
