import { createStore, createTypedHooks } from 'easy-peasy'
import type { Store } from 'easy-peasy'

import appModel from './models/appModel'
import { AppModel } from './models/appModel'

export interface StoreModel {
  app: AppModel
}

const model: StoreModel = {
  app: appModel(),
}

// Create the store
const store: Store<StoreModel> = createStore(model)

// Create typed hooks
const typedHooks = createTypedHooks<StoreModel>()

// Export the typed hooks
// Use these instead of the hooks from the easy-peasy package in components
export const UseStoreActions = typedHooks.useStoreActions
export const UseStoreState = typedHooks.useStoreState

// Export the store as default
export default store
