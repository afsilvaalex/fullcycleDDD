import exp from "constants";
import Customer from "../../customer/entity/customer";

import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit test", () => {

    it ("should throw error when item is empty", () => {      
        expect(() => {
            const customer = new Customer("123", "Alexandre");
            const order= OrderService.placeOrder(customer, []);
        }).toThrowError("Order must have at least one item");
    });

    it("should place an order", () =>{
        
        const customer = new Customer("c1", "Customer 1");
        const item1 = new OrderItem("I1", "Item 1", 100, 100, "P1", 1);

        const order = OrderService.placeOrder(customer, [item1]);

        expect(customer.rewardPoints).toBe(50); 
        expect(order.total()).toBe(100);

    });

    it("should get total of all orders", () => {
        
        const item1 = new OrderItem("I1", "Item 1", 100, 100, "P1", 1);
        const item2 = new OrderItem("I2", "Item 2", 200, 400, "P2", 2);

        const order1 = new Order("O1", "123", [item1]);
        const order2 = new Order("O2", "321", [item2]);

        const total = OrderService.total([order1, order2]);

        expect(total).toBe(500);
    });

});