import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Card, TextField, MenuItem, ImageList, ImageListItem, LinearProgress } from '@mui/material';
// components
import Page from '../../components/Page'; 
import firebase from '../../firebase' 
import brands from 'src/utils/brands';
import { useLocation, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useGetCar from 'src/hooks/useGetCar';

export default function EditCar() { 
  const location = useLocation()
  const {id} = location.state

  const notify = (msg) => toast(msg);
  const [laoding, setlaoding] = useState(false)
   const [values, setValues] = useState(null)
   let navigate = useNavigate()

   let data_ = useGetCar(id).docs

useEffect(() => {
  const { seatingCapacity, make, model, transmission,vin, fuel, minDays, maxDays, mileage, color, year, engine, plate, dailyRentalPriceLocal, dailyRentalPriceOutside } = data_;
  setValues({ ...values, seatingCapacity, make, model,vin, transmission, fuel,  minDays, maxDays, mileage, color, year, engine, plate, dailyRentalPriceLocal, dailyRentalPriceOutside });
}, [data_])
   
 
     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

      const createGame = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("renter_cars").doc(id).update(
        values
            ).then(()=>{
              notify("Vehicle Details Updated")
              setlaoding(false)   
              
        }).catch((err)=>{
          alert("Error updating details.")
          setlaoding(false)
        })
      }


      const [images, setImages] = useState([]);
      const [uploading, setUploading] = useState(false);
      const [progress, setProgress] = useState([]);
      const [urls, setUrls] = useState([]);
    
      const handleImageChange = (event) => {
        if (event.target.files) {
          const fileArray = Array.from(event.target.files);
          setImages(fileArray);
        }
      };
    
      const handleUpload = () => {
        setUploading(true);
        const promises = [];
        const uploadProgress = [];
        const urls = [];
    
        images.forEach((image, index) => {
          const uploadTask = firebase
            .storage()
            .ref(`images/${image.name}`)
            .put(image);
    
          promises.push(uploadTask);
    
          uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              uploadProgress[index] = progress;
              setProgress([...uploadProgress]);
            },
            (error) => console.log(error),
            async () => {
              const downloadUrl = await uploadTask.snapshot.ref.getDownloadURL();
              urls.push(downloadUrl);
              setUrls([...urls]);
              if (urls.length === images.length) {
                firebase.firestore().collection("renter_cars").doc(id)
                .update({img : firebase.firestore.FieldValue.arrayUnion(...urls)}).then(()=>{
                  console.log("Added to database")
                })
               
              }
            }, 
          );
        });
    
        Promise.all(promises)
          .then(() => {
            setUploading(false);
            setImages([]);
            setProgress([]);
            alert("All images uploaded");
          })
          .catch((err) => console.log(err));
      };

    const editExtra = () =>{
      firebase.firestore().collection("renter_cars").doc(id).update(
        {
         extra : firebase.firestore.FieldValue.arrayUnion(values?.extra_title)
        }
            ).then(()=>{             
              alert("Extra added")  
          })
    }
    const editStatus = () =>{
      firebase.firestore().collection("renter_cars").doc(id).update(
        {
         status : values?.status
        }
            ).then(()=>{             
              alert("Status Changed")  
          })
    }
    const removeExtra = (item) =>{
      firebase.firestore().collection("renter_cars").doc(id).update(
        {
         extra : firebase.firestore.FieldValue.arrayRemove(item)
        }
            ).then(()=>{             
              alert("Extra removed")  
          })
    }
    const removeImg = (item) =>{
      firebase.firestore().collection("renter_cars").doc(id).update(
        {
         img : firebase.firestore.FieldValue.arrayRemove(item)
        }
            ).then(()=>{             
              alert("Extra removed")  
          })
    }

    let typeOfCars = ["Mini Van", "Luxury", "Cargo Van", "SUV", "Sedan", "Pickup", "Hatchback", "Station Wagon", "Convertible" ]
      

  return (
  values && data_&& <Page title="Dashboard">
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
      <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Card sx={{p:3}}>
      <Typography variant="subtitle1" gutterBottom>
           Edit Vehicle
        </Typography> 
        <Stack spacing={3}>
        <TextField
        fullWidth
        select  value={values.make}
        onChange={handleChange('make')}    
        label="Select Brand" >
        {brands.map((c, index)=>(
          <MenuItem  value={c.brand} key={index}>{c.brand}</MenuItem>
        ))}
        </TextField> 

        <TextField
        fullWidth   value={values.model}     
        onChange={handleChange('model')}    
        label="Model" />
        <TextField
        fullWidth   select      
        onChange={handleChange('typeOfCar')}    
        label="Select Car Type" > 
        {typeOfCars.map((u, index)=>(
          <MenuItem  value={u} key={index}>{u}</MenuItem>
        ))}
        </TextField>
      <TextField  value={values.year}
        fullWidth       type={"number"}    
        onChange={handleChange('year')}    
        label="Year" />
      
      <TextField
        fullWidth   value={values.color}
          
        onChange={handleChange('color')}    
        label="Color" />

      <TextField     value={values.seatingCapacity}
        fullWidth     type={"number"}         
        onChange={handleChange('seatingCapacity')}    
        label="Number of Seats" />

      <TextField     value={values.minDays}
        fullWidth     type={"number"}         
        onChange={handleChange('minDays')}    
        label="Minimum number of Rental Days" />

      <TextField     value={values.maxDays}
        fullWidth     type={"number"}         
        onChange={handleChange('maxDays')}    
        label="MAximum number of Rental Days" />

<TextField    value={values.engine}
        fullWidth      type={"number"}    
        onChange={handleChange('engine')}    
        label="Engine Size" />

<TextField    value={values.fuel}
        fullWidth   select      
        onChange={handleChange('fuel')}    
        label="Fuel Type" >
 <MenuItem  value={"PETROL"} >PETROL</MenuItem>
 <MenuItem  value={"DIESEL"} >DIESEL</MenuItem>
 <MenuItem  value={"ELECTRIC"} >ELECTRIC</MenuItem>
 <MenuItem  value={"HYBRID"} >HYBRID</MenuItem>
        </TextField>        

<TextField
        fullWidth   select    value={values.transmission}   
        onChange={handleChange('transmission')}    
        label="Automatic or Manual Transmission" >
 <MenuItem  value={"AUTOMATIC"} >AUTOMATIC</MenuItem>
 <MenuItem  value={"MANUAL"} >MANUAL</MenuItem>
        </TextField> 
<TextField
        fullWidth       type={"number"}  value={values.mileage}
        onChange={handleChange('mileage')}    
        label="Mileage" /> 
<TextField
        fullWidth      value={values.plate}
        onChange={handleChange('plate')}    
        label="License Plate" />
<TextField
        fullWidth       value={values.dailyRentalPriceLocal} 
        onChange={handleChange('dailyRentalPriceLocal')}    
        label="Daily Rental Price Local" />
        <TextField
        fullWidth       value={values.dailyRentalPriceOutside} 
        onChange={handleChange('dailyRentalPriceOutside')}    
        label="Daily Rental Price Outside" />
    <TextField
        fullWidth    value={values.vin}    type="number"
        onChange={handleChange('vin')}    
        label="VIN / Chassis Number" />
        
        {laoding ? null : <Button
        fullWidth={false}
          variant="contained"
           onClick={()=>createGame()}
             >
          Save
        </Button>}
        </Stack>
      </Card>
      </Grid>
    
    <Grid item xs={6} md={6} spacing={3}>
    <Card sx={{p:3}}>
      <Typography variant="subtitle1" gutterBottom>
           Vehicle Images
        </Typography> 
        <Typography variant="overline" gutterBottom>
           Upload Images
        </Typography> <br/>
        
      <input type="file" multiple onChange={handleImageChange} />
        <Button size="large" onClick={handleUpload}>Upload</Button>
      {uploading &&
        images.map((image, index) => (
          <div key={index}>
            <img src={URL.createObjectURL(image)} alt={image.name} />
            <p>{image.name}</p>
            <LinearProgress variant="determinate"  value={progress[index]} />
  
          </div>
        ))}
        <Stack spacing={3}>
       
        <ImageList sx={{ width: 500, height: 550 }} variant="masonry" cols={2} rowHeight={164} >
      {data_?.img?.map((item, index) => (
        <ImageListItem key={index} onClick={()=>removeImg(item)}>
          <img
            src={`${item}`}
            srcSet={`${item}`}
            alt={item}
            loading="lazy"
          />
        </ImageListItem>
      ))}
    </ImageList>
  
        </Stack>
      </Card>
<br/>
      <Card sx={{p:3}}>
        <Typography variant="subtitle1">Extras</Typography>
        <br/>
        <Typography variant='overline'>{values?.id ? "Edit" : "Add"} Extra</Typography>
    <Stack spacing={3}>
        <TextField
        fullWidth   
        onChange={handleChange('extra_title')}    
        label="Name of extra" />   
 <Button
        fullWidth={false}
          variant="contained"
           onClick={  ()=>editExtra()}
             >
         Save
        </Button>

        </Stack>
        <br/>
        <Stack style={{display:"flex", flexWrap:"wrap" }} direction="row">
        {data_.extra?.map((e, index)=>(
          <Typography style={{marginRight:20}} onClick={()=>removeExtra(e)} key={index}>{e}</Typography>
        ))}
        </Stack>
      </Card>
      <br/>
      <Card sx={{p:3}}>
        <Typography variant="subtitle1">Car Status : <Typography color={"green"} variant="overline">{data_?.status}</Typography></Typography>
        <br/>
       
    <Stack spacing={3}>
    <TextField    value={values.status}
        fullWidth   select      
        onChange={handleChange('status')}    
        label="Status" >
 <MenuItem  value={"ONLINE"} >Online</MenuItem>
 <MenuItem  value={"OFFLINE"} >Offline</MenuItem>
 <MenuItem  value={"PENDING"} >Pending</MenuItem>
        </TextField> 
 <Button
        fullWidth={false}
          variant="contained"
           onClick={  ()=>editStatus()}
             >
         Save
        </Button>
        </Stack>
      </Card>
    </Grid>
      </Grid>
    </Container>
  </Page>
  )
}
