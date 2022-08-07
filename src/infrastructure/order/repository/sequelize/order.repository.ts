import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {

    async create(entity: Order): Promise<void>{

            await OrderModel.create({
                id: entity.id,
                customer_id: entity.customerId,
                total: entity.total(),
                items: entity.items.map((item) => ({
                    id: item.id,
                    name: item.name,
                    priceUnit: item.priceUnit,
                    priceTotalItem: item.priceTotalItem,
                    product_id: item.productId,
                    quantity: item.quantity,
                })),
            },
            {
                include: [{ model: OrderItemModel }],       
            }
            );

    }



    async createItem(item: OrderItem, orderId: string): Promise<void>{


            await OrderItemModel.create({
                id: item.id,
                product_id: item.productId,
                order_id: orderId,
                quantity: item.quantity,
                name: item.name,
                priceUnit: item.priceUnit,
                priceTotalItem: item.priceTotalItem,
            });
    }


    async update(entity: Order): Promise<void>{

        // destroy all items  
        // Racional: neste momento um item poderia ter sido retirado ou incluido 
        // por este motivo deletei todos os itens e inclui novamente com id da orderm 
        //
        await OrderItemModel.destroy({
            where: { order_id: entity.id }
        });


        // create new items 

        const items = entity.items;

        items.map((item) => {
            this.createItem(item, entity.id);
        });

        // update Order
        await OrderModel.update({
            total: entity.total(),
            items: entity.items.map((item) => ({
                id: item.id,
                name: item.name,
                priceUnit: item.priceUnit,
                product_id: item.productId,
                priceTotalItem: item.priceTotalItem,
                quantity: item.quantity,
            })),
                },
                {
                    where: {
                        id: entity.id,
                    } 
                }
        );
    }
  
   async find(id: string): Promise<Order>{

        let orderModel;

        try{
            orderModel = await OrderModel.findOne({
                where: {
                    id: id
                },
                include: ["items"],
                rejectOnEmpty: true,
            });

        } catch (error){
            throw new Error("Order not found");
        }

        let items = orderModel.items.map((itemModel) => {
            let item = new OrderItem(itemModel.id, itemModel.name, itemModel.priceUnit, itemModel.priceTotalItem,
                            itemModel.product_id, itemModel.quantity);
                           
            return item;
        });

        const order = new Order(orderModel.id, orderModel.customer_id, items);

        return order;

    }

    //    async findAll(): Promise<Customer[]>{
    async findAll(): Promise<Order[]>{
        
        const orderModels = await OrderModel.findAll(
            { include: ["items"],}
        );

        const orders = orderModels.map((orderModel) => {
            let items = orderModel.items.map((itemModel) => {
                let item = new OrderItem(itemModel.id, itemModel.name, itemModel.priceUnit, itemModel.priceTotalItem,
                                itemModel.product_id, itemModel.quantity);
                               
                return item;
            });

            let order = new Order(orderModel.id, orderModel.customer_id, items )

            return order;      
        });
        
        return orders;

    }
    
}