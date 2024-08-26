import React, { useState } from 'react';
import {View, Text, StyleSheet, Image, TouchableWithoutFeedback,TouchableOpacity, Modal, Button } from 'react-native'
import Barcode from '@kichiyaki/react-native-barcode-generator'

interface CardProps {
    type: string;
    brandName: string;
    departmentNum: string;
    upc: string;
    imageUri: string | null;
    onDelete: () => void;
}

const Card: React.FC<CardProps> = ({type, brandName,departmentNum, upc, imageUri, onDelete}) => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [barcodeError, setBarcodeError] = useState<string | null>(null)

    const handleBarcodeError = (error: any) => {
        setBarcodeError('Invalid UPC code');
        console.warn('Barcode error:', error);
    }

    const handleImagePress = () => {
        setModalVisible(true)
    }
    const handleCloseModal = () => {
        setModalVisible(false)
    }



    return (
        <View style={styles.card}>
            {imageUri && (
                <>
                    <TouchableOpacity onPress={handleImagePress}>
                        <Image source={{uri: imageUri}} style={styles.image} />
                    </TouchableOpacity>

                    <Modal visible={modalVisible} transparent={true}>
                        <TouchableWithoutFeedback onPress={handleCloseModal}>
                            <View style={styles.modalBackground}>
                                <Image source={{uri: imageUri}} style={styles.modalImage} />
                            </View>
                        </TouchableWithoutFeedback>
                    </Modal>
                </>
                
            )}

            <Text style={styles.type}>{type}</Text>
            <Text style={styles.brandName}>{brandName}</Text>
            <Text style={styles.brandName}>{departmentNum}</Text>
            <Barcode value={upc} format="UPC" onError={handleBarcodeError}/>
            <Text style={styles.upc}>UPC: {upc}</Text>
            <Button title="Delete" onPress={onDelete} color="red"/>
        </View>
    )
}


const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 16,
        margin: 16,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {width: 0, height: 2},
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    type: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    brandName: {
        fontSize: 16,
        marginBottom: 12,
    },
    upc: {
        fontSize: 16,
        marginTop: 8,
        color: '#555',
    },
    image: {
        width: 100,
        height: 100,
        marginTop: 12,
        marginBottom: 12,
        borderRadius: 8
      },
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.8)',
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalImage :{
        width: '90%',
        height: '80%',
        borderRadius: 8,
    },
    errorText: {
        color: 'red',
        marginTop: 10,
    }

});

export default Card;