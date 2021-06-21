import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  Table,
  TableBody,
  TableCell,
  IconButton,
  Box,
  TableContainer,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { Edit, AddBox, Delete } from '@material-ui/icons';

import config from '../../../config'
import PeopleModal from "./PeopleModel";

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  container: {
    maxHeight: 440
  }
});

export default function SimpleTable(props) {
  const classes = useStyles();
  const [users, setUsers] = useState([]);
  const [addModal, setAddModal] = useState(false)
  const [selectedData, setSelectedData] = useState();

  const fetchData = async (data = {}) => {
    const { method, id, refetch, body } = data;
    const requestBody = body
    const path = id ? id : ''
    let result = await fetch(`${config.apiUrl}/api/people/${path}`,
      {
        method: method || 'GET',
        headers: { 'Content-Type': 'application/json' },
        ...(body && { body: JSON.stringify({ ...requestBody }) })
      });
    result = await result.json();
    if (!refetch && result && result.data) {
      return setUsers(result.data);
    }
    if (refetch) {
      fetchData();
    }
  }

  const editPeople = (row) => {
    console.log(row);
    setSelectedData(row);
    setAddModal(true);
  }

  useEffect(() => {
    fetchData();
  }, []);

  console.log(selectedData);

  return (
    <Box m={3}>
      <Box display="flex" m={2}>
        <IconButton onClick={() => setAddModal(true)} className={classes.margin} size="small">
          Add people <AddBox color="primary" />
        </IconButton>
      </Box>
      <TableContainer className={classes.container}>
        <Table stickyHeader className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">First name</TableCell>
              <TableCell align="left">Last name</TableCell>
              <TableCell align="left">Email</TableCell>
              <TableCell align="left">Phone</TableCell>
              <TableCell align="left">Address</TableCell>
              <TableCell align="left">Activity</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((row) => (
              <TableRow key={row._id}>
                <TableCell align="left"> {row.firstName}</TableCell>
                <TableCell align="left">{row.lastName}</TableCell>
                <TableCell align="left">{row.email}</TableCell>
                <TableCell align="left">{row.phone}</TableCell>
                <TableCell align="left">{row.address}</TableCell>
                <TableCell align="left">
                  <Box display="flex">
                    <IconButton key={row._id} onClick={(e) => editPeople(row)} aria-label="add to shopping cart">
                      <Edit color="primary" />
                    </IconButton>
                    <IconButton key={row._id} onClick={(e) => fetchData({ method: "DELETE", id: row._id, refetch: true })} aria-label="add to shopping cart">
                      <Delete color="secondary" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {addModal && <PeopleModal fetchData={fetchData} setSelectedData={setSelectedData} data={selectedData} setOpenModal={setAddModal} />}
    </Box>
  );
}