import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    useDisclosure,
    Button
  } from '@chakra-ui/react';
import React from 'react';
import { deleteCustomer } from '../services/client';
import { successNotification, errorNotification } from '../services/notification';

  const DeleteCustomerDialog = ({passTheId, customerName, fetchCustomers})=>{
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()

  return (
    <>
      <Button colorScheme='red' onClick={onOpen} mt={8}>
        X
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Customer
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure to delete the customer "{customerName}"? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' 
                    onClick={()=>{
                    deleteCustomer(passTheId)
                        .then(res=>{
                            console.log(res);
                            successNotification("Deleting customer",`customer with id ${passTheId} has sucessfully been deleted`);
                            fetchCustomers();  
                        })
                        .catch(err=>{
                            console.log(err);
                            errorNotification(err.code, err.response.data.message);
                        })
                        .finally(()=>{
                          onClose();  
                        })
                    }}
                    ml={3}>
                        Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  )
  }

  export default DeleteCustomerDialog;