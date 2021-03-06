import React, { useEffect, useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { useSelector } from 'react-redux'
import { List, FAB, IconButton, Portal, Modal } from 'react-native-paper';
import CommonIcons from '../../constants/CommonIcons';
import { ScrollView } from 'react-native-gesture-handler';

import { formatCash } from '../../utils/helper';
import CommonColors from '../../constants/CommonColors';
import { groupBy } from 'lodash';
import { _deleteCandidateService, _getCandidateServices } from '../../utils/serverApi';
var _ = require('lodash');
const MyServiceHomeScreen = (props) => {

    const { userInformation } = useSelector(state => state.authentication);

    // console.warn(userInformation.candidate_info);
    const [candidateField, setCandidateField] = useState([]);

    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);
    const [isLoading, setIsLoading] = useState(false);


    const [candidateService, setCandidateService] = useState([]);


    const [serviceData, setServiceData] = useState([]);



    useEffect(() => {

        _getCandidateServices(userInformation.id)
            .then((res) => {
                console.log('ss: ', res.data);
                if (res.status) {
                    if (res.data?.data.length > 0) {
                        var result = _(res.data?.data)
                            .groupBy(x => x.field.id)
                            .map((value, key) => ({ id: key, name: value[0]?.field?.name, service_list: value }))
                            .value()
                        setCandidateService(Object.values(result));
                    }
                }
            })
            .catch((err) => console.log('error: ', err))
            .finally(() => console.log('final : ',console.log(candidateService)))

        props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        }


    }, []);


    useEffect(() => {


        if (serviceData.length > 0) {
            var result = _(serviceData)
                .groupBy(x => x.field.id)
                .map((value, key) => ({ id: key, name: value[0]?.field?.name, service_list: value }))
                .value()
            setCandidateService(Object.values(result));
            // setCandidateField(userInformation?.candidate_info?.fields);
        }


    }, [serviceData]);




    const _onUpdateServiceList = (service, field) => {
        let tempService = candidateService;
        let index = tempService.findIndex(e => e.id == service.field?.id);
        if (index == -1) {
            return;
        }
        if (index >= 0) {
            tempService[index].service_list.push(service)
            setCandidateService(tempService);
            setExpanded(!expanded);

        }
    }



    const _onNavigateToCreateService = () => {
        props.navigation.navigate('MyServiceCreate', {
            myService: (service) => {
                _onUpdateServiceList(service);
            }
        });
    }


    const _onRemoveService = (service, field) => {
        setIsLoading(true);

        _deleteCandidateService(userInformation.id,service)
            .then((res) => {
                console.log('res: ',res);
                if(res.status){
                    let tempService = candidateService;
                    let field_data = tempService.filter(e => e.id === field?.id)[0];
                    let leave_service = field_data.service_list?.filter(e => e.id != service.id);
                    tempService.filter(e => {
                        if (e.id == field_data.id) {
                            e.service_list = leave_service;
                            return tempService;
                        }
                    });
                    setCandidateService(tempService);
                    setExpanded(!expanded);
                }
            })
            .catch((err) => console.log('error: ',err))
            .finally(() => {
                console.log('final');
                setIsLoading(false);
            })

        // setTimeout(() => {



        //     try {


        //         let tempService = candidateService;
        //         let field_data = tempService.filter(e => e.id === field?.id)[0];
        //         let leave_service = field_data.service_list?.filter(e => e.id != service.id);
        //         tempService.filter(e => {
        //             if (e.id == field_data.id) {
        //                 e.service_list = leave_service;
        //                 return tempService;
        //             }
        //         });
        //         setCandidateService(tempService);
        //         setExpanded(!expanded);
        //     } catch (error) {
        //         console.log('Error: ', error);
        //     }
        //     setIsLoading(false);
        // }, 1200);

    }

    return (
        <View
            style={{
                display: 'flex',
                flex: 1
            }}
        >
            <Portal>
                <Modal
                    visible={isLoading}
                    contentContainerStyle={{
                        backgroundColor: 'white',
                        width: 120,
                        alignSelf: 'center',
                        height: 120,
                        borderRadius: 4
                    }}
                    dismissable={false}
                >
                    <ActivityIndicator
                        size={'large'}
                        color={CommonColors.btnSubmit}
                    />
                </Modal>
            </Portal>

            <FAB
                style={styles.fab}
                small
                icon="plus"
                onPress={_onNavigateToCreateService}
            />


            <ScrollView>


                <List.Section >
                    {
                        candidateService.length > 0 &&
                        candidateService.map((field, index) =>
                            <List.Accordion key={index.toString()}
                                title={field.name}
                                left={props => <List.Icon {...props} icon={CommonIcons.bell} />}

                                titleNumberOfLines={2}
                                onPress={setExpanded}
                                expanded={expanded}


                            >
                                {
                                    field?.service_list?.map((e, index) =>
                                        <List.Item key={index.toString()}

                                            title={e.name}
                                            description={`${formatCash(e.price)} vnd`}
                                            descriptionStyle={{ color: 'red' }}
                                            left={props =>
                                                <IconButton
                                                    icon={CommonIcons.removeTrash}
                                                    onPress={() => _onRemoveService(e, field)}
                                                    color={'red'}
                                                />
                                            }
                                        />
                                    )
                                }
                            </List.Accordion>

                        )
                    }

                </List.Section>
            </ScrollView>

        </View>
    )
}

export default MyServiceHomeScreen

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
        zIndex: 999
    },
})
