/*
    Author: Javier Goldschmidt
    Company: Abre Cultura
    Date: 10/07/2019 (dd-mm-yyyy)
    Description: Utility function for asking for a password to access environments on production
*/

import { getVariable, VariableNames } from '../config';

const envCheck = () => {
  if (process.env.NODE_ENV !== 'production') return;

  const pwCheck = getVariable(VariableNames.EnvPassword);
  if (!pwCheck) return;

  let notWritten;
  let pw = localStorage.getItem('ENV_PW');
  if (!pw) {
    // eslint-disable-next-line no-alert
    pw = prompt('Ingrese contraseña', '');
    notWritten = true;
  }

  if (pw !== pwCheck) [window.location.href] = window.location.href.split('?');
  else if (notWritten) localStorage.setItem('ENV_PW', pw);
};

export default envCheck;
