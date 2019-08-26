# App

This is the main component

## Methods

<!-- @vuese:App:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onResize|Calls to setBreakpoint on screen resize|-|
|fetchData|Calls to fetchStoreData on StoreData vuex store if the route is defined. fetchStoreData asks for the store slug, which is taken from the slug param of the url or the defaultSlug at the config file|-|
|setApp|Sets app configurations and checks validity of routes|-|
|isValidPage|Checks if the current store belongs to this domain|-|

<!-- @vuese:App:methods:end -->


