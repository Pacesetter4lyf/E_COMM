import { Box, Input, Text, Button, Center } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import Footer from "../Components/Footer";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { Link } from "react-router-dom";

function Login() {
  const [errorMsg, setErrorMsg] = useState("");
  const [regMsg, setRegMsg] = useState("");
  const [details, setDetails] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleChange = (e) => {
    setDetails({ ...details, [e.target.id]: e.target.value });
  };

  // const { user, setUser } = useContext(userContext);
  // const { jwt, setJwt } = useContext(userContext);

  const handleLogin = () => {
    const payload = {
      email: `${details.email}`,
      password: `${details.password}`,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    let intendedRoute = localStorage.getItem("route");

    // fetch("http://127.0.0.1:8000/api/login", requestOptions)
    fetch(`${process.env.REACT_APP_ECOMM_URL}/api/login`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log("result", result);
        if (result.user) {
          localStorage.setItem("user", JSON.stringify(result.user));
          // setUser(result.user);
          if (intendedRoute) {
            navigate(intendedRoute);
          } else {
            navigate("/products");
          }
        } else if (result.error === "Unauthorized") {
          setErrorMsg("Username or password incorrect");
        } else if (result.password) {
          setErrorMsg(result.password[0]);
        } else if (result.email) {
          setErrorMsg(result.email[0]);
        }
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    let newreg = localStorage.getItem("newlyReg");
    if (newreg) {
      setRegMsg(newreg);
    }

    localStorage.removeItem("newlyReg");
  }, []);
  return (
    <>
      <Header />
      <HeaderLinks />
      <PageTitleBar pageTitle="Login" />
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
            Login
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="green">
            {regMsg}
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="#9096B2">
            Please login using account details bellow.
          </Text>
          <Text mt="4px" textAlign="center" fontSize="17px" color="red">
            {errorMsg}
          </Text>
          {/* <form onSubmit={handleLogin}> */}

          <Input
            id="email"
            value={details.email}
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Email Address"
          />
          <Input
            type={"password"}
            id="password"
            value={details.password}
            onChange={handleChange}
            size="lg"
            w="100%"
            my="20px"
            placeholder="Password"
          />
          <Link to="#" fontWeight="400" mt="15px" color="#9096B2">
            Forgot your password?
          </Link>
          <Button
            _hover={{ bg: "green" }}
            mb="20px"
            mt="20px"
            w="100%"
            bg="#FB2E86"
            color="white"
            onClick={handleLogin}
            disabled={!details.email || !details.password ? true : false}
          >
            Sign In
          </Button>
          {/* </form> */}
          <Center mb="20px">
            <Link
              to="/register"

            >
              Don’t have an Account? Create account
            </Link>
          </Center>
        </Box>
      </Box>
      <Footer />
    </>
  );
}

export default Login;
