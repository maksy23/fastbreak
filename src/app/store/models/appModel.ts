export interface AppModel {
  appName: string | null
}

const appModel = (): AppModel => {
  return {
    appName: 'ai-app',
  }
}

export default appModel
