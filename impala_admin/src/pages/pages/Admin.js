import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import React ,{useState, useEffect}from 'react'
import Page from 'src/components/Page'
import firebase from './../../firebase'
import useGetAdmin from 'src/hooks/useGetAdmin'

function Admin() {

    let admin = useGetAdmin().docs
    const [loading, setlaoding] = useState(false)

    const [values, setValues] = useState()

    useEffect(() => {
      setValues({ 
        refuelingCharge : admin ? admin.refuelingCharge : null,
        excessMileage : admin ? admin.excessMileage : null,
        vat : admin ? admin.vat : null,
        govtLevy : admin ? admin.govtLevy : null,
        driverCharge : admin ? admin.driverCharge : null,
        chauffer : admin ? admin.chauffer : null,

    })
    }, [admin])
    
 
    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: parseFloat(event.target.value) });
      };

      const editExtra = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("admin").doc("admin").set(
        {
          ...values,
          lastUpdatedBy : firebase.auth().currentUser.uid,
          createdAt : new Date().toLocaleDateString()
        }
            ).then(()=>{
              setlaoding(false)               
              alert("Admin updated")  
        })
      }
  return (
   <Page>
    <Container>
        <Grid container >
        <Grid item xs={4} md={4} spacing={3}>
    <Typography variant='overline'>Admin</Typography>
    <Stack spacing={3}> 
         <TextField
        fullWidth type="number"  value={values?.refuelingCharge}     
        onChange={handleChange('refuelingCharge')}    
        label="Refueling Charge" />

        <TextField
        fullWidth type="number"  value={values?.excessMileage}     
        onChange={handleChange('excessMileage')}    
        label="Excess Mileage Charge" />

<TextField
        fullWidth type="number"  value={values?.vat}     
        onChange={handleChange('vat')}    
        label="VAT" />

<TextField
        fullWidth type="number"  value={values?.govtLevy}     
        onChange={handleChange('govtLevy')}    
        label="Government Levy" />
<TextField
        fullWidth type="number"  value={values?.driverCharge}     
        onChange={handleChange('driverCharge')}    
        label="Driver Charge" /> 
<TextField
        fullWidth type="number"  value={values?.chauffer}     
        onChange={handleChange('chauffer')}    
        label="Chauffer" />


        {!loading && <Button
        fullWidth={false}
          variant="contained"
           onClick={()=>editExtra()}
             >
         Update
        </Button>}

        </Stack>
    </Grid>
        </Grid>
    </Container>
   </Page>
  )
}

export default Admin