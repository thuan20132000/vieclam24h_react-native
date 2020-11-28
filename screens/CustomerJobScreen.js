import React,{useEffect,useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler'
import { Badge, Caption, Paragraph, Title } from 'react-native-paper';
import CardHorizontal from '../components/Card/CardHorizontal';
import {useSelector} from 'react-redux';
import {getCustomerJobs}  from '../utils/serverApi';




const CustomerJobItem = ({_onPress,item}) => {


    // const _onPress = () => {
    //     navigation.navigate('JobCollaborator');
    // }
    const [jobItem,setJobItem] = useState({
        title:'',
        description:'',
        suggestion_price:'',
        created_at:'',
        candidateNumber:''
    });

    

    useEffect(() => {
        setJobItem({
            title:item?.attributes.name,
            description:item?.attributes.description,
            suggestion_price:item?.attributes.suggestion_price,
            craeted_at:item?.attributes.created_at,
            candidateNumber:item?.relationships?.candidates.length
        });
    }, [])

    return (
        <TouchableOpacity style={styles.itemContainer}
            onPress={_onPress}
        >
                <Title>{jobItem.title}</Title>
                <Paragraph>{jobItem.description}</Paragraph>
                <View>
                    <Text>Giá đưa ra: 450000</Text>
                </View>
                <Caption>đăng lúc: 12:30 12/11/2020</Caption>
                <Badge style={{bottom:100}}
                    size={34}
                >
                {jobItem.candidateNumber}
                </Badge>

        </TouchableOpacity>
    )
}

const CustomerJobScreen = (props) => {

    const {
        navigation
    } = props;
    // const customerJobData = Array(10).fill({});


    const { userInformation } = useSelector(state => state.authentication);
    const [customerJobsData,setCustomerJobsData] = useState([]);
    const [sortBy,setSortBy] = useState('desc')


    const _getCustomerJobs = async () => {
        let customerJobsRes = await getCustomerJobs(userInformation.id,sortBy,12);
        setCustomerJobsData(customerJobsRes.data);
    }

    const _navigateToJobCollaboratorApplying = (job) => {
        // console.warn(job.relationships.candidates);
        props.navigation.navigate('JobCollaboratorApplying',{
            job_id:job.id,
            candidates:job.relationships?.candidates
        });
    }



    useEffect(() => {
        //console.warn(userInformation);

        _getCustomerJobs();

        props.navigation.setOptions({
            title:'Tin Đăng'
        });
    }, []);

    return (
        <ScrollView>
            {
                customerJobsData.map((e,index) => 
                    <CustomerJobItem
                        key={index.toString()}
                        _onPress={()=>_navigateToJobCollaboratorApplying(e)}
                        item={e}
                    />
                )
            }
        </ScrollView>
    )
}

export default CustomerJobScreen

const styles = StyleSheet.create({
    itemContainer:{
        backgroundColor:'white',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        margin:8,
        padding:6
    }
})
