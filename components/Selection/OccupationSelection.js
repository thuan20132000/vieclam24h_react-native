import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';

import { getOccupations } from '../../utils/serverApi';

const OccupationItem = ({ isSelectOne = false, item, itemSelected, setItemSelected, setVisible }) => {

    const [isSelected, setIsSelected] = useState(false);

    const _onPress = async () => {
        let select = !isSelected;
        setIsSelected(select);
        if (isSelectOne) {
            console.warn('ds');
            setItemSelected(item);
            setVisible(false);
            return;
        }
        if (typeof itemSelected == "object") {
            if (select) {
                setItemSelected([...itemSelected, item]);
            } else {
                let newItemsSelected = itemSelected.filter(e => e.id != item.id);
                setItemSelected(newItemsSelected);
            }
        }




        // onPress(item);
    }

    return (
        <TouchableOpacity style={[styles.item, isSelected && { backgroundColor: 'white' }]}
            onPress={_onPress}
        >
            <Text>
                {item.attributes?.name}
            </Text>
        </TouchableOpacity>
    )
}

const OccupationSelection = ({ title = "Show Dialog", itemSelected, setItemSelected, isSelectOne = false }) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [occupations, setOccupations] = useState([]);


    const _getOccupations = async () => {
        let occupationData = await getOccupations();
        setOccupations(occupationData.data);
    }

    useEffect(() => {
        _getOccupations();
    }, [])


    return (
        <View style={[styles.container, {}]}>
            <Button onPress={showDialog}>{title}</Button>
            <Portal >
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.dialogWrap}

                >
                    <Dialog.ScrollArea  >
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, minHeight: 600 }}>

                            {
                                occupations.map((e, index) =>
                                    <OccupationItem
                                        key={index.toString()}
                                        item={e}
                                        itemSelected={itemSelected}
                                        setItemSelected={setItemSelected}
                                        isSelectOne={isSelectOne}
                                        setVisible={setVisible}
                                    />
                                )
                            }

                        </ScrollView>
                    </Dialog.ScrollArea>

                </Dialog>
            </Portal>
        </View>

    )
}

export default OccupationSelection

const styles = StyleSheet.create({
    container: {
        borderRadius: 42,
        backgroundColor: 'white',
        marginHorizontal: 16,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    dialogWrap:{
        backgroundColor:'aliceblue',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        borderRadius:26

    },
    item: {
        backgroundColor:'aliceblue',
        padding: 12,
        width: '100%',
        borderBottomColor: 'grey',
        borderBottomWidth: 0.6
    }
})
