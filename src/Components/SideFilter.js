import React from "react";
import {
  Box,
  Text,
  HStack,
  Checkbox,
  RadioGroup,
  Radio,
  Stack
} from "@chakra-ui/react";
import brands from "../Data/brand.json";
import categories from "../Data/categories.json";
import data from "../Data/data.json";

function SideFilter({ products, setCurrentItems }) {

  
  //brand fiilter
  const brandFilter = (e, item) => {
    let checked = e.target.checked;
    let brand = e.target.value;
    if (checked) {
      if (brand === "All") {
        setCurrentItems(data.slice(0, 4));
      } else {
        const brandResult = products.filter(
          (product) => product.brand === brand
        );
        setCurrentItems(brandResult);
      }
    } else {
      setCurrentItems(data.slice(0, 4));
    }
  };

  //category filter
  const categoryFilter = (e, item) => {
    let checked = e.target.checked;
    let category = e.target.value;
    if (checked)
      if (category === "All") {
        setCurrentItems(data.slice(0, 4));
      } else {
        const brandResult = products.filter(
          (product) => product.category === category
        );
        setCurrentItems(brandResult);
      }
    else {
      setCurrentItems(data.slice(0, 4));
    }
  };

  return (
    <Stack direction={["row", "column"]} spacing="30px" w={{ base: "100%", md: "20%" }}>
      <Box>
        <Text textDecoration="underline" fontWeight="bold" color="#151875">
          Product Brand
        </Text>

        <RadioGroup>
          {brands.map((item, i) => (
            <HStack key={i} pt="10px">
              <Radio onChange={(e) => brandFilter(e, item)} value={item.brand}>
                <Text color="#7E81A2">{item.brand}</Text>
              </Radio>
              {/* <Text color="#7E81A2">{item.brand}</Text> */}
            </HStack>
          ))}
        </RadioGroup>

        {/* <HStack key={i} pt="10px">
          <Checkbox
            id={item.brand}
            onChange={(e) => brandFilter(e, item)}
            size="md"
            colorScheme="pink"
          />
          <Text color="#7E81A2">{item.brand}</Text>
        </HStack> */}
      </Box>
      <Box mt="30px">
        <Text textDecoration="underline" fontWeight="bold" color="#151875">
          Categories
        </Text>

        <RadioGroup>
          {categories.map((item, i) => (
            <HStack key={i} pt="10px">
              <Radio
                onChange={(e) => categoryFilter(e, item)}
                value={item.category}
              >
                <Text color="#7E81A2">{item.category}</Text>
              </Radio>
            </HStack>
          ))}
        </RadioGroup>
      </Box>
      <Box display={{base: "none", md: "block"}} mt="30px">
        <Text textDecoration="underline" fontWeight="bold" color="#151875">
          Price Filter
        </Text>

        {[1, 1, 1, 1, 1].map((item, i) => (
          <HStack key={i} pt="10px">
            <Checkbox size="md" colorScheme="pink" />
            <Text color="#7E81A2">$0.00 - $150.00</Text>
          </HStack>
        ))}
      </Box>
    </Stack>
  );
}

export default SideFilter;
