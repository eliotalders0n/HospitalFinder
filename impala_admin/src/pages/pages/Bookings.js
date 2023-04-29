import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useEffect, useState } from 'react';
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
  Button,
  Divider,
  Grid
} from '@mui/material';
// components
import Page from '../../components/Page';
import firebase from '../../firebase'
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead, UserListToolbar, UserMoreMenu } from '../../sections/@dashboard/user';
//
 
import { fNumber } from 'src/utils/formatNumber';
import useGetBookings from 'src/hooks/useGetBookings';
import { CSVLink } from 'react-csv';
import GetUser from './users/GetUser';
import GetCar from './users/GetCar';
// ----------------------------------------------------------------------

const TABLE_HEAD = [

  { id: 'app_user_id', label: 'Fullname', alignRight: false },
  { id: 'car_id', label: 'Car', alignRight: false },
  { id: 'extras', label: 'Extras', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'totalAmount', label: 'Total AMount', alignRight: false },
  { id: 'numberOfDays', label: 'Number of Days', alignRight: false },
  
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
export default function Bookings() {
   
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);

  let USERLIST = useGetBookings().docs
  const [bookings, setbookings] = useState([])
  const [selectedFilter, setselectedFilter] = useState("All")
  
  useEffect(() => {
      setbookings(USERLIST)
  }, [USERLIST])
  
    const selectItem = (filt) =>{
      setselectedFilter(filt)
      if(filt === "All"){
          setbookings(USERLIST)
          return
      }
      let filtered = USERLIST.filter(item => item.status === String(filt).toUpperCase());
      setbookings(filtered)
    }

    
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = bookings?.map((n) => n.client);
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

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings?.length) : 0;

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  
  const deleteItem = (id) =>{
    firebase.firestore().collection("app_users").doc(id).delete().then(()=>{
      alert("Record was deleted successfully")   
     
    }).catch((e)=>{
      alert(e)
    })
  }

  return (
    <Page title="Bookings">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom style={{flex:1}}>Bookings</Typography>    
         
          <Link  to={"/addNewBooking/"} state={{type : "B"}}> <Button
          sx={{marginRight:2}}
          size="small"
          type="submit"
          color='success'
          variant="contained"
          style={{textDecoration:"none"}} 
        >
        
       Create A Booking
        </Button>
       </Link>

          <CSVLink 
          data={bookings}
          filename="Download_file.csv"
          style={{textDecoration:"none"}}
        >  <Button
          
          size="small"
          type="submit"
          variant="contained"
          style={{textDecoration:"none"}}
       
        >
          Download File {bookings?.length} Records
        </Button></CSVLink>
        </Stack>

        <Grid item xs={12} md={12}>
      <Typography variant='overline'>Overall</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3} direction={"row"} justifyContent={"space-between"}>  
        <div>
        <Typography variant='overline'>Total Pending</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.filter(item => item.status === "PENDING").length}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Collected</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.filter(item => item.status === "COLLECTED").length}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Complete</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.filter(item => item.status === "COMPLETE").length}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Bookings</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.length}</Typography>
        </div>
        </Stack>
        </Card>
        </Grid>

        <Divider />
<br/>
<Stack direction={"row"} spacing={3} >
    <Button variant={selectedFilter === "All" ? "contained" : "outlined"} onClick={()=>selectItem("All")}>All</Button>
    <Button variant={selectedFilter === "Pending" ? "contained" : "outlined"} onClick={()=>selectItem("Pending")}>Pending</Button> 
    <Button variant={selectedFilter === "Collected" ? "contained" : "outlined"} onClick={()=>selectItem("Collected")}>Collected</Button> 
    <Button variant={selectedFilter === "Complete" ? "contained" : "outlined"} onClick={()=>selectItem("Complete")}>Complete</Button> 
 </Stack>
        <Card>
      
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={bookings?.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      const { id, app_user_id, car_id, extras,status, totalAmount, numberOfDays } = row;                                           return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                        ><TableCell align="left"><GetUser data={app_user_id} /></TableCell>
                          <TableCell align="left"><GetCar data={car_id} /></TableCell>
                          <TableCell align="left">{extras}</TableCell>
                          <TableCell align="left">{status}</TableCell>   
                          <TableCell align="left">{totalAmount}</TableCell>   
                          <TableCell align="left">{numberOfDays}</TableCell>   
                        
                          <TableCell align="left"> <Link  to={"/viewBooking/"+id}
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
            count={bookings?.length}
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
