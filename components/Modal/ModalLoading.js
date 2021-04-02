import React from 'react'
import { ActivityIndicator, Modal, StyleSheet, Text, View } from 'react-native'

const ModalLoading = ({
    isVisible=false,
    transparent=true
}) => {

    return (
        <Modal
            animationType="slide"
            transparent={transparent}
            visible={isVisible}
           
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <ActivityIndicator
                        size={'large'}
                        color={'coral'}
                    />
                </View>
            </View>
        </Modal>
    )
}

export default ModalLoading

const styles = StyleSheet.create({
    centeredView:{
        display:'flex',
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'black',
        opacity:0.7
    }
})
