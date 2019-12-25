import * as Lint from "tslint";
import * as ts from "typescript";

export class CSRule extends Lint.Rules.AbstractRule {
    public static FAILURE_STRING = "custom sdfsdlfjdslfj  : sdlfjsdlfj import statement forbidden";

    public apply(sourceFile: ts.SourceFile): Lint.RuleFailure[] {
        return this.applyWithWalker(new NoImportsWalker(sourceFile, this.getOptions()));
    }
}

// The walker takes care of all the work.
class NoImportsWalker extends Lint.RuleWalker {
    public visitImportDeclaration(node: ts.ImportDeclaration) {
        // create a failure at the current position
        this.addFailure(this.createFailure(node.getStart(), node.getWidth(), CSRule.FAILURE_STRING));

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