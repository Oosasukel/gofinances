import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button } from '../../components/Button';
import { CategorySelectButton } from '../../components/CategorySelectButton';
import { InputForm } from '../../components/InputForm';
import { TransactionTypeButton } from '../../components/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import * as Yup from 'yup';
import uuid from 'react-native-uuid';
import { yupResolver } from '@hookform/resolvers/yup';
import * as S from './styles';
import { useNavigation } from '@react-navigation/native';

interface RegisterData {
  name: string;
  amount: string;
}

const schema = Yup.object().shape({
  name: Yup.string().required('Nome é obrigatório'),
  amount: Yup.number()
    .typeError('Informe um valor numérico')
    .positive('O valor não pode ser negativo')
    .required('O valor é obrigatório'),
});

export const Register = () => {
  const navigation = useNavigation();
  const [transactionType, setTransactionType] = useState('');
  const [categoryModalOpen, setCategoryModalOpen] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(schema),
  });

  const handleTransactionsTypeSelect = useCallback(
    (type: 'positive' | 'negative') => {
      setTransactionType(type);
    },
    []
  );

  const handleCloseSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(false);
  }, []);

  const handleOpenSelectCategoryModal = useCallback(() => {
    setCategoryModalOpen(true);
  }, []);

  const handleRegister = useCallback(
    async (form: RegisterData) => {
      if (!transactionType) return Alert.alert('Selecione o tipo da transação');

      if (category.key === 'category')
        return Alert.alert('Selecione a categoria');

      const newTransaction = {
        id: String(uuid.v4()),
        name: form.name,
        amount: form.amount,
        type: transactionType,
        category: category.key,
        date: new Date(),
      };

      try {
        const dataKey = '@gofinances:transactions';

        const data = await AsyncStorage.getItem(dataKey);
        const currentData = data ? JSON.parse(data) : [];

        const dataFormatted = [...currentData, newTransaction];

        await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted));

        reset();
        setTransactionType('');
        setCategory({
          key: 'category',
          name: 'Categoria',
        });

        navigation.navigate('Listagem' as never);
      } catch (error) {
        console.log(error);
        Alert.alert('Não foi possível salvar');
      }
    },
    [transactionType, category]
  );

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <S.Container>
        <S.Header>
          <S.Title>Cadastro</S.Title>
        </S.Header>

        <S.Form>
          <S.Fields>
            <InputForm
              name='name'
              control={control}
              placeholder='Nome'
              autoCapitalize='sentences'
              autoCorrect={false}
              error={errors.name?.message}
            />
            <InputForm
              name='amount'
              control={control}
              placeholder='Preço'
              keyboardType='numeric'
              error={errors.amount?.message}
            />

            <S.TransactionsTypes>
              <TransactionTypeButton
                title='Income'
                type='up'
                onPress={() => handleTransactionsTypeSelect('positive')}
                isActive={transactionType === 'positive'}
              />
              <TransactionTypeButton
                title='Outcome'
                type='down'
                onPress={() => handleTransactionsTypeSelect('negative')}
                isActive={transactionType === 'negative'}
              />
            </S.TransactionsTypes>

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenSelectCategoryModal}
            />
          </S.Fields>

          <Button
            title='Enviar'
            onPress={() => handleSubmit(handleRegister)()}
          />
        </S.Form>

        <Modal visible={categoryModalOpen}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseSelectCategoryModal}
          />
        </Modal>
      </S.Container>
    </TouchableWithoutFeedback>
  );
};
