import React, { useRef, useEffect, useState } from 'react'
import { Dimensions, Linking, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { ActivityIndicator, Avatar, Chip, IconButton } from 'react-native-paper'
import CommonColors from '../constants/CommonColors'
import CommonIcons from '../constants/CommonIcons'
import RBSheet from "react-native-raw-bottom-sheet";
import CollaboratorInformation from '../components/BottomSheet/CollaboratorInformation'
import {selectCandidate} from '../utils/serverApi';




const JobInidicatorItem = ({ item ,job_id}) => {


    const _refCollaboratorInformation = useRef();

    const _openCollaboratorInformation = () => {
        _refCollaboratorInformation.current.open();
    }

    const _onCallPhoneNumber = () => {
        Linking.openURL(`tel:${item?.phonenumber}`)
    }


    const [isLoading,setIsLoading] = useState(false);
    const _onSelectCandidate = async () => {
        let selectRes = await selectCandidate(job_id,item.job_collaborator_id);
        // selectCandidate()
    }

    // useEffect(() => {
    //     console.warn(item);
    // }, [])
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
                <Chip>{item?.job_collaborator_status == 1?"PENDING":"APPROVED"}</Chip>

                <TouchableOpacity style={styles.buttonSubmit}
                    disabled={isLoading?true:false}
                    onPress={_onSelectCandidate}
                >
                    {
                        isLoading ?
                        <ActivityIndicator
                            size={'small'}
                            color={'blue'}
                        />:
                        <Text style={{color:'white',fontSize:16,fontWeight:'500'}}>Chọn ứng viên</Text>

                    }
                </TouchableOpacity>

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
    const [jobId,setJobId] = useState();

    useEffect(() => {
        let jobCandidates = props.route.params?.candidates;
        let job_id = props.route.params?.job_id; 
        if (jobCandidates) {
            setJobCandidates(props.route.params?.candidates);
        }
        if(job_id){
            setJobId(job_id);
        }


        props.navigation.setOptions({
            title: 'Ứng viên ứng tuyển công việc'
        })
    }, []);



    return (
        <ScrollView>
            {   (jobCandidates && jobId) &&
                jobCandidates.map((e, index) =>
                    <JobInidicatorItem
                        key={index}
                        item={e}
                        job_id={jobId}
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
    },

    buttonSubmit: {
        marginVertical: 16, 
        backgroundColor: CommonColors.btnSubmit,
        padding:12,
        borderRadius:16
    }
})
