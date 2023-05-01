import { useState, useEffect } from "react";
// material
import {
  Grid,
  Button,
  Container,
  Stack,
  Typography,
  Card,
  TextField,
  MenuItem,
  ImageList,
  ImageListItem,
  LinearProgress,
} from "@mui/material";
// components
import Page from "../../components/Page";
import firebase from "../../firebase";
import brands from "src/utils/brands";
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useGetCar from "src/hooks/useGetCar";
import useGetHospital from "src/hooks/useGetHospital";
import useGetExtras from "src/hooks/useGetExtras";

export default function EditHospital() {
  const location = useLocation();
  const { id } = location.state;

  const notify = (msg) => toast(msg);
  const [laoding, setlaoding] = useState(false);
  const [values, setValues] = useState(null);
  let navigate = useNavigate();

  //   let data_ = useGetCar(id).docs;
  let data_ = useGetHospital(id).docs;

  useEffect(() => {
    const {
      name,
      email,
      address,
      city,
      state,
      //   status,
      //   services,
      phone,
    } = data_;
    setValues({
      ...values,
      name,
      email,
      address,
      city,
      state,
      //   status,
      //   services,
      phone,
    });
  }, [data_]);

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const createGame = () => {
    setlaoding(true);
    firebase
      .firestore()
      .collection("hospitals")
      .doc(id)
      .update(values)
      .then(() => {
        notify("Hospital Details Updated");
        setlaoding(false);
      })
      .catch((err) => {
        alert("Error updating details.");
        setlaoding(false);
      });
  };

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
            firebase
              .firestore()
              .collection("hospitals")
              .doc(id)
              .update({
                img: firebase.firestore.FieldValue.arrayUnion(...urls),
              })
              .then(() => {
                console.log("Added to database");
              });
          }
        }
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

  const editExtra = () => {
    firebase
      .firestore()
      .collection("hospitals")
      .doc(id)
      .update({
        extra: firebase.firestore.FieldValue.arrayUnion(values?.extra_title),
      })
      .then(() => {
        alert("Service added");
      });
  };
  //   const editStatus = () => {
  //     firebase
  //       .firestore()
  //       .collection("hospitals")
  //       .doc(id)
  //       .update({
  //         status: values?.status,
  //       })
  //       .then(() => {
  //         alert("Status Changed");
  //       });
  //   };
  const removeExtra = (item) => {
    firebase
      .firestore()
      .collection("hospitals")
      .doc(id)
      .update({
        extra: firebase.firestore.FieldValue.arrayRemove(item),
      })
      .then(() => {
        alert("Service removed");
      });
  };
  const removeImg = (item) => {
    firebase
      .firestore()
      .collection("hospitals")
      .doc(id)
      .update({
        img: firebase.firestore.FieldValue.arrayRemove(item),
      })
      .then(() => {
        alert("Service removed");
      });
  };

  let typeOfServices = useGetExtras().docs;
  // [
  //   "Pulmonology",
  //   "Surgery",
  //   "CAT Scan",
  //   "Dentistry",
  // ];

  return (
    values &&
    data_ && (
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
          <Grid container spacing={3}>
            <Grid item xs={6} md={6}>
              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Edit Hospital
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    name="name"
                    type="text"
                    value={values.name}
                    onChange={handleChange("name")}
                    label="Name"
                  />

                  <TextField
                    fullWidth
                    value={values.email}
                    onChange={handleChange("email")}
                    label="Email"
                  />
                  <TextField
                    fullWidth
                    value={values.city}
                    onChange={handleChange("city")}
                    label="City"
                  />
                  <TextField
                    fullWidth
                    value={values.state}
                    onChange={handleChange("state")}
                    label="State"
                  />
                  <TextField
                    value={values.phone}
                    fullWidth
                    type={"number"}
                    onChange={handleChange("phone")}
                    label="Phone"
                  />

                  <TextField
                    fullWidth
                    value={values.address}
                    onChange={handleChange("address")}
                    label="Address"
                  />

                  <TextField
                    fullWidth
                    value={values.zip}
                    onChange={handleChange("zip")}
                    label="zip"
                  />

                  {laoding ? null : (
                    <Button
                      fullWidth={false}
                      variant="contained"
                      onClick={() => createGame()}
                    >
                      Save
                    </Button>
                  )}
                </Stack>
              </Card>
            </Grid>

            <Grid item xs={6} md={6} spacing={3}>
              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Hospital Images
                </Typography>
                <Typography variant="overline" gutterBottom>
                  Upload Images
                </Typography>{" "}
                <br />
                <input type="file" multiple onChange={handleImageChange} />
                <Button size="large" onClick={handleUpload}>
                  Upload
                </Button>
                {uploading &&
                  images.map((image, index) => (
                    <div key={index}>
                      <img src={URL.createObjectURL(image)} alt={image.name} />
                      <p>{image.name}</p>
                      <LinearProgress
                        variant="determinate"
                        value={progress[index]}
                      />
                    </div>
                  ))}
                <Stack spacing={3}>
                  <ImageList
                    sx={{ width: 500, height: 550 }}
                    variant="masonry"
                    cols={2}
                    rowHeight={164}
                  >
                    {data_?.img?.map((item, index) => (
                      <ImageListItem
                        key={index}
                        onClick={() => removeImg(item)}
                      >
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
              <br />
              <Card sx={{ p: 3 }}>
                <Typography variant="subtitle1">Services</Typography>
                <br />
                <Stack
                  style={{ display: "flex", flexWrap: "wrap" }}
                  direction="row"
                >
                  {data_.extra?.map((e, index) => (
                    <Typography
                      style={{ marginRight: 20 }}
                      onClick={() => removeExtra(e)}
                      key={index}
                    >
                      {e.name}
                    </Typography>
                  ))}
                </Stack>
                <br />
                <Typography variant="overline">
                  {values?.id ? "Edit" : "Add"} Service
                </Typography>
                <Stack spacing={3}>
                  <TextField
                    fullWidth
                    select
                    onChange={handleChange("extra_title")}
                    label="Select Service Type"
                  >
                    {typeOfServices.map((u, index) => (
                      <MenuItem value={u} key={index}>
                        {u.name}
                      </MenuItem>
                    ))}
                  </TextField>
                  {/* <TextField
                    fullWidth
                    onChange={handleChange("extra_title")}
                    label="Name of Service"
                  /> */}
                  <Button
                    fullWidth={false}
                    variant="contained"
                    onClick={() => editExtra()}
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
  );
}
