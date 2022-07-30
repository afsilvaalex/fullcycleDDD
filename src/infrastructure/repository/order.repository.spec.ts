import exp from "constants";
import { Sequelize } from "sequelize-typescript";
import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import Product from "../../domain/entity/product";
import CustomerModel from "../db/sequelize/model/customer.model";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";
import ProductModel from "../db/sequelize/model/product.model";
import CustomerRepository from "./customer.repository";
import OrderRepository from "./order.repository";
import ProductRepository from "./product.repository";

describe("Order repository test", () => {

        let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true},
        });

        sequelize.addModels([CustomerModel, OrderModel, OrderItemModel, ProductModel]);
        await sequelize.sync();

    });

    afterEach(async ()  => {
        await sequelize.close();
    });

    it("should create a new order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.price * 2,  product.id, 2);   
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    priceUnit: orderItem.priceUnit,
                    priceTotalItem: orderItem.priceTotalItem,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
    });

    it("should update order", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem = new OrderItem("1", product.name, product.price, product.price * 2,product.id, 2);   
        const order = new Order("123", "123", [orderItem]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderModel = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel.toJSON()).toStrictEqual({

            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem.id,
                    name: orderItem.name,
                    priceUnit: orderItem.priceUnit,
                    priceTotalItem: orderItem.priceTotalItem,
                    quantity: orderItem.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });

        // iniciar Update 
        const orderItem1 = new OrderItem("1", product.name, product.price, product.price * 2,  product.id, 1); 
        const orderItem2 = new OrderItem("2", product.name, product.price, product.price * 2, product.id, 1); 

        // Incluir itens alterados
        order.items = [orderItem1, orderItem2];

        await orderRepository.update(order);

        const orderModel1 = await OrderModel.findOne({
            where: { id: order.id },
            include: ["items"],
        });

        expect(orderModel1.toJSON()).toStrictEqual({
            id: "123",
            customer_id: "123",
            total: order.total(),
            items: [
                {
                    id: orderItem1.id,
                    name: orderItem1.name,
                    priceUnit: orderItem1.priceUnit,
                    priceTotalItem: orderItem1.priceTotalItem,
                    quantity: orderItem1.quantity,
                    order_id: "123",
                    product_id: "123",
                },
                {
                    id: orderItem2.id,
                    name: orderItem2.name,
                    priceUnit: orderItem2.priceUnit,
                    priceTotalItem: orderItem2.priceTotalItem,
                    quantity: orderItem2.quantity,
                    order_id: "123",
                    product_id: "123",
                },
            ],
        });
        
    });

    it("should throw an error when order is not found", async () => {
        const orderRepository = new OrderRepository();

        expect(async () => {
            await orderRepository.find("123456");

        }).rejects.toThrow("Order not found");
    });

  it("should find a order", async () => {
        
        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.name, product.price, product.price * 2, product.id, 2);   
        const orderItem2 = new OrderItem("2", product.name, product.price, product.price * 2, product.id, 2);   

        const order = new Order("123", "123", [orderItem1, orderItem2]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order);

        const orderResult = await orderRepository.find(order.id);

        expect(orderResult).toStrictEqual(order);

    });

   it("should find all orders ", async () => {

        const customerRepository = new CustomerRepository();
        const customer = new Customer("123", "Customer 1");
        const address = new Address("Street 1", 1, "ZipCode 1", "City 1");
        customer.changeAddress(address);
        await customerRepository.create(customer);

        const productRepository = new ProductRepository();
        const product = new Product("123", "Product 1", 100);
        await productRepository.create(product);

        const orderItem1 = new OrderItem("1", product.name, product.price, product.price * 10, product.id, 10);   
        const orderItem2 = new OrderItem("2", product.name, product.price, product.price * 1, product.id, 1);  
        
        const orderItem3 = new OrderItem("3", product.name, product.price, product.price * 3, product.id, 3);   
        const orderItem4 = new OrderItem("4", product.name, product.price, product.price * 4, product.id, 4);    

        const orderItem5 = new OrderItem("5", product.name, product.price, product.price * 5, product.id, 5);   
        const orderItem6 = new OrderItem("6", product.name, product.price, product.price * 6, product.id, 6);    

        const order1 = new Order("Id_order_1", "123", [orderItem1, orderItem2]);
        const order2 = new Order("Id_order_2", "123", [orderItem3]);
        const order3 = new Order("Id_order_3", "123", [orderItem4, orderItem5, orderItem6]);

        const orderRepository = new OrderRepository();
        await orderRepository.create(order1);
        await orderRepository.create(order2);
        await orderRepository.create(order3);


        const orders = await orderRepository.findAll();

        expect(orders).toHaveLength(3);
        expect(orders).toContainEqual(order1);
        expect(orders).toContainEqual(order2);
        expect(orders).toContainEqual(order3);
        

    });
    
})