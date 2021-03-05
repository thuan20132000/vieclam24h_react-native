import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import CommonColors from '../../constants/CommonColors'
import { getCategory } from '../../utils/serverApi'
import BottomNavigation from './components/BottomNavigation'
import RowSelection from './components/RowSelection'
import { useSelector, useDispatch } from 'react-redux'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'

import * as jobActions from '../../store/actions/jobActions';
import CommonIcons from '../../constants/CommonIcons'

import { List, Checkbox } from 'react-native-paper';

const CategoryRegisterScreen = (props) => {

    const dispatch = useDispatch();


    const access_token = useSelector(state => state.authentication.access_token)

    const [categories, setCategories] = useState([]);
    const getCategoryList = async () => {

        let categories = await getCategory(access_token);
        if (categories.status) {
            setCategories(categories.data);
        }

    }

    useEffect(() => {

        getCategoryList()

        props.navigation.setOptions({
            title: 'Lựa chọn lĩnh vực',
            headerLeft: () =>
                <MaterialCommunityIcon
                    name={CommonIcons.arrowLeft}
                    size={24}
                    onPress={() => props.navigation.goBack()}
                    style={{
                        marginHorizontal: 22
                    }}
                />
        })

    }, []);


    const _onSelectionPress = async (e) => {

        let data = {
            category: e
        }

        dispatch(jobActions.updateJob(data))


        props.navigation.navigate('FieldSection', {
            data: {
                category: e
            },
        })


    }

    const [selectedFields, setSelectedField] = useState([]);

    const _onCheckFieldExist = (field) => {

        let findRes = selectedFields.findIndex(e => e.id == field.id);
        if (findRes === -1) {
            return false;
        }
        return true;
    }

    const _onSelectFields = (field) => {
        let isExists = _onCheckFieldExist(field);
        if (isExists) {
            let newSelectedFields = selectedFields.filter(e => e.id != field.id);
            setSelectedField(newSelectedFields);
            return;
        } else {
            setSelectedField([...selectedFields, field]);
            return;
        }

    }

    const isSelected = (field) => {

        let isCheck = selectedFields.findIndex(e => e.id === field.id);
        if (isCheck === -1) {
            return 'unchecked'
        }
        return 'checked'
    }

    const navigateNext = (section) => {
        props.navigation.navigate(section)
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
                <List.AccordionGroup>

                    {
                        categories.length > 0 &&
                        categories.map((e, index) =>

                            <List.Accordion
                                key={index.toString()}
                                title={e.name}
                                id={e.id}
                                style={{
                                    backgroundColor: 'ghostwhite',
                                  
                                }}
                                titleStyle={{
                                    fontSize: 18,
                                    fontWeight: '700'
                                }}
                            >
                                {
                                    e.fields?.length > 0
                                    && e.fields.map((e, index) =>
                                        <List.Item
                                            key={index.toString()}
                                            title={e.name}
                                            style={{
                                                paddingLeft: 48
                                            }}
                                            titleStyle={{
                                                fontSize:16,
                                                fontWeight:'700',
                                                color:'coral'
                                            }}
                                            onPress={() => _onSelectFields(e)}
                                            right={() =>
                                                <View
                                                    style={{ marginHorizontal: 22 }}
                                                >
                                                    <Checkbox
                                                        color={'deepskyblue'}
                                                        status={isSelected(e)}
                                                        onPress={() => _onSelectFields(e)}
                                                    />
                                                </View>
                                            }
                                        />

                                    )
                                }
                            </List.Accordion>
                        )
                    }
                </List.AccordionGroup>
            </ScrollView>

            <BottomNavigation
                onNextPress={() => navigateNext('LocationRegister')}
                nextTitle={'Tiếp tục'}
               
            />
        </View>
    )
}

export default CategoryRegisterScreen

const styles = StyleSheet.create({
    row: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
