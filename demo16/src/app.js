import "babel-polyfill";
import "./style/base.scss";
import "./style/common.css";
import {hello} from 'shenfusheng-npm-test'
hello('666666')

import sum from "./vendor/sum";
console.log("sum(1, 2) = ", sum(1, 10));
var minus = require("./vendor/minus");
console.log("minus(1, 2) = ", minus(1, 2));
require(["./vendor/multi"], function(multi) {
  console.log("multi(1, 2) = ", multi(1, 2));
});
$('body').append('<div>6666666666</div>')
$("div").addClass("new");
