import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View,Image } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import CommonImages from '../../constants/CommonImages'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

import CommonIcons from '../../constants/CommonIcons';
import CommonColors from '../../constants/CommonColors';

const CardUserMessageItem = ({title,subTitle,datetime,imageUrl,customStyle,onItemPress,socketResponseData}) => {
    
    
   // console.warn(item.conversation_id);
    
    const [messageRealtime,setMessageRealtime] = useState('');
   useEffect(() => {
       setMessageRealtime(socketResponseData);
   }, [socketResponseData])

    return (
        <TouchableOpacity style={[styles.cardContainer,customStyle]}
            onPress={onItemPress}
        >
                <Image
                    style={{
                        width:60,
                        height:60,
                        flex:1,
                        borderRadius:30
                    }}
                    source={{
                        uri: imageUrl || CommonImages.avatar
                    }}
                />
                <View style={[styles.cardBody]}>
                    <Text style={[styles.textTitle,]}>
                        {title}
                    </Text>
                    <Text 
                        style={[styles.textSubTitle]}
                        numberOfLines={2}    
                    >
                        {messageRealtime?.message || subTitle}
                    </Text>
                    <Text style={[styles.textDate]}>
                       {datetime}
                    </Text>
                </View>
                <View style={[styles.status]}>
                    <MaterialCommunityIcons
                        name={CommonIcons.phone}
                        size={18}
                        color={CommonColors.primary}
                    />
                </View>
        </TouchableOpacity>
    )
}

export default CardUserMessageItem

const styles = StyleSheet.create({
    cardContainer:{
        display:'flex',
        flexDirection:'row',
        alignItems:'center'
    },
    cardBody:{
        display:'flex',
        flexDirection:'column',
        marginHorizontal:14,
        flex:6
    },
    textTitle:{
        color:'black',
        fontSize:16
    },
    textSubTitle:{
        color:'grey',
        fontSize:14,
        
    },
    textDate:{
        fontSize:12,
        color:'grey',
        fontStyle:'italic'
    },
    status:{
        flex:1,
        marginHorizontal:4,
        alignItems:'center'
    }
})
