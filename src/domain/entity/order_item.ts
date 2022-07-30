

export default class OrderItem{

    private _id: string;
    private _productId: string;
    private _name: string;
    private _priceUnit: number;
    private _priceTotalItem: number;
    private _quantity: number;


    constructor(id: string, name: string, priceUnit: number, priceTotalItem: number,  productId: string, quantity: number){
        this._id = id;
        this._name = name;
        this._priceUnit = priceUnit;
        this._priceTotalItem = priceTotalItem;
        this._productId = productId;
        this._quantity = quantity;
    }



    get id(): string{
        return this._id;
    }

    get name(): string{
        return this._name;
    }

    get productId(): string{
        return this._productId;
    }

    get quantity(): number{
        return this._quantity
    }
    
    get priceUnit(): number{
        return this._priceUnit;
    }

    get priceTotalItem(): number{
        return this._priceUnit * this._quantity;
    }

}