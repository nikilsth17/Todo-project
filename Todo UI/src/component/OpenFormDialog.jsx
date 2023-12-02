import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Formik } from 'formik';
import { Box, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from 'react-query';
import { $axios } from '../lib/axios';
import Progress from './Progress';
import * as Yup from 'yup';
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { DatePicker } from '@mui/x-date-pickers';
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../store/slice/snackbarSlice';



const OpenFormDialog = () => {

  const queryClient= useQueryClient();
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch= useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const { mutate } = useMutation({
    mutationKey: ['add-product'],
    mutationFn: async (values) => {
      setIsLoading(true);
      const response = await $axios.post('/todo/add', values);
      setIsLoading(false);
      return response;
    },
    onSuccess: (res,data) => {
      queryClient.invalidateQueries("todoUser");
      dispatch(openSuccessSnackbar(res?.data?.message));
      handleClose();
    },
  });

  if (isLoading) {
    return <Progress />;
  }

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
       
      }}
    >
      <React.Fragment>
        <Button variant="contained" onClick={handleClickOpen} sx={{gap:"1rem"}}>
        <HiOutlineViewGridAdd size={"2rem"}/>Add Todo 
        </Button>
        <Dialog open={open} onClose={handleClose} >
          <Formik
            initialValues={{ title: '',date:'' }}
            validationSchema={Yup.object({
              title: Yup.string().required('Title is required').min(2).max(55),
              date: Yup.date().required("date is required"),
                
            })}
            onSubmit={(values) => {
              mutate(values);
            }}
          >
            {(formik) => (
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center",}}>
                <form
                onSubmit={formik.handleSubmit}
                style={{
                  display:"flex", 
                  flexDirection:"column",
                  justifyContent:"center",
                  alignContent:"center",
                  alignItems:"center",
                  gap:"1rem",
                  padding:"1rem",
                  boxShadow: "rgba(0, 0, 0, 0.16) 0px 3px 6px, rgba(0, 0, 0, 0.23) 0px 3px 6px",
                  width:"300px",
                  height:"300px",
                  borderRadius:"7px"
                }}
              >
                <Typography variant="h5">Add todo form</Typography>
                <TextField
                  required
                  label="Title"
                  variant="outlined"
                  placeholder="Go to gym"
                  {...formik.getFieldProps('title')}
                  fullWidth
                />
                {formik.touched.title && formik.errors.title ? (
                  <div style={{ color: 'red' }}>{formik.errors.title}</div>
                ) : null}

                  <TextField
                    required
                    label="date"
                    style={{width:"100%"}}
                    {...formik.getFieldProps('date')}
                    
                  />
                     {formik.touched.date && formik.errors.date ? (
                  <div style={{ color: 'red' }}>{formik.errors.date}</div>
                ) : null}
                  

{/* <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker label="Basic date time picker" />
      </DemoContainer>
    </LocalizationProvider>   
    {formik.touched.date && formik.errors.date ? (
                  <div style={{ color: 'red' }}>{formik.errors.date}</div>
                ) : null}                  */}
                  

                <Button
                  variant="contained"
                  color="success"
                  sx={{ marginTop: '2rem' }}
                  type="submit"
                  fullWidth
                >
                  Add
                </Button>
              </form>
            </Box>
             
            )}
          </Formik>
        </Dialog>
      </React.Fragment>
    </Box>
  );
};

export default OpenFormDialog;
