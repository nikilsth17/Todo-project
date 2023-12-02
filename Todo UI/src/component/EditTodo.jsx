import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import { Formik } from 'formik';
import { Box, Typography } from '@mui/material';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { $axios } from '../lib/axios';
import Progress from './Progress';
import * as Yup from 'yup';
import { LiaEditSolid } from "react-icons/lia";
import { useDispatch } from 'react-redux';
import { openSuccessSnackbar } from '../store/slice/snackbarSlice';


const EditTodo = ({ todos,todoId }) => {
  const queryClient = useQueryClient();
  const [open, setOpen] = useState(false); // Open the dialog by default
  const dispatch= useDispatch();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

   //   get product details query to prefill form
   const {data,  isLoading, isError, error } = useQuery({
    queryKey: ["get-todo-details"],
    queryFn: async () => {
        return $axios.get(`/todo/details/${todoId}`);
    },
});


const todoDetails = data?.data;

  const { mutate } = useMutation({
    mutationKey: ['edit-todo', todoId],
    mutationFn: async (values) => {
      const response = await $axios.put(`/todo/edit/${todoId}`, values);
      return response.data;
    },
    onSuccess: (res) => {
      queryClient.invalidateQueries(['todoUser']);
      dispatch(openSuccessSnackbar(res?.data?.message))

      handleClose();
    },
  });

  return (
    <Box
      sx={{
        display: 'grid',
        placeItems: 'center',
        width: '100%',
      }}
    >
      <React.Fragment>
      <Button variant="outlined" onClick={handleClickOpen}>
          <LiaEditSolid size={"1.5rem"}/>
            Edit
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <Formik
          initialValues={{ title: todoDetails?.title, date:todoDetails?.date }}
          validationSchema={Yup.object({
            title: Yup.string().required('Title is required').min(2).max(55),
            date: Yup.date().required("date is required"),
          })}
          onSubmit={(values) => {
            mutate(values);
          }}
        >
          {(formik) => (
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
              <Typography variant="h5">Edit form</Typography>
              <TextField
                required
                label="Title"
                variant="outlined"
                placeholder="Go to gym"
                {...formik.getFieldProps('title')}
                fullWidth
              />
              {formik.touched.title && formik.errors.title && (
                <div style={{ color: 'red' }}>{formik.errors.title}</div>
              )}

              <TextField
                    required
                    label="date"
                    style={{width:"100%"}}
                    {...formik.getFieldProps('date')}
                    
                  />
                     {formik.touched.date && formik.errors.date ? (
                  <div style={{ color: 'red' }}>{formik.errors.date}</div>
                ) : null}

              <Button
                variant="contained"
                color="success"
                sx={{ marginTop: '2rem' }}
                type="submit"
                fullWidth
              >
                Edit
              </Button>
            </form>
          )}
        </Formik>
      </Dialog>
      </React.Fragment>
   
    </Box>
  );
};

export default EditTodo;
