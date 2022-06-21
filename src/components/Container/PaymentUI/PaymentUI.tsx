/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { Box, Main } from 'grommet';
import AddPaymentDetailsModal from './AddPaymentDetailsModal';

export const PaymentUI = () => {
  const [openPaymentModal, setOpenPaymentModal] = useState(true);

  const toggleAddPaymentModal = () => {
    setOpenPaymentModal(!openPaymentModal);
  };

  return (
    <Box fill>
      <Box flex overflow={'auto'}>
        <Main background="white" elevation="medium" pad="xsmall" gap="small">
          {openPaymentModal && (
            <AddPaymentDetailsModal toggleAddPaymentModal={toggleAddPaymentModal} />
          )}
        </Main>
      </Box>
    </Box>
  );
};
export default PaymentUI;
