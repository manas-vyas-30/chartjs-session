/**
 * returns pixel based on value
 */
export function getSliceSize(value: number) {
  switch (true) {
    case value <= 0:
      return 430;
    case value > 0 && value <= 1:
      return 414;
    case value > 1 && value <= 2:
      return 406;
    case value > 2 && value <= 3:
      return 398;
    case value > 3 && value <= 4:
      return 390;
    case value > 4 && value <= 5:
      return 382;
    case value > 5 && value <= 6:
      return 374;
    case value > 6 && value <= 7:
      return 366;
    case value > 7 && value <= 8:
      return 358;
    case value > 8 && value <= 9:
      return 350;
    case value > 9 && value <= 10:
      return 342;
    case value > 10 && value <= 11:
      return 334;
    case value > 11 && value <= 12:
      return 326;
    case value > 12 && value <= 13:
      return 318;
    case value > 13 && value <= 14:
      return 310;
    case value > 14 && value <= 15:
      return 302;
    case value > 15 && value <= 16:
      return 294;
    case value > 16 && value <= 17:
      return 286;
    case value > 17 && value <= 18:
      return 278;
    case value > 18 && value <= 19:
      return 270;
    case value > 19 && value <= 20:
      return 262;
    case value > 20 && value <= 21:
      return 254;
    case value > 21 && value <= 22:
      return 246;
    case value > 22 && value <= 23:
      return 238;
    case value > 23 && value <= 24:
      return 228;
    default:
      return 220;
  }
}

export const calculateArcAngles = (numberOfParts: number, index: number) => {
  const anglePerPart = 360 / numberOfParts;
  const startAngle = index * anglePerPart - 90;
  const endAngle = (index + 1) * anglePerPart;
  return { startAngle, endAngle };
};

export const calculateArcCenter = (
  startAngle: number,
  endAngle: number,
  radius: number,
  centerX: number,
  centerY: number
) => {
  const midpointAngle =
    (((startAngle - 90 + (endAngle - 90)) / 2) * Math.PI) / 180;
  const midpointX = centerX + radius * Math.cos(midpointAngle);
  const midpointY = centerY + radius * Math.sin(midpointAngle);
  return { x: midpointX, y: midpointY };
};

export const donutInnerRadius = 68.25;

export const donutOuterRadius = 136.3636;
