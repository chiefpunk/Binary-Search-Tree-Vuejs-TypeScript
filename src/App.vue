<template>
  <div id="app">
    <h1> Tree List </h1>
    <form @submit.prevent="onSubmit">
      <input 
        type="text"
        placeholder="Type to search items"
        v-model="searchQuery"
      />
      <button type="submit">Find</button>
    </form>

    <div v-if="items && items.length > 0" id="item-list">
      <ul>
        <li 
          v-for="item in items"
          v-bind:key="item"
        >{{ item }}</li>
      </ul>
    </div>

    <div v-else>
      <h2>No Data</h2>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { FactorTreeNode } from './interfaces/tree';
import TreeData from './mock/factor-tree.json';
import { FactorBST } from './utils/bst';

export default Vue.extend({
  name: 'app',
  data() {
    return {
      nameTree: undefined as FactorBST | undefined,
      items: [] as Array<string>,
      searchQuery: ''
    }
  },
  mounted() {
    this.nameTree = new FactorBST();
    const visitTree = (node: FactorTreeNode) => {
      this.nameTree?.insert(node);

      if(node.children) {
        for(const child of node.children) {
          visitTree(child);
        }
      }
    };

    visitTree(TreeData);
  },
  methods: {
    onSubmit() {
      if(!this.nameTree) {
        throw new Error('tree is not initialized');
      }
      const results = this.nameTree.search(this.searchQuery);
      this.items = results?.data.map(v => v.id) || [];      
    }
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#item-list {
  display: flex;
  justify-content: center;
}
</style>
