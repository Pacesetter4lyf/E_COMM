import {
  Box,
  Stack,
  Text,
  Input,
  Spacer,
  HStack,
  SimpleGrid,
  Avatar,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import Header from "../Components/Header";
import HeaderLinks from "../Components/HeaderLinks";
import PageTitleBar from "../Components/PageTitleBar";
import { FiGrid } from "react-icons/fi";
import { FaList } from "react-icons/fa";
import Product from "../Components/Product";
import Footer from "../Components/Footer";
import Grid from "../Components/Grid";
import data from "../Data/data.json";
// import {useLocation} from 'react-router-dom'
import SideFilter from "../Components/SideFilter";
import ReactPaginate from "react-paginate";

function Products() {
  const [list, setList] = useState(true);
  const [products, setProducts] = useState(data);
  const [pageCount, setPageCount] = useState(0);
  const [currentItems, setCurrentItems] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const [productPerPage, setPerPage] = useState(4);

  //The function that handles product per page filter
  const perPage = (e) => {
    let value = e.target.value;
    value.length
      ? setCurrentItems(data.slice(0, value))
      : setCurrentItems(data.slice(0, productPerPage));
  };

  const putPaginationToPlace = () => {
    const endOffset = itemOffset + productPerPage;
    setCurrentItems(products.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(products.length / productPerPage));
  };

  //PAGINATION!!!
  const handlePageClick = (event) => {
    const newOffset = (event.selected * productPerPage) % products.length;
    setItemOffset(newOffset);
  };

  //PAGINATION ENDS

  useEffect(() => {
    putPaginationToPlace();
  }, [itemOffset, productPerPage]);
  return (
    <>
      <Header />
      <HeaderLinks active="products" />
      <PageTitleBar pageTitle="Products Page" />
      <Stack
        spacing="20px"
        py="50px"
        w="100%"
        direction={["column", "row"]}
        px={{ base: "20px", md: "50px" }}
      >
        <Box>
          <Text color="#151875" fontWeight="bold" fontSize="22px">
            Ecommerce Acceories & Fashion item
          </Text>
          <Text color="#8A8FB9" fontWeight="bold" fontSize="14px">
            Total of {products.length} items
          </Text>
        </Box>
        <Spacer />
        <HStack spacing="15px">
          <Text fontWeight="bold" color="#3F509E">
            Per Page:
          </Text>
          <Input
            onChange={perPage}
            placeholder="eg: 1"
            type="number"
            w="80px"
          />
          <Text fontWeight="bold" color="#3F509E">
            View:
          </Text>
          <FiGrid
            onClick={() => setList(false)}
            cursor="pointer"
            color="#151875"
            size="24px"
          />
          <FaList
            onClick={() => setList(true)}
            cursor="pointer"
            color="#151875"
            size="24px"
          />
        </HStack>
      </Stack>
      <Stack
        mt="30px"
        w="100%"
        // direction={{ base: "column", md: "row" }}
        direction={["column", "row"]}
        px={{ base: "20px", md: "50px" }}
      >
        <SideFilter
          setCurrentItems={setCurrentItems}
          setProducts={setProducts}
          products={products}
        />
        {currentItems.length ? (
          <>
            {" "}
            {list ? (
              <Box w={{ base: "100%", md: "80%" }}>
                {currentItems.map((item, i) => (
                  <Product product={item} key={i} />
                ))}
              </Box>
            ) : (
              <Box w={{ base: "100%", md: "80%" }}>
                <SimpleGrid
                  spacingY="50px"
                  spacingX="20px"
                  columns={{ base: 1, md: 3 }}
                >
                  {currentItems.map((item, i) => (
                    <Grid product={item} key={i} />
                  ))}
                </SimpleGrid>
              </Box>
            )}
          </>
        ) : (
          <>
            <Box w={{ base: "100%", md: "80%" }}>
              <Text color="#151875" textAlign="center" fontWeight="bold" fontSize="20px">
                No Product Found
              </Text>
            </Box>
          </>
        )}
      </Stack>

      <Box mt="40px">
        <ReactPaginate
          breakLabel="..."
          nextLabel={<Box fontWeight="bold">Next</Box>}
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          containerClassName={"pagination justify-content-center mt-3"}
          pageClassName={"page-item"}
          previousClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousLinkClassName="page-link"
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          previousLabel={<Box fontWeight="bold">Prev</Box>}
          renderOnZeroPageCount={null}
          activeClassName="active "
        />
      </Box>
      <Footer />
    </>
  );
}

export default Products;
