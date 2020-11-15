import React, { useRef } from 'react'
import { Dimensions, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, IconButton } from 'react-native-paper'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'
import RBSheet from "react-native-raw-bottom-sheet";
import CollaboratorInformation from '../components/BottomSheet/CollaboratorInformation'


const JobInidicatorItem = () => {


    const _refCollaboratorInformation = useRef(); 

    const _openCollaboratorInformation = () => {
        _refCollaboratorInformation.current.open();
    }
    return (
        <View
            style={styles.jobIndicatorItem}
        >
            <Avatar.Image size={64} source={require('../assets/images/avatar1.jpg')} />
            <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <Text>Name</Text>
                <Text>Giá đề nghị : 320000</Text>
                <Text>Đánh giá: 5</Text>
                <Text>Mô tả: dvsd dscds</Text>

            </View>
            <View>

                <IconButton
                    icon={CommonIcons.messages}
                    color={CommonColors.primary}
                    size={26}
                    onPress={() => console.log('Pressed')}
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
            >
                <CollaboratorInformation/>
            </RBSheet>
        </View>
    )
}

const JobCollaboratorScreen = () => {

    const jobIndicatorData = Array(12).fill({});

    return (
        <ScrollView>
            {
                jobIndicatorData.map((e, index) =>
                    <JobInidicatorItem

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
