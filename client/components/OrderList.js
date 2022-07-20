//React
import React, { useEffect, useState } from 'react';
const axios = require('axios');
import OrderCard from './OrderCard';

//MUI
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/material';


//theme from feed container
const useStyles = makeStyles((theme) => ({
  body: {
    height: "100vh",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    // backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.5)), url(${Cooking})`,
    backgroundSize: "cover",
    backgroundRepeat: "none",
    backgroundColor: "transparent",
    padding: "0px 20px",
  },
}));


const OrderList = (props) => {
    const classes = useStyles();
    const [orderData, setOrderdata] = useState([]);  
    console.log('orderList data ->', orderData);
    //on load, fetch to backend with user_id and user_type to get all orders
    const {userType, userId} = props;

    // console.log("OrderList props ->", props);

    // console.log('userId ->', userId);

    useEffect(() => {
      const url = userType == 'seller' ? `/api/orderSales/${userId}` : `/api/orders/${userId}`;
      axios.get(url)
      .then(res => {
        console.log(res.data);
        setOrderdata(res.data);
      })
    }, []);

    const fulfilled = orderData.length > 0 ? orderData.filter( obj => {
      return obj.fulfilled == true
    }) : [];

    const ffOrders = [];
    for (let i = 0; i < fulfilled.length; i++) {
      ffOrders.push(<OrderCard key={i} dishes={fulfilled[i].dishes} order_id={fulfilled[i].pk_order_id} order_date={fulfilled[i].order_date.slice(0,10)} status={fulfilled[i].fulfilled}/>)
    }

    const unfulfilled = orderData.length > 0 ? orderData.filter( obj => {
      return obj.fulfilled == false
    }) : [];

    const uffOrders = [];
    for (let i = 0; i < unfulfilled.length; i++) {
      ffOrders.push(<OrderCard key={i} dishes={unfulfilled[i].dishes} order_id={unfulfilled[i].pk_order_id} order_date={unfulfilled[i].order_date.slice(0,10)} status={unfulfilled[i].fulfilled} />)
    }

    console.log('current order,', fulfilled);


    return (
      <div className={classes.body}>
        <Box sx={{width:'80%'}}>
          <h3> Current Orders </h3>
          <div>
            {ffOrders}
          </div>
        </Box>

        <Box sx={{width:'80%'}}>
          <h3> Past Orders </h3>
          <div>
            {uffOrders}
          </div>
        </Box>
      </div>
    )
};

export default OrderList;
