
export interface Category {
    id: string,
    title: string,
    icon: string,   
}

export interface FoodModel {
    _id: string,
    name: string,
    description: string,
    category: string,
    price: number,
    readyTime: number,
    images: [string],
    unit: number
}


export interface Restaurant {
    _id: string,
    name: string,
    foodType: string,
    address: string,
    phone: string,
    images: string,
    foods: [FoodModel]
}

export interface FoodAvailability {
    categories: [Category],
    restaurants: [Restaurant],
    foods: [FoodModel]
}

export interface UserModel {
    email: string,
    token: string,
    verified: boolean
}

export interface UserState {
    user: UserModel,
    location: string,
    postCode: string,
    error: string | undefined,
    cart: [FoodModel]
}

export interface ShoppingState {
    availability: FoodAvailability,
    availableFoods: [FoodModel]
}