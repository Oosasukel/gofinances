import React, { useCallback, useEffect, useState } from 'react';
import { HighlightCard } from '../../components/HighlightCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  TransactionCard,
  TransactionCardData,
} from '../../components/TransactionCard';
import * as S from './styles';
import { useFocusEffect } from '@react-navigation/native';
import { ActivityIndicator } from 'react-native';
import { useTheme } from 'styled-components';

export interface DataListProps extends TransactionCardData {
  id: string;
}

interface HighlightProps {
  amount: string;
  lastTransaction: string;
}

interface HighlightData {
  entries: HighlightProps;
  expenses: HighlightProps;
  total: HighlightProps;
}

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, SetTransactions] = useState<DataListProps[]>([]);
  const [highlightData, setHighlightData] = useState({} as HighlightData);
  const theme = useTheme();

  const getLastTransactionDate = useCallback(
    (collection: DataListProps[], type: 'positive' | 'negative') => {
      const lastTransaction = new Date(
        Math.max.apply(
          Math,
          collection
            .filter((transaction: DataListProps) => transaction.type === type)
            .map((transaction: DataListProps) =>
              new Date(transaction.date).getTime()
            )
        )
      );

      return `${lastTransaction.getDate()} de ${lastTransaction.toLocaleString(
        'pt-BR',
        { month: 'long' }
      )}`;
    },
    []
  );

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

    const lastTransactionEntries = getLastTransactionDate(
      transactionsSaved,
      'positive'
    );
    const lastTransactionExpenses = getLastTransactionDate(
      transactionsSaved,
      'negative'
    );
    const totalInterval = `01 a ${lastTransactionExpenses}`;

    setHighlightData({
      expenses: {
        amount: expenseTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última entrada dia ${lastTransactionEntries}`,
      },
      entries: {
        amount: entriesTotal.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: `Última saída dia ${lastTransactionExpenses}`,
      },
      total: {
        amount: (entriesTotal - expenseTotal).toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }),
        lastTransaction: totalInterval,
      },
    });

    setIsLoading(false);
  }, []);

  useEffect(() => {
    loadTransactions();

    // AsyncStorage.removeItem('@gofinances:transactions');
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <S.Container>
      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </S.LoadContainer>
      ) : (
        <>
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
              lastTransaction={highlightData.entries.lastTransaction}
              title='Entradas'
              type='up'
            />
            <HighlightCard
              amount={highlightData.expenses.amount}
              lastTransaction={highlightData.expenses.lastTransaction}
              title='Saídas'
              type='down'
            />
            <HighlightCard
              amount={highlightData.total.amount}
              lastTransaction={highlightData.total.lastTransaction}
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
        </>
      )}
    </S.Container>
  );
};
