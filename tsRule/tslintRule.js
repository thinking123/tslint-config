"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
var Lint = require("tslint");
var Rule = /** @class */ (function (_super) {
    __extends(Rule, _super);
    function Rule() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rule.prototype.apply = function (sourceFile) {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    };
    Rule.FAILURE_STRING = "custom  dskfjsdlkfjdslfjslkfjlsdfjalskfjskdlafjklsdfj";
    return Rule;
}(Lint.Rules.AbstractRule));
exports.Rule = Rule;
// The walker takes care of all the work.
var NoImportsWalker = /** @class */ (function (_super) {
    __extends(NoImportsWalker, _super);
    function NoImportsWalker() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    NoImportsWalker.prototype.visitImportDeclaration = function (node) {
        // create a failure at the current position
        // failure
        // const fix = new Lint.Replacement(node.getStart(), node.getWidth(), "");
        // create a failure at the current position
        // this.addFailure(this.createFailure(node.getStart(), node.getWidth(), CSRule.FAILURE_STRING, fix));
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitImportDeclaration.call(this, node);
    };
    NoImportsWalker.prototype.visitIfStatement = function (node) {
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), " if is error sdflsdf"));
        // call the base version of this visitor to actually parse this node
        _super.prototype.visitIfStatement.call(this, node);
    };
    return NoImportsWalker;
}(Lint.RuleWalker));
