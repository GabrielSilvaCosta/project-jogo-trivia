import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Input from '../../components/Input';
import Button from '../../components/Button';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';

describe('Input Component', () => {
  it('testa a interação do input', () => {
    // Defina o estado inicial do redux, se necessário
    const initialState = {};

    // Renderize o componente Input com o renderWithRouterAndRedux
    const { store } = renderWithRouterAndRedux(
      <Input
        type="text"
        name="username"
        label="Username"
        dataTestId="input-username"
        onChange={() => {}}
      />,
      initialState
    );

    // Espere que o componente Input seja exibido
    const inputLabel = screen.getByText('Username');
    expect(inputLabel).toBeInTheDocument();

    // Simule a interação do usuário digitando no input
    const input = screen.getByTestId('input-username');
    userEvent.type(input, 'john.doe');

    // Verifique se o valor do input foi atualizado

    // Verifique o estado do redux, se necessário
    // const state = store.getState();
    // ...


  });

  it('testa a interação do botão', () => {
    // Defina o estado inicial do redux, se necessário
    const initialState = {};

    // Variáveis para verificar se a função onClick foi chamada
    let clicked = false;
    const handleClick = () => {
      clicked = true;
    };

    // Renderize o componente Button com o renderWithRouterAndRedux
    const { store } = renderWithRouterAndRedux(
      <Button
        label="Submit"
        type="submit"
        moreClasses="primary"
        disabled={false}
        dataTestId="btn-submit"
        onClick={handleClick}
      />,
      initialState
    );

    // Espere que o componente Button seja exibido
    const button = screen.getByTestId('btn-submit');
    expect(button).toBeInTheDocument();

    // Simule a interação do usuário clicando no botão
    userEvent.click(button);

    // Verifique se a função onClick foi chamada
    expect(clicked).toBe(true);

    // Verifique o estado do redux, se necessário
    // const state = store.getState();
    // ...

  });
});