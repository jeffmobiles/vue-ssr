function isEmpty(value){
  if(value=="" || value==null || value=="null" || value==undefined){
    return true;
  }
  return false;
}

function isEmptyObject(value){
  return JSON.stringify(value) == '{}';
}

function deepCopy(source) {
  var result={};
  for (var key in source) {
    result[key] = typeof source[key]==='object'? deepCopy(source[key]): source[key];
  }
  return result;
}

//获取指定的参数
function getParentQueryParam(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var r = top.location.search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}

export default{
  isEmpty:isEmpty,
  isEmptyObject:isEmptyObject,
  cloneObj:deepCopy,
  getParentQueryParam:getParentQueryParam
}
