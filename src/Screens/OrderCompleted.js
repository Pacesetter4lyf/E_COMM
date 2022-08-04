import { Text, Box, Stack, Button } from "@chakra-ui/react";
import React from "react";
import { useNavigate } from "react-router";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { HiBadgeCheck } from "react-icons/hi";
import Footer from "../Components/Footer";

function OrderCompleted() {
  const navigate = useNavigate();

  const goToProduct = () =>{
    navigate("/products")
  }
  return (
    <>
      <Header />
      <HeaderLinks />
      <PageTitleBar pageTitle="Order Completed" />

      <Stack
        direction="column"
        alignItems="center"
        mt="40px"
        p="30px"
        mx={{ base: "5%", md: "20%" }}
        w={{ base: "90%", md: "60%" }}
        boxShadow="md"
        spacing="20px"
      >
        <HiBadgeCheck color="#FF1788" size="100px" />

        <Box>
          <Text
            textAlign="center"
            color="#101750"
            fontWeight="bold"
            fontSize="35px"
          >
            Your Order is Completed
          </Text>
          <Text mt="10px" textAlign="center" fontWeight="600" color="#8D92A7">
            Thank you for your order! Your order is being processed and will be
            completed within 3-6 hours. You will receive an email confirmation
            when your order is completed.
          </Text>
        </Box>

        <Button
          _hover={{ bg: "#FF1788", textDecoration: "none", color: "white" }}
         
         onClick={goToProduct}
          color="white"
          bg="#FF1788"
        >
          Continue Shopping
        </Button>
      </Stack>

      <Footer />
    </>
  );
}

export default OrderCompleted;
