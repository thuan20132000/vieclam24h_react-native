import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, FlatList, Alert } from 'react-native'
import CardReviewCandidate from '../../components/Review/CardReviewCandidate'
import { _getCandidateReviews } from '../../utils/serverApi'

import { useSelector } from 'react-redux'

const CandidateReviewsScreen = (props) => {

    const { candidate } = props.route.params;


    const [reviews, setReviews] = useState([]);
    const _onGetCandidateReviews = async () => {
        let reviewRes = await _getCandidateReviews(candidate?.id);
        // console.warn(reviewRes);
        if (!reviewRes.status) {
            Alert.alert("thông báo", "Vui lòng kiểm tra kết nối.")
            return;
        }

        if (reviewRes.data?.data?.length > 0) {
            setReviews(reviewRes.data.data);
        }


    }


    useEffect(() => {
        _onGetCandidateReviews()
    }, []);


    return (

        <FlatList
            data={reviews}
            renderItem={({item}) =>
                <CardReviewCandidate
                    name={item.name}
                    name={item.review_author?.username}
                    review_content={item.review_content}
                    review_level={item.review_level}
                    updated_at = {item.updated_at}
                />
            }
            keyExtractor={(item, index) => index.toString()}
        />
    )
}

export default CandidateReviewsScreen

const styles = StyleSheet.create({})
