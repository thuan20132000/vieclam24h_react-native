import React, { useState,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';
import CommonColors from '../../constants/CommonColors';

import {getOccupations} from '../../utils/serverApi';

const OccupationItem = ({onPress,item,itemSelected,setItemSelected}) => {

    const [isSelected,setIsSelected] = useState(false);

    const _onPress = async () => {
        let select = !isSelected;
        setIsSelected(select);

        if(select){
            setItemSelected([...itemSelected,item]);
        }else{
            let newItemsSelected = itemSelected.filter(e => e.id != item.id);
            setItemSelected(newItemsSelected);
        }
        // onPress(item);
    }

    return (
        <TouchableOpacity style={[styles.item,isSelected&&{backgroundColor:'white'}]}
            onPress={_onPress}
        >
            <Text>
                {item.attributes?.name}
            </Text>
        </TouchableOpacity>
    )
}

const OccupationSelection = ({itemSelected,setItemSelected}) => {

    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);

    const hideDialog = () => setVisible(false);

    const [occupations,setOccupations] = useState([]);


    const _getOccupations = async () => {
        let occupationData = await getOccupations();
        setOccupations(occupationData.data);        
    }

    useEffect(() => {
        _getOccupations();
    }, [])


    return (
        <View>
            <Button onPress={showDialog}>Show Dialog</Button>
            <Portal >
                <Dialog visible={visible} onDismiss={hideDialog} style={{padding:0,backgroundColor:CommonColors.primary}}
                    
                >
                    <Dialog.ScrollArea  >
                        <ScrollView contentContainerStyle={{ paddingHorizontal: 24,minHeight:600 }}>

                            {
                                occupations.map((e,index) => 
                                    <OccupationItem
                                        item={e}
                                        itemSelected={itemSelected}
                                        setItemSelected={setItemSelected}
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
    item:{
        backgroundColor:CommonColors.primary,
        padding:12,
        width:'100%',
        borderBottomColor:'grey',
        borderBottomWidth:0.6
    }
})
