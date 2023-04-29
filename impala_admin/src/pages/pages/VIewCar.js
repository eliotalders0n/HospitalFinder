import {Link, Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Checkbox, Stack, Typography, Card, TextField, MenuItem, Divider, TablePagination, TableContainer, Table, TableBody, TableRow, TableCell } from '@mui/material';
// components
import Page from '../../components/Page';
import { fNumber } from '../../utils/formatNumber';
import firebase from '../../firebase' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetBookingByCar from 'src/hooks/useGetBookingByCar';
import { filter } from 'lodash';
import Scrollbar from 'src/components/Scrollbar';
import { UserListHead } from 'src/sections/@dashboard/user';
import GetUser from './users/GetUser';
import GetCar from './users/GetCar';
import SearchNotFound from 'src/components/SearchNotFound';


const TABLE_HEAD = [

  { id: 'app_user_id', label: 'Fullname', alignRight: false }, 
  { id: 'extras', label: 'Extras', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'totalAmount', label: 'Total AMount', alignRight: false },
  { id: 'numberOfDays', label: 'Number of Days', alignRight: false },
  
  { id: '' }
];


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

export default function VIewCar() { 
   const location = useLocation()
   const {data} = location.state

   let USERLIST = useGetBookingByCar(data.id).docs
    const notify = (msg) => toast(msg);

   const [page, setPage] = useState(0);
   const [order, setOrder] = useState('asc');
   const [selected, setSelected] = useState([]);
   const [orderBy, setOrderBy] = useState('name');
   const [filterName, setFilterName] = useState('');
   const [rowsPerPage, setRowsPerPage] = useState(10);
  
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
 
  
 
  const deleteItem = () =>{
    firebase.firestore().collection("cars").doc(data.id).delete().then(()=>{
      notify("Vehicle was deleted successfully") 
    }).catch((e)=>{
      alert(e)
    })
  }

  return (
    <Page title="Dashboard">
     <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        />
     
    <Container>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {data.make}  {data.model}   {data.plate}     </Typography> 
          <Link  to={"/editCar/"+data.id}
            state={{id : data.id}}
             style={{ display: 'grid', color:"inherit", textDecoration:"none", justifyContent:"center",  }}>Edit</Link>
              <Typography  
            onClick={()=>deleteItem()}
             style={{ display: 'grid', color:"inherit", textDecoration:"none", justifyContent:"center",  }}>Delete</Typography>
      </Stack>

      <Grid container spacing={3}>
      {/* <Grid item xs={4} md={4}>
      <Typography variant='overline'>Car Details</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
            <Typography variant='overline'>Engine Size</Typography>
            <Typography variant='h5'>
                {data.engine}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Seats</Typography>
            <Typography variant='h5'>
                {data.seatingCapacity} 
            </Typography>
            <Divider />
            <Typography variant='overline'>Fuel Type</Typography>
            <Typography variant='h5'>
                {data.fuel} 
            </Typography>
            <Divider />
            <Typography variant='overline'>Transmission</Typography>
            <Typography variant='h5'>
                {data.transmission} 
            </Typography>
            <Divider />
            <Typography variant='overline'>Year</Typography>
            <Typography variant='h5'>
                {data.year} 
            </Typography>
            <Divider />
            <Typography variant='overline'>Color</Typography>
            <Typography variant='h5'>
                {data.color} 
            </Typography>
            <Divider />
            <Typography variant='overline'>Mileage</Typography>
            <Typography variant='h5'>
                {data.mileage} 
            </Typography>
        </Stack>
        </Card> 
      </Grid>
      */}
      <Grid item xs={12} md={12}>
      <Typography variant='overline'>Car Booking</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3} direction={"row"} justifyContent={"space-between"}>  
        <div>
        <Typography variant='overline'>Total Revenue</Typography>
        <Typography variant='h5'>K{USERLIST && fNumber(USERLIST?.reduce((acc, cur) => acc + cur.totalAmount, 0))}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Days Accumulated</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST?.reduce((acc, cur) => acc + cur.numberOfDays, 0)}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Requests</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.length}</Typography>
        </div>
        </Stack>
        </Card>
        </Grid>

<Grid xs={12} md={12}>
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
                      const { id, app_user_id, car_id, extras,status, totalAmount, numberOfDays } = row;                                           return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                        ><TableCell align="left"><GetUser data={app_user_id} /></TableCell>
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
            count={USERLIST.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
</Grid>
      </Grid>
    </Container>
  </Page>
  )
}
