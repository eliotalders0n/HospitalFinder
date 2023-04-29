import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Card, TextField, MenuItem } from '@mui/material';
// components
import Page from '../../components/Page'; 
import firebase from '../../firebase' 
import brands from 'src/utils/brands';
import { useNavigate } from 'react-router-dom';
import useGetUsers from 'src/hooks/useGetUsers';

export default function AddNewCar() { 
  let navigate = useNavigate()
  const [laoding, setlaoding] = useState(false)
   const [values, setValues] = useState(null)
let users = useGetUsers().docs

     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  let typeOfCars = ["Mini Van", "Luxury", "Cargo Van", "SUV", "Sedan", "Pickup", "Hatchback", "Station Wagon", "Convertible" ]
      
      const createGame = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("renter_cars").add(
        values
            ).then((doc)=>{
              let data = {
                id: doc.id
              }
              setlaoding(false)    
              navigate(`/editCar/${doc.id}`, {state : data})
        })
      }

  return (
    <Page title="Dashboard">
    <Container>
      <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Card sx={{p:3}}>
      <Typography variant="subtitle1" gutterBottom>
           Add Vehicle
        </Typography> 
        <Stack spacing={3}>
        <TextField
        fullWidth   select      
        onChange={handleChange('app_user_id')}    
        label="Select Car Owner" >
        <MenuItem  value={firebase.auth().currentUser.uid} key={"admin"}>Admin</MenuItem>
        {users && users.map((u, index)=>(
          <MenuItem  value={u.id} key={index}>{u.name}</MenuItem>
        ))}
        </TextField>
        <TextField
        fullWidth   select      
        onChange={handleChange('typeOfCar')}    
        label="Select Car Type" > 
        {typeOfCars.map((u, index)=>(
          <MenuItem  value={u} key={index}>{u}</MenuItem>
        ))}
        </TextField>
        
        <TextField
        fullWidth
        select
        onChange={handleChange('make')}    
        label="Select Brand" >
        {brands.map((c, index)=>(
          <MenuItem  value={c.brand} key={index}>{c.brand}</MenuItem>
        ))}
        </TextField> 

        <TextField
        fullWidth       
        onChange={handleChange('model')}    
        label="Model" />
      
      <TextField
        fullWidth       type={"number"}    
        onChange={handleChange('year')}    
        label="Year" />
      
      <TextField
        fullWidth  
          
        onChange={handleChange('color')}    
        label="Color" />

      <TextField
        fullWidth     type={"number"}         
        onChange={handleChange('seatingCapacity')}    
        label="Number of Seats" />

<TextField     
        fullWidth     type={"number"}         
        onChange={handleChange('minDays')}    
        label="Minimum number of Rental Days" />

      <TextField    
        fullWidth     type={"number"}         
        onChange={handleChange('maxDays')}    
        label="Maximum number of Rental Days" />
      <TextField    
        fullWidth     type={"number"}         
        onChange={handleChange('dailyRentalPriceLocal')}    
        label="Daily Rental Price Local" />
      <TextField    
        fullWidth     type={"number"}         
        onChange={handleChange('dailyRentalPriceOutside')}    
        label="Daily Rental Price Outside" />

<TextField
        fullWidth      type={"number"}    
        onChange={handleChange('engine')}    
        label="Engine Size" />

<TextField
        fullWidth   select      
        onChange={handleChange('fuel')}    
        label="Fuel Type" >
 <MenuItem  value={"PETROL"} >PETROL</MenuItem>
 <MenuItem  value={"DIESEL"} >DIESEL</MenuItem>
 <MenuItem  value={"ELECTRIC"} >ELECTRIC</MenuItem>
 <MenuItem  value={"HYBRID"} >HYBRID</MenuItem>
        </TextField>        
<TextField
        fullWidth   select      
        onChange={handleChange('location')}    
        label="Location" >
 <MenuItem  value={"Lusaka"} >Lusaka</MenuItem>
 <MenuItem  value={"Kitwe"} >Kitwe</MenuItem>
 <MenuItem  value={"Ndola"} >Ndola</MenuItem>
 <MenuItem  value={"Livingstone"} >Livingstone</MenuItem>
 <MenuItem  value={"Chipata"} >Chipata</MenuItem>
        </TextField>        

<TextField
        fullWidth   select      
        onChange={handleChange('transmission')}    
        label="Automatic or Manual Transmission" >
 <MenuItem  value={"AUTOMATIC"} >AUTOMATIC</MenuItem>
 <MenuItem  value={"MANUAL"} >MANUAL</MenuItem>
        </TextField>

<TextField
        fullWidth       type={"number"}
        onChange={handleChange('mileage')}    
        label="Mileage" />

 

<TextField
        fullWidth     
        onChange={handleChange('plate')}    
        label="License Plate" />

<TextField
        fullWidth     type="number"
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
    
      </Grid>
    </Container>
  </Page>
  )
}
