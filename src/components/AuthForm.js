import { Button, FormControl, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { auth } from "../firebase";
import styled from "styled-components";
import { Link, useHistory } from "react-router-dom";
import CardWrapper from "components/CardWrapper";
import CalculatorWrapper from "styledComponents/CalculatorWrapper";

const AuthForm = ({ type }) => {
  const initialFormState = {
    email: "",
    password: "",
  };

  const history = useHistory();

  const [form, setForm] = useState(initialFormState);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (type === "signup") {
        await auth.createUserWithEmailAndPassword(form.email, form.password);
      } else {
        await auth.signInWithEmailAndPassword(form.email, form.password);
      }
      setForm(initialFormState);
      history.push("/user");
    } catch (err) {
      console.log(err);
    }
  };

  const formInputs = [
    { name: "email", type: "text" },
    { name: "password", type: "password" },
  ];

  const generateLink = () => {
    if (type === "login") {
      return {
        link: "/signup",
        text: "Don't have an account? Sign Up",
        title: "Sign Up"
      };
    } else {
      return {
        link: "/login",
        text: "Already have an account? Log in",
        title: "Login"
      };
    }
  };

  return (
    <CalculatorWrapper>
      <CardWrapper>
        <h2>{generateLink().title}</h2>
        <MyForm onSubmit={handleSubmit}>
            {formInputs.map((input) => (
              <MyTextField
                key={input.name}
                name={input.name}
                value={form[input.name]}
                onChange={handleChange}
                type={input.type}
                variant="outlined"
                label={input.name}
                margin="dense"
                required
              />
            ))}
            <Button variant="contained" color="primary" type="submit">
              {type}
            </Button>
        </MyForm>
        <Link to={generateLink().link}>{generateLink().text}</Link>
      </CardWrapper>
    </CalculatorWrapper>

  );
};

export default AuthForm;

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

const MyForm = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  gap: .25rem;
`
