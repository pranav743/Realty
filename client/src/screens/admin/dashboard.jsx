import React, { useEffect } from 'react'
import axios from 'axios';
import { Box, SimpleGrid } from '@chakra-ui/react';

const Dashboard = () => {

    const getData = async () => {

        const apiUrl = 'https://places.googleapis.com/v1/places:searchNearby';
        const apiKey = 'AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU';

        const requestData = {
            includedTypes: ['airport', 'bus_stop', 'restaurant', 'gym', 'hospital', 'school'],
            // maxResultCount: 6,
            rankPreference: "DISTANCE",
            locationRestriction: {
                circle: {
                    center: {
                        latitude: 19.0963747,
                        longitude: 72.9199405
                    },
                    radius: 500.0
                }
            }
        };

        const headers = {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': "AIzaSyCBsEwnTS9s-IvZmvirO4t9OIT9VEs4UAU",
            'X-Goog-FieldMask': 'places.displayName,places.primaryType,places.location'
        };

        const response = await axios.post(apiUrl, requestData, { headers });

        // Handle the response from the Google Places API
        const places = response.data;
        console.log(places);
    }
    useEffect(() => {
        // getData();
    }, [])
    return (
        <div>
            <SimpleGrid columns={[1, 2]} height={'100%'}>
                <Box height='100%'>

                </Box>
                <Box height='100%'>

                </Box>
            </SimpleGrid>
        </div>
    )
}

export default Dashboard;
