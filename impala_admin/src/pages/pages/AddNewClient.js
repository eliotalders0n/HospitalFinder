import {useState, useEffect} from 'react';
// material
import { Grid, Button, Container, Stack, Typography, Card, TextField, MenuItem } from '@mui/material';
// components
import Page from '../../components/Page'; 
import firebase from '../../firebase' 
import countries from 'src/utils/countries';

export default function AddNewClient() { 
  
  const [laoding, setlaoding] = useState(false)
   const [values, setValues] = useState(null)

     const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  //const countries = ["Zambia","United States", "Canada", "Afghanistan", "Albania", "Algeria", "American Samoa", "Andorra", "Angola", "Anguilla", "Antarctica", "Antigua and/or Barbuda", "Argentina", "Armenia", "Aruba", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bermuda", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Bouvet Island", "Brazil", "British Indian Ocean Territory", "Brunei Darussalam", "Bulgaria", "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Cape Verde", "Cayman Islands", "Central African Republic", "Chad", "Chile", "China", "Christmas Island", "Cocos (Keeling) Islands", "Colombia", "Comoros", "Congo", "Cook Islands", "Costa Rica", "Croatia (Hrvatska)", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic", "East Timor", "Ecudaor", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Ethiopia", "Falkland Islands (Malvinas)", "Faroe Islands", "Fiji", "Finland", "France", "France, Metropolitan", "French Guiana", "French Polynesia", "French Southern Territories", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Gibraltar", "Greece", "Greenland", "Grenada", "Guadeloupe", "Guam", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Heard and Mc Donald Islands", "Honduras", "Hong Kong", "Hungary", "Iceland", "India", "Indonesia", "Iran (Islamic Republic of)", "Iraq", "Ireland", "Israel", "Italy", "Ivory Coast", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, Democratic People's Republic of", "Korea, Republic of", "Kosovo", "Kuwait", "Kyrgyzstan", "Lao People's Democratic Republic", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libyan Arab Jamahiriya", "Liechtenstein", "Lithuania", "Luxembourg", "Macau", "Macedonia", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Martinique", "Mauritania", "Mauritius", "Mayotte", "Mexico", "Micronesia, Federated States of", "Moldova, Republic of", "Monaco", "Mongolia", "Montserrat", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "Netherlands Antilles", "New Caledonia", "New Zealand", "Nicaragua", "Niger", "Nigeria", "Niue", "Norfork Island", "Northern Mariana Islands", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", "Pitcairn", "Poland", "Portugal", "Puerto Rico", "Qatar", "Reunion", "Romania", "Russian Federation", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Georgia South Sandwich Islands", "South Sudan", "Spain", "Sri Lanka", "St. Helena", "St. Pierre and Miquelon", "Sudan", "Suriname", "Svalbarn and Jan Mayen Islands", "Swaziland", "Sweden", "Switzerland", "Syrian Arab Republic", "Taiwan", "Tajikistan", "Tanzania, United Republic of", "Thailand", "Togo", "Tokelau", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Turks and Caicos Islands", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States minor outlying islands", "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City State", "Venezuela", "Vietnam", "Virigan Islands (British)", "Virgin Islands (U.S.)", "Wallis and Futuna Islands", "Western Sahara", "Yemen", "Yugoslavia", "Zaire",  "Zimbabwe"]
 
      const createGame = () =>{
    if(values?.platform === undefined || values?.region === undefined || values?.channel === undefined 
      || values?.week === undefined || values?.sales === undefined){
      alert("enter all values")
      return
    }
        setlaoding(true)
          firebase.firestore().collection("clients").add(
        {
        
        }
            ).then(()=>{
              setlaoding(false)    
        })
      }

  return (
    <Page title="Dashboard">
    <Container>
      <Grid container spacing={3}>
      <Grid item xs={6} md={6}>
      <Card sx={{p:3}}>
      <Typography variant="subtitle1" gutterBottom>
           Add Data
        </Typography> 
        <Stack spacing={3}>

        <TextField
        fullWidth       
        onChange={handleChange('firstName')}    
        label="First Name" />
      
      <TextField
        fullWidth       
        onChange={handleChange('lastName')}    
        label="Last Name" />
      
      <TextField
        fullWidth  
        type={"date"}     
        onChange={handleChange('date_of_birth')}    
        label="Date of Birth" />

      <TextField
        fullWidth     type={"number"}         
        onChange={handleChange('NRC')}    
        label="NRC Number" />

<TextField
        fullWidth       
        onChange={handleChange('address')}    
        label="Physical Address" />

<TextField
        fullWidth       
        onChange={handleChange('email')}    
        label="Email Address" />

<TextField
        fullWidth  
        type={"number"}     
        onChange={handleChange('phone_number')}    
        label="Phone Number" />

<TextField
        fullWidth  
        type={"number"}     
        onChange={handleChange('license')}    
        label="Driver License" />

<TextField
        fullWidth
        select
        onChange={handleChange('country')}    
        label="Select Country" >
        {countries.map((c, index)=>(
          <MenuItem  value={c} key={index}>{c}</MenuItem>
        ))}
        </TextField>     
        
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
