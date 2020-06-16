export function depthFirstSearch(grid) {}

export function getUnvisitedNodes(row, col, grid) {
  const unvisitedNeighbors = [];
  // get top node
  if (row > 0 && !grid[row - 1][col].isVisited) {
    unvisitedNeighbors.push(grid[row + 1][col]);
  }

  // get bottom node
  if (row < grid.length - 1 && !grid[row - 1][col].isVisited) {
    unvisitedNeighbors.push(grid[row - 1][col]);
  }

  // get left node

  if (col > 0 && !grid[row][col - 1].isVisited) {
    unvisitedNeighbors.push(grid[row][col - 1]);
  }

  // get right node
  if (col < grid[row].length && !grid[row][col + 1].isVisited) {
    unvisitedNeighbors.push(grid[row][col + 1]);
  }
  return unvisitedNeighbors;
}
