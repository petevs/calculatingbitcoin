import { TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { UserContext } from "state/contexts/UserContext";
import { updateSettings } from "state/actions/updateSettings";
import styled from "styled-components";
import { useRouteMatch } from "react-router-dom";

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

  let match = useRouteMatch();

  return (
    <p>hi</p>
  );
};

export default User;
