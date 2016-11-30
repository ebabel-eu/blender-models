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
export const LIGHT_INTENSITY = 1.7;
export const LIGHT_ANGLE = Math.PI / 2;
export const LIGHT_POSITION = {
  X: -55,
  Y: 17,
  Z: -5,
};

// Fog.
export const FOG_COLOR = COLORS.BLUE;
export const FOG_DENSITY = 0.013;

// Camera.
export const CAMERA_POSITION = {
  X: 0,
  Y: 12,
  Z: 55
};
