import { Link as RouterLink, useNavigate, useLocation } from 'react-router-dom';
import {useState, useEffect} from 'react';
// material
import { Grid, Button, Link, Container, Checkbox, Stack, Typography, Card, TextField, MenuItem, Divider } from '@mui/material';
// components
import Page from '../../../components/Page';
import firebase from '../../../firebase' 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GetUser from './GetUser';
import useGetUser from 'src/hooks/useGetUser';
import useGetCar from 'src/hooks/useGetCar';
import emailjs from '@emailjs/browser';
import ReactPDF, { PDFDownloadLink, PDFViewer, usePDF } from '@react-pdf/renderer';
import InvoicePDF from '../Emails/InvoicePDF';
import { fNumber } from 'src/utils/formatNumber';
import useGetBookings from 'src/hooks/useGetBookings';

export default function ViewBooking() {
   const [values, setValues] = useState(null)
   const location = useLocation()
   const {data, type} = location.state

let user = useGetUser(data.app_user_id).docs
let car = useGetCar(data.car_id).docs
 
   const navigate = useNavigate()
   const notify = (msg) => toast(msg);

     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const sendNotification = (msg) =>{
    var formdata = new FormData();
    formdata.append("to", user.token);
    formdata.append("title", "Taximania Admin");
    formdata.append("body", msg);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://exp.host/--/api/v2/push/send", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }
 
  const update = () =>{
    firebase.firestore().collection("booking").doc(data.id).update({
      status : values.status,
      lastUpdateBy : firebase.auth().currentUser.uid,
      lastUpdateDate : new Date().toLocaleDateString()
    }).then(()=>{
      if(values?.status === "ACCEPTED" || values?.status === "COLLECTED")
      {
        firebase.firestore().collection("renter_cars").doc(data.car_id).update({status:"OFFLINE"}).then(()=>{
          notify("Status updated")
          sendNotification("Your booking has been " + values.status + ". Open the app for more details")
          navigate(-1)
        }) 
        return
      }
      if(values?.status === "RETURNED" || values?.status === "COMPLETE")
      {
        firebase.firestore().collection("renter_cars").doc(data.car_id).update({status:"ONLINE"}).then(()=>{
          notify("Status updated")
          sendNotification("Your booking has been " + values.status + ". Open the app for more details")
          navigate(-1)
        }) 
        return
      }
      notify("Status updated")
      sendNotification("Your booking has been " + values.status + ". Open the app for more details")
      navigate(-1)
         
    })
  }

  const bookingStatuses = [
    {
      status: 'PENDING',
      explanation: 'The booking is pending and is being reviewed by the company.',
      title: 'Booking Pending'
    },
    {
      status: 'ACCEPTED',
      explanation: 'The booking has been accepted by the company and is confirmed.',
      title: 'Booking Accepted'
    },
    {
      status: 'COLLECTED',
      explanation: 'The customer has collected the car.',
      title: 'Car Collected'
    },
    {
      status: 'RETURNED',
      explanation: 'The customer has returned the car to the company.',
      title: 'Car Returned'
    },
    {
      status: 'COMPLETE',
      explanation: 'The booking has been completed and the car has been returned.',
      title: 'Booking Completed'
    }
  ];
  
  const [blobUrl, setBlobUrl] = useState("");
  const [msg, setmsg] = useState("")
  
  let publicKey = "54lQzVPslTf0AlGlL"

  const generatePdf = async () => {
    const blob = await ReactPDF.pdf(<InvoicePDF data={data} car={car} user={user} />).toBlob();
    const blobUrl = URL.createObjectURL(blob);
    setBlobUrl(blobUrl);
    
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = `${data.q_id}_QUOTE.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  //  sendEmail(blob)
  };

  const blobToBase64 = blob => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
  });
 
  const sendEmail = async (quote, id) => {
    const blob = await ReactPDF.pdf(<InvoicePDF data={data} car={car} user={user} />).toBlob();
    setmsg("Sending Email");
    try {
      const storageRef = firebase.storage().ref(`${data.id}_QUOTE`);
      const snapshot = await storageRef.put(blob);
      const url = await storageRef.getDownloadURL();
      //const file = await convertBlobToBase64(blob);
      await firebase.firestore().collection("quotations").doc(data.id).update({quote_file: url});
      //content: file
      const obj = {id: data.id, email: data.q_id ? data.email :  user.email,  link : url};
      setmsg("Uploading files to server");
      const result = await emailjs.send('service_rmwtymk', 'template_1fptod8', obj, publicKey);
      if(result.status === 200){
        setmsg("Email has been sent.");
        console.log(result);
      }
    } catch (error) {
      console.log(error);
      notify(error);
    }
  };
    // const generatePdf = async () => {
  //   const blob = await ReactPDF.pdf(<InvoicePDF data={data} car={car} user={user} />).toBlob();
  //   const blobUrl = URL.createObjectURL(blob);
  //   setBlobUrl(blobUrl);
  // };

  // const handleDownload = () => {
  //   const link = document.createElement("a");
  //   link.href = blobUrl;
  //   link.download = "invoice.pdf";
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  // };
 
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
      <Stack direction="row" justifyContent={"space-between"}>
      <div>
      <Typography variant='overline'>Booking Status</Typography> : <Typography variant="overline" color={"green"} gutterBottom> {data.status}</Typography>  
</div>

                     
      </Stack>

      <Grid container spacing={3}>
      <Grid item xs={4} md={4}>
      <Typography variant='overline'>User Details</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
            <Typography variant='overline'>Full Name</Typography>
            <Typography variant='h5'>
                {user ? user?.name : data.name}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Email</Typography>
            <Typography variant='h5'>
            {user ? user?.email : data.email}
            </Typography>
            <Divider />
            <Typography variant='overline'>Phone</Typography>
            <Typography variant='h5'>
            {user ? user?.phone : data.phone}
            </Typography>
            <Divider />
            <Typography variant='overline'>Car Details</Typography>
      
            <Typography variant='overline'>Car Make/model</Typography>
            <Typography variant='h5'>
                {car && `${car?.make} ${car.model}`}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Belongs to</Typography>
            <Typography variant='h5'>
           
            {car && <GetUser data={car.app_user_id} />}
            </Typography>
        </Stack>
        </Card>
      
      </Grid>
        <Grid item xs={4} md={4}>
     <Typography variant='overline'>Booking Details</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
            <Typography variant='overline'>Duration</Typography>
            <Typography variant='h5'>
                { new Date(new firebase.firestore.Timestamp(data.startDate.seconds, data.startDate.nanoseconds).toDate()).toLocaleDateString()}
            </Typography>
            <Typography variant='h5'>
                {new Date(new firebase.firestore.Timestamp(data.endDate.seconds, data.endDate.nanoseconds).toDate()).toLocaleDateString()}
            </Typography>
             
            <Divider/>
            <Typography variant='overline'>Extras Cost</Typography>
            <Typography variant='h5'>
                K{fNumber(data.extras)}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Number of Days</Typography>
            <Typography variant='h5'>
            {data.numberOfDays}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Cost per day</Typography>
            <Typography variant='h5'>
            K{fNumber(data.rating)}
            </Typography>
            <Divider/>
            <Typography variant='overline'>Total Amount</Typography>
            <Typography variant='h5'>
            K{fNumber(data.totalAmount)}
            </Typography>
        </Stack>
        </Card>
     </Grid>
     
     <Grid item xs={4} md={4}>
     <>
      {data.status !== "COMPLETE" && type === "B" &&  (
        <>
        <TextField
        fullWidth   select      
        onChange={handleChange('status')}    
        label="Select booking status" >   
            {bookingStatuses.filter(status => status.status !== data.status).map((u, index) => (
              <MenuItem value={u.status} key={index}>{u.title}</MenuItem>
            ))}
          </TextField>
          <br />
          <br />
        </>
      )}
      {values?.status && values?.status !== data.status && type === "B" &&  (
        <Button 
          onClick={()=>update()}           
        >
          Save
        </Button>
      )}
      {data.status === "COMPLETE" || (data.q_id && (
        <Stack spacing={3}>
          <Button variant='outlined' onClick={sendEmail}>Send Email</Button>
          <Button variant='outlined' onClick={generatePdf}>Download PDF</Button>
        </Stack>
      ))}

    </>
     {/* <><TextField
        fullWidth   select      
        onChange={handleChange('status')}    
        label="Select booking status" >      
        {bookingStatuses.map((u, index)=>(
          <MenuItem  value={u.status} key={index}>{u.title}</MenuItem>
        ))}
        </TextField> 
        <br/>
        <br/>
        <Button    variant="contained" color="success" onClick={()=>update()} style={{textDecoration:"none"}} >Save</Button> 
        </> 
     {data.status  !== "COMPLETE" ? <Stack direction={"row"} spacing={3}>
{values?.status && <Button    variant="contained" color="success" onClick={()=>update()} style={{textDecoration:"none"}} >Save</Button> } 

</Stack> : 
<Stack>
 <Button variant='outlined' onClick={()=>sendEmail()}>Send Email</Button>
      <Button variant='outlined' onClick={()=>generatePdf()}>Download PDF</Button>
</Stack>}
 {data.q_id  &&
  <Stack spacing={3}>
      <Button variant='outlined' onClick={()=>sendEmail()}>Send Email</Button>
      <Button variant='outlined' onClick={()=>generatePdf()}>Download PDF</Button>
</Stack>
 } */}
 {msg}
<br/>
     <Typography variant='overline'>Extras Chosen</Typography>
      <Card sx={{p:3}}>
        <Stack spacing={3}>  
          {data.myExtras.map((me, index)=>(
            <>
            <Typography variant='overline'>{me.name}</Typography>
            <Typography variant='h5'>
                {me.price}
            </Typography>
            <Divider/>
            </>
          ))}
           
           
        </Stack>
        </Card>
     </Grid>
     
    
      
      </Grid>
 
    </Container>
  </Page>
  )
}
