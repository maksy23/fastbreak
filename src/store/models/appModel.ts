export interface AppModel {
  appName: string | null
}

const appModel = (): AppModel => {
  return {
    appName: 'fastbreak',
  }
}

export default appModel
