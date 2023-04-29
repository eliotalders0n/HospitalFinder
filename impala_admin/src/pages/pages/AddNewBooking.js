import { Alert, Box, Button, Card, Checkbox, Container, Grid, ListItemText, MenuItem, OutlinedInput, Select, Stack, TextField, Typography } from '@mui/material'
import {  useLocation, useNavigate } from 'react-router-dom';
import React from 'react' 
import { useState } from 'react'
import Page from 'src/components/Page'
import useGEtCars from 'src/hooks/useGEtCars'
import useGetExtras from 'src/hooks/useGetExtras'
import useGetUsers from 'src/hooks/useGetUsers'
import firebase from '../../firebase' 
import useGetCoupons from 'src/hooks/useGetCoupons';

function AddNewBooking() {

  const location = useLocation()
  let coupons = useGetCoupons().docs.filter(item => item.status === "ACTIVE")
  const { type} = location.state
  const navigate = useNavigate()
    const [laoding, setlaoding] = useState(false)
    const [values, setValues] = useState(null)
    let users = useGetUsers().docs.filter(item =>item.status === "APPROVED")
    let cars = useGEtCars().docs.filter(item=>item.status === "ONLINE")
    let extras = useGetExtras().docs
   
    const [days, setdays] = useState(0)
    const [coupon, setcoupon] = useState("")
    const [couponDetails, setcouponDetails] = useState("")
    const [myExtras, setExtra] = useState([])
    const [total, settotal] = useState(0)

    function getTimestampDifferenceInDays(timestamp1, timestamp2) {
        const date1 = timestamp1.toDate();
        const date2 = timestamp2.toDate();
        const differenceInMilliseconds = date2.getTime() - date1.getTime();
        const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);
        return Math.floor(differenceInDays);
      }

    const handleChange = (prop) => (event) => {
        if(prop === "startDate"){
            const dateTimestamp = Date.parse(event.target.value);
            const firebaseTimestamp = firebase.firestore.Timestamp.fromMillis(dateTimestamp);

            setValues({...values, [prop] : firebaseTimestamp})
            return
        }
        if(prop === "endDate"){
            const date1 = values?.startDate;
           
            const dateTimestamp = Date.parse(event.target.value);
            const firebaseTimestamp = firebase.firestore.Timestamp.fromMillis(dateTimestamp);

            
            const timestamp1 = date1;
            const timestamp2 = firebaseTimestamp;
            const differenceInDays = getTimestampDifferenceInDays(timestamp1, timestamp2);
            
            setdays(differenceInDays)
            setValues({...values, [prop] : firebaseTimestamp, numberOfDays : differenceInDays})
            return
        }
        setValues({ ...values, [prop]: event.target.value });
      }; 

      const addExtras = (extra) => {
        let newExtras = [...myExtras];
        const index = newExtras.indexOf(extra);
      
        if (index !== -1) {
          newExtras.splice(index, 1);
        } else {
          newExtras.push(extra);
        }
      
        const newTotal = newExtras.reduce((acc, cur) => {
          return acc + parseFloat(cur.price);
        }, 0);
      
        setValues({...values, myExtras : newExtras, extras : newTotal})
        setExtra(newExtras);

        settotal(newTotal);
      };

      function generateInvoiceNumber() { 
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 5; i++) {
          result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
      }

      const createGame = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("quotations").add(
            {   
                q_id : generateInvoiceNumber(),
                startDate: values?.startDate,
                name : values?.name,
                email : values?.email,
                phone : values?.phone,
                endDate : values?.endDate,
                car_id : values?.car.id,
                myExtras : myExtras,
                rating : values?.rating,
                status : "QUOTE",
                advance : values?.advance,
                other : values?.other,
                chauffer : values?.chauffer,
                numberOfDays : values?.numberOfDays,
                total :  values?.numberOfDays * values.rating,
                extras : parseFloat(total),
                totalAmount : (values?.numberOfDays * values.rating) + parseFloat(total),
                createdAt : firebase.firestore.Timestamp.now()
            }
            ).then((doc)=>{                    
              setlaoding(false)    
             navigate(-1)
        }).catch((err)=>{
            setlaoding(false)
        })
      }
   
      const createBooking = () =>{ 
        setlaoding(true)
          firebase.firestore().collection("booking").add(
            {   
                q_id : generateInvoiceNumber(),
                startDate: values?.startDate,
               app_user_id : values?.app_user_id,
                endDate : values?.endDate,
                car_id : values?.car.id,
                myExtras : myExtras ? myExtras : [],
                rating : values?.rating,
                status : "PENDING",
                advance : values?.advance,
                other : values?.other,
                chauffer : values?.chauffer,
                numberOfDays : values?.numberOfDays,
                total :  values?.numberOfDays * values.rating,
                couponCode : couponDetails ? couponDetails.couponCode : "",
                extras : parseFloat(total),
                totalAmount :couponDetails ? 
                  ((values?.numberOfDays * values.rating) + parseFloat(total))* couponDetails.discountAmount/100 :
                  ((values?.numberOfDays * values.rating) + parseFloat(total)) ,
                createdAt : firebase.firestore.Timestamp.now() 
            }
            ).then((doc)=>{   
              firebase.firestore().collection("coupons").doc(couponDetails.id).update({
                maxUsage : firebase.firestore.FieldValue.increment(-1)
              }).then(()=>{
                setlaoding(false)    
                navigate(-1)
              }).catch((err)=>{
                alert(err)
              })                 
             
        }).catch((err)=>{
            setlaoding(false)
        })
      }

    
    
       const applyCoupon =() =>{
            let asd = coupons.filter(item => String(item.couponCode).toUpperCase() === coupon.toUpperCase())
            setcouponDetails(asd[0])
      }

  return (
    <Page title="Create booking">
        <Container>
            <Grid container>
                <Grid item xs={6} md={6}>
                    <Stack>
                        <Typography variant='overline'>Add new Booking</Typography>
                        <Card sx={{p:3}}>
                            <Box>
                            <Stack spacing={3}>

                                {type === "Q" ? <Stack>
                                <Typography variant="overline">Enter Client Name/Company</Typography>
                                <TextField fullWidth   onChange={handleChange('name')} label="Client name/company" />

                                <Typography variant="overline">Enter Client Email</Typography>
                                <TextField fullWidth   onChange={handleChange('email')} label="Client email" />
                               
                                <Typography variant="overline">Enter Client Phone</Typography>
                                <TextField fullWidth type="number"  onChange={handleChange('phone')} label="Client phone number" />
                               
                                </Stack> :
                                <>
                                <TextField
                                fullWidth   select      
                                onChange={handleChange('app_user_id')}    
                                label="Select users" > 
                                {users && users.map((u, index)=>(
                                <MenuItem  value={u.id} key={index}>{u.name}</MenuItem>
                                ))}
                                </TextField>
                                <Typography variant='body2'>Only approved users can make a booking.</Typography>
                                </>
                                }


                                <TextField fullWidth select onChange={handleChange('car')} label="Select Car" >
                                {cars && cars.map((u, index)=>(
                                <MenuItem  value={u} key={index}>{u.make} {u.model} </MenuItem>
                                ))}
                                </TextField>
                                <Typography variant='body2'>Only cars that are online can be booked.</Typography>

                       
                                <Typography variant="overline">Select Extras</Typography>
                              <Stack direction={"row"} flexWrap={"wrap"}>
                              {extras && extras.map((name) => (
                                        <Button
                                        onClick={()=>addExtras(name)}
                                        key={name.id}
                                        value={name} 
                                        variant={myExtras?.find(item => item.id === name.id) ? 'outlined' : "text"}
                                        >
                                        {name.name} K{name.price}
                                        </Button>
                                    ))}
                                    </Stack>
                                    <Typography>Extras Total : {parseFloat(total)}</Typography>
                                    <Typography variant="overline">Select Costing</Typography>

                                    
                                    {values?.car && 
                                        <TextField fullWidth select onChange={handleChange('rating')} label="Select Rate" >
                                <MenuItem key={0} value={values?.car?.dailyRentalPriceLocal}>Local  {values?.car?.dailyRentalPriceLocal}</MenuItem>
                                <MenuItem key={1} value={values?.car?.dailyRentalPriceOutside}>Outside {values?.car?.dailyRentalPriceOutside}</MenuItem>
                               </TextField>}

                               <Typography variant="overline">Select Start Date</Typography>
                                <TextField fullWidth type='date' onChange={handleChange('startDate')} label="Start Date" />

                                <Typography variant="overline">Select End Date { `${values?.numberOfDays} Days`}</Typography>
                                <TextField fullWidth type='date' onChange={handleChange('endDate')} label="End Date" />
                               
                                <Typography variant="overline">Enter Advance Payment</Typography>
                                <TextField fullWidth type='number' onChange={handleChange('advance')} label="Advance payment" />
                               
                                {type === "B" && coupons.length > 0 && <Stack direction="row">
                                      <Stack sx={{flex:11}}>
                                <Typography variant="overline">Enter Coupon Code</Typography>
                                <TextField fullWidth   onChange={(event) =>setcoupon(event.target.value)} label="Enter Coupon Code" />
                                {couponDetails ? 
                                <Typography variant="overline">{couponDetails.couponCode} - {couponDetails.discountAmount}% </Typography>
                                    :
                                    <Typography variant="overline">Coupon Code does not exist.</Typography>}
                               </Stack>
                               <Button variant='contained' onClick={()=>applyCoupon()} fullWidth size='small' sx={{flex:1}}>Apply</Button>

                               </Stack>}

                                <Typography variant="overline">Enter Other Costs</Typography>
                                <TextField fullWidth type='number' onChange={handleChange('other')} label="Other Cost" />
                               
                                <Typography variant="overline">Chauffer Cost</Typography>
                                <TextField fullWidth type='number' onChange={handleChange('chauffer')} label="Chauffer" />
                               
                                {laoding ? null : <Button
                                    fullWidth={false}
                                    variant="contained"
                                    onClick={type === "B" ? ()=>createBooking() : ()=>createGame()}
                                        >
                                    Create {type === "B" ? "Booking" : "Quotation"} 
                                    </Button>}
                                </Stack>
                            </Box>
                        </Card>
                    </Stack>
                </Grid>
                <Grid item xs={6} md={6} spacing={3}>
                {values?.car && <Stack  spacing={3} sx={{p:3}}>
                                    <Typography variant='overline'>Vehicle Details</Typography>
                                    <Typography variant="overline">{values?.car?.make} {values?.car?.model}</Typography>
                                    <Typography variant="overline">Status : {values?.car?.status}</Typography>
                                    <Typography variant="overline">Color : {values?.car?.color}</Typography>
                                    <Typography variant="overline">Fuel : {values?.car?.fuel}</Typography>
                                    <Typography variant="overline">Seating Capacity ; {values?.car?.seatingCapacity}</Typography>
                                    <Typography variant="overline">Type of Car : {values?.car?.typeOfCar}</Typography>
                                    <Typography variant="overline">Transmission : {values?.car?.transmission}</Typography>
                                </Stack>}

                </Grid>
            </Grid>
        </Container>
    </Page>
  )
}

export default AddNewBooking