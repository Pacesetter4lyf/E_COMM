import {
  Stack,
  Table,
  Thead,
  Tr,
  Td,
  Text,
  Tbody,
  HStack,
  Image,
  Box,
  SimpleGrid,
  Spacer,
  Button,
  Center,
} from "@chakra-ui/react";
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import HeaderLinks from "./HeaderLinks";
import PageTitleBar from "./PageTitleBar";
import { TiDelete } from "react-icons/ti";
import { FiMinusSquare, FiPlusSquare } from "react-icons/fi";
import { useCart } from "react-use-cart";
import notify from "../Functions/notify";
import CartTotalCard from "./CartTotalCard";
import { useNavigate } from "react-router";

function ShoppingCart() {
  const navigate = useNavigate();
  const { items, removeItem, emptyCart, updateItemQuantity, isEmpty } =
    useCart();

  const removeAndNotify = (itemId) => {
    removeItem(itemId);
    notify("Product removed from cart", "error");
  };

  const clearAndNotify = () => {
    emptyCart();
    notify("Cart Cleared!", "error");
  };

  const goProducts =()=>{
    navigate("/products")
  }
  return (
    <>
      <Header />
      <HeaderLinks />
      <PageTitleBar pageTitle="Shopping Cart" />

      <Stack
        spacing="5%"
        alignItems="flex-start"
        p={{ base: "5px", md: "50px" }}
        w="100%"
        direction={["column", "row"]}
      >
        <Box w={{ base: "100%", md: "65%" }}>
          <Box overflowY="auto">
            <Table colorScheme="teal">
              <Thead>
                <Tr>
                  <Td>
                    <Text fontSize="18px" fontWeight="bold" color="#1D3178">
                      Product
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="18px" fontWeight="bold" color="#1D3178">
                      Price
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="18px" fontWeight="bold" color="#1D3178">
                      Quantity
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="18px" fontWeight="bold" color="#1D3178">
                      Total
                    </Text>
                  </Td>
                  <Td>
                    <Text fontSize="18px" fontWeight="bold" color="#1D3178">
                      Action
                    </Text>
                  </Td>
                </Tr>
              </Thead>

              <Tbody>
                {items.map((item, i) => (
                  <Tr key={i}>
                    <Td>
                      <SimpleGrid w="200px" columns={2}>
                        <Box w="85px">
                          <Image w="100%" src={item.image} />
                        </Box>
                        <Stack spacing="10px">
                          <Text>{item.name}</Text>
                          <Text color="#A1A8C1">Color: Brown</Text>
                          <Text color="#A1A8C1">Size: XL</Text>
                        </Stack>
                      </SimpleGrid>
                    </Td>
                    <Td>
                      <Text color="#15245E">
                        {" "}
                        ₦{new Intl.NumberFormat().format(item.price)}.00
                      </Text>
                    </Td>
                    <Td>
                      <HStack alignItems="center" w="60px" bg="#F0EFF2">
                        <FiMinusSquare
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity - 1)
                          }
                          cursor="pointer"
                        />
                        <Text color="#15245E">{item.quantity}</Text>
                        <FiPlusSquare
                          onClick={() =>
                            updateItemQuantity(item.id, item.quantity + 1)
                          }
                          cursor="pointer"
                        />
                      </HStack>
                    </Td>
                    <Td>
                      <Text color="#15245E">
                      ₦
                        {new Intl.NumberFormat().format(
                          item.price * item.quantity
                        )}
                        .00
                      </Text>
                    </Td>
                    <Td>
                      <TiDelete
                        onClick={() => removeAndNotify(item.id)}
                        cursor="pointer"
                        size="20px"
                        color="red"
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>

            {isEmpty && (
              <Center mt="40px" w="80%" mx="10%">
                <Text mb="40px" color="red" fontSize="20px">Your Cart is Empty</Text>
              </Center>
            )}
          </Box>
          {!isEmpty && (
            <Stack mt="30px" direction={[ "row"]}>
              <Button
                onClick={goProducts}
                _hover={{ bg: "green",color: "white", textDecoration: "none" }}
                bg="#FB2E86"
                color="white"
              >
                Update Cart
              </Button>
              <Spacer />
              <Button
                onClick={clearAndNotify}
                _hover={{ bg: "red" }}
                bg="#FB2E86"
                color="white"
              >
                Clear Cart
              </Button>
            </Stack>
          )}
        </Box>
        <Box w={{ base: "100%", md: "30%" }}>
          {!isEmpty && <CartTotalCard />}
        </Box>
      </Stack>

      <Footer />
    </>
  );
}

export default ShoppingCart;
