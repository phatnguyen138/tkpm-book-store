import { useState, useEffect } from 'react'
import { AiOutlineMinus, AiOutlinePlus, AiFillStar } from 'react-icons/ai'
import { BsCartPlus } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
import { CartItem, Product } from '../types/Products.js'
import { productAdded } from '../redux/slices/cart.js'
import { addCartItemToDB, updateCartItemQuantityToDB } from '../redux/slices/cart'
import { useAppSelector, useAppDispatch } from '../hooks/hook'
import { getProductById } from '../lib/axios/products'

const ProductItemDetail = () => {
    const { id } = useParams()
    const dispatch = useAppDispatch()
    const authUser = useAppSelector(state => state.user.email)
    const cartItems = useAppSelector(state => state.cart.items)
    const [quantity, setQuantity] = useState<number>(0)
    const [itemDetail, setItemDetail] = useState<Product>();

    function getCartItemId(cartItems: CartItem[], productId: string): string | undefined {
        console.log("cartItems: " + cartItems);
        const cartItem = cartItems.find(item => item.product?.book_id === productId)
        console.log("cartItem: " + cartItem)
        return cartItem ? cartItem.book_id : undefined;
    }

    async function addToCart(product: Product | undefined, quantity: number, selected: boolean = false) {
        if (quantity > 0) {
            const cartItemId = getCartItemId(cartItems, product!.book_id);
            if (authUser !== "") {
                if (cartItemId) {
                    console.log("Increase")
                    dispatch(updateCartItemQuantityToDB({
                        option: 'increase',
                        body: {
                            quantity: quantity, itemId: cartItemId
                        }
                    }))
                } else {
                    console.log("addCartItemToDB")
                    // dispatch(addCartItemToDB({ product: product, quantity: quantity})).unwrap()
                    dispatch(productAdded({product: product, quantity: quantity}));
                }
            }
            else {
                dispatch(productAdded({ product: product, quantity: quantity, selected: selected }));
                console.log("productAdded")
            }
        }
    }

    const fetchProduct = async (id: string) => {
        try {
            const product = await getProductById(id);
            setItemDetail(product.data);
        } catch (error) {
            console.log("Error loading item detail");
        }
    };

    useEffect(() => {
        fetchProduct(id as string);
    }, []);

    return (
        <div className='flex border h-fit border-gray-200 ml` ml-10 mt-5 rounded-sm'>
            <div className='h-[500px] w-[350px] overflow-hidden'>
                <img
                    className='w-full h-full object-cover'
                    src={itemDetail?.image}
                />
            </div>
            <div className="px-3 py-4 border-l w-[550px]">
                <h4 className="font-semibold text-xl">{itemDetail?.title}</h4>
                <div><span className='italic font-semibold'>Tác giả:</span> <span className='font-semibold'>{itemDetail?.authors}</span></div>
                <div className="flex items-center gap-2.5">
                    <span className='flex'>
                        <AiFillStar className="text-amber-300" />
                        <AiFillStar className="text-amber-300" />
                        <AiFillStar className="text-amber-300" />
                        <AiFillStar className="text-amber-300" />
                        <AiFillStar className="text-amber-300" />
                    </span>
                    <span className='text-sm text-gray-400'>(Xem 1000 đánh giá)</span>
                    <span className='text-sm text-gray-400'>Đã bán 1000+</span>

                </div>
                <div>
                    <div className='my-3 w-full h-[1px] bg-gray-200'></div>
                    <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                    <div className='my-2'>
                        <p className='italic font-semibold'>Số lượng: </p>
                        <div className="mt-1 flex items-center rounded-md border border-slate-200 h-fit w-fit">
                            <button
                                onClick={() => setQuantity(prev => { return prev > 0 ? prev - 1 : 0 })}
                                className="p-2 border-r hover:bg-slate-100 border-slate-200"
                            >
                                <AiOutlineMinus />
                            </button>
                            <input type="text" value={quantity} className="h-full w-[40px] text-center outline-none" />
                            <button
                                onClick={() => setQuantity(prev => prev + 1)}
                                className="p-2 border-l hover:bg-slate-100 border-slate-200"
                            >
                                <AiOutlinePlus />
                            </button>
                        </div>
                        <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                        <div>
                            <p className='italic font-semibold'>Thể loại:</p>
                        </div>
                        <div className="font-semibold text-sky-600 border border-sky-600 px-2 py-2 w-fit rounded-md">
                            {itemDetail?.genres}
                        </div>
                        <div className='my-3 w-full h-[0.5px] bg-gray-200'></div>

                        <button
                            onClick={() => { addToCart(itemDetail, quantity) }}
                            className="flex items-center rounded-md mt-5 px-[10px] py-[10px]  text-sky-600 border border-sky-600"
                        >
                            <BsCartPlus className="text-lg font-semibold" />
                            <span className="ml-2 font-semibold">Thêm vào giỏ hàng</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className=' h-10 '></div>
        </div>
    )

}

export default ProductItemDetail