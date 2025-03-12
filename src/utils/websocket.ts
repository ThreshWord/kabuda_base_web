import { Config } from '../config/config'
import { Alert } from '../messageFeedback/alert'

/**
 * # 内置的Websocket助手
 * @author dyz
 */
export class WebsocketServe {
  /**
   * # WebSocket实例
   */
  websocket!: WebSocket

  /**
   * # 是否已连接
   */
  isConnected = false

  /**
   * # 同步Timer
   */
  private heartBeatTimer!: number

  /**
   * # 心跳秒
   */
  private heartBeatSecond = 30

  /**
   * # 自动重连
   */
  private reconnectWhenClosed = true

  /**
   * # 设置Websocket心跳秒
   * @param second 秒
   */
  setHeartBeatTime(second: number): WebsocketServe {
    this.heartBeatSecond = second
    return this
  }

  /**
   * 心跳
   */
  private startHeartBeat() {
    clearTimeout(this.heartBeatTimer)
    if (this.isConnected) {
      this.websocket.send('ping')
      this.heartBeatTimer = setTimeout(() => {
        this.startHeartBeat()
      }, this.heartBeatSecond * 1000)
    }
  }

  /**
   * # 是否自动重连
   * @param autoConnectWhenClose 是否自动重连
   */
  private autoConnectWhenClosed(autoConnectWhenClose = true) {
    this.reconnectWhenClosed = autoConnectWhenClose
  }

  /**
   * # 创建一个WebSocket
   */
  static create(handler: { onmessage?: (message: string) => void; onopen?: () => void }): void {
    if (!Config.websocketUrl) {
      Alert.error('请配置环境变量 VITE_APP_WEBSOCKET_URL')
      return
    }
    const instance = new WebsocketServe()
    instance.websocket = new WebSocket(Config.websocketUrl)
    instance.websocket.onopen = () => {
      instance.isConnected = true
      instance.startHeartBeat()
      if (handler.onopen) {
        handler.onopen()
      }
    }
    instance.websocket.onmessage = (message) => {
      if (handler.onmessage) {
        handler.onmessage(message.data)
      }
    }
    instance.websocket.onclose = () => {
      instance.isConnected = false
      if (instance.reconnectWhenClosed) {
        // Reconnect when close by exception
        setTimeout(() => {
          this.create(handler)
        }, 1000)
      }
    }
  }

  /**
   * # 关闭WebSocket
   */
  close() {
    this.reconnectWhenClosed = false
    this.websocket.close()
  }
}
