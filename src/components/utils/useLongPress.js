import { useCallback, useEffect, useRef } from "react"

const defaultOptions = {
  ms: 300
}

const pointerMoveThreshold = 5

/**
 * This is a hook to detech long press on devices
 * @param {function}
 * @returns  click events
 */

export const useLongPress = function (callback, options = defaultOptions) {
  const data = useRef({
    timerHandle: 0,
    mouseStartPos: { x: 0, y: 0 },
    stopPropagation: false,
    callback: callback,
    options: options
  })

  useEffect(() => {
    return () => {
      clearTimeout(data.current.timerHandle)
    }
  }, [])

  // cache callback and options in ref to prevent re-creating the pointer handlers
  useEffect(() => {
    data.current.callback = callback
    data.current.options = options
  }, [callback, options])

  const pointerDown = useCallback((event) => {
    event.persist()
    data.current.mouseStartPos = { x: event.pageX, y: event.pageY }
    data.current.stopPropagation = false
    data.current.options.onPointerDownCapture && data.current.options.onPointerDownCapture(event)

    clearTimeout(data.current.timerHandle)
    data.current.timerHandle = setTimeout(() => {
      const stop = data.current.callback(event)
      data.current.stopPropagation = stop === false
    }, data.current.options.ms || defaultOptions.ms)
  }, [])

  const stop = useCallback(() => {
    if (!data.current.timerHandle) return

    clearTimeout(data.current.timerHandle)
    data.current.timerHandle = 0

    data.current.options.onCancel && data.current.options.onCancel()
  }, [])

  const pointerUp = useCallback(
    (event) => {
      event.persist()
      data.current.options.onPointerUpCapture && data.current.options.onPointerUpCapture(event)
      stop()
      // console.log("mouseStartPos", data.current.mouseStartPos)
    },
    [stop]
  )

  const pointerMove = useCallback(
    (event) => {
      event.persist()
      data.current.options.onPointerMoveCapture && data.current.options.onPointerMoveCapture(event)
      // console.log("threshold:",event.nativeEvent.offsetX,event.nativeEvent.offsetY)

      //apply threshold because the device touch screen is sensitive
      if (
        Math.abs(event.pageX - data.current.mouseStartPos.x) > pointerMoveThreshold ||
        Math.abs(event.pageY - data.current.mouseStartPos.y) > pointerMoveThreshold
      )
        stop()
    },
    [stop]
  )

  const onClick = useCallback(
    (event) => {
      if (data.current.stopPropagation) {
        event.preventDefault()
        event.nativeEvent.stopImmediatePropagation()
        event.stopPropagation()
        return false
      }
    },
    [data.current]
  )

  return {
    onClickCapture: onClick,
    onPointerDownCapture: pointerDown,
    onPointerUpCapture: pointerUp,
    onPointerMoveCapture: pointerMove,
    onContextMenuCapture: (event) => {
      event.preventDefault()
      event.stopPropagation()
      return false
    }
  }
}
