
import CustomerChangeAddressEvent from "../../customer/event/customer-changeAddress.event";
import CustomerCreatedEvent from "../../customer/event/customer-created.event";
import SendConsoleWhenCustomerChangeAddress from "../../customer/event/handler/send-consoleLog-when-customer-changeAddress-handler";
import SendConsoleLog1WhenCustomerIsCreated from "../../customer/event/handler/send-consoleLog1-when-customer-is-created-handler";
import SendConsoleLog2WhenCustomerIsCreated from "../../customer/event/handler/send-consoleLog2-when-customer-is-created-handler";
import SendEmailWhenProductIsCreated from "../../product/event/handler/send-email-when-product-is-created-handler";
import ProductCreatedEvent from "../../product/event/product-created.event";
import EventDispatcher from "./event-dispatcher";


describe("Domain Event Tests", () => {

    it("Should register an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandlerProduct = new SendEmailWhenProductIsCreated();

        eventDispatcher.register("ProductCreatedEvent", eventHandlerProduct);

        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerProduct);

        // testes  Customer

        const eventHandlerCustomerLog1 = new SendConsoleLog1WhenCustomerIsCreated();
        const eventHandlerCustomerLog2 = new SendConsoleLog2WhenCustomerIsCreated();

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerCustomerLog2);

    });

    it("Should unregister an event handler", () => {

        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreated();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);


        eventDispatcher.unregister("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"].length).toBe(0);


    });

    it("Should unregister all events handlers ", () => {
        const eventDispatcher = new EventDispatcher();
        const eventHandler = new SendEmailWhenProductIsCreated();

        eventDispatcher.register("ProductCreatedEvent", eventHandler);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandler);

        eventDispatcher.unregisterAll();
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"]).toBeUndefined();

    });

    

    it("Should notify all event handlers", () => {
        const eventDispatcher = new EventDispatcher();


       //Handler Product
        const eventHandlerSendEmailWhenProductIsCreated = new SendEmailWhenProductIsCreated();
        const sypEventHandlerProduct = jest.spyOn(eventHandlerSendEmailWhenProductIsCreated, "handle");
        
        eventDispatcher.register("ProductCreatedEvent", eventHandlerSendEmailWhenProductIsCreated);
        expect(eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]).toMatchObject(eventHandlerSendEmailWhenProductIsCreated);

        const productCreatedEvent = new ProductCreatedEvent({
            nome: "Product 1",
            description: "Product 1 description",
            price: 10,
        });

        //Quando o notify for executado o SendEmailWhenProductIsCreatedHandle deve ser chamado
        eventDispatcher.notify(productCreatedEvent);
        expect(sypEventHandlerProduct).toHaveBeenCalled();

        

        //HandlerCustomer Created 
        const eventHandlerCustomerLog1 = new SendConsoleLog1WhenCustomerIsCreated();
        const eventHandlerCustomerLog2 = new SendConsoleLog2WhenCustomerIsCreated();


        const sypEventHandlerCustomerSendConsole1 = jest.spyOn(eventHandlerCustomerLog1, "handle");
        const sypEventHandlerCustomerSendConsole2 = jest.spyOn(eventHandlerCustomerLog2, "handle");

        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog1);
        eventDispatcher.register("CustomerCreatedEvent", eventHandlerCustomerLog2);

        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"].length).toBe(2);

 
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]).toMatchObject(eventHandlerCustomerLog1);
        expect(eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]).toMatchObject(eventHandlerCustomerLog2);


        const customerCreatedEvent = new CustomerCreatedEvent ({
            name: "Customer 1",
            address: "Rua Francisco, 46, São Paulo",
            Active: true,
            rewardPoints: 10,
        });

        eventDispatcher.notify(customerCreatedEvent);
        expect(sypEventHandlerCustomerSendConsole1).toHaveBeenCalled();
        expect(sypEventHandlerCustomerSendConsole2).toHaveBeenCalled();


        //HandlerCustomer Change Address 
        const eventHandlerCustomerChangeAddress = new SendConsoleWhenCustomerChangeAddress();
        const sypEventHandlerCustomerSendConsoleChangeAddress = jest.spyOn(eventHandlerCustomerChangeAddress, "handle");

        eventDispatcher.register("CustomerChangeAddressEvent", eventHandlerCustomerChangeAddress);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"]).toBeDefined();
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"].length).toBe(1);
        expect(eventDispatcher.getEventHandlers["CustomerChangeAddressEvent"][0]).toMatchObject(eventHandlerCustomerChangeAddress);


        const customerChangeAddressEvent  = new CustomerChangeAddressEvent({
            id: "123",
            name: "Alexandre",
            address: "Rua 2",
        });

        eventDispatcher.notify(customerChangeAddressEvent);
        expect(sypEventHandlerCustomerSendConsoleChangeAddress).toHaveBeenCalled();
    


    });

});
