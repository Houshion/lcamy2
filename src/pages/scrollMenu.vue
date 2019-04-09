<!--input -->
<template>
  <div class="bigBox">
    <div class="container">
      <div v-for="(item,index) in goodList" :key="index">
        <!-- <input type="checkbox" :id="item.name" :value="item.name" v-model="checkedNames">
        <label for="jack">{{item.name}}</label>-->
        <div class="circle" @click="pick(index)">{{item.pick}}</div>
      </div>
      <!-- <input type="checkbox" id="john" value="John" v-model="checkedNames">
      <label for="john">John</label>
      <input type="checkbox" id="mike" value="Mike" v-model="checkedNames">
      <label for="mike">Mike</label>
      <label v-for="(item,index) in goodList" :key="index">
        <input type="checkbox" v-model="checkedNames">
        {{item.name}}
      </label>-->
      <br>
      <!-- <span>Checked names: {{ checkedNames | json }}</span> -->
      <label>
        <input type="checkbox" class="checkbox" @click="selectAll">全选（{{sum}}）
      </label>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      checkedNames: [],
      goodList: [
        {
          name: "Jack",
          id: 1,
          pick: false,
          num: 0
        },
        {
          name: "Kitty",
          id: 2,
          pick: false,
          num: 0
        },
        {
          name: "lose",
          id: 3,
          pick: false,
          num: 0
        }
      ]
    };
  },
  components: {},
  computed: {
    sum: function() {
      let sum=0;
      return sum;
    }
  },
  created() {
    let that = this;
    that.init();
  },
  methods: {
    init: function() {
      console.log(1);
    },
    selectAll: function(event) {
      var that = this;
      console.log(event.currentTarget);
      if (!event.currentTarget.checked) {
        // this.selectArr = [];
        that.goodList.forEach(function(item, i) {
          that.checkedNames = [];
          item.pick = false;
        });
      } else {
        //实现全选
        that.checkedNames = [];
        that.goodList.forEach(function(item, i) {
          that.checkedNames.push(i);
          item.pick = true;
        });
      }
    },
    pick: function(index) {
      console.log(1);
      this.goodList[index].pick = !this.goodList[index].pick;
    }
  }
};
</script>
<style scoped>
</style>