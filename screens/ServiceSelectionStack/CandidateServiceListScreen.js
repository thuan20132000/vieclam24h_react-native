import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Checkbox, List } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';
import CommonIcons from '../../constants/CommonIcons';
import { formatCash, isExistInArray } from '../../utils/helper';
import RowSelection from '../PostJob/components/RowSelection';
import BottomNavigation from './components/BottomNavigation';
import * as cartActions from '../../store/actions/cartActions';
import {useDispatch} from 'react-redux';
import { _getCandidateServices } from '../../utils/serverApi';

var _ = require('lodash');

const CandidateServiceListScreen = (props) => {

    const {candidate} = props.route?.params;
    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedServices, setSelectedService] = useState([]);
    const [candidateService, setCandidateService] = useState(
        [
            // {
            //     id: 1,
            //     title: "Điện dân dụng",
            //     service_price: [
            //         {
            //             id: 11,
            //             title: "Lắp đặt điện trong nhà",
            //             price: 220000,
            //             parent: 1,
            //             checked: false,
            //         },
            //         {
            //             id: 12,
            //             title: "Lắp đặt thiết bị điện",
            //             price: 320000,
            //             parent: 1,
            //             checked: false,


            //         }
            //     ]
            // },
            // {
            //     id: 2,
            //     title: "Điện lạnh",
            //     service_price: [
            //         {
            //             id: 21,
            //             title: "Bảo trì máy gặt",
            //             price: 120000,
            //             parent: 2,
            //             checked: false,


            //         },
            //         {
            //             id: 22,
            //             title: "Vệ sinh máy lạnh",
            //             price: 180000,
            //             parent: 2,
            //             checked: false,


            //         }
            //     ]
            // },
        ]
    );


    useEffect(() => {
        console.log('candidate: ',candidate.id);

        _getCandidateServices(candidate?.id)
            .then((res)=> {
                console.log(res);
                if(res.status){
                    if (res.data?.data.length > 0) {
                        var result = _(res.data?.data)
                            .groupBy(x => x.field.id)
                            .map((value, key) => ({ id: key, name: value[0]?.field?.name, service_list: value }))
                            .value()
                        console.log('res: ',result);
                        setCandidateService(Object.values(result));
                    }
                }
            })
            .catch((err) => console.log('error: ',err))
            .finally(() => {
                console.log('final')
            })

    }, [])



    const _onSelectService = async (service) => {
        let service_price = Number(service.price);
        let checkExists = isExistInArray(service, selectedServices);

        if (checkExists) {
            let newSelectedFields = selectedServices.filter(e => e.id != service.id);
            setSelectedService(newSelectedFields);
            
            if (totalPrice > 0) {
                setTotalPrice(totalPrice - service_price);

            }
        } else {
            setTotalPrice(totalPrice + service_price);
            setSelectedService([...selectedServices, service]);
        }






    }

    const isSelected = (field) => {
        let isCheck = selectedServices.findIndex(e => e.id === field.id);
        if (isCheck === -1) {
            return 'unchecked'
        }
        return 'checked'
    }


    React.useEffect(() => {




        props.navigation.dangerouslyGetParent().setOptions({
            tabBarVisible: false
        });

        return () => {
            props.navigation.dangerouslyGetParent().setOptions({
                tabBarVisible: true
            });
        }
    }, []);



    const _onNavigateToServiceReview  = async () => {

        // console.warn('data: ',selectedServices);
        dispatch(cartActions.addService(selectedServices,totalPrice,selectedServices.length));

        props.navigation.navigate('SelectedServiceReview')
    }


    return (
        <View
            style={{
                display: 'flex',
                flex: 1,
                backgroundColor: 'white',
                justifyContent: 'space-between'
            }}
        >
            <ScrollView>
                <List.Section >



                    {
                        candidateService.map((field, index) =>

                            <List.Accordion key={index.toString()}
                                title={field.name}
                                left={props => <List.Icon {...props} icon={CommonIcons.tagPrice} />}>



                                {
                                    field?.service_list?.map((e, index) =>
                                        <List.Item key={index.toString()}
                                            title={e.name}
                                            style={{
                                                paddingLeft: 48
                                            }}
                                            description={formatCash(e.price)}
                                            onPress={() => _onSelectService(e)}

                                            right={() =>
                                                <View
                                                    style={{ marginHorizontal: 22 }}
                                                >
                                                    <Checkbox
                                                        color={'deepskyblue'}
                                                        status={isSelected(e)}

                                                    />
                                                </View>
                                            }
                                        />

                                    )
                                }

                            </List.Accordion>


                        )
                    }

                </List.Section>
            </ScrollView>



            <BottomNavigation

                nextTitle={'Tiếp Tục'}
                nextButtonStyle={{
                    backgroundColor: CommonColors.btnSubmit
                }}

                childrenTop={
                    <View>
                        <Text
                            style={{
                                fontWeight:'700'
                            }}
                        >
                            Thành tiền: <Text style={{color:'red'}} >{formatCash(totalPrice)}</Text>
                        </Text>
                    </View>
                }

                onNextPress={_onNavigateToServiceReview}
                containerStyle={{
                    borderTopLeftRadius:22,
                    borderTopRightRadius:22,
                    shadowColor: "black",
                    shadowOffset: {
                        width: 4,
                        height: 5,
                    },
                    shadowOpacity: 0.65,
                    shadowRadius: 1.84,
            
                    elevation: 11,

                }}
            />
        </View>
    )
}

export default CandidateServiceListScreen

const styles = StyleSheet.create({})
