import { Box, Stack, Image, Text, HStack, Link } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BiCart } from "react-icons/bi";
import { BsHeartFill } from "react-icons/bs";
import { useNavigate } from "react-router";
import { useCart } from "react-use-cart";
import notify from "../Functions/notify";

function Product({ product, func }) {
  const { items, addItem } = useCart();
  const [watch, setWatch] = useState(false);
  const navigate = useNavigate();

  const fetchSingleProduct=(id)=>{
    navigate(`/products/${id}`)
  }
  const checkAndNotify = (product) => {
    const checkItem = (item) => {
      return item.id === product.id;
    };

    const inCart = items.findIndex(checkItem);

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

  useEffect(() => {}, [watch]);
  return (
    <Stack
      alignItems={{ base: "normal", md: "center" }}
      spacing={"20px"}
      direction={{ base: "column", md: "row" }}
      w="100%"
      px="20px"
      rounded={"8px"}
      border={"1px solid gray"}
      boxShadow="md"
      my="20px"
      py="10px"
    >
      <Box
        as={Link}
        _hover={{ textDecoration: "none" }}
        onClick={()=>fetchSingleProduct(product.id)}
        // href={`/products/${product.id}`}
        w="250px"
        objectFit={"cover"}
      >
        <Image w="100%" src={product.image} />
      </Box>

      <Stack py="20px" spacing="20px" direction={["column"]}>
        <Text fontSize={"18px"} fontWeight={"900"} color="#111C85">
          {product.name}
        </Text>
        <HStack>
          <Text fontWeight={500} fontSize="xl" color="#111C85">
          ₦{new Intl.NumberFormat().format(product.price)}.00
          </Text>
          <Text fontWeight={500} fontSize="xl" textDecoration={"line-through"} color="#FF2AAA">
          ₦{new Intl.NumberFormat().format(product.old_price)}.00
          </Text>
        </HStack>
        <Text color="#9295AA" fontWeight="400">
          {product.desc}
        </Text>
        <HStack pb={{ base: "20px", md: "0px" }} spacing={"40px"}>
          <BiCart
            onClick={() => checkAndNotify(product)}
            cursor={"pointer"}
            size={"24px"}
          />
          <BsHeartFill
            onClick={() => changeFavorite(product)}
            color={product.favorite ? "red" : "grey"}
            cursor={"pointer"}
            size={"24px"}
          />
        </HStack>
      </Stack>
    </Stack>
  );
}

export default Product;
