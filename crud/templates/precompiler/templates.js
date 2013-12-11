define(['handlebars'], function(Handlebars) {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['other'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "\r\n	"
    + escapeExpression(((stack1 = depth0.tid),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n	"
    + escapeExpression(((stack1 = depth0.tbname),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n	"
    + escapeExpression(((stack1 = depth0.tname),typeof stack1 === functionType ? stack1.apply(depth0) : stack1))
    + "\r\n	<br/>\r\n";
  return buffer;
  }

  buffer += "\r\n<div class=\"span2\">\r\n<div>\r\n";
  stack1 = helpers.each.call(depth0, depth0, {hash:{},inverse:self.noop,fn:self.program(1, program1, data),data:data});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\r\n</div>\r\n</div>\r\n";
  return buffer;
  });
templates['other2'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [4,'>= 1.0.0'];
helpers = this.merge(helpers, Handlebars.helpers); data = data || {};
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "\r\n<div class=\"span2\">\r\n<div>\r\nWorld ";
  if (stack1 = helpers.planet) { stack1 = stack1.call(depth0, {hash:{},data:data}); }
  else { stack1 = depth0.planet; stack1 = typeof stack1 === functionType ? stack1.apply(depth0) : stack1; }
  buffer += escapeExpression(stack1)
    + "\r\n</div>\r\n</div>\r\n";
  return buffer;
  });
return templates;
});