interface SubscriptionPlan {
    id: string;
    price: number;
    usage_limits: { [key: string]: { limit: number; overageRate: number } };
    currency: string;
    payment_frequency: string;
  }
  
  interface UsageData {
    [key: string]: { used: number };
  }
  
  interface BillingResult {
    totalAmount: number;
    currency: string;
    id: string;
  }
  
  export const calculateBillingAmount = ({
    subscriptionPlan,
    usageData,
  }: {
    subscriptionPlan: SubscriptionPlan;
    usageData: UsageData;
  }): BillingResult => {
    let basePrice = subscriptionPlan.price;
  
    // Calculate additional charges based on usage
    let usageCharges = 0;
    if (subscriptionPlan.usage_limits) {
      const usageLimits = subscriptionPlan.usage_limits;
      for (const usageType in usageData) {
        if (usageLimits[usageType]) {
          const usedAmount = usageData[usageType].used;
          const limit = usageLimits[usageType].limit;
  
          if (usedAmount > limit) {
            const overageRate = usageLimits[usageType].overageRate;
            usageCharges += (usedAmount - limit) * overageRate;
          }
        }
      }
    }
  
    let totalAmount = Number(basePrice) + usageCharges;
    return { totalAmount, id: subscriptionPlan.id,currency :subscriptionPlan.currency};
  };
  