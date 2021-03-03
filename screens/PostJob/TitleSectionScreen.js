import React,{useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TextInput } from 'react-native-gesture-handler'
import CommonColors from '../../constants/CommonColors'
import BottomNavigation from './components/BottomNavigation'



const TitleSectionScreen = (props) => {

    const {data} = props.route?.params;
    
    const [title, setTitle] = useState('');
    const _onNextSection = () => {

        props.navigation.navigate('DescriptionSection',{
            data:{
                ...data,
                title:title
            }
        })

    }


    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',

            }}
        >
            <ScrollView>
                <View style={[styles.group]}>

                    <Text style={[styles.textLabel]}>Tiêu đề công việc</Text>
                    <TextInput
                        style={[styles.textinput]}
                        placeholder={'Tiêu đề công việc'}
                        onChangeText={(text) => setTitle(text)}
                    />

                </View>

                <View style={[
                    styles.group,
                    {
                        borderWidth:1,
                        borderColor:'blue',
                        height:100,
                        margin:4,
                        padding:6,
                        backgroundColor:CommonColors.secondary
                    }
                ]} >
                    <Text style={{color:'grey'}}>Ví dụ: Cần người sửa xe máy tại nhà.</Text>

                    <Text style={{color:'grey',fontWeight:'700'}}>Nên viết tiếng Việt có dấu.</Text>
                </View>
            </ScrollView>
            <BottomNavigation
                onBackPress={() => props.navigation.navigate('TitleSection')}
                onNextPress={_onNextSection}
                backTitle={'Trở lại'}
                nextTitle={'Tiếp tục'}
            />
        </View>
    )
}

export default TitleSectionScreen

const styles = StyleSheet.create({
    group: {
        marginVertical: 6,
        marginHorizontal:4
    },
    textLabel:{
        fontSize:16,
        fontWeight:'700',
        marginVertical:4
    },
    textinput: {
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        paddingLeft:8
    }
})
