import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import {Link, Link as RouterLink, useLocation } from 'react-router-dom';
// material
import {
  Card,
  Table,
  Stack,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
// components
import Page from '../../components/Page';
import firebase from './../../firebase'
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
//
 
import { fNumber } from 'src/utils/formatNumber';
import useGetUsers from 'src/hooks/useGetUsers';
import { CSVLink } from 'react-csv';
// ----------------------------------------------------------------------

const TABLE_HEAD = [

  { id: 'name', label: 'Fullname', alignRight: false },
  { id: 'region', label: 'Region', alignRight: false },
  { id: 'district', label: 'District', alignRight: false },
  { id: 'merch', label: 'Merchandise', alignRight: false },
  { id: 'phone', label: 'Phone Number', alignRight: false },
  
  { id: '' }
];
 
// ----------------------------------------------------------------------

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(array, (_user) => 
    _user.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    || _user.region.toLowerCase().indexOf(query.toLowerCase()) !== -1
   || _user.district.toLowerCase().indexOf(query.toLowerCase()) !== -1
   || _user.merch.toLowerCase().indexOf(query.toLowerCase()) !== -1
   
  );  }
  return stabilizedThis.map((el) => el[0]);
}

// list of projects per client
export default function Clients() {
   
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let USERLIST = useGetUsers().docs
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = USERLIST.map((n) => n.client);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - USERLIST.length) : 0;

  const filteredUsers = applySortFilter(USERLIST, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  
  const deleteItem = (id) =>{
    firebase.firestore().collection("app_users").doc(id).delete().then(()=>{
      alert("Record was deleted successfully")   
     
    }).catch((e)=>{
      alert(e)
    })
  }

  return (
    <Page title="Quotes">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom style={{flex:1}}>Clients</Typography>
          
          <Button
          
          size="large"
         
          variant="contained"
          style={{textDecoration:"none", marginRight:20}}
       
        >
          <Link component={RouterLink} style={{textDecoration:"none", color:"white"}} variant="subtitle2" to="/addClient"  >
           Add Client
          </Link></Button>

          <CSVLink 
          data={USERLIST}
          filename="Download_file.csv"
          style={{textDecoration:"none"}}
        >  <Button
          
          size="large"
          type="submit"
          variant="contained"
          style={{textDecoration:"none"}}
       
        >
          Download File {USERLIST.length} Records
        </Button></CSVLink>
        </Stack>

        <Card>
        <UserListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={USERLIST.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, name, region, district,merch, phone } = row;
                     
                      return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                      
                        >
                          {/* <TableCell padding="checkbox">
                        
                          </TableCell> */}
                        
                          <TableCell align="left">{name}</TableCell>
                          <TableCell align="left">{region}</TableCell>
                          <TableCell align="left">{district}</TableCell>
                          <TableCell align="left">{merch}</TableCell>   
                          <TableCell align="left">{phone}</TableCell>   
                          <TableCell align="left"><Button
                           onClick={()=>deleteItem(id)}
                           color='warning'
              size="small"
                variant="contained"
            >Delete</Button></TableCell> 
                          <TableCell align="left"> <Link  to={"/agent/"+id}
            state={{data:row}}
             style={{ display: 'grid', color:"inherit", textDecoration:"none", justifyContent:"center",  }}>View</Link></TableCell>   
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <SearchNotFound searchQuery={filterName} />
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
