import React, { useState } from "react";
import {
  Button,
  ClickAwayListener,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Modal,
  Radio,
  RadioGroup,
  TextareaAutosize,
  TextField,
  Typography,
} from "@mui/material";
import FileBase64 from "react-file-base64";
// import { ModalEditState$ } from '../../redux/selectors';
// import {EditPostReducer} from '../../redux/reducers/edit';
// import {PostReducer} from '../../redux/reducers/posts';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { systemSelector } from "../redux/Selector";
import { useEffect } from "react";
import { updateProduct } from "../api";
import CloseIcon from "@mui/icons-material/Close";
import { SystemReducer } from "../redux/Reducers/System";
import { CircleSpinnerOverlay } from "react-spinner-overlay";

export default function EditProduct() {
  const [isLoading, setIsLoading] = useState(false);
  const data = useSelector(systemSelector);
  const dispatch = useDispatch(SystemReducer);
  // console.log('data isOpenModalEdit : ',data.isOpenModalEdit);
  // console.log('data  : ',data.data);
  const handleClickAway = () => {
    dispatch(SystemReducer.actions.reset());
  };
  const [values, setValues] = React.useState({
    id: "",
    title: "",
    photo_url: "",
    time: "",
    description: "",
  });
  console.log("values: ", values);
  const handleEdit = async () => {
    setIsLoading(true);
    updateProduct(values)
      .then((res) => {
        setIsLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    setValues({
      ...values,
      id: data.data._id,
      title: data.data.title,
      photo_url: data.data.photo_url,
      time: data.data.time,
      description: data.data.description,
    });
  }, []);
  const style = {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    gap: "2px",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 800,
    backgroundColor: "white",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  // const {isShowEditModal} = editValueAVailable;
  return (
    <div>
      <Modal open={data.isOpenModalEdit}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <FormGroup sx={style}>
            <Typography variant="h5" align="center">
              EDIT RECIPES
            </Typography>
            <CloseIcon
              style={{
                position: "absolute",
                right: 0,
                top: 0,
                width: "50px",
                height: "50px",
              }}
              onClick={handleClickAway}
            />
            <FormLabel>
              <TextField
                value={values.title}
                onChange={(e) =>
                  setValues({ ...values, title: e.target.value })
                }
                fullWidth
                label="Enter title"
                variant="standard"
              />
              <TextField
                fullWidth
                value={values.time}
                onChange={(e) => setValues({ ...values, time: e.target.value })}
                label="Enter time"
                variant="standard"
              />
            </FormLabel>
            <TextareaAutosize
              minRows={5}
              placeholder="Enter description..."
              style={{
                width: "100%",
                margin: "10px 0",
                border: "1px solid #000",
              }}
              value={values.description}
              onChange={(e) =>
                setValues({ ...values, description: e.target.value })
              }
            />
            <FileBase64
              accept="image/*"
              multiple={false}
              type="file"
              onDone={({ base64 }) =>
                setValues({ ...values, attachment: base64 })
              }
            />
            <div>
              <Button
                onClick={handleEdit}
                sx={{ marginTop: "20px", width: "100%" }}
                variant="contained"
              >
                SAVE CHANGE
              </Button>
            </div>
          </FormGroup>
        </ClickAwayListener>
      </Modal>
      {isLoading && (
        <CircleSpinnerOverlay
          loading={isLoading}
          overlayColor="rgba(0,153,255,0.2)"
        />
      )}
    </div>
  );
}
