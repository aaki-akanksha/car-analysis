import data from './data.js';


export default function shortlistCars(answers, mustHaves, budget) {
  return data.map((car) => {
      let score = 0;

      // Budget (highest weight)
      if (car.onRoadPrice <= budget * 100000) {
        score += 40;
      }

      // Fuel preference
      if (
        answers.q5 &&
        answers.q5 !== "No preference" &&
        car.fuelType === answers.q5
      ) {
        score += 20;
      }

      // Family-focused users
      if (
        ["Kids too", "Full family + gear"].includes(answers.q3)
      ) {
        score += car.safetyRating * 5;
      }

      // City driving preference
      if (answers.q2 === "City / urban") {
        if (
          ["Compact SUV", "Micro SUV", "Hatchback"].includes(
            car.bodyType
          )
        ) {
          score += 15;
        }
      }

      // Highway users
      if (answers.q2 === "Highways mostly") {
        score += car.mileage;
      }

      // Must-have features
      const matchedFeatures = mustHaves.filter((feature) =>
        car.features?.includes(feature)
      ).length;

      score += matchedFeatures * 10;

      return {
        ...car,
        fitScore: score
      };
    })
    .sort((a, b) => b.fitScore - a.fitScore)
    .slice(0, 3);
}