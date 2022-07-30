import Product from "./product";

describe("Product unit tests", () => {

    it("should throw error when id is empty", () => {
        expect(() =>{
            const product = new Product("", "Product 1", 100);

        }).toThrowError("Id is required");
    });

    it("should throw error when name product is empty", () => {
        expect(() => {
            const product = new Product("p1", "", 100);
        }).toThrowError("Name is required");
    });

    it("should throw error when price is less than zero", () => {
        expect(() => {
            const product = new Product("p1", "Product 1", -1);
        }).toThrowError("Price must be greater than zero")
    });

    it("should change name", () => {
        
        const product = new Product("p1", "Produto 0", 100);
    
        product.changeName("Produto 1");

        expect(product.name).toBe("Produto 1");
    });

    it("should change price", () => {
        
        const product = new Product("p1", "Produto 1", 100);
    
        product.changePrice(200);

        expect(product.price).toBe(200);
    });

})