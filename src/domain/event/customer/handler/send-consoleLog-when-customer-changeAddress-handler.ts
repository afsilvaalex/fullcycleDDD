import EventHandlerInterface from "../../@shared/event-handler.interface";
import CustomerChangeAddressEvent from "../customer-changeAddress.event";


export default class SendConsoleWhenCustomerChangeAddress 
    implements EventHandlerInterface<CustomerChangeAddressEvent> {


        handle(event: CustomerChangeAddressEvent): void {
            console.log(`Endereço do cliente: `+  event.eventData.id  +
                ` , ` +  event.eventData.name +
                ` alterado para: ` + event.eventData.address );
   
        }
    }