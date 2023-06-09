import * as React from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FileBase64 from "react-file-base64";
import { Label } from "@mui/icons-material";
import { Button, FormLabel, RadioGroup, Typography } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { createProducts } from "../api";
import { useSelector } from "react-redux";
import { systemSelector } from "../redux/Selector";
import { useState } from "react";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

export default function InputAdornments() {
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = React.useState({
    title: "",
    photo_url: "",
    time: "",
    description: "",
  });

  const handleSubMit = async () => {
    setIsLoading(true);
    const createdAt = new Date().toISOString();
    await createProducts({
      ...values,
      createdAt,
      recipeId: 10,
      categoryId: 3,
    })
      .then((res) => {
        setIsLoading(false);
        setValues({
          title: "",
          photo_url: [],
          time: "",
          description: "",
        });
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(true);
      });
  };

  return (
    <div style={{ width: "70%", margin: "auto", textAlign: "center" }}>
      <Typography variant="h2" component={"h2"}>
        FORM CREATE RECIPES
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          flexWrap: "wrap",
          width: "100%",
          gap: "30px",
        }}
      >
        <TextField
          onChange={(e) => setValues({ ...values, title: e.target.value })}
          fullWidth
          label="TITLE"
          id="fullWidth"
        />
        {/* <TextField onChange={((e) => setValues({...values, category : e.target.value}))} fullWidth label="CATEGORY" id="fullWidth" /> */}
        {/* <FormControl>
          <FormLabel
            sx={{ display: "flex" }}
            id="demo-radio-buttons-group-label"
          >
            CAREGORY
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={values.category}
            onChange={(e) => setValues({ ...values, category: e.target.value })}
          >
            <FormControlLabel
              value="cellphone"
              control={<Radio />}
              label="cellphone"
            />
            <FormControlLabel
              value="laptop"
              control={<Radio />}
              label="laptop"
            />
            <FormControlLabel value="other" control={<Radio />} label="other" />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <FormLabel
            sx={{ display: "flex" }}
            id="demo-radio-buttons-group-label"
          >
            IS NEW ARRIVAL
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue="female"
            name="radio-buttons-group"
            value={values.isnew}
            onChange={(e) => setValues({ ...values, isnew: e.target.value })}
          >
            <FormControlLabel value={true} control={<Radio />} label="true" />
            <FormControlLabel value={false} control={<Radio />} label="false" />
          </RadioGroup>
        </FormControl> */}
        <TextField
          value={values.photo_url}
          onChange={(e) => setValues({ ...values, photo_url: e.target.value })}
          fullWidth
          label="photo_url"
          id="fullWidth"
        />
        <TextField
          value={values.description}
          onChange={(e) =>
            setValues({ ...values, description: e.target.value })
          }
          multiline
          rows={5}
          fullWidth
          label="description"
          id="fullWidth"
        />
        <TextField
          value={values.time}
          onChange={(e) => setValues({ ...values, time: e.target.value })}
          fullWidth
          label="TIME"
          id="fullWidth"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "start",
            alignItems: "center",
            gap: "20px",
          }}
        >
          {/* <p>ATTACHMENT</p>
          <FileBase64
            accept="image/*"
            multiple={false}
            type="file"
            onDone={({ base64 }) =>
              setValues({ ...values, attachment: base64 })
            }
          /> */}
        </div>
        <Button
          onClick={handleSubMit}
          sx={{
            width: "50%",
            display: "flex",
            margin: "auto",
            padding: "10px 0",
          }}
          variant="contained"
        >
          SUBMIT
        </Button>
      </Box>
      {isLoading && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
    </div>
  );
}
