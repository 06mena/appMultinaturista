import React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

const Paginacion = ({ totalPages, currentPage, onPageChange }) => {
  return (
    <Stack spacing={2} alignItems="center" justifyContent="center" mt={4}>
      <Pagination
        count={totalPages}
        page={currentPage}
        onChange={(event, page) => onPageChange(page)}
        size="large"
      />
    </Stack>
  );
};

export default Paginacion;
