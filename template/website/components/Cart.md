# Cart

Displays all the products saved inside the cart vuex store

## Props

<!-- @vuese:Cart:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|cartHelper|CartHelper object to access to all the products data|`Object`|`false`|-|

<!-- @vuese:Cart:props:end -->


## Methods

<!-- @vuese:Cart:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onBackButtonPressed|Called by popstate event. Closes the cart on navigator back button pressed|-|
|itemQuantity|Calls the vuex store to add or subtract quantity of an item|index: the array item index quantity: the quantity to add or subtract from the item.|
|checkout|Calls the vuex store to generate the checkout url and sets the loading variable to true|-|
|cartToggle|Shows/hides the cart component.|pressedBack: is set to false by default. If true it doesn't handle the removal of the history entry because the browser does it automatically|
|toggleScrollBar|Shows/hides the page scrollbar.|-|
|addToHistory|Adds an entry to the browser history indicating the opening of the cart|-|
|removeFromHistory|Removes the opening cart history entry|-|
|suscribeToEvents|Subscribes to the cart_toggle, and popstate event|-|

<!-- @vuese:Cart:methods:end -->


