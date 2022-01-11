import React, { useCallback, useState } from 'react';
import { Modal } from 'react-native';
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { Input } from '../../components/Input';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import * as S from './styles';

export const Register = () => {
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const handleTransactionsTypeSelect = useCallback((type: 'up' | 'down') => {
    setTransactionType(type);
  }, []);

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
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

          <CategorySelectButton
            title='Categoria'
            onPress={handleOpenSelectCategoryModal}
          />
        </S.Fields>

        <Button title='Enviar' />
      </S.Form>

      <Modal visible={categoryModalOpen}>
        <CategorySelect
          category=''
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        />
      </Modal>
    </S.Container>
  );
};
