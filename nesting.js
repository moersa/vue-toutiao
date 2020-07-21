let saMenuList = [
  {
    name: "1",
    children: [
      {
        name: "1-1"
      }
    ]
  },
  {
    name: "2",
    children: [
      {
        name: "2-1"
      },
      {
        name: "2-2",
        children: [
          {
            name: "2-3"
          },
          {
            name: "2-4",
            children: [
                {
                  name: "2-5"
                },
                {
                  name: "2-6",
                  children: []
                }
              ]
          }
        ]
      }
    ]
  },
  {
    name: "3",
    children: [
      {
        name: "3-1",
        children: [
            {
              name: "3-2"
            },
            {
              name: "3-3",
              children: []
            }
          ]
      }
    ]
  }
];

function nest() {
  var json = [];
  var newJson = saMenuList;
  for (var i = 0; i < newJson.length; i++) {
    let item = newJson[i];
    if (item.children && item.children.length > 0) {
      var one = checkchild(item.children,[]);
      json=json.concat(one)
    }
  }
  getarray(json)
}

function checkchild(json,nowJson) {
  var nowjson = nowJson;
  var len = nowjson.length; //长度
  for (var j = 0; j < json.length; j++) {
    var child = json;
    nowjson[len + j] = child[j];
    if (child[j].children && child[j].children.length > 0) {
      checkchild(child[j].children, nowjson);
    }
  }
  return nowjson;
}

function getarray(json){
    var array=[]
    for(var i = 0; i < json.length; i++){
        array.push(json[i].name)
    }
    console.log(array)
}
nest();
