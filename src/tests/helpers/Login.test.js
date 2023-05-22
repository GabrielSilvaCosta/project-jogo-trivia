import { screen } from '@testing-library/react';
import renderWithRouterAndRedux from './renderWithRouterAndRedux';
import App from '../../App';
import userEvent from '@testing-library/user-event';
import Settings from '../../pages/Settings';
import Login from '../../pages/Login';
describe('Login Component', () => {
    it('testa a interação dos inputs e botão "Play"', () => {
      renderWithRouterAndRedux(<Login />);
      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');
      const playButton = screen.getByTestId('btn-play');
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(nameInput, 'John Doe');
      expect(playButton).not.toBeDisabled();
      userEvent.click(playButton);
    });
    it('testa se o botão está desabilitado quando o email é inválido', () => {
      renderWithRouterAndRedux(<Login />);
      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');
      const playButton = screen.getByTestId('btn-play');
      userEvent.type(emailInput, 'test');
      userEvent.type(nameInput, 'John Doe');
      expect(playButton).toBeDisabled();
    });
    it('testa se o botão está desabilitado quando o nome é muito curto', () => {
      renderWithRouterAndRedux(<App />);
      const emailInput = screen.getByTestId('input-gravatar-email');
      const nameInput = screen.getByTestId('input-player-name');
      const playButton = screen.getByTestId('btn-play');
      userEvent.type(emailInput, 'test@example.com');
      userEvent.type(nameInput, 'Jo');
      expect(playButton).toBeDisabled();
    });
    it('testa a navegação para a página de configurações', () => {
      renderWithRouterAndRedux(<App />);
      const settingsButton = screen.getByTestId('btn-settings');
      userEvent.click(settingsButton);
      const titleElement = screen.getByTestId('settings-title');
      expect(titleElement).toBeInTheDocument();
      expect(titleElement.textContent).toBe(' Configurações ');
    });
  });