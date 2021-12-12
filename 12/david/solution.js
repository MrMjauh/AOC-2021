const fs = require("fs");
const path = require("path/posix");

const input = fs.readFileSync("input", "utf-8");
const paths = input.split('\r\n');
class Node {
    name;
    revisitable;
    connections;
    constructor(name, revisitable) {
        this.name = name;
        this.revisitable = revisitable;
        this.connections = [];
    }

    addConnection(node) {
        this.connections.push(node);
    }

    removeConnection(node) {
        const index = this.connections.indexOf(node);
        if (index > -1) {
            this.connections.splice(index, 1);
        }
    }
}

function createGraph(paths) {
    let nodes = [];
    for (a_path of paths) {
        let both_nodes = a_path.split('-');
        let node1 = nodes.find(node => node.name == both_nodes[0])
        if (!node1) {
            node1 = new Node(both_nodes[0], both_nodes[0] == both_nodes[0].toUpperCase());
            nodes.push(node1);
        }
        let node2 = nodes.find(node => node.name == both_nodes[1])
        if (!node2) {
            node2 = new Node(both_nodes[1], both_nodes[1] == both_nodes[1].toUpperCase());
            nodes.push(node2);
        }
        node1.addConnection(node2);
        node2.addConnection(node1);
    }
    return nodes;
}

function findPaths(current_node, visited, end, found_paths, bonus_visit, bonus_node) {
    if (current_node == end) {
        let path_as_string = "";
        [...visited, current_node.name].map(e => path_as_string += e);
        found_paths.add(path_as_string);
        return;
    }
    for (let i = 0; i < current_node.connections.length; ++i) {
        let visited_node = visited.find(e => e == current_node.connections[i].name);
        if (visited_node != undefined && !current_node.connections[i].revisitable && current_node.connections[i].name != bonus_node) continue; //Ignore already visited unrevisitable nodes
        let next_bonus = bonus_node;
        if (current_node.connections[i].name == bonus_node) next_bonus = ""; //Consume bonus if this is 2nd visit
        if (bonus_visit && !current_node.revisitable && current_node.name != "start") {
            findPaths(current_node.connections[i], [...visited, current_node.name], end, found_paths, false, current_node.name);
        }
        findPaths(current_node.connections[i], [...visited, current_node.name], end, found_paths, bonus_visit, next_bonus);
    }
}

function findAllPaths(graph, start_name, end_name, bonus_visit) {
    const start = graph.find(node => node.name == start_name);
    const end = graph.find(node => node.name == end_name);

    let paths = new Set();
    findPaths(start, [], end, paths, bonus_visit, "");
    return paths;
}

const start = Date.now()
let graph = createGraph(paths);
console.log(`part 1 > ${findAllPaths(graph, "start", "end", false).size}`);
console.log(`part 2 > ${findAllPaths(graph, "start", "end", true).size}`);
console.log(`${Date.now() - start} ms`);