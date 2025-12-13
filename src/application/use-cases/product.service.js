const Product = require('../../domain/entities/product.entity');
const { NotFoundError } = require('../../domain/errors');

class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    
    async getAllProducts() {
        return this.productRepository.getAll();
    }

    async getProductById(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }
        return product;
    }

    async createProduct(productData) {
        const productEntity = new Product(
            null, // ID generado por la DB
            productData.name,
            productData.description,
            productData.price,
            productData.stock,
            productData.category,
            productData.brand,      
            productData.imageUrl
        );
        return this.productRepository.create(productEntity);
    }

    async updateProduct(id, productData) {
        const existingProduct = await this.productRepository.getById(id);
        if (!existingProduct) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }

        const productEntity = new Product(
            id,
            productData.name,
            productData.description,
            productData.price,
            productData.stock,
            productData.category,
            productData.brand,      
            productData.imageUrl
        );
        return this.productRepository.update(id, productEntity);
    }

    async deleteProduct(id) {
        const product = await this.productRepository.getById(id);
        if (!product) {
            throw new NotFoundError(`Product with id ${id} not found`);
        }
        return this.productRepository.delete(id);
    }
}

module.exports = ProductService;
