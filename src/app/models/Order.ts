export interface Order {
    id?: string;
    customerId: string;
    itemName: string;
    quantity: number;
    unitPrice: number;
    tax: number;
    total: number;
    createdTimestamp: string;
    paymentTimestamp: string;
    shippedTimestamp: string;
}