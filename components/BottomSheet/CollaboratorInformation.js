import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Avatar, Caption, Chip, Divider, Headline, IconButton, Subheading, Title } from 'react-native-paper'
import CommonIcons from '../../constants/CommonIcons';

const CollaboratorInformation = (props) => {

    const {
        _refCollaboratorInformation,

    } = props;

    const occupations = Array(8).fill({});

    return (
        <ScrollView>
            <View style={styles.profileTop}>
                <IconButton style={{position:'absolute',top:2,left:2}}
                    icon={CommonIcons.backArrow}
                    color={'black'}
                    size={32}
                    onPress={() => _refCollaboratorInformation.current.close()}
                />

                <Avatar.Image size={104} source={require('../../assets/images/avatar1.jpg')} />
                <Title>Name</Title>
                <Subheading>Email: </Subheading>
                <Subheading>Địa chỉ : </Subheading>
                <Subheading>Đánh Giá: </Subheading>
            </View>
            <Divider />
            <Caption>Lĩnh vực đăng ký </Caption>
            <View style={styles.occupationsWrap}>
                {
                    occupations.map((e, index) =>
                        <Chip style={{ width: 'auto',margin:2 }}
                            icon="information"
                            onPress={() => console.log('Pressed')}
                        >
                            Example Chip
                        </Chip>
                    )
                }

            </View>
            <Divider />
            <View style={styles.photoGalleryWrap}>
                <Caption>Hình ảnh hoạt động</Caption>
                <View style={styles.photoGallery}>
                    {
                        occupations.map((e, index) =>
                            <Image style={styles.occupationImage}
                                source={{
                                    uri: 'https://reactnative.dev/img/tiny_logo.png',
                                }}
                            />
                        )
                    }

                </View>
            </View>
        </ScrollView>
    )
}

export default CollaboratorInformation

const styles = StyleSheet.create({
    profileTop: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    occupationsWrap: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginVertical: 16
    },
    photoGallery: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',

    },
    occupationImage: {
        width: 100,
        height: 100,
        margin: 6
    }
})
