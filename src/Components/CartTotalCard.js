import React, { useState, useEffect } from "react";
import {
  Text,
  HStack,
  Box,
  Spacer,
  Divider,
  Button,
  Link,
} from "@chakra-ui/react";
import { useCart } from "react-use-cart";
import notify from "../Functions/notify";
import { useNavigate } from "react-router";
import { PaystackConsumer } from "react-paystack";

function CartTotalCard() {
  const navigate = useNavigate();
  const [isLoggedin, setLoggedIn] = useState(false);
  const [noUserContact, setUserContact] = useState(false);
  const { items, cartTotal, emptyCart } = useCart();
  const user = JSON.parse(localStorage.getItem("user"));
  const [config, setConfig] = useState({});

  const reference = new Date().getTime().toString();

  const saveOrder = () => {
    items.map((item) => {
      let payload = {
        user_id: `${user.id}`,
        product_id: `${item.id}`,
        product_qty: `${item.quantity}`,
        product_price: `${item.price}`,
        product_total: `${item.itemTotal}`,
        trans_total: `${Math.round(cartTotal + cartTotal * 0.075)}`,
        trans_ref: `${config.reference}`,
        trans_status: "pending",
      };

      fetch(`${process.env.REACT_APP_ECOMM_URL}/api/add_transaction`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
        .then((response) => response.json())
        .then((response) => {
          console.log("did it work?", response);
        })
        .catch();
    });
  };

  const handleSuccess = () => {
    fetch(`${process.env.REACT_APP_ECOMM_URL}/api/update_status/${reference}`)
      .then((response) => response.json())
      .then((updated) => { })
      .catch((error) => {
        console.log(error);
      });

    emptyCart();
    navigate("/completed");
  };

  const handleClose = () => {
    // implementation for  whatever you want to do when the Paystack dialog closed.
    console.log("closed");
  };

  const componentProps = {
    ...config,
    text: "Paystack Button Implementation",
    onSuccess: (reference) => handleSuccess(reference),
    onClose: handleClose,
  };

  const notifyUser = () => {
    notify("Kindly save contact", "warn");
    navigate("/contact");
  };

  const checkIfLogged = () => {
    let user = localStorage.getItem("user");
    if (user) {
      setLoggedIn(true);
      let usrObj = JSON.parse(user);
    } else {
      setLoggedIn(false);
    }
  };

  const getPayLoad = () => {
    if (user) {
      const payload = {
        reference,
        email: `${user.email}`,
        amount: `${Math.round(cartTotal + cartTotal * 0.075) * 100}`,
        publicKey: "pk_test_d2a7a2cc76faf46c898abbbc4f678c721c6f4a9f",
      };

      setConfig(payload);
    }
  };

  const getContact = () => {
    if (user) {
      // fetch(`http://localhost:8000/api/get_contact/${user.id}`)
      fetch(`${process.env.REACT_APP_ECOMM_URL}/api/get_contact/${user.id}`)
        .then((response) => response.json())
        .then((user_contact) => {
          if (user_contact.length > 0) {
            setUserContact(false);
          } else {
            setUserContact(true)
          }
        });
    }

  };

  const gotoLoginWithRoute = () => {
    localStorage.setItem("route", "/cart")
    navigate("/login")
  }

  useEffect(() => {
    checkIfLogged();
    getPayLoad();
    getContact();
  }, []);
  return (
    <>
      <Text
        textAlign="center"
        fontSize="20px"
        color="#1D3178"
        fontWeight="bold"
      >
        Cart Total
      </Text>
      <Box mt="10px" rounded="8px" p="20px" bg="#F4F4FC">
        <HStack>
          <Text fontWeight="600" color="#1D3178">
            Subtotals:{" "}
          </Text>
          <Spacer />
          <Text fontWeight="600" color="#1D3178">
            ₦{new Intl.NumberFormat().format(cartTotal)}
          </Text>
        </HStack>

        <Divider mt="10px" />

        <HStack mt="34px">
          <Text fontWeight="600" color="#1D3178">
            Totals after VAT:{" "}
          </Text>
          <Spacer />
          <Text fontWeight="600" color="#1D3178">
            ₦{new Intl.NumberFormat().format(cartTotal + cartTotal * 0.0075)}
          </Text>
        </HStack>

        <Divider mt="10px" />
        {isLoggedin ? (
          <PaystackConsumer {...componentProps}>
            {({ initializePayment }) => (
              <Button
                _hover={{ bg: "teal" }}
                my="30px"
                w="100%"
                bg="#19D16F"
                color="white"
                onClick={
                  noUserContact
                    ? notifyUser
                    : () => {
                      fetch(
                        `${process.env.REACT_APP_ECOMM_URL}/api/products`
                      )
                        .then((response) => response.json())

                        .then(function (data) {
                          saveOrder();
                          initializePayment(handleSuccess, handleClose);
                        });
                    }
                }
              >
                Proceed To checkout
              </Button>
            )}
          </PaystackConsumer>
        ) : (
          <Button
            onClick={gotoLoginWithRoute}
            _hover={{ bg: "teal", textDecoration: "none" }}
            my="30px"
            w="100%"
            bg="#19D16F"
            color="white"
          >
            Proceed To checkout
          </Button>
        )}
      </Box>
    </>
  );
}

export default CartTotalCard;
