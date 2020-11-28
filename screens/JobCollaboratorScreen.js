import React, { useRef, useEffect, useState } from 'react'
import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, IconButton } from 'react-native-paper'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'
import RBSheet from "react-native-raw-bottom-sheet";
import CollaboratorInformation from '../components/BottomSheet/CollaboratorInformation'


const JobInidicatorItem = ({ item }) => {


    const _refCollaboratorInformation = useRef();

    const _openCollaboratorInformation = () => {
        _refCollaboratorInformation.current.open();
    }

    const _onCallPhoneNumber = () => {
        Linking.openURL(`tel:${item?.phonenumber}`)
    }

    useEffect(() => {
       // console.warn(item);
    }, [])
    return (
        <View
            style={styles.jobIndicatorItem}
        >
            <Avatar.Image size={64} source={require('../assets/images/avatar1.jpg')} />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text>{item?.name}</Text>
                <Text>Giá nhận : {item?.expected_price}</Text>
                <Text>Đánh giá: 5</Text>
                <Text>Mô tả: {item?.description}</Text>

            </View>
            <View>

                <IconButton
                    icon={CommonIcons.messages}
                    color={CommonColors.primary}
                    size={26}
                    onPress={() => console.log('Pressed')}
                />
                <IconButton
                    icon={CommonIcons.phone}
                    color={CommonColors.primary}
                    size={26}
                    onPress={_onCallPhoneNumber}
                />
                <IconButton
                    icon={CommonIcons.account}
                    color={CommonColors.primary}
                    size={26}
                    onPress={_openCollaboratorInformation}
                />

            </View>


            {/*  */}
            <RBSheet
                ref={_refCollaboratorInformation}
                height={Dimensions.get('screen').height}
                closeOnDragDown={true}
                closeOnPressMask={false}
                customStyles={{
                    wrapper: {
                        backgroundColor: "transparent"
                    },
                    draggableIcon: {
                        backgroundColor: "#000"
                    }
                }}
                dragFromTopOnly={true}

            >
                <CollaboratorInformation
                    _refCollaboratorInformation={_refCollaboratorInformation}
                />
            </RBSheet>
        </View>
    )
}



const JobCollaboratorScreen = (props) => {

    const jobIndicatorData = Array(12).fill({});
    const [jobCandidates, setJobCandidates] = useState([]);

    useEffect(() => {
        // console.warn(props);
        if (props.route.params?.candidates) {
            setJobCandidates(props.route.params?.candidates);
        }

        props.navigation.setOptions({
            title:'Ứng viên công việc'
        })
    }, [])


    return (
        <ScrollView>
            {
                jobCandidates.map((e, index) =>
                    <JobInidicatorItem
                        key={index}
                        item={e}
                    />
                )
            }
        </ScrollView>
    )
}

export default JobCollaboratorScreen

const styles = StyleSheet.create({
    jobIndicatorItem: {
        padding: 12,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    }
})
