(this.webpackJsonpstore=this.webpackJsonpstore||[]).push([[0],{25:function(e,t,a){},30:function(e,t,a){e.exports=a(62)},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(26),c=a.n(o),i=a(29),l=a(6),s=a.n(l),m=a(8),d=a(9),u=a(11),p=a(10),v=a(12),h=a(3),E=function(e){function t(){return Object(m.a)(this,t),Object(u.a)(this,Object(p.a)(t).apply(this,arguments))}return Object(v.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return console.log(this.props),r.a.createElement("div",{className:"card mx-2",style:{width:"13rem"}},r.a.createElement("img",{src:this.props.dovana.image,className:"card-img-top img-fluid",alt:""}),r.a.createElement("div",{className:"card-body"},r.a.createElement("h5",{className:"card-title"},this.props.dovana.title),r.a.createElement("p",{className:"card-text m-0 p-0"},this.props.dovana.description),r.a.createElement(h.b,{className:"btn btn-primary",to:"/dovanos/".concat(this.props.dovana.id)},"Daugiau informacijos")))}}]),t}(r.a.Component),f=r.a.createContext({dovanos:[],setDovanos:function(){},refreshItem:function(){}});function g(){var e=r.a.useContext(f).dovanos;return r.a.createElement("div",{className:"row"},"loading"===e?"Dovanos kraunasi, palaukite...":r.a.createElement("div",null,r.a.createElement("p",null,"We sell amazing products, even ",e.length," of them!"),r.a.createElement("div",{className:"card-deck"},e.map((function(e){return r.a.createElement("div",{className:"col-3 mx-auto my-3",key:e.id},r.a.createElement(E,{dovana:e}))})))))}var N=a(1);function b(e){var t=r.a.useContext(f),a=t.dovanos;if("loading"===a)return"Loading";var n=a.find((function(t){return String(t.id)===e.match.params.id}));return n?r.a.createElement("div",{className:"container row"},r.a.createElement("div",{className:"col-4"},r.a.createElement("img",{src:n.image,className:"img-fluid",alt:n.title})),r.a.createElement("div",{className:"col-8"},r.a.createElement("h1",null,n.title),r.a.createElement("h4",null,n.description),r.a.createElement("h4",null,"Price: ",n.price),r.a.createElement(h.b,{className:"btn btn-light",to:"/"},"Back"),r.a.createElement("button",{className:"btn btn-info mx-2",onClick:function(){return t.addCartItem(n.id)}},"Add to Cart"))):r.a.createElement(N.a,{to:"/"})}function y(){var e=r.a.useContext(f),t=e.dovanos,a="";if("loading"===t)return r.a.createElement("div",null,"Loading...");var n=t.map((function(t,n){return r.a.createElement("div",{className:"row my-1",key:t.id},r.a.createElement("div",{className:"col-2"},n+1),r.a.createElement("div",{className:"col-2"},r.a.createElement(h.b,{to:"/admin/dovanos/".concat(t.id)},r.a.createElement("img",{src:t.image,className:"img-fluid",alt:""}))),r.a.createElement(h.b,{className:"col-3",to:"/admin/dovanos/".concat(t.id)},t.title),r.a.createElement("button",{className:"col-2 btn btn-danger",onClick:function(){s.a.delete("".concat(a,"/api/dovanos/").concat(t.id)).then(e.refreshProducts)}},"I\u0161trinti dovan\u0105"),r.a.createElement("hr",null))}));return r.a.createElement("div",{className:"container"},r.a.createElement(h.b,{className:"btn btn-info my-2",to:"/admin/dovanos/new"},"Sukurti nauj\u0105 dovan\u0105"),r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-2"},"#"),r.a.createElement("div",{className:"col-2"},"Nuotrauka"),r.a.createElement("div",{className:"col-6"},"Dovana"),r.a.createElement("div",{className:"col-2"})),r.a.createElement("div",null,n))}var k=function(e){function t(e,a){var n;Object(m.a)(this,t),(n=Object(u.a)(this,Object(p.a)(t).call(this,e,a))).handleTitleChange=function(e){return n.setState({title:e.target.value})},n.handleImageChange=function(e){return n.setState({image:e.target.value})},n.handleTypeChange=function(e){return n.setState({type:e.target.value})},n.handleForAdultsChange=function(e){return n.setState({forAdults:e.target.checked})},n.handleDescriptionChange=function(e){return n.setState({description:e.target.value})},n.saveProduct=function(){n.setState({mode:"edit-saving"}),s.a.put("".concat(n.state.url,"/api/dovanos/").concat(n.props.match.params.id),{title:n.state.title,description:n.state.description,img:n.state.image,forAdults:n.state.forAdults,type:n.state.type}).then(n.context.refreshProducts).then((function(){return n.props.history.push("/admin")}))},n.createProduct=function(){s.a.post("".concat(n.state.url,"/api/dovanos"),{title:n.state.title,description:n.state.description,img:n.state.image,forAdults:n.state.forAdults,type:n.state.type}).then(n.context.refreshProducts).then((function(){return n.props.history.push("/admin")}))},n.handleSubmit=function(e){if(e.preventDefault(),"edit"===n.state.mode)n.saveProduct();else{if("create"!==n.state.mode)throw"edit-loading"===n.state.mode?new Error("Not supposed to be possible to submit in edit-loading"):new Error("Unfamiliar mode ".concat(n.state.mode));n.createProduct()}};var r="/admin/dovanos/new"===e.match.path;return n.state={mode:r?"create":"edit-loading",title:"",image:"",forAdults:!1,type:"",description:"",url:""},n}return Object(v.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.dovanosMayHaveLoaded()}},{key:"componentDidUpdate",value:function(){this.dovanosMayHaveLoaded()}},{key:"dovanosMayHaveLoaded",value:function(){var e=this;if("loading"!==this.context.dovanos&&"edit-loading"===this.state.mode){var t=this.context.dovanos.find((function(t){return String(t.id)===e.props.match.params.id}));if(!t)throw new Error("Neradau produkto");this.setState({mode:"edit",id:t.id,title:t.title,image:t.image,type:t.type,forAdults:t.forAdults,description:t.description})}}},{key:"render",value:function(){var e=this;return"edit-loading"===this.state.mode?r.a.createElement("div",{className:"container"},r.a.createElement("p",null,"Preparing the edit screen...")):"edit-saving"===this.state.mode?r.a.createElement("div",null,"Saving changes..."):r.a.createElement("div",{className:"container"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-4"},r.a.createElement("form",{onSubmit:this.handleSubmit},r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Pavadinimas",r.a.createElement("input",{type:"text",required:"required",className:"form-control",value:this.state.title,onChange:this.handleTitleChange}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Apra\u0161ymas",r.a.createElement("input",{type:"text",id:"description",required:"required",className:"form-control",value:this.state.description,onChange:this.handleDescriptionChange}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Nuoroda \u012f paveiksl\u0117l\u012f",r.a.createElement("input",{type:"url",required:"required",className:"form-control",value:this.state.image,onChange:this.handleImageChange}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Tipas",r.a.createElement("input",{type:"text",required:"required",className:"form-control",value:this.state.type,onChange:this.handleTypeChange}))),r.a.createElement("div",{className:"form-group"},r.a.createElement("label",null,"Suaugusiems",r.a.createElement("input",{type:"checkbox",className:"form-control",value:this.state.forAdults,onChange:this.handleForAdultsChange}))),r.a.createElement("button",{type:"submit",className:"btn btn-info"},"I\u0161saugoti"),r.a.createElement("button",{className:"btn btn-light mx-2",onClick:function(){return e.props.history.push("/admin")}},"At\u0161aukti")))))}}]),t}(r.a.Component);k.contextType=f;var x=k;function w(){var e=r.a.useContext(f),t=e.cartItems,a=e.products,n=e.discardCartItem,o=t.map((function(e,t){var o=a.find((function(t){return t.id===e.productId}));if(!o)throw new Error("Produktas turejo buti rastas");return r.a.createElement("div",{className:"row my-2",key:o.id},r.a.createElement("div",{className:"col-2"},t+1),r.a.createElement("img",{className:"col-1 img-fluid img-thumbnail",alt:"",src:o.imageURL}),r.a.createElement("div",{className:"col-2"}," ",o.name),r.a.createElement("div",{className:"col-2"},e.quantity),r.a.createElement("button",{className:"btn btn-info col-2",onClick:function(){return n(o.id)}},"Remove items"))}));return r.a.createElement("div",null,r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col-2"},"#"),r.a.createElement("div",{className:"col-2"}),r.a.createElement("div",{className:"col-2"},"Product"),r.a.createElement("div",{className:"col-2"},"Quantity")),o)}a(25);var C=function(e){return r.a.createElement("nav",{className:" mb-2 blue"},r.a.createElement("ul",{className:"nav row mx-auto justify-content-center "},r.a.createElement("li",{className:"nav-item col-2"},r.a.createElement(h.b,{className:"nav-link",to:"/"},"Dovanos")),r.a.createElement("li",{className:"nav-item col-2"},r.a.createElement(h.b,{className:"nav-link",to:"/admin"},"Admin")),r.a.createElement("li",{className:"col-4"}),r.a.createElement("li",{className:"nav-item col-2"})))};function j(e){return{title:e.title,id:e.id,description:e.description,forAdults:e.forAdults,image:e.img,type:e.type}}function A(){return r.a.createElement("div",{className:"jumbotron jumbotron-fluid p-4 my-0 text-white bg-image "},r.a.createElement("div",{className:"col-md-6 px-0"},r.a.createElement("h1",{className:"display-4 font-italic"},"Marvelous page!"),r.a.createElement("p",{className:"lead my-3"},"My site description couse it is totally important")))}var S=function(){var e=Object(n.useState)("loading"),t=Object(i.a)(e,2),a=t[0],o=t[1],c=function(){fetch("http://localhost:8080/api/dovanos").then((function(e){if(!e.ok)throw new Error("response status ".concat(e.status));return e.json()})).then((function(e){o(e.map(j))}))};console.log(a);var l={dovanos:a,refreshProducts:c,setDovanos:o};return Object(n.useEffect)(c,[]),r.a.createElement(f.Provider,{value:l},r.a.createElement(A,null),r.a.createElement(C,null),r.a.createElement("div",{className:"container mx-auto"},r.a.createElement(N.d,null,r.a.createElement(N.b,{path:"/",exact:!0,component:g}),r.a.createElement(N.b,{path:"/dovanos",exact:!0,component:g}),r.a.createElement(N.b,{path:"/laiskai",exact:!0,component:w}),r.a.createElement(N.b,{path:"/dovanos/:id",exact:!0,component:b}),r.a.createElement(N.b,{path:"/admin",exact:!0,component:y}),r.a.createElement(N.b,{path:"/admin/dovanos/new",exact:!0,component:x}),r.a.createElement(N.b,{path:"/admin/dovanos/:id",exact:!0,component:x}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(60),a(61);c.a.render(r.a.createElement(h.a,null,r.a.createElement(S,null)),document.getElementById("root"));"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.916d21d0.chunk.js.map