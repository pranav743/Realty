import React, { useState, Suspense, useRef } from "react";
import { Center, SimpleGrid, Box, VStack, Divider, Text, Button } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { url } from "../../Global/URL";
import showToast from "../../Global/Toast";
import { useToast, useTheme } from "@chakra-ui/react";
import { GoogleMap, LoadScript, MarkerF, Marker } from "@react-google-maps/api";


const Property = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const { colors } = useTheme();

    //MAPS 
    const [selectedMarkerInfo, setSelectedMarkerInfo] = useState(false);
    console.log(selectedMarkerInfo);



    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    };


    return (
        <SimpleGrid columns={[1, 2]} height={'100%'}>
            <Box height='100%'>
                <Center h={'100%'}>
                    <Box h={'500px'} minW={'300px'} w={'100%'} maxW={'500px'} bg='brand.violet' style={{ borderRadius: '20px', overflow: 'hidden' }}>
                        <LoadScript googleMapsApiKey="AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU">
                            <GoogleMap
                                mapContainerStyle={{
                                    width: "100%",
                                    height: "100%",
                                }}
                                center={{ lat: 19.076, lng: 72.8777 }}
                                zoom={20}
                            >
                                <MarkerF
                                    position={{ lat: 19.076, lng: 72.8777 }}
                                    icon={{
                                        // url: user,
                                        scaledSize: { width: 50, height: 50 },
                                    }}
                                />
                                {/* <Marker position={{ lat: 19.076, lng: 72.8777 }} /> */}
                            </GoogleMap>
                        </LoadScript>

                    </Box>
                </Center>
            </Box>
            <Box height='100%'>
                <Box bg={'dark.700'} minH={'100%'} h={'auto'} w={'100%'} p={5} style={{ borderRadius: '15px' }}>
                    <VStack align={'left'}>
                        <Text fontWeight={'bold'} mt={'70px'} fontSize={28} color={'#fff'}>
                            Luxurious Apartment in Mumbai
                        </Text>
                        <Text color={'font.300'} fontSize={'18px'} w={'80%'}>
                            Owned by <span style={{ color: colors.brand.pink }}>Pranav</span>
                        </Text>

                        <Text color={'font.200'} fontStyle={'italic'} mt={10} fontSize={'18px'}>
                            Beautiful apartment with stunning views Luxurious Apartment in Mumbai Luxurious Apartment in Mumbai v Luxurious Apartment in Mumbai Luxurious Apartment in Mumbai Luxurious Apartment in Mumbai Luxurious Apartment in Mumbai
                        </Text>


                        <Box mt={'50px'} bg={'transparent'} p={5} border={'solid 0.5px #fff'} style={{ borderRadius: '20px' }}>

                            <Text mt={'5px'} fontSize={20} color={'#fff'}>
                                Current Price
                            </Text>
                            <Text mt={'5px'} fontSize={35} color={'brand.blue'}>
                                0.256 ETH
                            </Text>
                        </Box>
                        <SimpleGrid columns={[1, 2]} mt={30} height={'100%'} gap={5}>
                            <Button color={'#fff'} bg={'brand.violet'} style={{ borderRadius: '15px' }}>Buy</Button>
                            <Button border={'solid 0.5px #fff'} color={'#fff'} bg={'transparent'} style={{ borderRadius: '15px' }}>Save for Later</Button>
                        </SimpleGrid>

                    </VStack>
                </Box>
            </Box>
        </SimpleGrid>
    );
};

export default Property;

