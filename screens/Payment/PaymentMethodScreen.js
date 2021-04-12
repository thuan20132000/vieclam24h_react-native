import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { List } from 'react-native-paper';
import CommonIcons from '../../constants/CommonIcons';

const PaymentMethodScreen = () => {
    return (
        <View>
            <List.AccordionGroup>
                <List.Accordion title="Ví điện tử" id="1">
                    
                </List.Accordion>
                <List.Accordion title="Thẻ tín dụng/Ghi nợ" id="2">
                  
                </List.Accordion>
                <List.Item 
                    title="Thanh toán tiền mặt"
                    left={props => <List.Icon {...props} icon={CommonIcons.cashMultiple} />}
                />
            </List.AccordionGroup>
        </View>
    )
}

export default PaymentMethodScreen

const styles = StyleSheet.create({})
