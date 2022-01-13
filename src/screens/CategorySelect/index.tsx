import React from 'react';
import { FlatList } from 'react-native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Button } from '../../components/Button';
import { HighlightCard } from '../../components/HighlightCard';
import {
  TransactionCard,
  TransactionCardData,
} from '../../components/TransactionCard';
import { categories } from '../../utils/categories';
import * as S from './styles';

interface Category {
  key: string;
  name: string;
}

export interface CategorySelectProps {
  category: Category;
  setCategory: (name: Category) => void;
  closeSelectCategory: () => void;
}

export const CategorySelect = ({
  category,
  setCategory,
  closeSelectCategory,
}: CategorySelectProps) => {
  const handleCategorySelect = (item: Category) => {
    setCategory(item);
  };

  return (
    <S.Container>
      <S.Header>
        <S.Title>Categoria</S.Title>
      </S.Header>

      <FlatList
        data={categories}
        style={{ flex: 1, width: '100%' }}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <S.Category
            onPress={() => handleCategorySelect(item)}
            isActive={category.key === item.key}
          >
            <S.Icon name={item.icon} />
            <S.Name>{item.name}</S.Name>
          </S.Category>
        )}
        ItemSeparatorComponent={() => <S.Separator />}
      />

      <S.Footer>
        <Button title='Selecionar' onPress={closeSelectCategory} />
      </S.Footer>
    </S.Container>
  );
};
