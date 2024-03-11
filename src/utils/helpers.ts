export const getEnergyConsumption = (kg: number): number => {
    const joules = 1.35 * Math.pow(10, 7);
    return joules * kg;
}