import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {

    it ("should throw error when id is empty", () => {      
        expect(() => {
            let order = new Order("", "123", []);
        }).toThrowError("Id is required");
    });

    it ("should throw error when customerId is empty", () => {        
        expect(() => {
            let order = new Order("1", "", []);
        }).toThrowError("CustomerId is required");
    });

    it ("should throw error when item qtd equal zero", () => {
        expect(() => {
            let order = new Order("1", "123", []);
        }).toThrowError("Item qtd must be greater than 0")
    });

    it ("should calculate total", () =>{
        
        //Arrange 
        const item1 = new OrderItem("i1", "Item 1", 100, 200, "p1", 2);
        const item2 = new OrderItem("i2", "Item 2", 200, 400,"p2", 2);
        const order = new Order("o1", "123", [item1] );

        //Act
        let total = order.total();

        //Assert
        expect(total).toBe(200);

        //Arrange 2

        const order2 = new Order("o2", "123", [item1, item2]);

        //Act 2
        let total2 = order2.total();

        //Assert 2
        expect(total2).toBe(600);


    });

    it ("should throw error if the item quantity is less or equal zero", () =>{
        expect(() => {
            const item = new OrderItem("i1", "Item 1", 100, 0 , "p1", 0);
            const order = new Order("o1", "123", [item] );
        }).toThrowError("Quantity must be greater than 0");
    });


});