import React, { useState } from 'react'
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


const CandidateServiceListScreen = (props) => {

    const dispatch = useDispatch();
    const [expanded, setExpanded] = React.useState(true);

    const handlePress = () => setExpanded(!expanded);

    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedServices, setSelectedService] = useState([]);
    const [serviceList, setServiceList] = useState(
        [
            {
                id: 1,
                title: "Điện dân dụng",
                service_price: [
                    {
                        id: 11,
                        title: "Lắp đặt điện trong nhà",
                        price: 220000,
                        parent: 1,
                        checked: false,
                    },
                    {
                        id: 12,
                        title: "Lắp đặt thiết bị điện",
                        price: 320000,
                        parent: 1,
                        checked: false,


                    }
                ]
            },
            {
                id: 2,
                title: "Điện lạnh",
                service_price: [
                    {
                        id: 21,
                        title: "Bảo trì máy gặt",
                        price: 120000,
                        parent: 2,
                        checked: false,


                    },
                    {
                        id: 22,
                        title: "Vệ sinh máy lạnh",
                        price: 180000,
                        parent: 2,
                        checked: false,


                    }
                ]
            },
        ]
    );



    const _onSelectService = async (service) => {

        let checkExists = isExistInArray(service, selectedServices);

        if (checkExists) {
            let newSelectedFields = selectedServices.filter(e => e.id != service.id);
            setSelectedService(newSelectedFields);
            if (totalPrice > 0) {
                setTotalPrice(totalPrice - service.price);

            }
        } else {
            setTotalPrice(totalPrice + service.price);
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
                        serviceList.map((services, index) =>

                            <List.Accordion key={index.toString()}
                                title={services.title}
                                left={props => <List.Icon {...props} icon={CommonIcons.tagPrice} />}>



                                {
                                    services?.service_price?.map((e, index) =>
                                        <List.Item key={index.toString()}
                                            title={e.title}
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
