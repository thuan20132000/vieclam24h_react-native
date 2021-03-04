import React, { useRef } from "react";
import { View, Button, StyleSheet } from "react-native";
import RBSheet from "react-native-raw-bottom-sheet";

const SimpleBottomSheet = ({ 
    refRBSheet = useRef(),
    closeOnDragDown=true,
    closeOnPressMask=false,
    height=400, 
    children,
    dragFromTopOnly=false,
    containerStyle
}) => {



    return (
        <RBSheet
            ref={refRBSheet}
            closeOnDragDown={closeOnDragDown}
            closeOnPressMask={closeOnPressMask}
            dragFromTopOnly={dragFromTopOnly}
            customStyles={{
                wrapper: {
                    
                },
                draggableIcon: {
                    backgroundColor: "#000"
                },
                container:containerStyle
            }}
            height={height}
        >
            {children}
        </RBSheet>
    )
}

export default SimpleBottomSheet

const styles = StyleSheet.create({})
