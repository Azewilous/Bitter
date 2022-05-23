import { useState, useEffect } from 'react'
import WebSocket from 'ws';

export const useWebSocketLite = ({ socketUrl, retry: defaultRetry = 5, retryInterval = 2000 }) => {
  const [data, setData] = useState()
  const [send, setSend] = useState(() => () => undefined)
  const [retry, setRetry] = useState(defaultRetry)
  const [readyState, setReadyState] = useState(false)

  useEffect(() => {
    const ws = new WebSocket(socketUrl)
    ws.onopen = () => {
      console.log(`connected to socket ${socketUrl}`)
      setReadyState(true)

      setSend(() => {
        return (data) => {
          try {
            const jsonData = JSON.stringify(data)
            ws.send(jsonData)
            return true
          } catch (err) {
            return false
          }
        }
      })

      ws.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data)
          setData({ message, timestamp: new Date().getTime() })
        } catch (err) {
          console.log('could not parse data', event.data)
        }

      }
    }

    ws.onclose = () => {
      setReadyState(false)
      if (retry > 0) {
        setTimeout(() => {
          setRetry((retry) => retry - 1)
        }, retryInterval)
      }
    }

    return () => {
      ws.close()
    }
  }, [retry])
  return { send, data, readyState }
}

export default useWebSocketLite