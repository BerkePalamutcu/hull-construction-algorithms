import { orientation } from './orientation';

export const jarvisMarch = (points) => {
  // Log the start of the convex hull calculation
  console.log('Starting Jarvis March algorithm for convex hull calculation.');

  // Check if there are enough points to form a convex hull
  if (points.length < 3) {
    console.log(
      'Insufficient points for a convex hull. Need at least 3 points.'
    );
    return [];
  }

  console.log('Finding the leftmost point.');
  let leftMost = 0;

  // Loop through the points to find the leftmost one
  for (let i = 1; i < points.length; i++) {
    console.log(`Checking if point ${i} is the leftmost.`);
    if (points[i].x < points[leftMost].x) {
      console.log(`New leftmost point found at index ${i}.`);
      leftMost = i;
    }
  }

  let hull = [];
  let p = leftMost;
  console.log('Starting to build the convex hull.');

  // Loop to build the convex hull
  do {
    hull.push(points[p]);
    console.log(`Point at index ${p} added to the convex hull.`);
    let q = (p + 1) % points.length;

    for (let r = 0; r < points.length; r++) {
      console.log(`Checking if point at index ${r} is on the convex hull.`);
      if (orientation(points[p], points[q], points[r]) === 2) {
        console.log(`Point at index ${r} is on the convex hull.`);
        q = r;
      }
    }
    p = q;
  } while (p !== leftMost);

  console.log('Convex hull construction completed.');
  return hull;
};
