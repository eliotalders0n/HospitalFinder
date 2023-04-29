import { filter } from 'lodash'; 
import { useState } from 'react'; 
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
  Grid,
  TextField,
  MenuItem,
  Divider
} from '@mui/material';
// components
import Page from '../../components/Page';
import firebase from '../../firebase'
import Scrollbar from '../../components/Scrollbar';
import SearchNotFound from '../../components/SearchNotFound';
import { UserListHead } from '../../sections/@dashboard/user';
import useGetCoupons from 'src/hooks/useGetCoupons';
import { useEffect } from 'react';
// ----------------------------------------------------------------------

const TABLE_HEAD = [

  { id: 'couponCode', label: 'Coupon Code', alignRight: false },
  { id: 'discountAMount', label: 'Discount Amount', alignRight: false },
  { id: 'validFrom', label: 'Valid From', alignRight: false },
  { id: 'validUntil', label: 'Valid Until', alignRight: false },  
  { id: 'status', label: 'Status', alignRight: false },  
  { id: '' },
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

function Coupons() {

      
  
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [loading, setlaoding] = useState(false)

  const [values, setValues] = useState(null)
 
       const handleChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

  let USERLIST = useGetCoupons().docs
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
 

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - bookings?.length) : 0;

  const filteredUsers = applySortFilter(bookings, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  
  const deleteItem = (id) =>{
    firebase.firestore().collection("coupons").doc(id).delete().then(()=>{
      alert("Extra was deleted successfully")        
    }).catch((e)=>{
      alert(e)
    })
  }

  const createGame = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("coupons").add(
        {
            couponCode: values.couponCode,
            discountAmount: parseInt(values.discountAmount),
            validFrom: values.validFrom,
            validUntil: values.validUntil,
            createdAt: new Date().toLocaleDateString(),
            status : values.status,
            typeOfCoupon : values.typeOfCoupon,
            maxUsage : parseInt(values.maxUsage),
            addedBy : firebase.auth().currentUser.uid
        }
            ).then(()=>{
              setlaoding(false)  
              setValues({couponCode : "", validFrom: "",
              maxUsage: "", status : "", validUntil:"", createdAt:"" , discountAmount : 0})
              alert("Coupon added")  
        })
      }
  const editExtra = (id) =>{ 
        setlaoding(true)
          firebase.firestore().collection("coupons").doc(id).update(
        {
            couponCode: values.couponCode,
            discountAmount: parseInt(values.discountAmount),
            validFrom: values.validFrom,
            validUntil: values.validUntil,
            status : values.status,
            maxUsage : parseInt(values.maxUsage),
            typeOfCoupon : values.typeOfCoupon,
            updatedAt: new Date().toLocaleDateString(),
            updatedBy : firebase.auth().currentUser.uid
        }
            ).then(()=>{
              setlaoding(false)  
              setValues({name : "", price : 0})
              alert("Coupons added")  
        })
      }


  return (
   <Page>
    <Container>
        <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
      <Typography variant='overline'>Coupon Overall</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3} direction={"row"} justifyContent={"space-between"}>  
        <div>
        <Typography variant='overline'>Total Active</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.filter(item => item.status === "ACTIVE").length}</Typography>
        </div>
        <div>
        <Typography variant='overline'>Total Disabled</Typography>
        <Typography variant='h5'>{USERLIST && USERLIST.filter(item => item.status === "DISABLED").length}</Typography>
        </div>
   
        </Stack>
        </Card>
        <Divider />
<br/>
<Stack direction={"row"} spacing={3} >
    <Button variant={selectedFilter === "All" ? "contained" : "outlined"} onClick={()=>selectItem("All")}>All</Button>
    <Button variant={selectedFilter === "Active" ? "contained" : "outlined"} onClick={()=>selectItem("Active")}>Active</Button> 
    <Button variant={selectedFilter === "Disabled" ? "contained" : "outlined"} onClick={()=>selectItem("Disabled")}>Disabled</Button> 
  
 </Stack>
        </Grid>

        <Grid item xs={8} md={8}>
    <Card>
              <Scrollbar>
            <TableContainer sx={{ }}>
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
                      const { id, couponCode, validFrom, status, validUntil, discountAmount} = row;        
                        return (
                        <TableRow
                          hover
                          key={id}
                          tabIndex={-1}
                        ><TableCell align="left">{couponCode}</TableCell>
                          <TableCell align="left">{discountAmount}%</TableCell>  
                          <TableCell align="left">{validFrom}</TableCell>  
                          <TableCell align="left">{validUntil}</TableCell>  
                          <TableCell align="left">{status}</TableCell>  
                          <TableCell align="left"><Button onClick={()=>setValues(row)}>View</Button></TableCell>   
                          <TableCell align="left"><Button onClick={()=>deleteItem(id)}>Delete</Button></TableCell>   
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
    </Grid>
         
            <Grid item xs={4} md={4} spacing={3}>
    <Typography variant='overline'>{values?.id ? "Edit" : "Add"} Coupon</Typography>
    <Stack spacing={3}> 
        <TextField
        fullWidth   value={values?.couponCode}     
        onChange={handleChange('couponCode')}    
        label="Coupon Code" />

        <TextField
        fullWidth type="number"  value={values?.discountAmount}     
        onChange={handleChange('discountAmount')}    
        label="Discount Amount (%)" />
      
        <TextField
        fullWidth type="date"  value={values?.validFrom}     
        onChange={handleChange('validFrom')}    
        label="Valid from" />
      
        <TextField
        fullWidth type="date"  value={values?.validUntil}     
        onChange={handleChange('validUntil')}    
        label="Valid Until" />
      
        <TextField
        fullWidth type="number"  value={values?.maxUsage}     
        onChange={handleChange('maxUsage')}    
        label="Maximum Usage Count" />

        <TextField
        fullWidth   select      
        onChange={handleChange('status')}    
        label="Coupon Status" >
                <MenuItem  value={"ACTIVE"} >Active</MenuItem>
                <MenuItem  value={"DISABLED"} >Disabled</MenuItem>
        </TextField>

        <TextField
        fullWidth   select      
        onChange={handleChange('typeOfCoupon')}    
        label="Type of Coupon" >
                <MenuItem  value={"NORMAL"} >Normal</MenuItem>
                <MenuItem  value={"ACHIEVED"} >Achieved</MenuItem>
        </TextField>

{!loading && <Button
        fullWidth={false}
          variant="contained"
           onClick={values?.id ? ()=>editExtra(values?.id) :  ()=>createGame()}
             >
         {values?.id ? "Update" : "Save"}
        </Button>}

        </Stack>
    </Grid>
        </Grid>
    </Container>
   </Page>
  )
}

export default Coupons