import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { getRandomId } from '../utilis/randomIdGenerate';
import { Button, Checkbox, Paper, Typography } from '@mui/material';
import { useMutation, useQueryClient } from 'react-query';
import { $axios } from '../lib/axios';
import EditTodo from './EditTodo';
import { AiOutlineDelete } from "react-icons/ai";
import { useDispatch } from 'react-redux';
import { openErrorSnackbar, openSuccessSnackbar } from '../store/slice/snackbarSlice';
import relativeTime from "dayjs/plugin/relativeTime";
import dayjs from 'dayjs';



dayjs.extend(relativeTime);
const tableHeadData = ["","Title", "Date","Delete", "Edit"];

const TodoTable = ({ todos }) => {

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { mutate:deleteTodoMutate } = useMutation({
    mutationKey: ["delete-todo"],
    mutationFn: async (todoId) => {
      return await $axios.delete(`/todo/delete/${todoId}`);
    },
    onSuccess:(res)=>{
      queryClient.invalidateQueries("todoUser");
      dispatch(openSuccessSnackbar(res?.data?.data?.message))
    },
    onError:(error)=>{
      dispatch(openErrorSnackbar(error?.res?.data?.message));
    }
  });

  const [checked, setChecked] = React.useState(false);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

  if (!todos) {
    return (
      <Typography variant="h6">
        No todos available.
      </Typography>
    );
  }

  return (
    <>
        <h1 style={{
              height:"50px",
              display:"flex",
              flexDirection:"center",
              alignItems:"center",
              justifyContent:"center",
              fontFamily:"Arial Narrow, sans-serif",
              fontWeight: "500",	
              boxShadow: "rgba(249, 251, 253, 0.25) 0px 4px 8px -2px, rgba(247, 249, 252, 0.979) 0px 0px 0px 1px",              
              borderRadius:"7px",
              color:"whitesmoke"
            
            }}
        >
            Todo List
        </h1>
        <TableContainer component={Paper} sx={{boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px"}}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {tableHeadData.map((item) => (
              <TableCell key={getRandomId()} align='center'>
                <Typography>{item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {todos.map((item) => (
            <TableRow
              key={getRandomId()}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
             <TableCell style={{display:"flex"}} align='center' >
                <Checkbox {...label} />
            </TableCell> 



              <TableCell component="th" scope="row" align='center'>
                {item?.title}
              </TableCell>
             
              <TableCell align='center'>
                {dayjs().to(dayjs(item.date))}
              </TableCell>

              <TableCell align="center">
                <Button variant='outlined' color='error' onClick={() => deleteTodoMutate(item._id)}>
                  <AiOutlineDelete size={"1.5rem"} cursor="pointer" style={{color:"red"}}/>
                  Delete
                </Button>
              </TableCell>
              <TableCell align="center">
                <EditTodo todoId={item._id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>


  );
};

export default TodoTable;
