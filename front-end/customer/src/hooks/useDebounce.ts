import { useRef, useEffect, useCallback } from "react";

export function useDebounce(callback : any, delay : number, dependencies : any[]) {
    const callbackRef = useRef(callback)
    const timeoutRef = useRef<ReturnType<typeof setTimeout>>()

    useEffect(() => {
        callbackRef.current = callback
    }, [callback])

    const set = useCallback(() => {
        timeoutRef.current = setTimeout(() => callbackRef.current(), delay)        
    }, [delay])

    const clear = useCallback(() => {
        timeoutRef.current && clearTimeout(timeoutRef.current)
    }, [])

    const reset = useCallback(() => {
        clear()
        set()
    }, [clear, set])

    // reset timeout whenever state changes
    useEffect(() => {
        reset()
        return clear
    }, [reset, ...dependencies])

    // clear timeout when component is first mounted
    useEffect(() => {
        clear()
    }, [])
}
