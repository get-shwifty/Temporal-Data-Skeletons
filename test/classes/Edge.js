const expect = require("chai").expect;

const baseUrl = "../../src/";
const Edge = require(baseUrl + "classes/Edge");
const Node = require(baseUrl + "classes/Node");

var node1, node2;

describe("Edge", function() {
    beforeEach(function() {
        node1 = new Node("1");
        node2 = new Node("2");
    });

    describe("constructor", function() {
        it("should throw a TypeError when the first parameter is not a Node", function() {
            let newEdge = () => new Edge("not a Node");
            expect(newEdge).to.throw(TypeError, /Node/);
        });

        it("should throw a TypeError when the second parameter is not a Node", function() {
            let newEdge = () => new Edge(node1, "not a Node");
            expect(newEdge).to.throw(TypeError, /Node/);
        });

        it("should create an Edge with a property 'sourceNode' which is the node passed as first parameter", function() {
            let edge = new Edge(node1, node2);
            expect(edge).to.have.property("sourceNode", node1);
        });

        it("should create an Edge with a property 'target' which is the node passed as second parameter", function() {
            let edge = new Edge(node1, node2);
            expect(edge).to.have.property("target", node2);
        });
    });
});