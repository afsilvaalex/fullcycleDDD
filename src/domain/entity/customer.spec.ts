import exp from "constants";
import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {

    it("should throw error when id is empty", () => { 
        expect(() => {
            let customer = new Customer("", "Ale");
        }).toThrowError("Id is required");
    }); 

    it("should throw error when name is empty", () => { 
        expect(() => {
            let customer = new Customer("123", "");
        }).toThrowError("Name is required");
    }); 

    it("should change name is empty", () => { 

        //Arrange 
        const customer = new Customer("123", "Alexandre");

        //Act
        customer.changeName("Mariana");

        //Assert
        expect(customer.name).toBe("Mariana");

    }); 

    it("should activate customer", () => { 

        //Arrange 
        const customer = new Customer("123", "Alexandre");
        const end = new Address("rua 1", 2, "03295000", "São Paulo");

        customer.Address = end;

        //Act
        customer.activate();

        //Assert
        expect(customer.isActive()).toBe(true);

        
    }); 

    it("should throw error when activate customer and address is undefined", () => { 
        
        expect(() => {
            const customer = new Customer("123", "Alexandre");
            customer.activate();
        }).toThrowError("Address is mandatory to activate a customer");

    }); 

    it("should deactivate customer", () => { 

        //Arrange 
        const customer = new Customer("123", "Alexandre");

        //Act
        customer.deactivate();

        //Assert
        expect(customer.isActive()).toBe(false);

    }); 

    it("should add reward points", () => {

        const customer = new Customer("1", "Customer 1");
        expect(customer.rewardPoints).toBe(0);

        customer.addRewardPoints(10);
        expect(customer.rewardPoints).toBe(10);

        customer.addRewardPoints(30);
        expect(customer.rewardPoints).toBe(40);
    });

});