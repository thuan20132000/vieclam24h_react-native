import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import RowInformation from '../Row/RowInformation';
import CommonIcons from '../../constants/CommonIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { formatDateTime } from '../../utils/helper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import serverConfig from '../../serverConfig';


const JobItemCardBase = ({
    jobTitle,
    jobPrice,
    jobExpectedPrice,
    jobAddress,
    children,
    canRemove = false,
    containerStyle,
    onPressOpen,
    onPressDelete,
    pressDisable=false
}) => {
    return (
        <View
            style={[
                styles.container,
                {
                    display: 'flex',
                    flexDirection: 'row'
                },
                containerStyle

            ]}
        >
            <View
                style={{
                    display: 'flex',
                    flex: 8
                }}
            >

                <TouchableOpacity
                    onPress={onPressOpen}
                    disabled={pressDisable}

                >
                    <RowInformation
                        iconName={CommonIcons.account}
                        value={jobTitle}
                    />
                    <View style={{
                        display: 'flex',
                        flexDirection: 'row'
                    }}>
                        <RowInformation
                            iconName={CommonIcons.tagPrice}
                            label={jobPrice}
                            labelStyle={{
                                color: 'red',
                                fontWeight: '700'
                            }}
                        />
                        <RowInformation
                            iconName={CommonIcons.arrowRight}
                            label={jobExpectedPrice}
                            labelStyle={{
                                color: 'blue',
                                fontWeight: '600',
                            }}
                        />

                    </View>
                    <RowInformation
                        iconName={CommonIcons.mapMarker}
                        label={jobAddress}
                    />
                    {children}
                </TouchableOpacity>
            </View>

            {
                canRemove &&
                <View style={{
                    display: 'flex',
                    flex: 1,
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fdf5e6'
                }}>
                    <MaterialCommunityIcon
                        name={CommonIcons.removeTrash}
                        size={28}
                        color={'coral'}
                        onPress={onPressDelete}
                    />
                </View>

            }


        </View>
    )
}

export const JobItemPendingCard = ({
    jobTitle,
    jobPrice,
    jobAddress,
    containerStyle,
    jobExpectedPrice,
    children,
    onPressOpen,
    onPressDelete,
    pressDisable
}) => {
    return (
        <>
            <JobItemCardBase
                jobTitle={jobTitle}
                jobPrice={jobPrice}
                jobAddress={jobAddress}
                canRemove={true}
                containerStyle={containerStyle}
                jobExpectedPrice={jobExpectedPrice}
                children={children}
                onPressOpen={onPressOpen}
                onPressDelete={onPressDelete}
                pressDisable={pressDisable}
            />
        </>
    )
}



export const JobItemApprovedCard = ({
    jobTitle,
    jobPrice,
    jobAddress,
    children,
    pressDisable
}) => {
    return (
        <>
            <JobItemCardBase
                jobTitle={jobTitle}
                jobPrice={jobPrice}
                jobAddress={jobAddress}
                canRemove={false}
                children={children}
                pressDisable={pressDisable}
            />

        </>
    )
}



export const JobItemConfirmedCard = () => {
    return (
        <View>
            <Text>Confirmed Jobs</Text>
        </View>
    )
}




export const JobItemDetailCard = ({
    image_list = [],
    title,
    address,
    price,

}) => {
    return (
        <View>

            <View 
                style={{
                    display:'flex',
                    flexDirection:'row',
                    justifyContent:'center',
                    flexWrap:'wrap'
                }}
            >
                {
                    image_list &&
                    image_list.length > 0 &&
                    image_list.map((e, index) =>
                        <TouchableOpacity
                            style={{
                                margin:6
                            }}
                            key={index.toString()}
                        >
                            <Image
                                source={{
                                    uri: `${serverConfig.url_absolute}/${e.image}`
                                }}
                                style={{
                                    width: 60,
                                    height: 60
                                }}
                            />
                        </TouchableOpacity>
                    )
                }

            </View>

            <JobItemCardBase 
                jobTitle={title}
                jobAddress={address}
                jobPrice={price}

            />
        </View>
    )
}



const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        margin: 8,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
        borderRadius: 8,
        padding: 6
    }
})
