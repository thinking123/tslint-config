import * as Lint from "tslint";
import * as ts from "typescript";

export class Rule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "custom  是砥砺奋进收到两份会计师的立方空间";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
    public visitImportDeclaration(node: ts.ImportDeclaration) {
        // create a failure at the current position
        // failure
        const fix = new Lint.Replacement(node.getStart(), node.getWidth(), "");
        
        // create a failure at the current position
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING, fix));

        // this.addFailure(this.createFailure(node.getStart(), node.getWidth(), Rule.FAILURE_STRING));

        // call the base version of this visitor to actually parse this node
        super.visitImportDeclaration(node);
    }



    public visitIfStatement(node: ts.IfStatement){
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), " if is error sdflsdf"));

        // call the base version of this visitor to actually parse this node
        super.visitIfStatement(node);
    }
    // protected visitArrayType(node: ts.ImportDeclaration){

    // }

}