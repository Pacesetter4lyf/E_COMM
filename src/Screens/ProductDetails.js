import {
  HStack,
  Stack,
  Image,
  Box,
  Center,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react";
import React, {  useState } from "react";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { BiHeart } from "react-icons/bi";
import Footer from "../Components/Footer";
import { BsArrowRight } from "react-icons/bs";
import { useParams } from "react-router-dom";
import data from "../Data/data.json";
import notify from "../Functions/notify";
import { useCart } from "react-use-cart";

function ProductDetails() {
  const { prod_id } = useParams();
  const [product, setProduct] = useState(data[prod_id - 1]);
  const { items, addItem } = useCart();



  const checkAndNotify = (product) => {
    //the (item) is a parameter waiting to be provided by function caller
    const checkItem = (item) => {
      return item.id === product.id;
    };

    const inCart = items.findIndex(checkItem);
    //findIndex maps over the items in cart, call checkItem() and provides each item as argument for checkItem
    //if result condition isn't met, result is -1 and hence below
    if (inCart > -1) {
      notify("Product already in cart", "warn");
    } else {
      addItem(product);

      notify("Product has been added to cart", "success");
    }
  };
  return (
    <>
      <Header />
      <HeaderLinks />
      <PageTitleBar pageTitle="Product Details" />
      <Box w="100%">
        <Stack
          direction={["column", "row"]}
          p="10px"
          boxShadow="md"
          my="80px"
          mx={{ base: "4%", md: "10%" }}
          w={{ base: "92%", md: "80%" }}
        >
          <Stack direction={["column", "row"]}>
            <Stack direction={["row", "column"]} spacing="11px">
              <Box
                objectFit="center"
                rounded="8px"
                border="1px solid #E5E5E5"
                w="110px"
                cursor="pointer"
              >
                <Image w="100%" src={product.image} />
              </Box>
              <Box
                objectFit="center"
                rounded="8px"
                border="1px solid #E5E5E5"
                w="110px"
                cursor="pointer"
              >
                <Image w="100%" src={product.image} />
              </Box>
              <Box
                objectFit="center"
                rounded="8px"
                border="1px solid #E5E5E5"
                w="110px"
                cursor="pointer"
              >
                <Image w="100%" src={product.image} />
              </Box>
            </Stack>
            <Center
              rounded="8px"
              border="1px solid #E5E5E5"
              w={{ base: "100%", md: "300px" }}
            >
              <Image w="100%" src={product.image} />
            </Center>
          </Stack>

          <Stack py="35px" pl="20px" spacing="20px">
            <Text fontWeight="bold" fontSize="36px" color="#0D134E">
              {product.name}
            </Text>
            <HStack>
              <Text fontSize={"20px"} color="#111C85">
                N{new Intl.NumberFormat().format(product.price)}.00
              </Text>
              <Text
                fontSize={"20px"}
                textDecoration={"line-through"}
                color="#FF2AAA"
              >
                N{new Intl.NumberFormat().format(product.old_price)}.00
              </Text>
            </HStack>
            <Text color="#A9ACC6">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
              tellus porttitor purus, et volutpat sit
            </Text>
            <HStack cursor="pointer">
              <Text
                onClick={() => checkAndNotify(product)}
                fontSize="20px"
                color="#151875"
              >
                Add To cart
              </Text>
              <BiHeart cursor={"pointer"} size={"24px"} />
            </HStack>
            <HStack>
              <Text fontSize="20px" color="#151875">
                Category:
              </Text>
              <Text fontSize="20px" color="black">
                {product.category}
              </Text>
            </HStack>
          </Stack>
        </Stack>
      </Box>

      <Box
        overflowX={"auto"}
        w="100%"
        py="20px"
        bg="#F9F8FE"
        px={{ base: "5px", md: "150px" }}
      >
        <Tabs>
          <TabList>
            <Tab
              _selected={{
                fontWeight: "bold",
                borderBottom: "1px solid #FB2E86",
              }}
            >
              <Text color="#151875">Description</Text>
            </Tab>
            <Tab
              _selected={{
                fontWeight: "bold",
                borderBottom: "1px solid #FB2E86",
              }}
            >
              <Text color="#151875">Additional Info</Text>
            </Tab>
            <Tab
              _selected={{
                fontWeight: "bold",
                borderBottom: "1px solid #FB2E86",
              }}
            >
              <Text color="#151875">Reviews</Text>
            </Tab>
            <Tab
              _selected={{
                fontWeight: "bold",
                borderBottom: "1px solid #FB2E86",
              }}
            >
              <Text color="#151875">Video</Text>
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Stack>
                <Text color="#151875" fontSize="20px" fontWeight="bold">
                  Name
                </Text>
                <Text mt="20px" color="#A9ACC6">
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus
                  dolor ornare faucibus vel sed et eleifend habitasse amet.
                  Montes, mauris varius ac est bibendum. Scelerisque a, risus ac
                  ante. Velit consectetur neque, elit, aliquet. Non varius proin
                  sed urna, egestas consequat laoreet diam tincidunt. Magna eget
                  faucibus cras justo, tortor sed donec tempus. Imperdiet
                  consequat, quis diam arcu, nulla lobortis justo netus dis. Eu
                  in fringilla vulputate nunc nec. Dui, massa viverr .
                </Text>

                <Text
                  mt="20px"
                  color="#151875"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  More details
                </Text>
                {[1, 2, 3].map((item, i) => (
                  <HStack key={i}>
                    <BsArrowRight size="20px" />{" "}
                    <Text pt="10px" color="#A9ACC6">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      ds diam arcu, nulla lobortis justo netus dis. Eu in
                      fringilla vulputate nunc nec. Dui, massa viverr
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Text color="#151875" fontSize="20px" fontWeight="bold">
                  Name
                </Text>
                <Text mt="20px" color="#A9ACC6">
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus
                  dolor ornare faucibus vel sed et eleifend habitasse amet.
                  Montes, mauris varius ac est bibendum. Scelerisque a, risus ac
                  ante. Velit consectetur neque, elit, aliquet. Non varius proin
                  sed urna, egestas consequat laoreet diam tincidunt. Magna eget
                  faucibus cras justo, tortor sed donec tempus. Imperdiet
                  consequat, quis diam arcu, nulla lobortis justo netus dis. Eu
                  in fringilla vulputate nunc nec. Dui, massa viverr .
                </Text>

                <Text
                  mt="20px"
                  color="#151875"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  More details
                </Text>
                {[1, 2, 3].map((item, i) => (
                  <HStack key={i}>
                    <BsArrowRight size="20px" />{" "}
                    <Text pt="10px" color="#A9ACC6">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      ds diam arcu, nulla lobortis justo netus dis. Eu in
                      fringilla vulputate nunc nec. Dui, massa viverr
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Text color="#151875" fontSize="20px" fontWeight="bold">
                  Name
                </Text>
                <Text mt="20px" color="#A9ACC6">
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus
                  dolor ornare faucibus vel sed et eleifend habitasse amet.
                  Montes, mauris varius ac est bibendum. Scelerisque a, risus ac
                  ante. Velit consectetur neque, elit, aliquet. Non varius proin
                  sed urna, egestas consequat laoreet diam tincidunt. Magna eget
                  faucibus cras justo, tortor sed donec tempus. Imperdiet
                  consequat, quis diam arcu, nulla lobortis justo netus dis. Eu
                  in fringilla vulputate nunc nec. Dui, massa viverr .
                </Text>

                <Text
                  mt="20px"
                  color="#151875"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  More details
                </Text>
                {[1, 2, 3].map((item, i) => (
                  <HStack key={i}>
                    <BsArrowRight size="20px" />{" "}
                    <Text pt="10px" color="#A9ACC6">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      ds diam arcu, nulla lobortis justo netus dis. Eu in
                      fringilla vulputate nunc nec. Dui, massa viverr
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </TabPanel>
            <TabPanel>
              <Stack>
                <Text color="#151875" fontSize="20px" fontWeight="bold">
                  Name
                </Text>
                <Text mt="20px" color="#A9ACC6">
                  Aliquam dis vulputate vulputate integer sagittis. Faucibus
                  dolor ornare faucibus vel sed et eleifend habitasse amet.
                  Montes, mauris varius ac est bibendum. Scelerisque a, risus ac
                  ante. Velit consectetur neque, elit, aliquet. Non varius proin
                  sed urna, egestas consequat laoreet diam tincidunt. Magna eget
                  faucibus cras justo, tortor sed donec tempus. Imperdiet
                  consequat, quis diam arcu, nulla lobortis justo netus dis. Eu
                  in fringilla vulputate nunc nec. Dui, massa viverr .
                </Text>

                <Text
                  mt="20px"
                  color="#151875"
                  fontSize="20px"
                  fontWeight="bold"
                >
                  More details
                </Text>
                {[1, 2, 3].map((item, i) => (
                  <HStack key={i}>
                    <BsArrowRight size="20px" />{" "}
                    <Text pt="10px" color="#A9ACC6">
                      Aliquam dis vulputate vulputate integer sagittis. Faucibus
                      ds diam arcu, nulla lobortis justo netus dis. Eu in
                      fringilla vulputate nunc nec. Dui, massa viverr
                    </Text>
                  </HStack>
                ))}
              </Stack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>

      <Footer />
    </>
  );
}

export default ProductDetails;
