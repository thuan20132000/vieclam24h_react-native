import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

const ReviewRegisterScreen = (props) => {

    React.useLayoutEffect(() => {
        props.navigation.setOptions({
            title: 'Xác nhận thành công',
            headerLeft:null,


        });

    }, []);


    const _onFinishReview = () => {
        props.navigation.reset({
            index: 1,
            routes: [
              { name: 'HomeStack' },
             
            ],
          })
    }
    



    return (
        <View
            style={[styles.container]}
        >
            <View style={{
                alignItems: 'center'
            }}>
                <Text style={{
                    fontSize:18,
                    fontWeight:'700'
                }}>
                    Chúc mừng bạn đã đăng ký thành công.
                </Text>
                <TouchableOpacity
                    
                    style={{
                        backgroundColor:'coral',
                        borderRadius:12,
                        paddingHorizontal:22,
                        paddingVertical:8,
                        marginTop:32
                    }}
                    onPress={_onFinishReview}
                >
                    <Text style={{
                        fontSize:18,
                        fontWeight:'700',
                        color:'white'
                    }}>
                        Trở về
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ReviewRegisterScreen

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center'
    },
    row: {
        display: 'flex',
        flexDirection: 'row',
    },
})
