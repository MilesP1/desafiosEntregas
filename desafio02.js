const fs = require('fs')

class ProductManager {

    constructor(ruta) {
        this.ruta = ruta
    }

    async ObtenerPoductos() {
        if (fs.existsSync(this.ruta)) {
            const ProductosGuardados = await fs.promises.readFile(this.ruta,'utf-8')
            return JSON.parse(ProductosGuardados)
        } else {
            return [] 
        }
    }

    async AgregarProducto(producto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        let id
        if (!ProductosGuardados.length) {
            id = 1
        } else {
            id = ProductosGuardados[ProductosGuardados.length-1].id+1
        }
        ProductosGuardados.push({id,...producto})
        await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        console.log('Producto cargado')
    }

    async EditarProducto(IDProducto,CampoAActualizar,NuevoDato){
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductoAActualizar = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProductoAActualizar) {
            ProductoAActualizar[CampoAActualizar] = NuevoDato
            await fs.promises.writeFile(this.ruta,JSON.stringify(ProductosGuardados))
        } else {
          return 'Producto no ecnontrado'  
        }
    }

    async BorrarProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProductosGuardadosAux = ProductosGuardados.filter(u=>u.id !== IDProducto)
        await fs.promises.writeFile(this.ruta, JSON.stringify(ProductosGuardadosAux))
    }

    async ObtenerProductoPorID(IDProducto) {
        const ProductosGuardados = await this.ObtenerPoductos()
        const ProdAux = ProductosGuardados.find(u=>u.id === IDProducto)
        if (ProdAux) {
            return ProdAux
        } else {
            return 'Porducto no encontrado'
        }
    }

    async BorrarArchivo(){
        await fs.promises.unlink(this.ruta)
    }
}

//Instancio productos
const Producto1 = {
    titulo: "Nike Dunk Low Harvest Moon",
    descripcion: "Zapatillas talle 10",
    precio: 500,
    imagen: "Sin imagen",
    codigo: "NDLHM1",
    stock: 6
}
const Producto2 = {
    titulo: "Nike Dunk Low Next Nature",
    descripcion: "Zapatillas talle 9.0",
    precio: 300,
    imagen: "Sin imagen",
    codigo: "NDLNN1",
    stock: 10
}
const Producto3 = {
    titulo: "Nike Dunk Low Pink Whisper",
    descripcion: "Zapatillas talle 9.5",
    precio: 480,
    imagen: "Sin imagen",
    codigo: "NDLPW1",
    stock: 22
}
const Producto4 = {
    titulo: "Nike Dunk Low USC",
    descripcion: "Zapatillas talle 10.5",
    precio: 350,
    imagen: "Sin imagen",
    codigo: "NDLUSC",
    stock: 12
}

const ruta = './productos.json'
async function test(){
    const PM = new ProductManager(ruta)
    await PM.AgregarProducto(Producto1)
    await PM.AgregarProducto(Producto2)
    await PM.AgregarProducto(Producto3)
    await PM.AgregarProducto(Producto4)
    console.log('__________ Lista de productos __________')
    const aux1 = await PM.ObtenerPoductos()
    console.log(aux1);
    console.log('__________ Obtener producto ID 3 __________')
    const aux2 = await PM.ObtenerProductoPorID(3)
    console.log(aux2);
    console.log('__________ Borrar producto, N° 2 __________')
    await PM.BorrarProductoPorID(2)
    const aux3 = await PM.ObtenerPoductos()
    console.log(aux3);
    console.log('__________ Editar producto, N° 4 __________')
    await PM.EditarProducto(4,'codigo','NDLUSC002')
    const aux4 = await PM.ObtenerPoductos()
    console.log(aux4);
    console.log('---------- Borro archivo ----------')
    await PM.BorrarArchivo()
}
test()