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
import CreateCustomerForm from "./CreateCustomerForm";

const AddIcon = ()=>"+";
const CloseIcon = ()=>"x";

const DrawerForm = ({fetchCustomers})=>{
   const { isOpen, onOpen, onClose } = useDisclosure()
   return <div>
        <Button 
            leftIcon={<AddIcon/>}
            colorScheme={"blue"}
            onClick={onOpen}
            > 
            create customer
        </Button>
        <Drawer isOpen={isOpen} onClose={onClose} size={"sm"}>
                <DrawerOverlay/>
                <DrawerContent>
                    <DrawerCloseButton/>
                    <DrawerHeader>Create new customer</DrawerHeader>
        
                    <DrawerBody>
                        <CreateCustomerForm fetchCustomers={fetchCustomers}/>
                    </DrawerBody>
        
                    <DrawerFooter>
                    <Button 
                        leftIcon={<CloseIcon/>}
                        colorScheme={"blue"}
                        onClick={onClose}
                        > 
                        Close
                    </Button>
                    </DrawerFooter>
                </DrawerContent>
        </Drawer>
        </div>  
}

export default DrawerForm;
