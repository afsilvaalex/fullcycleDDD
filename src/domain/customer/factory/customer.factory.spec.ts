import exp from "constants";
import { classToInvokable } from "sequelize/types/utils";
import Address from "../value-object/address";
import CustomerFactory from "./customer.factory";

describe("Customer Factory unit test", () =>{


    it("should create a customer", () => {

        let customer = CustomerFactory.create("John");
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBeUndefined;

    });

    it("should create a customer with an address", () => {
        const address = new Address("Rua 1", 1, "03295000", "São Paulo");

        let customer = CustomerFactory.createWithAddress("John", address );
        expect(customer.id).toBeDefined();
        expect(customer.name).toBe("John");
        expect(customer.Address).toBe(address);

    });

});
