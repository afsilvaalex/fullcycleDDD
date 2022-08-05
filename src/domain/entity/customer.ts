import EventDispatcher from "../event/@shared/event-dispatcher";
import CustomerChangeAddressEvent from "../event/customer/customer-changeAddress.event";
import CustomerCreatedEvent from "../event/customer/customer-created.event";
import SendConsoleWhenCustomerChangeAddress from "../event/customer/handler/send-consoleLog-when-customer-changeAddress-handler";
import SendConsoleLog1WhenCustomerIsCreated from "../event/customer/handler/send-consoleLog1-when-cutomer-is-created-handler";
import SendConsoleLog2WhenCustomerIsCreated from "../event/customer/handler/send-consoleLog2-when-cutomer-is-created-handler";
import Address from "./address";

export default class Customer {

    private _id: string;
    private _name: string;
    private _address!: Address  ;
    private _active: boolean = false;
    private _rewardPoints: number = 0;
    private eventDispatcher = new EventDispatcher();

    constructor(id: string, name: string){
        this._id = id;
        this._name = name;
        this.validate();

        const eventHandlerCustomerChangeAddress = new SendConsoleWhenCustomerChangeAddress();
        const eventHandlerCustomerLog1 = new SendConsoleLog1WhenCustomerIsCreated();
        const eventHandlerCustomerLog2 = new SendConsoleLog2WhenCustomerIsCreated();

        this.eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
        this.eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);
        this.eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerCustomerChangeAddress);


        const customerCreatedEvent = new CustomerCreatedEvent ({
            id: this._id,
            name: this.name,
        });

        this.eventDispatcher.notify(customerCreatedEvent);
        
    }

    get name(): string {
        return this._name;
    }

    get id(): string{
        return this._id;
    }

    get rewardPoints(): number{
        return this._rewardPoints;
    }

    validate(){
      
        if (this._id.length === 0  ) {
            throw new Error("Id is required");
        }

        if (this._name.length === 0){
            throw new Error("Name is required");
        }
    }


    changeName(name: string){
        this._name = name;
        this.validate();
    }

    changeAddress(address: Address){
        this._address = address;

        const customerChangeAddressEvent  = new CustomerChangeAddressEvent({
            id: this._id,
            name: this._name,
            address: this._address,
        });

        this.eventDispatcher.notify(customerChangeAddressEvent);
    }

    isActive(): boolean{
        return this._active;
    }

    activate(){
        if (this._address === undefined ){
            throw new Error("Address is mandatory to activate a customer")
        }
        this._active = true;
    }

    deactivate(){
        this._active = false;

    }

    addRewardPoints(points: number){
        this._rewardPoints += points;
    }

    set Address(address: Address){

        this._address = address;
    }

    get Address(): Address{
        return this._address;
    }
    
}