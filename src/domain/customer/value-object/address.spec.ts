import Address from "./address";

describe("Address unit test", () =>{

    it("should throw error when street is empty", () => { 
        expect(() => {
            const address = new Address("", 2, "03295000", "São Paulo");
        }).toThrowError("Street is required");
    }); 

    it("should throw error when  number is less or equal zero", () => {
        expect(() => {
            const address = new Address("rua 1", 0, "03295000", "Rio de janeiro");
        }).toThrowError("Number is required");
    });

    it("should throw error when  zip is empty", () => {
        expect(() => {
            const address = new Address("rua 1", 1, "", "Rio de janeiro");
        }).toThrowError("Zip is required");
    });

    it("should throw error when  city is empty", () => {
        expect(() => {
            const address = new Address("rua 1", 1, "03295000", "");
        }).toThrowError("City is required");
    });

    it("should write Address ", () => {

        const address = new Address("rua 1", 1, "03295000", "Rio de janeiro");
        const addressCustomer = address.toString();

        expect(addressCustomer).toBe("rua 1, 1, 03295000, Rio de janeiro");

    });

});