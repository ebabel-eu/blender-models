// JSON data for all models: where to load their geometry and what their material is.
// @g: geometry path.
// @m: material color.
// @cs: castShadow.
// @rs: receiveShadow. 
// Note: to save storage space, the data is as concise as possible.
module.exports = {
  models: [
    {
      g: './models/chessboard.json',
      m: 0x0000FF,
      cs: false,
      rs: true,
    },

    // Whites.
    {
      g: './models/rook.json',
      m: 0xFF7F00,
      cs: false,
      rs: false,
    },
    {
      g: './models/knight.json',
      m: 0xFFFF00,
      cs: true,
      rs: true,
    },
    {
      g: './models/bishop.json',
      m: 0x00FF00,
      cs: true,
      rs: true,
    },
    {
      g: './models/king.json',
      m: 0x4B0082,
      cs: true,
      rs: true,
    },
    {
      g: './models/queen.json',
      m: 0x9400D3,
      cs: true,
      rs: true,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,
    },

    // Blacks.
    {
      g: './models/rook.json',
      m: 0xFF7F00,
      cs: true,
      rs: true,
      x: 42,
    },
    {
      g: './models/rook.json',
      m: 0xFF7F00,
      cs: true,
      rs: true,

      x: 42,
      z: -42,
    },
    {
      g: './models/knight.json',
      m: 0xFFFF00,
      cs: true,
      rs: true,

      x: 42,
    },
    {
      g: './models/knight.json',
      m: 0xFFFF00,
      cs: true,
      rs: true,

      x: 42,
      z: -30,
    },
    {
      g: './models/bishop.json',
      m: 0x00FF00,
      cs: true,
      rs: true,

      x: 42,
    },
    {
      g: './models/bishop.json',
      m: 0x00FF00,
      cs: true,
      rs: true,

      x: 42,
      z: -18,
    },
    {
      g: './models/king.json',
      m: 0x4B0082,
      cs: true,
      rs: true,

      x: 42,
    },
    {
      g: './models/queen.json',
      m: 0x9400D3,
      cs: true,
      rs: true,

      x: 42,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -6,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -12,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -18,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -24,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -30,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -36,
    },
    {
      g: './models/pawn.json',
      m: 0xFF0000,
      cs: true,
      rs: true,

      x: 30,
      z: -42,
    },
  ],
};
