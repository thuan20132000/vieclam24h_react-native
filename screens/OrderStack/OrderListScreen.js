import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useSelector } from 'react-redux'
import { formatCash } from '../../utils/helper'
import { _getCandidateBooking } from '../../utils/serverApi'
import OrderItem from './components/OrderItem'

const OrderListScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    const [orderList, setOrderList] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        _getCandidateBooking(userInformation.id)
            .then((res) => {
                console.log('res: ', res.data.data.length);
                if (res.status) {
                    setOrderList(res.data?.data);
                }
            })
            .catch((err) => console.log('error: ', err))
            .finally(() => {
                console.log('final ');
                setIsLoading(false);
                console.log('order list: ', orderList.length)
            })
    }, []);



    const _onOrderPress = (booking) => {
        console.warn('press');
        props.navigation.navigate('OrderDetail',{
            booking:booking
        });
    }

    return (
        <ScrollView>
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                }}
            >

                {
                    orderList.length > 0
                    && orderList?.map((order, index) =>
                        <OrderItem
                            clientName={order.user.username}
                            totalPrice={`${formatCash(order.total_price)} vnđ`}
                            created_at={order.created_at}
                            onItemPress={()=>_onOrderPress(order)}
                            status={order.status}
                        />

                    )
                }
            </View>
        </ScrollView>
    )
}

export default OrderListScreen

const styles = StyleSheet.create({})
