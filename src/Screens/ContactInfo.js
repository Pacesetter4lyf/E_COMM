import {
  Stack,
  Box,
  Text,
  Input,
  Button,
  SimpleGrid,
  Image,
  Divider,
  Spacer,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import CartTotalCard from "../Components/CartTotalCard";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { useCart } from "react-use-cart";
import Footer from "../Components/Footer";
import notify from "../Functions/notify";
import { useNavigate } from "react-router";

function ContactInfo() {
  const navigate = useNavigate();
  let user = JSON.parse(localStorage.getItem("user"));
  const [contactUser, setContactUser] = useState(false);
  const { items, isEmpty } = useCart();

  const [contact, setContact] = useState({
    user_id: `${user.id}`,
    email_or_phone: "",
    first_name: "",
    last_name: "",
    address: "",
    apartment_address: "",
    city: "",
    country: "",
    postal_code: "",
  });

  const handleChange = (e) => {
    setContact({ ...contact, [e.target.id]: e.target.value });
  };

  //THIS HANDLES CONTACT SAVING

  const saveContact = () => {
    const payload = {
      user_id: `${user.id}`,
      email_or_phone: `${contact.email_or_phone}`,
      first_name: `${contact.first_name}`,
      last_name: `${contact.last_name}`,
      address: `${contact.address}`,
      apartment_address: `${contact.apartment_address}`,
      city: `${contact.city}`,
      country: `${contact.country}`,
      postal_code: `${contact.postal_code}`,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload),
      redirect: "follow",
    };

    // fetch("http://localhost:8000/api/add_contact", requestOptions)
    fetch(
      `${process.env.REACT_APP_ECOMM_URL}/api/add_contact`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        notify("Contact info has been saved", "success");
        navigate("/cart");
      })
      .catch((error) => console.log("error", error));
  };

  // THIS HANDLES CONTACT UDDATE
  const contactUpdate = () => {
    const payload2 = {
      ...contact,
    };

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions2 = {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(payload2),
      redirect: "follow",
    };

    fetch(
      `${process.env.REACT_APP_ECOMM_URL}/api/update_contact`,
      requestOptions2
    )
      .then((response) => response.json())
      .then((result) => {
        if (result === 1) {
          notify("Contact info has been updated", "success");
        } else {
          notify("Ensure all fields are filled", "warn");
          console.log(result);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const getContact = () => {
    // fetch(`http://localhost:8000/api/get_contact/${user.id}`)
    fetch(`${process.env.REACT_APP_ECOMM_URL}/api/get_contact/${user.id}`)
      .then((response) => response.json())
      .then((user_contact) => {
        if (user_contact.length > 0) {
          setContactUser(true);
          console.log("first", user_contact);
          setContact(user_contact[0]);
        } else {
          console.log("contact not found for logged in user");
        }
      });
  };

  useEffect(() => {
    getContact();
  }, []);
  return (
    <>
      <Header />
      <HeaderLinks active="contact" />
      <PageTitleBar pageTitle="Contact Info" />

      <Stack
        spacing="5%"
        alignItems="flex-start"
        p={{ base: "5px", md: "50px" }}
        w="100%"
        direction={["column", "row"]}
        mt="30px"
      >
        <Box
          px="20px"
          py="20px"
          rounded="8px"
          bg="#F8F8FD"
          w={{ base: "100%", md: "65%" }}
        >
          <Text mt="30px" fontSize="18px" fontWeight="700" color="#1D3178">
            Contact Information
          </Text>

          <Input
            px="0px"
            mt="40px"
            borderTop="none"
            borderEnd="none"
            borderStart="none"
            placeholder="Email or mobile phone number"
            id="email_or_phone"
            onChange={handleChange}
            value={contact.email_or_phone}
          />

          <Text mt="30px" fontSize="18px" fontWeight="700" color="#1D3178">
            Shipping Address
          </Text>

          <Stack
            mt="30px"
            direction={["column", "row"]}
            spacing="30px"
            w="100%"
          >
            <Input
              px="0px"
              w={{ base: "100%", md: "50%" }}
              borderTop="none"
              borderEnd="none"
              borderStart="none"
              placeholder="First Name"
              onChange={handleChange}
              id="first_name"
              value={contact.first_name}
            />
            <Input
              px="0px"
              w={{ base: "100%", md: "50%" }}
              borderTop="none"
              borderEnd="none"
              borderStart="none"
              placeholder="Last Name"
              onChange={handleChange}
              id="last_name"
              value={contact.last_name}
            />
          </Stack>

          <Input
            px="0px"
            mt="40px"
            borderTop="none"
            borderEnd="none"
            borderStart="none"
            placeholder="Address"
            onChange={handleChange}
            id="address"
            value={contact.address}
          />
          <Input
            px="0px"
            mt="40px"
            borderTop="none"
            borderEnd="none"
            borderStart="none"
            placeholder="City"
            onChange={handleChange}
            id="city"
            value={contact.city}
          />

          <Stack
            mt="30px"
            direction={["column", "row"]}
            spacing="30px"
            w="100%"
          >
            <Input
              px="0px"
              w={{ base: "100%", md: "50%" }}
              borderTop="none"
              borderEnd="none"
              borderStart="none"
              placeholder="Bangladesh"
              onChange={handleChange}
              id="country"
              value={contact.country}
            />
            <Input
              px="0px"
              w={{ base: "100%", md: "50%" }}
              borderTop="none"
              borderEnd="none"
              borderStart="none"
              placeholder="Postal Code"
              onChange={handleChange}
              id="postal_code"
              value={contact.postal_code}
            />
          </Stack>
          {contactUser ? (
            <Button
              onClick={contactUpdate}
              _hover={{ bg: "green" }}
              mt="50px"
              bg="#FB2E86"
              color="white"
            >
              Update Details
            </Button>
          ) : (
            <Button
              onClick={saveContact}
              _hover={{ bg: "green" }}
              mt="50px"
              bg="#FB2E86"
              color="white"
            >
              Save Details
            </Button>
          )}
        </Box>
        <Box w={{ base: "100%", md: "30%" }}>
          {items.map((item, i) => (
            <Box key={i}>
              <Stack px="10px" alignItems="center" direction={["row"]}>
                <SimpleGrid my="15px" w="200px" columns={2}>
                  <Box w="85px">
                    <Image w="100%" src={item.image} />
                  </Box>
                  <Stack spacing="10px">
                    <Text>{item.name}</Text>
                    <Text color="#A1A8C1">Color: Brown</Text>
                    <Text color="#A1A8C1">Size: XL</Text>
                  </Stack>
                </SimpleGrid>
                <Spacer />
                <Text fontWeight="bold" color="#15245E">
                  N{new Intl.NumberFormat().format(item.price)}
                </Text>
              </Stack>
              <Divider />
            </Box>
          ))}

          {!isEmpty && (
            <Box mt="40px">
              <CartTotalCard />
            </Box>
          )}
        </Box>
      </Stack>

      <Footer />
    </>
  );
}

export default ContactInfo;
