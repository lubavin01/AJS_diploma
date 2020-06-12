export function calcTileType(index, boardSize) {
  const div = Math.floor(index / boardSize);
  const mod = index % boardSize;
  if (index === 0) {
    return 'top-left';
  } else if (div === 0 && mod === (boardSize - 1)) {
    return 'top-right';
  } else if (div === 0) {
    return 'top';
  } else if (div === (boardSize - 1) && mod === 0) {
    return 'bottom-left';
  } else if (div === (boardSize - 1) && mod === (boardSize - 1)) {
    return 'bottom-right';
  } else if (div === (boardSize - 1)) {
    return 'bottom';
  } else if (mod === 0) {
    return 'left'
  } else if (mod === (boardSize - 1)) {
    return 'right';
  } else {
    return 'center';
  }
}

export function calcHealthLevel(health) {
  if (health < 15) {
    return 'critical';
  }

  if (health < 50) {
    return 'normal';
  }

  return 'high';
}
