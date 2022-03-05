
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

export interface CartModel {
    _id: string,
    food: FoodModel,
    unit: number
}

export interface OrderModel {
    _id: string,
    orderID: string,
    items: [CartModel],
    totalAmount: number,
    orderDate: number,
    paidThrough: string,
    paymentResponse: string,
    orderStatus: string
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
    firstName: string,
    lastName: string,
    email: string,
    token: string,
    verified: boolean
}

export interface UserState {
    user: UserModel,
    location: string,
    postCode: string,
    error: string | undefined,
    cart: [FoodModel], 
    orders: [OrderModel],
    appliedOffer: OfferModel,
}

export interface ShoppingState {
    availability: FoodAvailability,
    availableFoods: [FoodModel], 
    offers: [OfferModel]
}

export interface OfferModel {
    _id: string,
    offerType: string,
    vendors: [any],
    images: [string],
    title: string,
    description: string,
    minValue: number,
    offerAmount: number,
    offerPercentage: number,
    startValidity: Date,
    endValidity: Date,
    promoCode: string,
    promoType: string,
    bank: [any],
    bin: [any],
    pincode: string
}