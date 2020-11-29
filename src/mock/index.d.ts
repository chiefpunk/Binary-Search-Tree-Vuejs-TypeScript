import { FactorTreeNode } from "@/interfaces/tree";

declare module "factor-tree.json" {
  const value: FactorTreeNode;
  export default value;
}