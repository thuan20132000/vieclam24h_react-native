import React from 'react'
import { StyleSheet, Text, View ,Image,TouchableOpacity} from 'react-native'
import { Paragraph, Dialog, Portal } from 'react-native-paper';

import {useDispatch} from 'react-redux';

import * as languageActions from '../../store/actions/languageActions';

import {Translate} from '../../locales/index';

const MultipleLanguage = ({
    visible=false,
    setVisible
}) => {

    const dispatch = useDispatch();

    const _onSelectLanguage = (language) => {
        
        dispatch(languageActions.setLanguage(language));
        Translate.setLanguage(language);

        if(typeof setVisible === 'function'){
            setVisible(false);
        }


    }

    return (
        <Portal>
            <Dialog visible={visible} dismissable={false} >
                <Dialog.Content>
                    <View
                        style={{
                            display:'flex',
                            flexDirection:'row',
                            justifyContent:'space-around'
                        }}
                    >
                        <TouchableOpacity
                            onPress={()=>_onSelectLanguage('vi')}
                        >
                            <Image
                                source={
                                    require('../../assets/images/vn_flag.png')
                                }

                                style={{
                                    width:120,
                                    height:80
                                }}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity
                            onPress={()=>_onSelectLanguage('en')}
                        >
                            <Image
                                source={
                                    require('../../assets/images/en_flag.png')
                                }

                                style={{
                                    width:120,
                                    height:80
                                }}
                            />
                        </TouchableOpacity>
                    </View>
                </Dialog.Content>
            </Dialog>
        </Portal>
    )
}

export default MultipleLanguage

const styles = StyleSheet.create({})
