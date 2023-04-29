// material
import {
  Container,
  Card,
  Box,
  Button,
  Typography,
  Divider,
  MenuItem,
  TextField,
  Grid,
} from "@mui/material";

import Page from "../components/Page";
import { useState, useEffect } from "react";
import AppTotal from "src/sections/@dashboard/app/AppTotal";
import useGetUsers from "src/hooks/useGetUsers";
import AppBugReports from "src/sections/@dashboard/app/AppBugReports";
import useGetExtras from "src/hooks/useGetExtras";
import useGetBookings from "src/hooks/useGetBookings";
import PendingBooking from "src/sections/@dashboard/app/PendingBooking";
import useGetHospitals from "src/hooks/useGetHospitals";
import FullYearChart from "src/sections/@dashboard/app/FullYearChart";
import { alpha, styled } from "@mui/material/styles";
import { fNumber } from "src/utils/formatNumber";
import AppCurrentVisits from "src/sections/@dashboard/app/AppCurrentVisits";
import { ChartColumnSingle } from "src/sections/@dashboard/charts";
import useGetCoupons from "src/hooks/useGetCoupons";
import REgPerDay from "src/sections/@dashboard/app/REgPerDay";
import BookingsPerDay from "src/sections/@dashboard/app/BookingsPerDay";

const RootStyle = styled(Card)(({ theme }) => ({
  boxShadow: "none",
  textAlign: "center",
  padding: theme.spacing(5, 0),
  color: theme.palette.error.darker,
  backgroundColor: theme.palette.error.lighter,
}));

export default function DashboardApp() {
  let users = useGetUsers().docs;
  let services = useGetExtras().docs;
  let hospitals = useGetHospitals().docs;
  let booking = useGetBookings().docs;
  let coupons = useGetCoupons().docs;
  let reservations = booking.filter(
    (item) => item.status === String("ACCEPTED").toUpperCase()
  );
  let completed = booking.filter(
    (item) => item.status === String("COMPLETE").toUpperCase()
  );

  return (
    <Page title="Dashboard">
      <Container maxWidth>
        <Typography variant="overline">Overall</Typography>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppTotal data={users}/>
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={services} title={"Total Services"} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={hospitals} title={"Total hospitals"} />
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={booking} title={"Total Overall Bookings"}/>
          </Grid> */}
          <Grid item xs={12} sm={6} md={3}>
            <RootStyle>
              <Typography variant="h1">
                K
                {booking &&
                  fNumber(
                    completed?.reduce((acc, cur) => acc + cur.totalAmount, 0)
                  )}
              </Typography>
              <Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
                Total Revenue
              </Typography>
            </RootStyle>
          </Grid>

          {/* <Grid item xs={12} sm={6} md={3}>
           <PendingBooking data={booking} />
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
        <AppBugReports data={reservations} title={"Reservations"}/>
          </Grid> */}
          {/* <Grid item xs={12} sm={6} md={3}>
            <AppBugReports data={completed} title={"Completed Bookings"}/>
          </Grid> */}

          <Grid item xs={12} sm={6} md={3}></Grid>
        </Grid>

        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={4} md={4}>
        <AppCurrentVisits data={booking} title={"Booking"} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
             <AppCurrentVisits data={services} title={"Services"} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
              <AppCurrentVisits data={users} title={"Users"} />
          </Grid>
          <Grid item xs={12} sm={4} md={4}>
              <AppCurrentVisits data={coupons} title={"Coupon"} />
          </Grid> */}
          {/* <Grid item xs={12} sm={4} md={4}>
             <AppCurrentVisits data={cars} title={"Car Type"} type={"type"}/>
          </Grid> */}
          {/* 
        <Grid item xs={12} sm={12} md={12}>
        <REgPerDay data={users} />
          </Grid>
          <Grid item xs={12} sm={12} md={12}>
        <BookingsPerDay data={completed} />
          </Grid> */}
        </Grid>
      </Container>
    </Page>
  );
}
