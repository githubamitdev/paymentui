/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosResponse } from 'axios';
import {
  Box,
  FormField,
  Button,
  Form,
  Text,
  Layer,
  Heading,
  Select,
  Spinner,
  Notification
} from 'grommet';
import React, { useMemo, useState } from 'react';
import { getFormattedCardInput, PaymentModalInterface } from '../utils';

export const AddPaymentDetailsModal = ({ toggleAddPaymentModal }: PaymentModalInterface) => {
  //TODO: Take a single state in an object
  const [valid, setValid] = useState(false);
  const [name, setName] = useState('');
  const [cardNum, setCardNum] = useState('');
  const [cvv, setCvv] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleFormSubmit = () => {
    setIsSubmitting(true);
    const payload = {
      cardNo: cardNum && cardNum.split(' ').join(),
      cvv,
      expiryMonth: month,
      expiryYear: year,
      name
    };

    axios
      .post('https://run.mocky.io/v3/0b14a8da-5fc7-4443-8511-53d687399bc9', { payload })
      .then((res: AxiosResponse) => {
        console.log(res);
        setIsSubmitted(true);
        setIsSubmitting(false);
      })
      .catch((e: React.SyntheticEvent) => {
        console.log(e);
        alert('Something went wronf');
      });
  };
  const monthArr = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => i + 1);
  }, []);
  const yearArray = useMemo(() => {
    return [...Array(6)].map((a, b) => new Date().getFullYear() + b);
  }, []);

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedVal = getFormattedCardInput(e.target.value);
    formattedVal && setCardNum(formattedVal as string);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length <= 3) {
      setCvv(e.target.value);
    }
    e.preventDefault();
  };
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };
  const handleNotificationCLose = () => {
    window.location.reload();
  };

  return (
    <Layer
      id="add-friend-layer"
      position="center"
      onClickOutside={toggleAddPaymentModal}
      onEsc={toggleAddPaymentModal}>
      <Box pad="medium" gap="small" width="medium" align="start" justify="between">
        <Heading level={3} margin="none">
          Add Payment Details
        </Heading>
        <Box fill>
          <Box width="medium">
            <Form
              validate="change"
              onSubmit={handleFormSubmit}
              onValidate={(validationResults) => {
                setValid(validationResults.valid);
              }}>
              {isSubmitted && (
                <Notification
                  toast
                  message="Payment done successfully"
                  status="normal"
                  onClose={handleNotificationCLose}
                />
              )}
              {isSubmitting ? (
                <Box
                  align="center"
                  justify="center"
                  gap="small"
                  direction="row"
                  alignSelf="center"
                  pad="large">
                  <Spinner align="center" justify="center" />
                </Box>
              ) : (
                <>
                  <FormField
                    label="Name"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    placeholder="Card holder name"
                    required
                    x-autocompletetype="cc-number"
                    validate={[
                      (name: string) => {
                        if (name && name.length === 1)
                          return 'Card holer name must be >1 character';
                        return undefined;
                      }
                    ]}
                  />
                  <FormField
                    label="Credit/Debit Card Number"
                    name="cardNum"
                    placeholder="xxxx xxxx xxxx xxxx"
                    onChange={handleCardChange}
                    required
                    value={cardNum}
                    validate={[
                      (cardNum: string) => {
                        const str = cardNum.split(' ').join('');
                        if (str && str.length < 16) return 'Card number must be 16 digit numbers';
                        return undefined;
                      }
                    ]}
                  />

                  <FormField
                    label="CVV"
                    name="cvv"
                    type="number"
                    placeholder="Enter CVV/CVC"
                    onChange={handleCvvChange}
                    required
                    value={cvv}
                    validate={[
                      (cvv: string) => {
                        if (cvv && cvv.length != 3)
                          return 'CVV must be 3 digits long numeric values.';
                        return undefined;
                      }
                    ]}
                  />
                  <Box direction="row" gap="small">
                    <FormField label="Month" name="month" required>
                      <Select
                        options={monthArr}
                        name="month"
                        placeholder="MM"
                        value={month}
                        onChange={({ option }) => setMonth(option)}
                      />
                    </FormField>
                    <FormField label="Year" name="year" required>
                      <Select
                        options={yearArray}
                        name="year"
                        placeholder="YYYY"
                        value={year}
                        onChange={({ option }) => setYear(option)}
                      />
                    </FormField>
                  </Box>

                  <Box
                    as="footer"
                    gap="small"
                    direction="row"
                    align="center"
                    justify="end"
                    pad={{ top: 'medium', bottom: 'small' }}>
                    <Button
                      label={<Text>{'Submit'} </Text>}
                      primary
                      disabled={!valid}
                      type="submit"
                    />
                  </Box>
                </>
              )}
            </Form>
          </Box>
        </Box>
      </Box>
    </Layer>
  );
};

export default AddPaymentDetailsModal;
