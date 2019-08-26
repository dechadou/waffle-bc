# AddToCartButton

The base component for AddToCart Buttons. AddToCart Buttons should inherit from this component

## Props

<!-- @vuese:AddToCartButton:props:start -->
|Name|Description|Type|Required|Default|
|---|---|---|---|---|
|link|The product internal link|`String`|`false`|-|
|id|The product id|`Number`|`false`|-|
|productClass|The product class (example: product/bundle)|`String`|`false`|-|

<!-- @vuese:AddToCartButton:props:end -->


## Methods

<!-- @vuese:AddToCartButton:methods:start -->
|Method|Description|Parameters|
|---|---|---|
|addToCart|Generates a ProductID object based on the 'id' and 'productClass' props and passes it to the Cart vuex store|toggleOtherModules: default to true. If true, it triggers the ON_RELATED_PRODUCTS_TOGGLE or ON_CART_TOGGLE event (depending on the theme).|
|openLink|Pushes the prop 'link' to the router|-|

<!-- @vuese:AddToCartButton:methods:end -->


