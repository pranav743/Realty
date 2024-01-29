import { Box, Center, VStack } from '@chakra-ui/react';
import React from 'react'
import { useTheme } from '@chakra-ui/react';

const Error = () => {
    const { colors } = useTheme();
    const hexToRgb = (hex) => {
        const bigint = parseInt(hex.slice(1), 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    };
    return (
        <Box h={'100%'}>
            <Center h={'100%'}>
                <Box bg={'dark.500'} h={'300px'} w={'50vw'} p={10} style={{ boxShadow: `inset 0 4px 35px rgba(${hexToRgb(colors.brand.font1)}, 0.2)`, borderRadius: '20px' }}>
                    <VStack>
                        <h1 style={{ width: '100%', textAlign: 'center', color: colors.brand.blue, fontSize: '30px' }}>OOPS !</h1>
                        <p style={{ width: '100%', textAlign: 'center', color: colors.brand.cyan, fontSize: '20px' }}>Something wen't Wrong :(</p>
                        <p style={{ width: '100%', textAlign: 'center', color: colors.brand.font2, fontSize: '20px', marginTop: '85px' }}>Please Try Again</p>

                    </VStack>
                </Box>
            </Center>
        </Box>
    )
}

export default Error;
