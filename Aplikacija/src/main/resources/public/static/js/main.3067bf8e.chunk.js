(this.webpackJsonpstore=this.webpackJsonpstore||[]).push([[0],{26:function(e,t,a){},30:function(e,t,a){e.exports=a(62)},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),l=a(27),r=a.n(l),o=a(12),s=a(6),i=a.n(s),m=c.a.createContext({dovanos:[],setDovanos:function(){},refreshItem:function(){}});var u=a(2);function d(){i.a.defaults.withCredentials=!0;var e=Object(n.useState)(""),t=Object(o.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)(""),s=Object(o.a)(r,2),m=s[0],d=s[1];return c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-3"}),c.a.createElement("form",{onSubmit:function(e){e.preventDefault();var t=new URLSearchParams;t.append("username",a),t.append("password",m),i.a.post("http://localhost:8080/login",t,{headers:{"Content-type":"application/x-www-form-urlencoded"}}).then((function(e){return c.a.createElement(u.a,{to:"/user"})})).catch((function(e){console.log(e)})),e.preventDefault()}},c.a.createElement("div",{className:"row my-3"},c.a.createElement("input",{type:"text",required:!0,value:a,className:"form-control col-4",placeholder:"Vartotojo vardas",onChange:function(e){return function(e){l(e.target.value)}(e)}}),c.a.createElement("input",{type:"password",required:!0,value:m,className:"form-control col-4",placeholder:"Slapta\u017eodis",onChange:function(e){return function(e){d(e.target.value)}(e)}}),c.a.createElement("button",{className:"btn btn-dark col-4",type:"submit"},"Prisijungti"))),c.a.createElement("div",{className:"col-3"}))}a(26);function p(e){return{title:e.title,id:e.id,description:e.description,forAdults:e.forAdults,image:e.img,type:e.type}}function b(){return c.a.createElement("div",{className:"jumbotron jumbotron-fluid p-4 my-0 text-white bg-dark"},c.a.createElement("div",{className:"col-md-6 px-0"},c.a.createElement("h1",{className:"display-4"},"Dokument\u0173 valdymo sistema")))}var E=a(7),h=a(8),v=a(10),N=a(9),f=a(11),g=a(1),j=function(e){return c.a.createElement("nav",{className:"navbar navbar-expand-lg navbar-light bg-dark"},c.a.createElement("div",{className:"collapse navbar-collapse",id:"navbarSupportedContent"},c.a.createElement("ul",{className:"navbar-nav mr-auto"},c.a.createElement("li",{className:"nav-item"},c.a.createElement(g.b,{to:"/admin",className:"nav-link"},"Pagrindinis")),c.a.createElement("li",{className:"nav-item"},c.a.createElement(g.b,{to:"/admin/users/add",className:"nav-link"},"Naujas vartotojas")),c.a.createElement("li",{className:"nav-item"},c.a.createElement(g.b,{to:"/admin/groups/add",className:"nav-link"},"Nauja grup\u0117")),c.a.createElement("li",{className:"nav-item"},c.a.createElement(g.b,{to:"/admin/doctypes/add",className:"nav-link"},"Naujas dokument\u0173 tipas"))),c.a.createElement(g.b,{to:"/"},c.a.createElement("button",{type:"button",className:"btn btn-light"},"Logout"))))},y=function(e){function t(){return Object(E.a)(this,t),Object(v.a)(this,Object(N.a)(t).apply(this,arguments))}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){return c.a.createElement("div",null,c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement(j,null)))),c.a.createElement("div",{className:"card-deck"},c.a.createElement("div",{className:"card"},c.a.createElement("img",{src:"...",className:"card-img-top",alt:"..."}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"Vartotojai"),c.a.createElement("p",{className:"card-text"},"Naujo vartotojo k\u016brimas, informacijos atnaujinimas.")),c.a.createElement("div",{className:"card-footer"},c.a.createElement(g.b,{to:"/admin/users"},c.a.createElement("button",{type:"button",className:"btn btn-secondary btn-lg btn-block"},"I\u0161sami informacija")))),c.a.createElement("div",{className:"card"},c.a.createElement("img",{src:"...",className:"card-img-top",alt:"..."}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"Grup\u0117s"),c.a.createElement("p",{className:"card-text"},"Nauj\u0173 grupi\u0173 k\u016brimas, informacijos atnaujinimas.")),c.a.createElement("div",{className:"card-footer"},c.a.createElement(g.b,{to:"/admin/groups"},c.a.createElement("button",{type:"button",className:"btn btn-secondary btn-lg btn-block"},"I\u0161sami informacija")))),c.a.createElement("div",{className:"card"},c.a.createElement("img",{src:"...",className:"card-img-top",alt:"..."}),c.a.createElement("div",{className:"card-body"},c.a.createElement("h5",{className:"card-title"},"Dokument\u0173 tipai"),c.a.createElement("p",{className:"card-text"},"Nauj\u0173 dokument\u0173 tip\u0173 k\u016brimas, informacijos atnaujinimas.")),c.a.createElement("div",{className:"card-footer"},c.a.createElement(g.b,{to:"/admin/doctypes"},c.a.createElement("button",{type:"button",className:"btn btn-secondary btn-lg btn-block"},"I\u0161sami informacija"))))))}}]),t}(n.Component),k=function(e){return c.a.createElement("tr",null,c.a.createElement("th",{scope:"row"},e.id),c.a.createElement("td",null,e.username),c.a.createElement("td",null,e.name),c.a.createElement("td",null,e.surname),c.a.createElement("td",null,c.a.createElement(g.b,{to:"admin/users/edit/"+e.id,className:"btn btn-light"},"Atnaujinti informacij\u0105")))},w=function(e){function t(){var e;return Object(E.a)(this,t),(e=Object(v.a)(this,Object(N.a)(t).call(this))).state={users:[]},i.a.get("http://localhost:8080/api/users").then((function(t){e.setState({users:t.data})})).catch((function(e){console.log(e)})),e}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state.users.map((function(e,t){return c.a.createElement(k,{key:t,id:e.id,username:e.username,name:e.name,surname:e.surname})}));return c.a.createElement("div",null,c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement(j,null)))),c.a.createElement(g.b,{to:"/admin/users/add"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onAddNew},"Prid\u0117ti nauj\u0105 vartotoj\u0105")),c.a.createElement(g.b,{to:"/admin"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onBack},"Gr\u012f\u017eti \u012f pradin\u012f lang\u0105")),c.a.createElement("table",{className:" text-center table table-striped"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{scope:"col"},"ID"),c.a.createElement("th",{scope:"col"},"Prisijungimo vardas"),c.a.createElement("th",{scope:"col"},"Vardas"),c.a.createElement("th",{scope:"col"},"Pavard\u0117"))),c.a.createElement("tbody",null,e)))}}]),t}(n.Component),O=function(e){return c.a.createElement("tr",null,c.a.createElement("th",{scope:"row"},e.id),c.a.createElement("td",null,e.title),c.a.createElement("td",null,c.a.createElement(g.b,{to:"admin/groups/edit/"+e.id,className:"btn btn-light"},"Atnaujinti informacij\u0105")))},x=function(e){function t(){var e;return Object(E.a)(this,t),(e=Object(v.a)(this,Object(N.a)(t).call(this))).state={groups:[]},i.a.get("http://localhost:8080/api/groups").then((function(t){e.setState({groups:t.data})})).catch((function(e){console.log(e)})),e}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state.groups.map((function(e,t){return c.a.createElement(O,{key:t,id:e.id,title:e.title})}));return c.a.createElement("div",null,c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement(j,null)))),c.a.createElement(g.b,{to:"/admin/groups/add"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onAddNew},"Prid\u0117ti nauj\u0105 grup\u0119")),c.a.createElement(g.b,{to:"/admin"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onBack},"Gr\u012f\u017eti \u012f pradin\u012f lang\u0105")),c.a.createElement("table",{className:" text-center table table-striped"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{scope:"col"},"ID"),c.a.createElement("th",{scope:"col"},"Grup\u0117s pavadinimas"))),c.a.createElement("tbody",null,e)))}}]),t}(n.Component),C=function(e){return c.a.createElement("tr",null,c.a.createElement("th",{scope:"row"},e.id),c.a.createElement("td",null,e.title),c.a.createElement("td",null,c.a.createElement(g.b,{to:"admin/doctypes/edit/"+e.id,className:"btn btn-light"},"Atnaujinti informacij\u0105")))},S=function(e){function t(){var e;return Object(E.a)(this,t),(e=Object(v.a)(this,Object(N.a)(t).call(this))).state={doctypes:[]},i.a.get("http://localhost:8080/api/doctypes").then((function(t){e.setState({doctypes:t.data})})).catch((function(e){console.log(e)})),e}return Object(f.a)(t,e),Object(h.a)(t,[{key:"render",value:function(){var e=this.state.doctypes.map((function(e,t){return c.a.createElement(C,{key:t,id:e.id,title:e.title})}));return c.a.createElement("div",null,c.a.createElement("div",{className:"container-fluid"},c.a.createElement("div",{className:"row"},c.a.createElement("div",{className:"col-12"},c.a.createElement(j,null)))),c.a.createElement(g.b,{to:"/admin/doctypes/add"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onAddNew},"Prid\u0117ti nauj\u0105 dokument\u0173 tip\u0105")),c.a.createElement(g.b,{to:"/admin"},c.a.createElement("button",{type:"button",className:"btn btn-light",onClick:this.props.onBack},"Gr\u012f\u017eti \u012f pradin\u012f lang\u0105")),c.a.createElement("table",{className:" text-center table table-striped"},c.a.createElement("thead",null,c.a.createElement("tr",null,c.a.createElement("th",{scope:"col"},"ID"),c.a.createElement("th",{scope:"col"},"Dokument\u0173 tipo pavadinimas"))),c.a.createElement("tbody",null,e)))}}]),t}(n.Component);var D=function(){var e=Object(n.useState)("loading"),t=Object(o.a)(e,2),a=t[0],l=t[1],r=Object(n.useState)("loading"),s=Object(o.a)(r,2),i=s[0],E=s[1],h={dovanos:a,refreshProducts:function(){fetch("http://localhost:8080/api/dovanos").then((function(e){if(!e.ok)throw new Error("response status ".concat(e.status));return e.json()})).then((function(e){l(e.map(p))}))},setDovanos:l,letters:i,setLetters:E};return c.a.createElement(m.Provider,{value:h},c.a.createElement(b,null),c.a.createElement(u.b,{exact:!0,path:"/",component:d}),c.a.createElement("div",{className:"container mx-auto"},c.a.createElement(u.d,null,c.a.createElement(u.b,{exact:!0,path:"/admin",component:y}),c.a.createElement(u.b,{exact:!0,path:"/admin/users",component:w}),c.a.createElement(u.b,{exact:!0,path:"/admin/groups",component:x}),c.a.createElement(u.b,{exact:!0,path:"/admin/doctypes",component:S}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(60),a(61);r.a.render(c.a.createElement(g.a,null,c.a.createElement(D,null)),document.getElementById("root"));"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.3067bf8e.chunk.js.map