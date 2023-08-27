interface SubscriptionPlan {
    id: string;
    price: number;
    usage_limits: {
        [key: string]: {
            limit: number;
            overageRate: number;
        };
    };
    currency: string;
    payment_frequency: string;
}
interface UsageData {
    [key: string]: {
        used: number;
    };
}
interface BillingResult {
    totalAmount: number;
    currency: string;
    id: string;
}
export declare const calculateBillingAmount: ({ subscriptionPlan, usageData, }: {
    subscriptionPlan: SubscriptionPlan;
    usageData: UsageData;
}) => BillingResult;
export {};
