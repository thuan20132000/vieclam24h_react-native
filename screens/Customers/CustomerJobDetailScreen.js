import React, { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { JobItemDetailCard } from '../../components/Card/CardJobItem';
import { CandidateCard } from '../../components/Card/CardUserItem';
import CommonColors from '../../constants/CommonColors';
import { formatCash } from '../../utils/helper';
import { getJobDetail, modifyJobCandidate, _approve_jobcandidate } from '../../utils/serverApi';


const CustomerJobDetailScreen = (props) => {


    const { data } = props.route.params;


    const [job, setJob] = useState();
    const [isLoading, setIsLoading] = useState(true);

    const _onGetJobDetail = async () => {
        setIsLoading(true);

        let fetchRes = await getJobDetail(data.id);
        if (fetchRes.status) {
            setJob(fetchRes.data);
        }
        setIsLoading(false)
    }

    React.useEffect(() => {

        setTimeout(() => {
            _onGetJobDetail();

        }, 300);
    }, []);



    const _onCancelItem = (candidate) => {
        console.warn('cancel: ',candidate);
    }


    const _onApproveItem = async (jobcandidate) => {
        
        console.warn(jobcandidate);

        let fetchRes = await _approve_jobcandidate(jobcandidate?.job?.author,jobcandidate.id);

        console.warn(fetchRes);
        if(!fetchRes.status){
            console.warn('Something went wrong!');
            return;
        }
        props.navigation.reset({
            routes:[{name:'CustomerJobList'}]
        })
        
    }
    



    if (isLoading) {
        return (
            <View
                style={{
                    display: 'flex',
                    flex: 1,
                    justifyContent: 'center'
                }}
            >
                <ActivityIndicator
                    color={'coral'}
                    size={'large'}
                />
            </View>
        )
    }

    if (!job) {
        return (
            <View>
                <Text>Not Found</Text>
            </View>
        )
    }

    return (
        <ScrollView>
            <View style={{
                backgroundColor: 'white'
            }}>
                <JobItemDetailCard
                    image_list={job?.images}
                    title={job?.name}
                    price={`${formatCash(job?.suggestion_price)} vnđ`}
                    address={`${job?.location?.district} - ${job?.location?.province}`}

                />
            </View>


            {/* Show */}
            <View
                style={[
                    styles.contaiber,
                    {
                        paddingHorizontal: 12
                    }

                ]}
            >
                {
                    job?.candidates &&
                    job.candidates.length > 0 &&
                    job.candidates.map((e, index) => {
                        return (

                            <CandidateCard
                                key={index.toString()}
                                name={e.candidate?.username}
                                phone={e.candidate?.phone}
                                review_level={3.6}
                                message={e.descriptions}
                                price={e.expected_price}
                                

                            >
                                <View
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'row',
                                        justifyContent: 'space-around'
                                    }}
                                >
                                    <TouchableOpacity
                                        style={[
                                            styles.cardButton,
                                            {
                                                minWidth: 120,
                                                backgroundColor: 'crimson'
                                            }
                                        ]}
                                        onPress={()=>_onCancelItem(e)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: 'white',
                                                textAlign: 'center'
                                            }}
                                        >Bỏ qua</Text>
                                    </TouchableOpacity>

                                    <TouchableOpacity
                                        style={[
                                            styles.cardButton,
                                            {
                                                minWidth: 120,
                                                backgroundColor: CommonColors.btnSubmit
                                            }
                                        ]}
                                        onPress={()=>_onApproveItem(e)}
                                    >
                                        <Text
                                            style={{
                                                fontSize: 14,
                                                fontWeight: '700',
                                                color: 'white',
                                                textAlign: 'center'
                                            }}
                                        >Chọn</Text>
                                    </TouchableOpacity>
                                </View>
                            </CandidateCard>
                        )
                    }
                    )
                }

            </View>
        </ScrollView>
    )
}

export default CustomerJobDetailScreen

const styles = StyleSheet.create({
    contaiber: {
        display: 'flex',
        backgroundColor: 'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.36,
        shadowRadius: 6.68,

        elevation: 11,
    }
})
