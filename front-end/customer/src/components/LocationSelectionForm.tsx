import { useState, useEffect } from 'react'
import { AiOutlineDown, AiOutlineClose } from 'react-icons/ai'
import { FaShippingFast } from 'react-icons/fa'
import { 
    getProvinceList, 
    getDistrictListByProvinceCode, 
    getWardListByDistrictCode 
} from '../lib/location/location'

type locationProps = {
    level: 'province' | 'district' | 'ward',
    prevLevelCode?: string,
    updateItem: (name: string, code: string, fullName: string) => void
}

type LocationItem = {
    name: string,
    code: string,
    name_with_type: string
}

const LocationLevel = ({level, prevLevelCode, updateItem} : locationProps) => {
    const [itemList, setItemList] = useState<LocationItem[]>([])
    useEffect(() => {
        if(level === 'province') {
            getProvinceList().then(res => setItemList(res))
        } 
        else if(level === 'district') {            
            getDistrictListByProvinceCode(prevLevelCode!).then(res => setItemList(res))
        } 
        else if(level === 'ward'){
            
            getWardListByDistrictCode(prevLevelCode!).then(res => setItemList(res))
        }
    }, [])

    return (
        <ul className='absolute w-full max-h-[300px] bg-white overflow-y-auto top-[40px] right-0 z-100'>
            {itemList.map((item, index) => {
                return (
                    <li className="hover:bg-slate-200 cursor-pointer px-2 py-1" 
                        key={index} 
                        onClick={() => {                            
                            updateItem(item.name, item.code, item.name_with_type)
                        }}
                    >
                        {item.name}
                    </li>
                )
            })}
            
        </ul>
    )
}

type LocationOption = {
    name: string,
    fullName: string,
    open: boolean,
    code: string
}

type locationFormProps = {
    closeForm: () => void
    updateLocation: (province: string, district: string, ward: string) => void
}

const LocationSelectionForm = ({closeForm, updateLocation} : locationFormProps) => {
    const [provinceOption, setProvinceOption] = useState<LocationOption>({name: "Chọn tỉnh/thành phố...", open: false, fullName: "", code: ""})
    const [districtOption, setDistrictOption] = useState<LocationOption>({name: "Chọn quận/huyện...", open: false, fullName: "", code: ""})
    const [wardOption, setWardOption] = useState<LocationOption>({name: "Chọn phường/xã...", open: false, fullName: "", code: ""})

    function updateProvince(name : string, code : string, fullName: string) {        
        setProvinceOption((prev) => {
            return {
                ...prev,
                name: name,
                code: code,
                fullName: fullName,
                open: false
            }
        })
    }
    function updateDistrict(name : string, code : string, fullName: string) {        
        setDistrictOption((prev) => {
            return {
                ...prev,
                name: name,
                code: code,
                fullName: fullName,
                open: false
            }
        })
    }
    function updateWard(name : string, code : string, fullName: string) {        
        setWardOption((prev) => {
            return {
                ...prev,
                name: name,
                code: code,
                fullName: fullName,
                open: false
            }
        })
    }

    return (
        <div className='rounded-md absolute w-[500px] h-fit px-[20px] py-[25px] flex flex-col items-center gap-3 border border-slate-400 bg-slate-50 z-50'>
            <div className='flex items-center relative'>
                <h4 className='text-lg font-semibold'>Chọn địa chỉ giao hàng</h4>
                <AiOutlineClose className='text-slate-400 hover:text-red-500 my-0 absolute -top-5 -right-[150px] cursor-pointer' onClick={closeForm}/>
            </div>
            <div className='flex items-center justify-between w-full'>
                <h4 className='text-base font-semibold'>Tỉnh/Thành phố</h4>
                <div className='flex items-center bg-white rounded-sm border border-slate-400 min-w-[300px] relative z-10'>
                    <div className='grow py-1 px-2'>{provinceOption.name}</div>
                    <AiOutlineDown className='  ml-2 px-1 w-[25px] h-[20px] text-slate-400 border-l border-slate-400 hover:bg-slate-200 hover:text-slate-500' onClick={() => {setProvinceOption(prev => {return {...prev, open: !prev.open}})}}/>
                    {provinceOption.open && <LocationLevel level="province" updateItem={updateProvince}/>}
                </div>
            </div>
            
            <div className='flex items-center justify-between w-full'>
                <h4 className='text-base font-semibold'>Quận/Huyện</h4>
                <div className='flex items-center bg-white rounded-sm border border-slate-400 min-w-[300px] relative z-[8]'>
                    <div className='grow py-1 px-2'>{districtOption.name}</div>
                    <AiOutlineDown className='  ml-2 px-1 w-[25px] h-[20px] text-slate-400 border-l border-slate-400 hover:bg-slate-200 hover:text-slate-500' onClick={() => {setDistrictOption(prev => {return {...prev, open: !prev.open}})}}/>
                    {districtOption.open && <LocationLevel level="district" prevLevelCode={provinceOption.code} updateItem={updateDistrict}/>}
                </div>
            </div>

            <div className='flex items-center justify-between w-full'>
                <h4 className='text-base font-semibold'>Phường/Xã</h4>
                <div className='flex items-center bg-white rounded-sm border border-slate-400 min-w-[300px] relative z-[6]'>
                    <div className='grow py-1 px-2'>{wardOption.name}</div>
                    <AiOutlineDown className='  ml-2 px-1 w-[25px] h-[20px] text-slate-400 border-l border-slate-400 hover:bg-slate-200 hover:text-slate-500' onClick={() => {setWardOption(prev => {return {...prev, open: !prev.open}})}}/>
                    {wardOption.open && <LocationLevel level="ward" prevLevelCode={districtOption.code} updateItem={updateWard}/>}
                </div>
            </div>
            <button className='flex items-center gap-2 px-2 py-2 rounded-md border border-sky-600 bg-white hover:bg-sky-100' onClick={() => {
                if(provinceOption.name != "Chọn tỉnh/thành phố..." 
                    && districtOption.name != "Chọn quận/huyện..."
                    && wardOption.name != "Chọn phường/xã..."
                ) {
                    updateLocation(provinceOption.fullName, districtOption.fullName, wardOption.fullName)
                    closeForm()
                } else {
                    alert("Vui lòng điền đầy đủ thông tin địa chỉ!!!")
                }
            }}>
                <p className='font-semibold text-sky-600'>Giao đến địa chỉ này</p>
                <FaShippingFast className='text-sky-600' />
            </button>

        </div>
  )
}

export default LocationSelectionForm