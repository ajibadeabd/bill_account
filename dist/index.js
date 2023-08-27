"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateBillingAmount = void 0;
const calculateBillingAmount = ({ subscriptionPlan, usageData, }) => {
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
    return { totalAmount, id: subscriptionPlan.id, currency: subscriptionPlan.currency };
};
exports.calculateBillingAmount = calculateBillingAmount;
