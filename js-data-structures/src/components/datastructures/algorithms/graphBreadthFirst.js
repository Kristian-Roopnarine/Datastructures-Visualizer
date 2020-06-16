export function breadthFirstSearch(grid, startNode, endNode, array) {
  let queue = [startNode];

  while (queue.length !== 0) {
    let currentNode = queue.shift();
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
    for (const neighbor of unvisitedNeighbors) {
      neighbor.previousNode = currentNode;
      queue.push(neighbor);
    }
  }
  return;
}

export function getShortestPath(endNode) {
  let shortestPath = [];
  let currentNode = endNode;
  if (currentNode.previousNode === null) {
    return [];
  }
  while (currentNode !== null) {
    console.log(currentNode);
    shortestPath.push(currentNode);
    currentNode = currentNode.previousNode;
  }
  return shortestPath.reverse();
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
