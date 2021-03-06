export function depthFirstSearch(grid, startNode, endNode, array) {
  // get neighbors
  let stack = [startNode];

  while (stack.length !== 0) {
    let currentNode = stack.pop();
    array.push(currentNode);
    if (currentNode.isVisited) {
      continue;
    }
    if (currentNode.isWall) {
      continue;
    }
    if (currentNode === endNode) {
      return array;
    }
    currentNode.isVisited = true;
    const unvisitedNeighbors = getUnvisitedNodes(currentNode, grid);
    for (const nodes of unvisitedNeighbors) {
      nodes.previousNode = currentNode;
      stack.push(nodes);
    }
  }
  return;
}

export function getUnvisitedNodes(node, grid) {
  const unvisitedNeighbors = [];
  const { row, col } = node;
  // get top node
  if (row > 0 && !grid[row - 1][col].isVisited) {
    unvisitedNeighbors.push(grid[row - 1][col]);
  }

  // get bottom node
  if (row < grid.length - 1 && !grid[row + 1][col].isVisited) {
    unvisitedNeighbors.push(grid[row + 1][col]);
  }

  // get left node

  if (col > 0 && !grid[row][col - 1].isVisited) {
    unvisitedNeighbors.push(grid[row][col - 1]);
  }

  // get right node
  if (col < grid[row].length - 1 && !grid[row][col + 1].isVisited) {
    unvisitedNeighbors.push(grid[row][col + 1]);
  }
  return unvisitedNeighbors;
}
