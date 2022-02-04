import React, { useCallback, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { VictoryPie } from 'victory-native';
import { HistoryCard } from '../../components/HistoryCard';
import * as S from './styles';
import { categories } from '../../utils/categories';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { addMonths, format, subMonths } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

interface TransactionData {
  type: 'positive' | 'negative';
  name: string;
  amount: string;
  category: string;
  date: string;
}

interface CategoryData {
  key: string;
  name: string;
  total: number;
  totalFormatted: string;
  color: string;
  percent: string;
}

export const Resume = () => {
  const theme = useTheme();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [totalByCategories, setTotalByCategories] = useState<CategoryData[]>(
    []
  );

  const handleDateChange = useCallback((action: 'next' | 'prev') => {
    if (action === 'next') {
      setSelectedDate((prev) => addMonths(prev, 1));
    } else {
      setSelectedDate((prev) => subMonths(prev, 1));
    }
  }, []);

  const loadData = useCallback(async () => {
    setIsLoading(true);

    const dataKey = '@gofinances:transactions';
    const response = await AsyncStorage.getItem(dataKey);
    const responseFormatted: TransactionData[] = response
      ? JSON.parse(response)
      : [];

    const expenses = responseFormatted.filter(
      (expense) =>
        expense.type === 'negative' &&
        new Date(expense.date).getMonth() === selectedDate.getMonth() &&
        new Date(expense.date).getFullYear() === selectedDate.getFullYear()
    );

    const expensesTotal = expenses.reduce(
      (acc, expense) => acc + Number(expense.amount),
      0
    );

    const totalByCategory: CategoryData[] = [];

    categories.forEach((category) => {
      let categorySum = 0;

      expenses.forEach((expense) => {
        if (expense.category === category.key) {
          categorySum += Number(expense.amount);
        }
      });

      if (categorySum > 0) {
        const totalFormatted = categorySum.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        });

        const percent = `${((categorySum / expensesTotal) * 100).toFixed(0)}%`;

        totalByCategory.push({
          key: category.key,
          name: category.name,
          color: category.color,
          total: categorySum,
          totalFormatted,
          percent,
        });
      }
    });

    setTotalByCategories(totalByCategory);
    setIsLoading(false);
  }, [selectedDate]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [selectedDate])
  );

  return (
    <S.Container>
      <S.Header>
        <S.Title>Resumo por categoria</S.Title>
      </S.Header>

      {isLoading ? (
        <S.LoadContainer>
          <ActivityIndicator color={theme.colors.primary} size='large' />
        </S.LoadContainer>
      ) : (
        <>
          <S.Content>
            <S.MonthSelect>
              <S.MonthSelectButton onPress={() => handleDateChange('prev')}>
                <S.MonthSelectIcon name='chevron-left' />
              </S.MonthSelectButton>

              <S.Month>
                {format(selectedDate, 'MMMM, yyyy', { locale: ptBR })}
              </S.Month>

              <S.MonthSelectButton onPress={() => handleDateChange('next')}>
                <S.MonthSelectIcon name='chevron-right' />
              </S.MonthSelectButton>
            </S.MonthSelect>

            <S.ChartContainer>
              <VictoryPie
                data={totalByCategories}
                colorScale={totalByCategories.map((category) => category.color)}
                style={{
                  labels: {
                    fontSize: RFValue(18),
                    fontWeight: 'bold',
                    fill: theme.colors.shape,
                  },
                }}
                labelRadius={90}
                x='percent'
                y='total'
              />
            </S.ChartContainer>

            {totalByCategories.map((item) => (
              <HistoryCard
                key={item.key}
                title={item.name}
                amount={item.totalFormatted}
                color={item.color}
              />
            ))}
          </S.Content>
        </>
      )}
    </S.Container>
  );
};
