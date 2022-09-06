import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndRedux from './renderWith';
import App from '../../App';
import mockData from './mockData';

const mockedState = {
  user: {
    email: '',
  },
  wallet: {
    currencies: Object.keys(mockData).filter((elem) => elem !== 'USDT'),
    expenses: [
      {
        id: 0,
        value: '10',
        description: 'teste',
        currency: 'USD',
        method: 'Dinheiro',
        tag: 'Alimentação',
        exchangeRates: mockData,
      },
    ],
    editor: false,
    idToEdit: 0,
    isFetching: false,
  },
};

const emailInput = 'email-input';
const meuEmail = 'meu@email.com';
const passwordInput = 'password-input';
const totalFieldForm = 'total-field';
const valueInput = 'value-input';
const description = 'description-input';
const addExpense = 'Adicionar despesa';

test('Teste 1', () => {
  renderWithRouterAndRedux(<App />);
  const loginField = screen.getByTestId(emailInput);
  expect(loginField).toBeInTheDocument();
  userEvent.type(loginField, meuEmail);
  const passwordField = screen.getByTestId(passwordInput);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '123456');
  const button = screen.getByText('Entrar');
  userEvent.click(button);
  const totalField = screen.getByTestId(totalFieldForm);
  expect(totalField).toBeInTheDocument();
  expect(totalField).toHaveTextContent('0');
  const valueField = screen.getByTestId(valueInput);
  const descriptionField = screen.getByTestId(description);
  const currencyField = screen.getByTestId('currency-input');
  const methodField = screen.getByTestId('method-input');
  const tagField = screen.getByTestId('tag-input');
  userEvent.type(valueField, '12');
  userEvent.type(descriptionField, 'gasolina');
  userEvent.type(currencyField, '12');
  userEvent.type(methodField, '12');
  userEvent.type(tagField, '12');
  const addButton = screen.getByText(addExpense);
  expect(valueField).toHaveTextContent('');
  expect(valueField).toBeInTheDocument();
  userEvent.click(addButton);
  expect(valueField).toHaveTextContent('');
  const deleteButton = screen.queryByTestId('delete-btn');
  expect(deleteButton).not.toBeInTheDocument();
});

test('Teste 2', () => {
  renderWithRouterAndRedux(<App />, { initialState: mockedState });
  const loginField = screen.getByTestId(emailInput);
  expect(loginField).toBeInTheDocument();
  userEvent.type(loginField, meuEmail);
  const passwordField = screen.getByTestId(passwordInput);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '123456');
  const button = screen.getByText('Entrar');
  userEvent.click(button);
  const totalField = screen.getByTestId(totalFieldForm);
  expect(totalField).toBeInTheDocument();
  const valueField = screen.getByTestId(valueInput);
  const descriptionField = screen.getByTestId(description);
  userEvent.type(valueField, '12');
  userEvent.type(descriptionField, 'gasolina');
  const addButton = screen.getByText(addExpense);
  expect(addButton).toBeInTheDocument();
  expect(valueField).toBeInTheDocument();
  const deleteButton = screen.getByTestId('delete-btn');
  expect(deleteButton).toBeInTheDocument();
  userEvent.click(deleteButton);
  expect(deleteButton).not.toBeInTheDocument();
});

test('Teste 3', async () => {
  renderWithRouterAndRedux(<App />, { initialState: mockedState });
  global.fetch = jest.fn(() => Promise.resolve({
    json: () => Promise.resolve(mockData),
  }));
  const loginField = screen.getByTestId(emailInput);
  expect(loginField).toBeInTheDocument();
  userEvent.type(loginField, meuEmail);
  const passwordField = screen.getByTestId(passwordInput);
  expect(passwordField).toBeInTheDocument();
  userEvent.type(passwordField, '123456');
  const button = screen.getByText('Entrar');
  userEvent.click(button);
  const totalField = screen.getByTestId(totalFieldForm);
  expect(totalField).toBeInTheDocument();
  const valueField = screen.getByTestId(valueInput);
  const descriptionField = screen.getByTestId(description);
  userEvent.type(valueField, '12');
  userEvent.type(descriptionField, 'gasolina');
  const addButton = screen.getByText(addExpense);
  expect(valueField).toBeInTheDocument();
  const editButton = screen.getByTestId('edit-btn');
  expect(editButton).toBeInTheDocument();
  userEvent.click(editButton);
  expect(editButton).toBeInTheDocument();
  userEvent.type(valueField, '12');
  expect(addButton).toHaveTextContent('Editar despesa');
  userEvent.click(addButton);
  expect(addButton).toHaveTextContent(addExpense);
  userEvent.type(valueField, '22');
  userEvent.click(addButton);
  expect(global.fetch).toBeCalledWith('https://economia.awesomeapi.com.br/json/all');
});
//
