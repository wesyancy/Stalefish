const {client} = require('./');

async function createProduct({ title, description, type, category, rating, numReviews, image, price }) {

    try {
        const { rows: [product] } = await client.query(`
      INSERT INTO products (title, description, type, category, rating, numReviews, image, price)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
      RETURNING *;
    `, [title, description, type, category, rating, numReviews, image, price])

        return product;
    } catch (error) {
        throw error
    }
}

async function getAllProducts() {

    try {
        const { rows: productID } = await client.query(`
      SELECT id
      FROM products; 
    `);

        const products = await Promise.all(productID.map(
            product => getProductById(product.id)
        ));

        return products;
    } catch (error) {
        throw error
    }
}

async function getProductCategories() {

    try {
        const cat = await client.query(`
      SELECT category
      FROM products;  
    `);

        var categories = [];

        cat.rows.forEach(row => {
            if (!categories.includes(row.category)) {
                categories.push(row.category);
            }
        })

        return categories;
    } catch (error) {
        console.log(error);
    }
}

async function getProductById(id) {

    try {
        const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE id=$1;  
    `, [id]);

        if (!product) {
            throw {
                error: "error",
                name: "Product Not Found",
                message: "The requested product was not found"
            }
        };

        return product
    } catch (error) {
        throw error;
    }
}

async function getProductByCategory(category) {

    try {
        const { rows: [product] } = await client.query(`
      SELECT *
      FROM products
      WHERE category=$1;  
    `, [category]);

        if (!product) {
            throw {
                error: "error",
                name: "Product Not Found",
                message: "The requested product was not found"
            }
        };

        console.log(product);

        return product
    } catch (error) {
        throw error;
    }
}



async function updateProduct({ id, ...fields }) {

    const setString = Object.keys(fields).map(
        (key, index) => `"${key}"=$${index + 1}`
    ).join(', ');

    if (setString.length === 0) {
        return;
    }

    try {
        if (setString.length > 0) {
            await client.query(`
        UPDATE products
        SET ${setString}
        WHERE id=${id}
        RETURNING *;
      `, Object.values(fields));
        }

        return await getProductById(id);
    } catch (error) {
        throw error;
    }

}

async function destroyProduct(id) {

    try {
        const { rows } = await client.query(`
    DELETE from products
    WHERE id=$1
    RETURNING *;
  `, [id]);

        return rows;
    } catch (error) {
        throw error
    }
}

module.exports = {
    createProduct,
    getProductById,
    getAllProducts,
    updateProduct,
    destroyProduct,
    getProductByCategory,
    getProductCategories
}