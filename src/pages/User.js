import { TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from "state/actions/updateSettings";
import styled from "styled-components";

const User = () => {
  const { settings, settingsDispatch } = useContext(UserContext);

  const [userDetails, setUserDetails] = useState({
    firstName: settings.firstName,
    lastName: settings.lastName,
  });

  const handleChange = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSettingsChange = (e) => {
    for (const key in userDetails) {
      const payload = {
        name: key,
        value: userDetails[key],
      };
      settingsDispatch(updateSettings(payload));
    }
  };

  return (
    <Wrapper>
      {settings.firstName} {settings.lastName}
      <UserBox>
        <MyTextField
          name="firstName"
          label="First Name"
          variant="filled"
          value={userDetails.firstName}
          onChange={handleChange}
        />
        <MyTextField
          color="primary"
          name="lastName"
          label="Last Name"
          variant="filled"
          value={userDetails.lastName}
          onChange={handleChange}
        />
        <button onClick={() => handleSettingsChange(userDetails)}>
          Save Changes
        </button>
      </UserBox>
    </Wrapper>
  );
};

export default User;

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
`;

const UserBox = styled.div`
  display: grid;
  padding: 1rem;
  grid-template-columns: minmax(100%, 600px);
  border: 1px solid #ccc;
  gap: 1rem;
`;

const MyTextField = styled(TextField)`
  & .MuiFormLabel-root {
    color: #fff !important;
  }

  & .MuiInputBase-root {
    color: #fff !important;
  }

  & .MuiOutlinedInput-notchedOutline {
    border-color: #fff !important;
  }

  & ::-webkit-calendar-picker-indicator {
    filter: invert(1);
  }
`;
