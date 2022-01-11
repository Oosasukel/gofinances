import React, { useCallback, useState } from 'react';
import { Button } from '../../components/Button';
import { CategorySelect } from '../../components/CategorySelect';
import { Input } from '../../components/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import * as S from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');

  const handleTransactionsTypeSelect = useCallback((type: 'up' | 'down') => {
    setTransactionType(type);
  }, []);

  return (
    <S.Container>
      <S.Header>
        <S.Title>Cadastro</S.Title>
      </S.Header>

      <S.Form>
        <S.Fields>
          <Input placeholder='Nome' />
          <Input placeholder='Preço' />

          <S.TransactionsTypes>
            <TransactionTypeButton
              title='Income'
              type='up'
              onPress={() => handleTransactionsTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              title='Outcome'
              type='down'
              onPress={() => handleTransactionsTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </S.TransactionsTypes>

          <CategorySelect title='Categoria' />
        </S.Fields>

        <Button title='Enviar' />
      </S.Form>
    </S.Container>
  );
};
