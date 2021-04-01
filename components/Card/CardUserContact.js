import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import CommonIcons from '../../constants/CommonIcons'
import CommonImages from '../../constants/CommonImages'
import ButtonIcon from '../Button/ButtonIcon'
import RowInformation from '../Row/RowInformation'
import { Button } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors'

const CardUserContact = () => {
    return (
        <View
            style={[
                styles.container,

            ]}
        >
            <View
                style={
                    {
                        display: 'flex',
                        flexDirection: 'row'
                    }
                }
            >

                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'row',

                    }}
                >
                    <Image
                        source={{
                            uri: CommonImages.avatar
                        }}
                        style={{
                            width: 80,
                            height: 80,
                            borderRadius: 40
                        }}
                    />
                </View>
                <View
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                    }}
                >
                    <RowInformation
                        value={'Mas csa'}
                        iconName={CommonIcons.account}
                    />
                    <RowInformation
                        value={'Hoa Minh, Lien Chieu'}
                        iconName={CommonIcons.mapCheck}
                        valueStyle={{
                            fontSize: 12
                        }}


                    />
                </View>
            </View>
            <View
                style={{
                    display:'flex',
                    flexDirection:'row',
                    alignItems:'center',
                    justifyContent:'space-around',
                    marginVertical:12
                }}
            >
                <Button 
                    icon={CommonIcons.phone} 
                    mode="outlined" 
                    onPress={() => console.log('Pressed')}
                    color={'coral'}
                
                >
                    Liên hệ
                </Button>
                <Button 
                    icon={CommonIcons.messages} 
                    mode="outlined" 
                    onPress={() => console.log('Pressed')}
                    color={'coral'}
                >
                    Nhắn tin
                </Button>
              
            </View>
        </View>
    )
}

export default CardUserContact

const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.7,
        shadowRadius: 6.68,

        elevation: 4,
        borderRadius: 8,
        padding: 6
    }
})
