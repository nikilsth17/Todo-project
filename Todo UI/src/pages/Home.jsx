import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import { $axios } from '../lib/axios';
import { Box, Typography, Grid } from '@mui/material';
import TodoTable from '../component/TodoTable';
import OpenFormDialog from '../component/OpenFormDialog';
import Progress from '../component/Progress';

const Home = () => {
  const [todos, setTodos] = useState([]);
  const { isError, isLoading, error} = useQuery({
    queryKey: ['todoUser'],
    queryFn: async () => {
      const response = await $axios.post('/todo/user/all', {
        page: 1,
        limit: 10,
      });
      setTodos(response.data.todos);
    },
  });

  


  return (
    <Box sx={{ marginTop: '5rem' }}>
      <OpenFormDialog />
      <Grid
        container
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap',
          minHeight: '60vh',
        }}
      >
        {isLoading && <Progress/>}
        {isError && <Typography sx={{ color: 'red' }}>{error.message}</Typography>}
        {!isLoading && !isError && (
          <Grid item xs={11.5} md={8}>
            <TodoTable todos={todos} />
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default Home;
