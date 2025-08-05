import { Product, products } from "@/products/data/products"
import { ItemCard } from "@/shopping-cart/actions/components/ItemCard"
import Widget from "@/components/Widget"
import { cookies } from "next/headers"

export const metadata = {
    title: 'Carrito de Compras',
    description: 'Carrito de Compras',
}

interface ProductInCart {   
    product: Product
    quantity: number
}
const getProductsInCart = (cart: { [id: string]: number }): ProductInCart[] => {
    const productInCart: ProductInCart[] = []
    for (const id of Object.keys(cart)){
        const product = products.find(p => p.id === id)
        if (product){
            productInCart.push({ product, quantity: cart[id] })
        }
    }
    return productInCart
}
export default async function CartPage() {

    const cookieStore = await cookies()
    const cart = JSON.parse(cookieStore.get('cart')?.value ?? '{}') as { [id: string]: number }
    const productsInCart = getProductsInCart(cart)
    const totalToPay = productsInCart.reduce((prev, current) => prev + current.product.price * current.quantity, 0)

    return (
        <div>
            <h1 className="text-2xl font-bold">Productos del Carrito</h1>
            <hr className="my-4 mb-2"/>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center w-full">
                <div className="w-full flex flex-col gap-2 sm:w-8/12">
                    {
                        productsInCart.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-full">
                                <h2 className="text-2xl font-bold">No hay productos en el carrito</h2>
                            </div>
                        ) : (

                        productsInCart.map(({product, quantity}) => (
                            <ItemCard key={product.id} product={product} quantity={quantity} />
                        ))
                        )
                    }
                </div>
                <div className="w-full flex flex-col gap-2 sm:w-4/12">
                    <h2 className="text-2xl font-bold">Resumen de la compra</h2>
                    <Widget title="Resumen de la compra">
                        <div className="flex gap-4 mt-2">
                            <h3 className="text-xl font-bold">Total</h3>
                            <h3 className="text-xl font-bold">${(totalToPay * 1.15).toFixed(2)}</h3>
                            <span className="text-gray-500">Impuestos 15%: ${totalToPay * 0.15}</span>
                        </div>
                    </Widget>
                </div>
            </div>
        </div>
    )
}