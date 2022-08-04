import { Box, Input, Text, Button, Center } from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { Link } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passError, setPassError] = useState("");
  const [errorMsg, seterrorMsg] = useState("");
  const [details, setDetails] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  const handleSubmit = () => {
    setEmailError("");
    setNameError("");
    setPassError("");

    if (details.password !== details.password2) {
      seterrorMsg("Both password details must be correct")
      return
    }

    const data = {
      name: `${details.name}`,
      email: `${details.email}`,
      password: `${details.password}`,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(data),
      // body: JSON.stringify(data),
      redirect: "follow",
    };

    // fetch("http://127.0.0.1:8000/api/register", requestOptions)
    fetch(`${process.env.REACT_APP_ECOMM_URL}/api/register`, requestOptions)
      .then((response) => response.json())

      .then((result) => {
        console.log("Result", result);
        if (result.user) {
          localStorage.setItem("newlyReg", "Successfully registered.");
          navigate("/login");
        } else {
          let res = JSON.parse(result);
          if (res.email) {
            setEmailError(res.email);
          }
          if (res.name) {
            setNameError(res.name);
          }
          if (res.password) {
            setPassError(res.password);
          }
          console.log("Result", res);
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  };
  return (
    <>
      <Header />
      <HeaderLinks />
      <PageTitleBar pageTitle="Register" />
      <Box
        py="20px"
        px={{ base: "25px", md: "50px" }}
        my={{ base: "10px", md: "100px" }}
        mx={{ base: "5%", md: "30%" }}
        w={{ base: "90%", md: "40%" }}
        boxShadow="xl"
      >
        <Box>
          <Text
            textAlign="center"
            fontSize="30px"
            color="#000000"
            fontWeight="bold"
            fontFamily="Roboto"
          >
            Register
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="#9096B2">
            Please register using account details bellow.
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="red">
            {errorMsg}
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="red">
            {emailError}
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="red">
            {passError}
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="red">
            {nameError}
          </Text>
          <Input
            id="name"
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Username"
            value={details.name}
          />
          <Input
            id="email"
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Email Address"
            value={details.email}
          />
          <Input
            id="password"
            type="password"
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Password"
            value={details.password}
          />
          <Input
            id="password2"
            type="password"
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Confirm Password"
            value={details.password2}
          />

          <Button
            _hover={{ bg: "green" }}
            mb="20px"
            mt="20px"
            w="100%"
            bg="#FB2E86"
            color="white"
            disabled={
              !details.password ||
                !details.password2 ||
                !details.email ||
                !details.name
                ? true
                : false
            }
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Center mb="20px">
            <Link
              to="/login"
            // textAlign="center"
            // fontWeight="400"
            // color="#9096B2"
            >
              Already have an Account? Login
            </Link>
          </Center>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Register;
