export enum  Formation {
  HorizontalStack = 'Horizontal Stack',
  VerticalStack = 'Vertical Stack',
  Hex = 'Hex'
}

export const MAX_HANDLERS_VERTICAL_STACK = 4;

export const MAX_HANDLERS_HORIZONTAL_STACK = 6;

export const FORMATIONS = [
  Formation.VerticalStack,
  Formation.HorizontalStack,
  Formation.Hex
];
