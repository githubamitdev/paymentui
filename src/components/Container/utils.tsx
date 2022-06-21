/* eslint-disable react/prop-types */
import { Spinner } from 'grommet';

export const emailRegex =
  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export interface FuncInterface {
  (): void;
}

export interface PaymentModalInterface {
  toggleAddPaymentModal: FuncInterface;
}

export const getFormattedCardInput = (val: string) => {
  const str = val || '';
  let newStr = str.split(' ').join('');
  if (newStr.length <= 16) {
    newStr = newStr
      .replace(/[^\dA-Z]/g, '')
      .replace(/(.{4})/g, '$1 ')
      .trim();
    return newStr;
  }
  return '';
};
