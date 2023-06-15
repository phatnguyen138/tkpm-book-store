import axios from 'axios'

const api = axios.create({
    baseURL: "https://vn-public-apis.fpo.vn"
})



export function getProvinceList() {
    return api('/provinces/getAll', {
        params: {
            limit: -1 //limit = -1 means get all according to document
        }
    }).then(res =>  res.data.data.data)
}

export function getDistrictListByProvinceCode(provinceCode: string) {
    return api('/districts/getByProvince', {
        params: {
            provinceCode: provinceCode,
            limit: -1 //limit = -1 means get all according to document
        }
    }).then(res =>  res.data.data.data)
}

export function getWardListByDistrictCode(districtCode: string) {
    return api('/wards/getByDistrict', {
        params: {
            districtCode: districtCode,
            limit: -1 //limit = -1 means get all according to document
        }
    }).then(res =>  res.data.data.data)
}