import { useState, useEffect, useCallback } from 'react'

export function useAsync<dataType>(callback : () => any, dependecies : any[] = []) {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [data, setData] = useState<dataType | undefined>(undefined)

    function updateData(newData : dataType) {
        setData(newData)
    }

    const callbackMemoized = useCallback(() => {
        setLoading(true)
        callback().then((responseData : any) => setData(responseData)) 
            .catch(() => setError(true))
            .finally(() => setLoading(false))
    }, dependecies)
    
    useEffect(() => {
        callbackMemoized()
    }, [callbackMemoized])

    return {data, loading, error, updateData}
}