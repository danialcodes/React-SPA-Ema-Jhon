import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import useAuth from '../../hooks/useAuth';

const Orders = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState([]);
    const liveUrl = "https://possessed-spell-91387.herokuapp.com";
    const localUrl = "http://localhost:5000";
    axios.defaults.headers.common['Authorization'] = `Barer ${localStorage.getItem('idToken')}`;
    const history = useHistory();
    useEffect(() => {
        axios.get(`${localUrl}/orders?email=${user.email}`)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    setOrders(res.data);
                }


            }).catch(err => {
                history.push("/login");
            });
    }, []);
    console.log(orders);
    return (
        <div>
            <h2>This is orders page</h2>
            {orders.length > 0 && <h3>You have placed {orders.length} orders</h3>
            }
            <ul>
                {
                    orders.map(order => <li key={order._id}>{order.name} : {order.email}</li>)
                }
            </ul>
        </div>
    );
};

export default Orders;