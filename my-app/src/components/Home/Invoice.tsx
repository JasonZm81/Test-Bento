import React from 'react';
import styled from 'styled-components';
import NavBar from '../Home/NavBar.tsx';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Invoice = () => {
    const [activeButton, setActiveButton] = useState('');
    const navigate = useNavigate();

    return (
        <Container>
            <NavBar 
                activeButton={activeButton} 
                setActiveButton={setActiveButton} 
                navigate={navigate} 
            />
            <OrderHistory>
                <OrderHeader>ORDER HISTORY</OrderHeader>
                <Tabs>
                    <Tab active>All</Tab>
                    <Tab>On line</Tab>
                    <Tab>In store</Tab>
                </Tabs>
                <OrderCard>
                    <StoreName>CHAGEE KIMBERLY STREET</StoreName>
                    <OrderDate>30/11/2024 14:01:40</OrderDate>
                    <OrderDetails>
                        <Image src="image_url" alt="Tea" />
                        <Details>
                            <TeaName>TIE GUAN YIN MILK TEA 清沏观音</TeaName>
                            <Description>LAR, NORMAL, NORMAL</Description>
                            <Price>RM 0.00 x 1</Price>
                        </Details>
                        <Status>Completed</Status>
                    </OrderDetails>
                    <ContactButton>CONTACT US</ContactButton>
                </OrderCard>
                {/* Repeat OrderCard for other orders */}
            </OrderHistory>
        </Container>
    );
};

export default Invoice;

// Styled Components
const Container = styled.div`
    padding: 20px;
    font-family: Arial, sans-serif;
`;

const OrderHistory = styled.div`
    margin-top: 20px;
`;

const OrderHeader = styled.h2`
    font-size: 18px;
    color: #ccc;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const Tab = styled.div<{ active?: boolean }>`
    margin-right: 20px;
    padding-bottom: 5px;
    border-bottom: ${({ active }) => (active ? '2px solid red' : 'none')};
    cursor: pointer;
`;

const OrderCard = styled.div`
    border: 1px solid #eee;
    padding: 15px;
    margin-bottom: 20px;
    border-radius: 5px;
`;

const StoreName = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const OrderDate = styled.div`
    font-size: 12px;
    color: #888;
    margin-bottom: 10px;
`;

const OrderDetails = styled.div`
    display: flex;
    align-items: center;
`;

const Image = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 10px;
`;

const Details = styled.div`
    flex-grow: 1;
`;

const TeaName = styled.div`
    font-weight: bold;
`;

const Description = styled.div`
    font-size: 12px;
    color: #888;
`;

const Price = styled.div`
    font-size: 14px;
    margin-top: 5px;
`;

const Status = styled.div`
    color: green;
    font-weight: bold;
`;

const ContactButton = styled.button`
    margin-top: 10px;
    padding: 10px;
    border: none;
    background-color: #f0f0f0;
    cursor: pointer;
    border-radius: 5px;
`;
