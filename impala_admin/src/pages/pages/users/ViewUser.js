import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';
// material
import { Grid, Button, Link, Container, Checkbox, Stack, Typography, Card, TextField, MenuItem, Divider, Box } from '@mui/material';
// components
import Page from '../../../components/Page';
import firebase from '../../../firebase' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import BookingTable from './BookingTable';
import GetUser from './GetUser';

export default function ViewUser() {
   const [values, setValues] = useState(null)
   const location = useLocation()
   const {data} = location.state
  //  const {data} = GetUser

   const navigate = useNavigate()
   const notify = (msg) => toast(msg);

     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
  const sendNotification = (msg) =>{
    var formdata = new FormData();
    formdata.append("to", data.token);
    formdata.append("title", "Taximania Admin");
    formdata.append("body", "Your account was " + msg);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://corserver.onrender.com/https://exp.host/--/api/v2/push/send", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
 
  const update = (status) =>{
    firebase.firestore().collection("app_users").doc(data.id).update({
      status : status,
      lastUpdateBy : firebase.auth().currentUser.uid
    }).then(()=>{
      notify("Status updated")
      sendNotification(status)
      navigate(-1)
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
     
    <Container maxWidth="xl">
    <Stack direction="row" justifyContent={"space-between"}>
      <Stack direction="row" alignItems="flex-end" justifyContent="space-between" mb={5}>
        <Typography variant="h4" gutterBottom>
          {data.name}</Typography>                 
      </Stack>
   
        </Stack>
        <Stack direction={"row"} spacing={3}>
        <Button size="small"   variant="contained" color="success" onClick={()=>update("APPROVED")} style={{textDecoration:"none"}} >APPROVE</Button>  
        <Button size="small"   variant="contained" color='error' onClick={()=>update("DENIED")} style={{textDecoration:"none"}} >DENIED</Button>  
        </Stack>
        <Divider sx={{marginTop:2, marginBottom:2}} />
      <Grid container spacing={3}>
      <Grid item xs={3} md={3}>
      <Typography variant='overline'>Details</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
        {data?.documents?.PHOTO && <Box component="img" src={data?.documents?.PHOTO} sx={{ width: 140, height: 140,  borderRadius:2,  }} />}
            <Typography variant='overline'>Full Name</Typography>
            <Typography variant='h5'>
                {data.firstName} {" "} {data.lastName}
            </Typography>
          
            <Typography variant='overline'>Email</Typography>
            <Typography variant='h5'>
                {data.email} 
            </Typography>
           
            <Typography variant='overline'>Address</Typography>
            <Typography variant='h5'>
                {data.address} 
            </Typography>
            
            <Typography variant='overline'>Password</Typography>
            <Typography variant='h5'>
                {data.password} 
            </Typography>

            <Typography variant='overline'>Status</Typography>
            <Typography variant='h5'>
                {data.admin} 
            </Typography>
            {/* <Typography variant='overline'>Drivers Licnese</Typography>
            <Typography variant='h5'>
                {data.drivers_license} 
            </Typography>
           
            <Typography variant='overline'>Status</Typography>
            <Typography variant='h5'>
                {data.status} 
            </Typography> */}
               
        </Stack>
        </Card>
        <br/><br/>
        <Typography variant='overline'>Documents</Typography>
      <Card sx={{p:3}}>
        {/* <Stack spacing={3}>  
        <Typography variant='overline'>Driver License (Back)</Typography>
        {data.documents["DRIVERS_LICENSE_BACK"] === "" ?
                <Typography variant='overline'>Document missing</Typography> :
                <Link  href={data.documents["DRIVERS_LICENSE_BACK"]} >View Document</Link>} 
     
            <Divider />
            <Typography variant='overline'>Driver License (Front)</Typography>
            {data.documents["DRIVERS_LICENSE_FRONT"] === "" ?
                <Typography variant='overline'>Document missing</Typography> :
                <Link  href={data.documents["DRIVERS_LICENSE_FRONT"]} >View Document</Link>} 
 
            <Divider />
            <Typography variant='overline'>NRC (Back)</Typography>
            {data.documents["NRC_BACK"] === "" ?
                <Typography variant='overline'>Document missing</Typography> :
                <Link  href={data.documents["NRC_BACK"]} >View Document</Link>} 
 
            <Divider />
            <Typography variant='overline'>NRC (Front)</Typography>
            {data.documents["NRC_FRONT"] === "" ?
                <Typography variant='overline'>Document missing</Typography> :
                <Link  href={data.documents["NRC_FRONT"]} >View Document</Link>} 
  
            <Divider />
            <Typography variant='overline'>Photo</Typography>        
                {data.documents["PHOTO"] === "" ?
                <Typography variant='overline'>Document missing</Typography> :
                <Link  href={data.documents["PHOTO"]} >View Document</Link>} 
            
            <Divider />

        </Stack> */}
        </Card>

      </Grid>
{/*      
      <Grid item xs={9} md={9}>
        <BookingTable id={data.id}/>
        </Grid> */}

      </Grid>
    </Container>
  </Page>
  )
}
