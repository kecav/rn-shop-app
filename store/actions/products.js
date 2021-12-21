import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCTS = "SET_PRODUCTS";

export const fetchProducts = () => {
    return async (dispatch, getState) => {
        const userId = getState().auth.userId;
        try {
            const response = await fetch(
                "https://rn-shopapp-d455e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json"
            );
            if (!response.ok) {
                throw new Error("Something went Wrong !");
            }
            const resData = await response.json();
            // console.log("RES DATA from ACTIONS: ", resData);
            const loadedProducts = [];

            for (const key in resData) {
                loadedProducts.push(
                    new Product(
                        key,
                        resData[key].ownerId,
                        resData[key].title,
                        resData[key].imageUrl,
                        resData[key].description,
                        resData[key].price
                    )
                );
            }

            dispatch({
                type: SET_PRODUCTS,
                products: loadedProducts,
                userProducts: loadedProducts.filter(
                    (prod) => prod.ownerId === userId
                ),
            });
        } catch (error) {
            throw error;
        }
    };
};

export const deleteProduct = (productId) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(
            `https://rn-shopapp-d455e-default-rtdb.asia-southeast1.firebasedatabase.app/products/${productId}.json?auth=${token}`,
            {
                method: "DELETE",
            }
        );
        dispatch({ type: DELETE_PRODUCT, pId: productId });
    };
};

export const createProduct = (title, description, imageUrl, price) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        const userId = getState().auth.userId;
        const response = await fetch(
            `https://rn-shopapp-d455e-default-rtdb.asia-southeast1.firebasedatabase.app/products.json?auth=${token}`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                    price,
                    ownerId: userId,
                }),
            }
        );

        const resData = await response.json();
        console.log("CREATING PRODUCT FROM ACTIONS : ");

        dispatch({
            type: CREATE_PRODUCT,
            productData: {
                id: resData.name,
                title,
                description,
                imageUrl,
                price,
                ownerId: userId,
            },
        });
    };
};

export const updateProduct = (id, title, description, imageUrl) => {
    return async (dispatch, getState) => {
        const token = getState().auth.token;
        await fetch(
            `https://rn-shopapp-d455e-default-rtdb.asia-southeast1.firebasedatabase.app/products/${id}.json?auth=${token}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    description,
                    imageUrl,
                }),
            }
        );

        console.log("UPDATING PRODUCT FROM ACTIONS :", id);
        dispatch({
            type: UPDATE_PRODUCT,
            pId: id,
            productData: {
                title,
                description,
                imageUrl,
                // price
            },
        });
    };
};
