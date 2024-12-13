import { 
    Button, 
    useDisclosure,
    Drawer,
    DrawerOverlay,
    DrawerBody,
    DrawerFooter,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader} from "@chakra-ui/react";
import { EditIcon } from '@chakra-ui/icons'
import CreateCustomerForm from "./CreateCustomerForm";


const UpdateCustomer = ({passTheId, updateValue, fetchCustomers})=>{
    const CloseIcon = ()=>"x";
    const { isOpen, onOpen, onClose } = useDisclosure()
    return <div>
         <Button 
             leftIcon={<EditIcon />}
             colorScheme={"gray"}
             onClick={onOpen}
             mt={8}
             > 
             Edit
         </Button>
         <Drawer isOpen={isOpen} onClose={onClose} size={"sm"}>
                 <DrawerOverlay/>
                 <DrawerContent>
                     <DrawerCloseButton/>
                     <DrawerHeader>Update a customer</DrawerHeader>
         
                     <DrawerBody>
                         <CreateCustomerForm passTheId={passTheId} fetchCustomers={fetchCustomers} updateValue={updateValue}/>
                     </DrawerBody>
         
                     <DrawerFooter>
                     <Button 
                         leftIcon={<CloseIcon/>}
                         colorScheme={"gray"}
                         onClick={onClose}
                         > 
                         Close
                     </Button>
                     </DrawerFooter>
                 </DrawerContent>
         </Drawer>
         </div>  
}


export default UpdateCustomer;