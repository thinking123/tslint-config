const compiler = require("vue-template-compiler");
const fs = require("fs");
const walk = require("acorn-walk");
const vueWithTransform = require('vue-template-es2015-compiler');

// const _JSON = _JSON;
const _JSON = require("circular-json");

let globals = [];
let expressions = [];
let callee;
var ast;
let result = [];

let acorn = require("acorn");


const c = acorn.parse("func", {
  allowReturnOutsideFunction: true,
  allowImportExportEverywhere: true,
  allowHashBang: true
});



walk.ancestor(c, {
  Literal(_, ancestors) {
    console.log(
      "This literal's ancestors are:",
      ancestors.map(n => n.type)
    );

    fs.writeFile("./csf.json", _JSON.stringify(ancestors), function(err) {
      if (err) {
        return console.log(err);
      }
      console.log("The file was saved!", _JSON.stringify(ancestors));
    });
  },
  CallExpression(node) {
    callee = getNameForExpression(node.callee);
    expressions = node.arguments.map(arg => {
      let p = getNameForExpression(arg);
      p.node = arg;
      return p;
    });

    console.log("CallExpression:", callee);
    console.log("CallExpression:", expressions);
  },

  // 'VariablePattern': identifier,
  'Identifier': identifier,
//({'info':type == 'info' , 'primary':type == 'primary' , 'disabled':isLoading})
  ObjectExpression (node) {
    node.properties.forEach(p => {
      let value = p.key.type === 'Identifier' ? p.key.name :
        (p.key.type === 'Literal' ? p.key.value : undefined);
      if (value) {
        if (p.value.type === 'Identifier') {
          result.push({
            [value]: p.value.name
          });
        } else {
          result.push({
            [value]: source.substring(p.value.start, p.value.end)
          });
        }
      }
    });
  },
  ArrayExpression (node) {
    node.elements.forEach(p => {
      if (p.type === 'Identifier') {
        result.push(p.name);
      }
    });
  }
});

function getNameForExpression(expression) {
  let expr = expression;
  const exprName = [];
  while (
    expr.type === "MemberExpression" &&
    expr.property.type === (expr.computed ? "Literal" : "Identifier")
  ) {
    exprName.push(expr.computed ? expr.property.value : expr.property.name);
    expr = expr.object;
  }
  let free;
  if (expr.type === "Identifier") {
    exprName.push(expr.name);
  } else if (expr.type === "Literal") {
    exprName.push(expr.value);
  }
  let name = exprName.pop();
  let t = "";
  while ((t = exprName.pop())) {
    name += typeof t === "number" ? `[${t}]` : `.${t}`;
  }
  return {
    name,
    type: expr.type
  };
}


function declaresArguments(node) {
  return node.type === 'FunctionExpression' || node.type === 'FunctionDeclaration';
}

function identifier(node, parents) {
  var name = node.name;




  console.log('name : ' , name)
  if (name === 'undefined') return;
  for (var i = 0; i < parents.length; i++) {
    if (name === 'arguments' && declaresArguments(parents[i])) {
      return;
    }
    if (parents[i].locals && name in parents[i].locals) {
      return;
    }
  }
  node.parents = parents;
  globals[name] = globals[name] || {};
  let callable = false;
  if (parents && parents.length > 2) {
    let parent = parents[parents.length - 2];
    callable = parent.type === 'CallExpression' && parent.callee === node;
  }
  globals[name].callable = globals[name].callable || callable;
  globals[name].nodes = globals[name].nodes || [];
  globals[name].nodes.push(node);
}


console.log('globals',JSON.stringify(globals))
console.log('result',result)
return;

const b = [
  {
    name: 12,
    type: "Literal",
    node: { type: "Literal", start: 14, end: 16, value: 12, raw: "12" }
  }
];
// ...
// const json = _JSON.stringify(obj);
// let fileContent = fs.readFileSync('./foo.wpy', 'utf-8');

// const res = compiler.parseComponent(fileContent , {pad: "space"});

// fs.writeFile("./wpy.json", _JSON.stringify(res), function(err) {
//   if(err) {
//       return console.log(err);
//   }
//   console.log("The file was saved!");
// });

const { Parser } = require("htmlparser2");
const { DomHandler } = require("domhandler");
const rawHtml =
  '<div class="page learnPlan"><div class="header"><CTab type="radius" :tabs="tabs"@changeTab="handleTab"external-cls="ctab"/><IconText @click.native="onPlanShow"v-if="selectedTab == 0"external-cls="titleIcon"external-img="titleImg":text="iconText.text" :src="iconText.src"/></div><CListWrap1 eventName="TList" :type="listtype1":reloadKey="refreshKey1":params="params1":show="selectedTab == 0"url="/api/learnPlan/getLearnPlanList"><SwipeItem v-for="c in clist1"external-cls="row1":disabled="disabled":text1="c.planContent":text2="c.planTime":data="c"@btnclick="onSwipeItemSumbitClick"@onSwipeItemClick="onSwipeItemClick"/></CListWrap1><CListWrap1 eventName="TList" :type="listtype2":reloadKey="refreshKey2":params="params2":show="selectedTab == 1"url="/api/learnPlan/getLearnPlanList"><SwipeItem v-for="c in clist2"external-cls="row1"disabled="{{true}}":text1="c.planContent":text2="c.planTime":data="c"/></CListWrap1><CPopup :show="planShow"position="bottom"@close="planShow=false"zIndex="999"overlay="{{ true }}"><div class="learn"><HeaderClose text="添加计划" external-cls="header" @click="planShow=false"/><div class="body"><CTopLabelInput label="计划内容" placeholder="准备学点啥，如学习申论第一章" external-cls="row"@update="handlelearnContent":val.sync="learnContent"/><CTopLabelInput label="设置提醒时间" placeholder="到时会提醒您学习" :btn="timeTip" @clickBtn="handleLearnTip":val.sync="learnTip"readonly="{{true}}"@update="handlelearnTip"external-cls="row"/><CButton text="确认添加" @tap.native="handleStartLearn" external-cls="row"/></div></div></CPopup><CPopup :show="timeShow"position="bottom"@close="timeShow=false"zIndex="1000"overlay="{{ true }}"><div class="time"><HeaderClose text="选择学习时间" external-cls="header" @click="timeShow=false"/><div class="body"><view class="section"><picker mode="date" value="{{seLdate}}" start="{{startDate}}" bindchange="bindDateChange"><view class="picker">日期: {{seLdate}}</view></picker></view><view class="section"><picker mode="time" value="{{seLtime}}" start="{{startTime}}" bindchange="bindTimeChange"><view class="picker">时间: {{seLtime}}</view></picker></view><CButton text="确认" @tap.native="handleSetTime" external-cls="row2"/></div></div></CPopup></div>';
const handler = new DomHandler(
  function(error, dom) {
    if (error) {
      // Handle error
    } else {
      // Parsing completed, do something
      console.log(dom);

      fs.writeFile("./html.json", _JSON.stringify(dom), function(err) {
        if (err) {
          return console.log(err);
        }
        console.log("The file was saved!");
      });
    }
  },
  { withStartIndices: true, withEndIndices: true }
);
const parser = new Parser(handler, { xmlMode: true });
parser.write(rawHtml);
parser.end();

// console.log(res);
