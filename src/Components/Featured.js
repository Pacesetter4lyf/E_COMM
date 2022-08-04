import { Flex, Box, Image, Text, Button, Stack } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import { BsStar, BsStarFill, BsStarHalf, BsHeartFill } from "react-icons/bs";
import { FaCartPlus } from "react-icons/fa";
import featured from "../Data/featured.json";
import { useCart } from "react-use-cart";
import notify from "../Functions/notify";
import { useSelector, useDispatch } from "react-redux";
import { changeFavor } from "../Actions";

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

function Featured() {
  const { items, addItem } = useCart();
  const [watch, setWatch] = useState(false);
  const featuredProducts = useSelector((state) => state.favorite);
  const dispatch = useDispatch();

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

  const changeFavorite = (product, index) => {
    dispatch(changeFavor(product.favorite, index));
    // if (product.favorite === true) {
    //   product.favorite = false;
    // } else {
    //   product.favorite = true;
    // }
    setWatch(!watch);
  };

  useEffect(() => {}, [watch]);
  return (
    <Stack
      direction={["column", "row"]}
      alignItems="center"
      justifyContent="center"
      spacing={"20px"}
    >
      {featuredProducts.map((item, i) => (
        <Box
          w={{ base: "95%", md: "300px" }}
          height={"460px"}
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative"
          key={i}
        >
          <Box px="10px">
            <Box size="10px" position="absolute" top={2} right={2}>
              <BsHeartFill
                color={item.favorite ? "red" : "grey"}
                onClick={() => changeFavorite(item, i)}
                cursor={"pointer"}
              />
            </Box>

            <Image
              src={item.image}
              alt={`Picture of ${item.name}`}
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
                {item.name}
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
                {new Intl.NumberFormat().format(item.price)}
              </Box>
              <Button
                color={"white"}
                size={"md"}
                background={"#F5862E"}
                border={"1px solid white"}
                onClick={() => checkAndNotify(item)}
              >
                <FaCartPlus /> &nbsp; Add to Cart
              </Button>
            </Flex>
          </Box>
        </Box>
      ))}
    </Stack>
  );
}

export default Featured;
