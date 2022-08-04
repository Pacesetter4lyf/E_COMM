import {
  Box,
  Image,
  SimpleGrid,
  Text,
  HStack,
  Flex,
  Link,
  Stack,
  Button,
} from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiCart } from "react-icons/bi";
import { BsStar, BsStarFill, BsStarHalf, BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import { FiHeart } from "react-icons/fi";
import { useCart } from "react-use-cart";
import notify from "../Functions/notify";

function Grid({ product }) {
  const { items, addItem } = useCart();
  const [watch, setWatch] = useState(false);

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

  const changeFavorite = (product) => {
    if (product.favorite === true) {
      product.favorite = false;
    } else {
      product.favorite = true;
    }
    setWatch(!watch);
  };

  const data = {
    imageURL:
      "https://www-konga-com-res.cloudinary.com/w_auto,f_auto,fl_lossy,dpr_auto,q_auto/media/catalog/product/D/V/144356_1543477776.jpg",
    name: "Wayfarer Classic",
    price: 4200.0,
    rating: 4.2,
    numReviews: 34,
  };

  function Rating({ rating, numReviews }) {
    return (
      <Box d="flex" alignItems="center">
        {Array(5)
          .fill("")
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2;
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: "1", borderColor: "#F5862E" }}
                  color={i < rating ? "#F5862E" : "gray.300"}
                />
              );
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: "1" }} />;
            }
            return <BsStar key={i} style={{ marginLeft: "1" }} />;
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && "s"}
        </Box>
      </Box>
    );
  }

  useEffect(() => {}, [watch]);
  return (
    <Stack
      direction={["column", "row"]}
      alignItems="center"
      justifyContent="center"
      spacing={"20px"}
    >
      <Box
        w={{ base: "90%", md: "300px" }}
        height={"490px"}
        borderWidth="1px"
        rounded="lg"
        shadow="lg"
        position="relative"
      >
        <Box pt="25px" px="10px">
          <Box size="10px" position="absolute" top={2} right={2}>
            <BsHeartFill
              onClick={() => changeFavorite(product)}
              color={product.favorite ? "red" : "grey"}
              cursor={"pointer"}
            />
          </Box>

          <Image
            src={product.image}
            alt={`Picture of ${data.name}`}
            roundedTop="lg"
            width={"100%"}
            height={"300px"}
          />
        </Box>

        <Box p="6">
          <Flex mt="1" justifyContent="space-between" alignContent="center">
            <Box
              fontSize="20px"
              fontWeight="700"
              color={"#303030"}
              lineHeight="tight"
              isTruncated
            >
              {product.name}
            </Box>
          </Flex>

          <Flex justifyContent="space-between" alignContent="center">
            <Rating rating={data.rating} numReviews={data.numReviews} />
          </Flex>
          <Text fontSize="12px" color={"#858383"}>
            Sold by MIA Construction Supply
          </Text>
          <Flex justifyContent="space-between" alignContent="center" mt={2}>
            <Box
              fontSize="xl"
              fontWeight={500}
              //   color={useColorModeValue("gray.800", "white")}
            >
              <Box as="span">₦</Box>
              {new Intl.NumberFormat().format(product.price)}.00
            </Box>
            <Button
              color={"white"}
              size={"md"}
              background={"#F5862E"}
              border={"1px solid white"}
              onClick={() => checkAndNotify(product)}
            >
              <FaCartPlus /> &nbsp; Add to Cart
            </Button>
          </Flex>
        </Box>
      </Box>
    </Stack>
    // <Flex my="20px" flexDirection="column" alignItems="center">
    //   <HStack rounded="8px" p="5px" bg="#F6F7FB">
    //     <SimpleGrid spacingY="25px">
    //       <BiCart
    //         onClick={() => checkAndNotify(product)}
    //         cursor={"pointer"}
    //         size={"24px"}
    //       />
    //       <BsHeartFill
    //         onClick={() => changeFavorite(product)}
    //         color={product.favorite ? "red" : "grey"}
    //         cursor={"pointer"}
    //         size={"24px"}
    //       />
    //     </SimpleGrid>
    //     <Box
    //       as={Link}
    //       _hover={{ textDecoration: "none" }}
    //       href={`/products/${product.id}`}
    //       p="5px"
    //       w="250px"
    //       bg="#F6F7FB"
    //       minHeight="300px"
    //     >
    //       <Image w="100%" src={product.image} />
    //     </Box>
    //   </HStack>

    //   <Box>
    //     <Text fontSize={"18px"} fontWeight={"900"} color="#111C85">
    //       {product.name}
    //     </Text>
    //     <HStack>
    //       <Text color="#111C85">
    //         {" "}
    //         ${new Intl.NumberFormat().format(product.price)}.00
    //       </Text>
    //       <Text textDecoration={"line-through"} color="#FF2AAA">
    //         ${new Intl.NumberFormat().format(product.old_price)}.00
    //       </Text>
    //     </HStack>
    //   </Box>
    // </Flex>
  );
}

export default Grid;
