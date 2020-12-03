import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import CommonIcons from '../../constants/CommonIcons'
import CommonColors from '../../constants/CommonColors'



const ReviewSatisfationLevel = ({onSelected}) => {


    const [selectedLevel, setSelectedLevel] = useState();
    const [reviewLevelData, setReviewLevelData] = useState([
        {
            label: 'Tệ',
            value: 1,
            icon: CommonIcons.face_sobad,
            status: false,
        },
        {
            label: 'Không hài lòng',
            value: 2,
            icon: CommonIcons.face_bad,
            status: false,

        },
        {
            label: 'Tạm ổn',
            value: 3,
            icon: CommonIcons.face_normal,
            status: false,

        },
        {
            label: 'Hài lòng',
            value: 4,
            icon: CommonIcons.face_good,
            status: false,

        },
        {
            label: 'Rất hài lòng',
            value: 5,
            icon: CommonIcons.face_verygood,
            status: false,

        }
    ]);


    const _onSelectLevel = async (item) => {
        
        let res = reviewLevelData.filter((e, index) => {
            if (e.value == item.value) {
                e.status = true;
            } else {
                e.status = false;
            }
            return reviewLevelData;
        });

        setReviewLevelData(res);

        if(onSelected){
            onSelected(item);
        }
    }

   

    return (
        <View style={[styles.container]}>

            {   reviewLevelData &&
                reviewLevelData.map((e, index) =>
                    <TouchableOpacity style={styles.reviewItem}
                        onPress={() => _onSelectLevel(e)}
                    >
                        {
                            e.status ?
                                <MaterialCommunityIcons style={styles.reviewIcon}
                                    name={e.icon}
                                    size={24}
                                    color={'gold'}
                                />:
                                <MaterialCommunityIcons style={styles.reviewIcon}
                                name={e.icon}
                                size={24}
                                color={'grey'}
                            />
                        }

                        <Text style={[styles.reviewText]}>{e.label}</Text>
                    </TouchableOpacity>
                )
            }



        </View>
    )
}

export default ReviewSatisfationLevel

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',

    },
    reviewItem: {
        display: 'flex',
        flexDirection: 'column',
        alignContent: 'center',
        alignItems: 'center',
    },
    reviewIcon: {
        marginVertical: 8
    },
    reviewText: {
        fontSize: 12
    }
})
