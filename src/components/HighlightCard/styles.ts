import styled, { css } from 'styled-components/native';
import { RFPercentage, RFValue } from 'react-native-responsive-fontsize';
import { Feather } from '@expo/vector-icons';

interface TypeProps {
  type: 'down' | 'up' | 'total';
}

export const Container = styled.View<TypeProps>`
  background-color: ${({ theme }) => theme.colors.shape};

  width: ${RFValue(300)}px;
  border-radius: 5px;

  padding: 19px 23px;
  padding-bottom: ${RFValue(42)}px;

  margin-right: 16px;

  ${({ theme, type }) => {
    if (type === 'total') {
      return css`
        background-color: ${theme.colors.secondary};
      `;
    }

    return css`
      background-color: ${theme.colors.shape};
    `;
  }}
`;

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

export const Title = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(14)}px;

  ${({ theme, type }) => {
    if (type === 'total') {
      return css`
        color: ${theme.colors.shape};
      `;
    }

    return css`
      color: ${theme.colors.text_dark};
    `;
  }}
`;

export const Icon = styled(Feather)<TypeProps>`
  font-size: ${RFValue(40)}px;

  ${({ theme, type }) => {
    switch (type) {
      case 'up':
        return css`
          color: ${theme.colors.success};
        `;

      case 'down':
        return css`
          color: ${theme.colors.attention};
        `;

      case 'total':
        return css`
          color: ${theme.colors.shape};
        `;
    }
  }}
`;

export const Footer = styled.View``;
export const Amount = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.medium};
  font-size: ${RFValue(32)}px;

  margin-top: 38px;

  ${({ theme, type }) => {
    if (type === 'total') {
      return css`
        color: ${theme.colors.shape};
      `;
    }

    return css`
      color: ${theme.colors.text_dark};
    `;
  }}
`;

export const LastTransaction = styled.Text<TypeProps>`
  font-family: ${({ theme }) => theme.fonts.regular};
  font-size: ${RFValue(12)}px;

  ${({ theme, type }) => {
    if (type === 'total') {
      return css`
        color: ${theme.colors.shape};
      `;
    }

    return css`
      color: ${theme.colors.text};
    `;
  }}
`;
