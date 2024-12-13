import { createStandaloneToast } from '@chakra-ui/react'
const {toast} = createStandaloneToast()

const notification = (title, description, status)=>{
    toast({
        title,
        description,
        status,
        variant: "left-accent",
        isClosable: true,
        duration: 4000      //4000ms:4s
    });
}

export const successNotification = (title,description)=>{
    notification(
        title,
        description,
        "success"
    );
};

export const errorNotification = (title,description)=>{
    notification(
        title,
        description,
        "error"
    );
};