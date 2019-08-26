# RelatedProducts

Displays a list of related products of the product that has been added to the cart.

## Props

<!-- @vuese:RelatedProducts:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|cartHelper|CartHelper Object used for accessing to all the products data|`Object`|`false`|-|

<!-- @vuese:RelatedProducts:props:end -->


## Methods

<!-- @vuese:RelatedProducts:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|onBackButtonPressed|Called by popstate event. Closes the module on navigator back button pressed|-|
|toggleRelatedProductsDelay|Populates the module and calls the toggleRelatedProducts() function after 0.5s|-|
|toggleRelatedProducts|Shows/hides the module and sets a height based on the screen size and the height of the products|pressedBack: is set to false by default. If true it doesn't handle the removal of the history entry because the browser does it automatically|
|openCart|Closes the RelatedProducts module and triggers the cart_toggle event|-|
|populateRelatedProducts|Takes the id's of the related products of the added to cart product, gets the product data of each ID and adds them to the relatedList array If there aren't related products it gets three random products.|-|

<!-- @vuese:RelatedProducts:methods:end -->


