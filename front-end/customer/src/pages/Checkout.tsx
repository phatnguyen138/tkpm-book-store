import { useState } from "react";
import { 
    AiOutlineDollar 
} from "react-icons/ai";
import { FaMoneyBillWaveAlt } from 'react-icons/fa'
import {
    orderInfoUpdated,
} from "../redux/slices/cart"
import MoMoIcon from '../assets/momo_icon_square.png';
import { useAppSelector, useAppDispatch } from "../hooks/hook";
import { createNewOrderFromCartItem } from "../redux/slices/cart";
import { CartItem } from "../types/Products";
import { useNavigate } from 'react-router-dom';
import { getDiscountPrice, getCheckoutValue } from "../utils/product";
import { PaymentMethod } from "../types/Payment";
// import LocationSelectionForm from "../components/LocationSelectionForm";

type checkoutProps = {
  checkoutedItems: CartItem[]
}

const Item = (props : CartItem) => {
    const [open, setOpen] = useState<boolean>(false)
    const dispatch = useAppDispatch()

    function toggleOpen() {
        setOpen(prev => !prev)
    }

    function updateLocation(province: string, district: string, ward: string) {
      const location = `  ${ward},  ${district}, ${province}`
      dispatch(orderInfoUpdated({product: props.product, orderInfo: {...props.orderInfo, location: location}}))
    }

    return(
        <div className="relative flex items-center flex-col justify-between w-full my-2 border border-slate-300 px-2 py-2">
            {/* {open && <LocationSelectionForm closeForm={toggleOpen} updateLocation={updateLocation}/>} */}
            {/* <div className="absolute top-2 right-2 flex items-center h-[20px] cursor-pointer" onClick={() => {toggleOpen()}}>
              <span><HiOutlineLocationMarker className="text-sky-600 w-[20px] h-[20px]"/> </span>
              {!props.orderInfo?.location 
              ? <span className="italic font-medium text-slate-400">Chọn địa chỉ</span> 
              : <span className="italic font-medium text-sky-600">{props.orderInfo?.location}</span>
              }
            </div> */}
            <div className="grid grid-cols-checkout items-center gap-1">
                <div className="w-[120px] h-[150px] rounded-md overflow-hidden border border-gray-200">
                    <img 
                        className="w-full h-full object-cover"
                        src={props.product.image}
                    />
                </div>
                <div className="w-[350px] font-semibold">
                    {props.product.title}
                </div>
                <div className="font-semibold">
                  Số lượng: {props.quantity}
                </div>
                <div className="flex items-center">
                  <span className="mr-2 text-sky-600 font-semibold ">
                      {getDiscountPrice(props.product.price, 0, props.quantity, props.appliedCouponValue)}đ
                  </span>
                  <span className="font-normal text-slate-300 line-through">{props.product.price*props.quantity}đ</span>
                </div>
            </div>
      </div>
    )
}

const ItemList = ({checkoutedItems} : checkoutProps) => {

    return(
        <>
            {checkoutedItems.length ? 
                checkoutedItems.map((item : CartItem, i) => {
                    return (
                      <Item {...item} key={i}/>
                    )
                })
                : <p className="text-sm text-sky-600 font-semibold">Bạn chưa chọn bất kỳ sản phẩm nào để thanh toán!</p>
            }

        </>  
    )
}   

const Checkout = () => {
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(undefined);
    const [address,setAddress] = useState<string>("");
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const checkoutItems = useAppSelector((state => {
      return state.cart.items.filter(item => item.selected)
    }))
    const authUser = useAppSelector(state => state.user)
    const totalPrice = getCheckoutValue(checkoutItems)

    function anyItemLocationIncluded(items : CartItem[]) {
      return items.some(item => item.orderInfo.location === "")
    }

    function selectPaymentMethod(newMethod : PaymentMethod) {
      setPaymentMethod(prevMethod => {
        if(prevMethod === newMethod) return undefined
        return newMethod
      })
    }

    function handleCheckout(e : React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if(paymentMethod == undefined) {
          alert("Vui lòng chọn một phương thức thanh toán!")
          return
        }
        if(address === "") {
          alert("Vui lòng điền địa chỉ nhận hàng!")
          return;
        }
        if(authUser.email === "") {
          alert("Vui lòng đăng nhập để thực hiện thanh toán!")
          return
        }
        if(paymentMethod === "MoMo") {
          alert("Tính năng đang trong quá trình phát triển, vui lòng chọn hình thức thanh toán khác!")
        }
        if(paymentMethod == "Direct") {
            dispatch(createNewOrderFromCartItem({items: checkoutItems, userId: authUser.email}))
            alert("Đặt hàng thành công!!")
            navigate("/")
            window.location.reload();
        }

    }

    return (
        <form className="mt-4 mx-auto border border-slate-300 px-4 py-4 w-full max-w-[1200px]" onSubmit={(e)=>{handleCheckout(e)}}>
            <p className="font-semibold text-xl text-center text-red-600">Thanh toán đơn hàng</p>
            <ItemList checkoutedItems={checkoutItems}/> 
            <div className="mr-auto mt-2 w-3/5">
              <span className="text-base font-semibold">Địa chỉ người nhận:</span>
              <textarea className="w-full h-[50px] p-2 border resize-none font-medium text-sm" 
                onBlur={(e) => setAddress(e.target.value)}
              >
              </textarea>
            </div>
            <div className="mr-auto mt-2 w-3/5">
              <span className="text-base font-semibold">Số điện thoại:</span>
              <textarea className="w-full h-[50px] p-2 border resize-none font-medium text-sm" 
                onBlur={(e) => setAddress(e.target.value)}
              >
              </textarea>
            </div>
            <div>
              <p className="text-base text-sky-600 font-semibold">Hình thức thanh toán</p>
              <div className="flex gap-2">
                <div 
                  className={`border rounded-md px-2 py-2 w-fit flex items-center h-[40px] cursor-pointer `+
                  `${paymentMethod === "Direct" ? "bg-emerald-50 border-emerald-600" : "border-slate-200 hover:bg-emerald-50 hover:border-emerald-600"}`}
                  onClick={() => {selectPaymentMethod("Direct")}}
                >
                  <FaMoneyBillWaveAlt className="mr-2 text-emerald-600"/>
                  <span className=" text-emerald-600 font-semibold">Trực tiếp khi nhận hàng</span>
                </div>
                <div 
                 className={`border rounded-md px-2 py-2 w-fit flex items-center h-[40px] cursor-pointer `+
                 `${paymentMethod === "MoMo" ? "border-[#d82d8b] bg-[#ffd6e7]" : "border-slate-200 hover:border-[#d82d8b] hover:bg-[#ffd6e7]"}`}
                  onClick={() => {selectPaymentMethod("MoMo")}}
                >
                  <img src={MoMoIcon} className="h-full object-contain mr-2"/> 
                  <span className="text-[#d82d8b] font-semibold">Ví điện tử MoMo</span>
                </div>
              </div>
            </div>
            <div className="ml-auto w-fit flex items-center gap-3">
              <div className="text-sky-600 font-semibold text-base"><span className="font-bold text-red-600">TỔNG CỘNG: </span>{totalPrice}đ</div>
              <button className="px-2 py-2 border border-amber-300 font-semibold flex items-center hover:bg-amber-50 text-amber-300"  type="submit">
                <span>Thanh toán
                </span><AiOutlineDollar className="translate-y-[1px] ml-1"/>
              </button>
            </div>
        </form>
    )
}

export default Checkout