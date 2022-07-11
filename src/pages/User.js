import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
import axios from 'axios';
// material
// components
import Page from '../components/Page';
import Label from '../components/Label';
import Scrollbar from '../components/Scrollbar';
import Iconify from '../components/Iconify';
import SearchNotFound from '../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'userId', label: 'UserId', alignRight: false },
  { id: 'userName', label: 'User Name', alignRight: false },
  { id: 'userImage', label: 'User Image', alignRight: false },
  { id: 'userEmail', label: 'User Email', alignRight: false },
  { id: 'acountStatus', label: 'Account Status', alignRight: false },
  { id: 'verificationStatus', label: 'Verification Status', alignRight: false },
  { id: '' },
];

// ----------------------------------------------------------------------

export default function User() {
  const [page, setPage] = useState(0);

  const [order, setOrder] = useState('asc');

  const [selected, setSelected] = useState([]);
  const [totalUsers, setTotalUsers] = useState();
  const [userList, setUserList] = useState([]);
  const [userListData, setUserListData] = useState([]);

  const [orderBy, setOrderBy] = useState('name');

  const [filterName, setFilterName] = useState('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  useEffect(() => {
    async function fetchData() {
      const headers = {
        Authorization:
          'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhZG1pbl9pZCI6MSwiaWF0IjoxNjI0Mzg1OTQyfQ.ZXF-1gr0QKBCXJnVPVwWkQN90bLpRd_2N4DDDtIq6JE',
      };

      const req = await axios.get('https://shakomakoapp.com/api/getAllUserList', { headers });

      setTotalUsers(req.data.total);
      setUserList(req.data.data);
    }

    fetchData();
  }, []);
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  return (
    <Page title="User">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Users
          </Typography>
          <Typography variant="h4" gutterBottom>
            Total Users : {totalUsers}
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {userList?.map((row) => {
                    const isItemSelected = selected.indexOf(row.user_id) !== -1;

                    return (
                      <TableRow
                        hover
                        key={row.user_id}
                        tabIndex={-1}
                        role="checkbox"
                        selected={isItemSelected}
                        aria-checked={isItemSelected}
                      >
                        <TableCell align="left">{row.user_id}</TableCell>
                        <TableCell align="left">{row.user_name}</TableCell>
                        <TableCell sx={{ maxWidth: '800' }}>
                          <Avatar alt={row.user_name} src={row.user_image} />
                        </TableCell>
                        <TableCell align="left">{row.user_email}</TableCell>

                        <TableCell align="left">
                          {row.blockedbyadmin === 'no' ? <Button variant="contained">Block</Button> : 'Yes'}
                        </TableCell>
                        <TableCell align="left">
                          <Label
                            variant="ghost"
                            color={(row.personVerification_status === 'yes' && 'error') || 'success'}
                          >
                            {sentenceCase(row.personVerification_status)}
                          </Label>
                        </TableCell>

                        <TableCell align="right">
                          <UserMoreMenu />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>
    </Page>
  );
}
