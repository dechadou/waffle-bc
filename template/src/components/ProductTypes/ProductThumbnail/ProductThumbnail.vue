<script src="./ProductThumbnail.js"></script>

<template>
<div>
	<article class="product main" v-if="type == 0">
		<div class="row">
			<div class="col-12 p-0 d-block d-md-none">
				<div class="image-wrap">
					<i class="fas fa-circle-notch fa-spin fa-3x"></i>	
					<img :src="image" class="img-fluid mx-auto d-block">
				</div>
			</div>
			<div class="col-12 col-md-4 description">
				<div class="description-content">
					<div class="row">
						<div class="col-8 pr-0">
							<h1>{{ name }}</h1>
						</div>
						<div class="col-4 pl-0">
							<span class="price float-right"><span>$</span>{{ price }}</span>
						</div>
						<div class="col-12 col-md-11">
							<p v-html="description"></p>
						</div>
					</div>
					<AddToCartButton :slug="slug" :data="selectedArticle" :isBundle="isBundle" :image="image" />
				</div>
			</div>
			<div class="col-12 col-md-8 d-none d-md-block">
				<div class="image-wrap">
					<i class="fas fa-circle-notch fa-spin fa-3x"></i>	
					<img :src="image" class="img-fluid mx-auto d-block">
				</div>
			</div>
		</div>
    </article>
	<article class="product" v-else>
		<div class="row">
			<div class="col-12" v-bind:class="{ 'imagen-expandida-izquierda': type == 2 || type == 5, 'imagen-expandida-derecha': type == 3 || type == 6}">
				<div class="image-wrap">
					<i class="fas fa-circle-notch fa-spin fa-3x"></i>	
					<img :src="image" class="img-fluid mx-auto d-block">
				</div>
			<div class="row desc">
				<div class="col-8 pr-0" v-bind:class="{ 'pl-md-0': type == 2 || type == 5}">
					<h1>{{ name }}</h1>
				</div>
				<div class="col-4 pl-0" v-bind:class="{ 'pr-md-0': type == 3 || type == 6 }" >
					<span class="price float-right"><span>$</span>{{ price }}</span>
				</div>
				<div class="col-12 col-md-11 description-cont" v-bind:class="{ 'pl-md-0': type == 2 || type == 5}" v-if="type == 1 || type == 5 || type == 6">
					<p v-html="description"></p>
				</div>
			</div>
			<AddToCartButton :slug="slug" :data="selectedArticle" :isBundle="isBundle" :image="image" />
			</div>
		</div>
	</article>
</div>
</template>
