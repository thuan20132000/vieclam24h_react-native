import React from 'react'
import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonColors from '../../../constants/CommonColors'
import CommonIcons from '../../../constants/CommonIcons'

const RowSelection = ({
    label,
    leftIconName = CommonIcons.bookMarker,
    rightIconName = CommonIcons.arrowRightChevron,
    iconSize=22,
    itemPress
}) => {
    return (
        <TouchableOpacity
            onPress={()=>console.warn('ds s sd')}

            style={[
                styles.row,
                {
                    backgroundColor:'gray',
                    padding:12,
                    marginVertical:1
                }
            ]}
        >
            <MaterialCommunityIcon
                name={leftIconName}
                size={iconSize}
                style={{
                    width:'10%'
                }}
            />
            <Text style={{
                width:'80%',
                color:'white',
                fontSize:18
            }}>
                {label}
            </Text>
            <MaterialCommunityIcon
                name={rightIconName}
                size={iconSize}
                style={{
                    width:'10%'

                }}
            />
        </TouchableOpacity>
    )
}

export default RowSelection

const styles = StyleSheet.create({
    row:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between'
    }
})
