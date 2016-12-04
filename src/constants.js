// Define the whole color scheme in this one place.
export const COLORS = {
  WHITE: 0xFFFFFF,
  L1NDA: 0xED008C,
  BLUE: 0x7EC0EE,
  BROWN: 0xA0522D,
  BEIGE: 0xFFCC8A,
  EBONY: 0x2E100D,
};

// Chess models.
export const CHESSBOARD_COLOR = COLORS.BROWN;
export const WHITE_PIECE_COLOR = COLORS.BEIGE;
export const BLACK_PIECE_COLOR = COLORS.EBONY;

// Light.
export const LIGHT_COLOR = COLORS.WHITE;
export const LIGHT_INTENSITY = 1.65;
export const LIGHT_ANGLE = Math.PI / 4;
export const LIGHT_POSITION = {
  X: -37.6,
  Y: 25.4,
  Z: -30,
};

// Fog.
export const FOG_COLOR = COLORS.BLUE;
export const FOG_DENSITY = 0.013;

// Camera.
export const CAMERA_POSITION = {
  X: -30,
  Y: 7,
  Z: 0,
};

// How long to wait before executing some code after the same event
// has stopped being fired for a constant number of miliseconds.
export const DEBOUNCE = 250;
