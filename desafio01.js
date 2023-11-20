class ProductManager{    constructor(){
    this.products = [];
    this.id = 1;
}
    addProduct(title, description, price, url, code, stock){
        if ( title && description && price && url && code && stock){
            const verificationCode = this.products.some (product => product.code === code);
        if (verificationCode){
                console.error("Codigo Repetido");
            }else{
                let id = this.id++;
                const newProduct = {id, title, description, price, url, code, stock};
                this.products.push(newProduct);
                console.log("Producto agregado correctamente:", newProduct);
            }       
        }else {
            console.error("Por favor completar todos los campos");        
        }
    };

    getProduct(){
        return this.products;
    }
    getProductByID(id){
        const productID = this.products.find(product => product.id === id);
        if (!productID){
            return console.error("Not Found")
        }else {
            console.log("El producto solicitado es: ", productID);
        }
}}


const productManager = new ProductManager()
productManager.addProduct("Fideos", "con tuco", 20, "url", 123, 25);
productManager.addProduct("Ravioles", "de Pollo", 30, "url", 124, 20);
productManager.addProduct("Ñoquis", "de papa", 40, "url", 125, 50);
console.log ("Todos los productos:", productManager.getProduct());
productManager.getProductByID(1);
productManager.getProductByID(2);
productManager.getProductByID(3);
productManager.getProductByID(4);
console.log(productManager);