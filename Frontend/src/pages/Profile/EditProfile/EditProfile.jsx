import "./EditProfile.css";
import * as React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useTranslation } from "react-i18next";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%,-50%)",
  width: 600,
  height: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: 8,
};

function EditChild({ dob, setDob }) {
  const [open, setOpen] = React.useState(false);
  const { t } = useTranslation();

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <React.Fragment>
      <div className="birthdate-section" onClick={handleOpen}>
        <text>{t("InEdit")}</text>
      </div>
      <Modal
        hideBackdrop
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300, height: 400 }}>
          <div className="text">
            <h2>{t("InEdit1")}</h2>
            <p>
              {t("InEdit2")} <br /> {t("InEdit3")} <br /> {t("InEdit4")}
            </p>
            <input type="date" onChange={(e) => setDob(e.target.value)} />
            <Button
              className="e-button"
              onClick={() => {
                setOpen(false);
              }}
            >
              {t("InEdit5")}
            </Button>
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function EditProfile({ user, LoggedInUser }) {
  const { t } = useTranslation();

  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState("");
  const [bio, setBio] = React.useState("");
  const [location, setLocation] = React.useState("");
  const [website, setWebsite] = React.useState("");
  const [dob, setDob] = React.useState("");

  const HandleSave = async () => {
    const editedInfo = {
      name,
      bio,
      location,
      website,
      dob,
    };
    if (editedInfo) {
      await axios.patch(
        `https://twibb.vercel.app/userUpdates/${user?.email}`,
        editedInfo
      );
      setOpen(false);
    }
  };

  return (
    <div className="profilePage">
      <button className="Edit-profile-btn" onClick={() => setOpen(true)}>
        {t("EditProfile")}
      </button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal">
          <div className="header">
            <IconButton
              onClick={() => {
                setOpen();
              }}
            >
              <CloseIcon />
            </IconButton>
            <h2 className="header-title">{t("EditProfile")}</h2>
            <button className="save-btn" onClick={HandleSave}>
              {t("EditProfile1")}
            </button>
          </div>
          <form className="fill-content">
            <TextField
              className="text-field"
              fullWidth
              label={t("EditProfile2")}
              id="fullWidth"
              variant="filled"
              onChange={(e) => setName(e.target.value)}
              defaultValue={LoggedInUser[0]?.name ? LoggedInUser[0].name : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label={t("EditProfile3")}
              id="fullWidth"
              variant="filled"
              onChange={(e) => setBio(e.target.value)}
              defaultValue={LoggedInUser[0]?.bio ? LoggedInUser[0].bio : ""}
            />
            <TextField
              className="text-field"
              fullWidth
              label={t("EditProfile4")}
              id="fullWidth"
              variant="filled"
              onChange={(e) => setLocation(e.target.value)}
              defaultValue={
                LoggedInUser[0]?.location ? LoggedInUser[0].location : ""
              }
            />
            <TextField
              className="text-field"
              fullWidth
              label={t("EditProfile5")}
              id="fullWidth"
              variant="filled"
              onChange={(e) => setWebsite(e.target.value)}
              defaultValue={
                LoggedInUser[0]?.website ? LoggedInUser[0].website : ""
              }
            />
          </form>
          <div className="birthdate-section">
            <p>{t("EditProfile6")}</p>
            <p>.</p>
            <EditChild dob={dob} setDob={setDob}></EditChild>
          </div>
          <div className="last-section">
            {LoggedInUser[0]?.dob ? (
              <h2>{LoggedInUser[0]?.dob}</h2>
            ) : (
              <h2>{dob ? dob : "Add your date of birth"}</h2>
            )}
            <div className="last-btn">
              <h2>{t("EditProfile")}</h2>
              <ChevronRightIcon></ChevronRightIcon>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
