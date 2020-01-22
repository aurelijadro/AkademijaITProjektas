(this.webpackJsonpstore=this.webpackJsonpstore||[]).push([[0],{25:function(e,t,a){},30:function(e,t,a){e.exports=a(62)},61:function(e,t,a){},62:function(e,t,a){"use strict";a.r(t);var n=a(0),o=a.n(n),r=a(26),c=a.n(r),l=a(29),i=a(6),s=a.n(i),m=a(8),d=a(9),u=a(11),v=a(10),p=a(12),h=a(3),E=function(e){function t(){return Object(m.a)(this,t),Object(u.a)(this,Object(v.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(d.a)(t,[{key:"render",value:function(){return console.log(this.props),o.a.createElement("div",{className:"card mx-2",style:{width:"13rem"}},o.a.createElement("img",{src:this.props.dovana.image,className:"card-img-top img-fluid",alt:""}),o.a.createElement("div",{className:"card-body"},o.a.createElement("h5",{className:"card-title"},this.props.dovana.title),o.a.createElement("p",{className:"card-text m-0 p-0"},this.props.dovana.description),o.a.createElement(h.b,{className:"btn btn-primary",to:"/dovanos/".concat(this.props.dovana.id)},"Daugiau informacijos")))}}]),t}(o.a.Component),f=o.a.createContext({dovanos:[],setDovanos:function(){},refreshItem:function(){}});function g(){var e=o.a.useContext(f).dovanos;return o.a.createElement("div",{className:"row"},"loading"===e?"Dovanos kraunasi, palaukite...":o.a.createElement("div",null,o.a.createElement("p",null,"We sell amazing products, even ",e.length," of them!"),o.a.createElement("div",{className:"card-deck"},e.map((function(e){return o.a.createElement("div",{className:"col-3 mx-auto my-3",key:e.id},o.a.createElement(E,{dovana:e}))})))))}var N=a(1);function b(e){var t=o.a.useContext(f),a=t.dovanos;if("loading"===a)return"Loading";var n=a.find((function(t){return String(t.id)===e.match.params.id}));return n?o.a.createElement("div",{className:"container row"},o.a.createElement("div",{className:"col-4"},o.a.createElement("img",{src:n.image,className:"img-fluid",alt:n.title})),o.a.createElement("div",{className:"col-8"},o.a.createElement("h1",null,n.title),o.a.createElement("h4",null,n.description),o.a.createElement("h4",null,"Price: ",n.price),o.a.createElement(h.b,{className:"btn btn-light",to:"/"},"Back"),o.a.createElement("button",{className:"btn btn-info mx-2",onClick:function(){return t.addCartItem(n.id)}},"Add to Cart"))):o.a.createElement(N.a,{to:"/"})}function y(){var e=o.a.useContext(f),t=e.dovanos,a="http://localhost:8081/dovanos";if("loading"===t)return o.a.createElement("div",null,"Loading...");var n=t.map((function(t,n){return o.a.createElement("div",{className:"row my-1",key:t.id},o.a.createElement("div",{className:"col-2"},n+1),o.a.createElement("div",{className:"col-2"},o.a.createElement(h.b,{to:"/admin/dovanos/".concat(t.id)},o.a.createElement("img",{src:t.image,className:"img-fluid",alt:""}))),o.a.createElement(h.b,{className:"col-3",to:"/admin/dovanos/".concat(t.id)},t.title),o.a.createElement("button",{className:"col-2 btn btn-danger",onClick:function(){s.a.delete("".concat(a,"/api/dovanos/").concat(t.id)).then(e.refreshProducts)}},"I\u0161trinti dovan\u0105"),o.a.createElement("hr",null))}));return o.a.createElement("div",{className:"container"},o.a.createElement(h.b,{className:"btn btn-info my-2",to:"/admin/dovanos/new"},"Sukurti nauj\u0105 dovan\u0105"),o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-2"},"#"),o.a.createElement("div",{className:"col-2"},"Nuotrauka"),o.a.createElement("div",{className:"col-6"},"Dovana"),o.a.createElement("div",{className:"col-2"})),o.a.createElement("div",null,n))}var k=function(e){function t(e,a){var n;Object(m.a)(this,t),(n=Object(u.a)(this,Object(v.a)(t).call(this,e,a))).handleTitleChange=function(e){return n.setState({title:e.target.value})},n.handleImageChange=function(e){return n.setState({image:e.target.value})},n.handleTypeChange=function(e){return n.setState({type:e.target.value})},n.handleForAdultsChange=function(e){return n.setState({forAdults:e.target.checked})},n.handleDescriptionChange=function(e){return n.setState({description:e.target.value})},n.saveProduct=function(){n.setState({mode:"edit-saving"}),s.a.put("".concat(n.state.url,"/api/dovanos/").concat(n.props.match.params.id),{title:n.state.title,description:n.state.description,img:n.state.image,forAdults:n.state.forAdults,type:n.state.type}).then(n.context.refreshProducts).then((function(){return n.props.history.push("/admin")}))},n.createProduct=function(){s.a.post("".concat(n.state.url,"/api/dovanos"),{title:n.state.title,description:n.state.description,img:n.state.image,forAdults:n.state.forAdults,type:n.state.type}).then(n.context.refreshProducts).then((function(){return n.props.history.push("/admin")}))},n.handleSubmit=function(e){if(e.preventDefault(),"edit"===n.state.mode)n.saveProduct();else{if("create"!==n.state.mode)throw"edit-loading"===n.state.mode?new Error("Not supposed to be possible to submit in edit-loading"):new Error("Unfamiliar mode ".concat(n.state.mode));n.createProduct()}};var o="/admin/dovanos/new"===e.match.path;return n.state={mode:o?"create":"edit-loading",title:"",image:"",forAdults:!1,type:"",description:"",url:"http://localhost:8081/dovanos"},n}return Object(p.a)(t,e),Object(d.a)(t,[{key:"componentDidMount",value:function(){this.dovanosMayHaveLoaded()}},{key:"componentDidUpdate",value:function(){this.dovanosMayHaveLoaded()}},{key:"dovanosMayHaveLoaded",value:function(){var e=this;if("loading"!==this.context.dovanos&&"edit-loading"===this.state.mode){var t=this.context.dovanos.find((function(t){return String(t.id)===e.props.match.params.id}));if(!t)throw new Error("Neradau produkto");this.setState({mode:"edit",id:t.id,title:t.title,image:t.image,type:t.type,forAdults:t.forAdults,description:t.description})}}},{key:"render",value:function(){var e=this;return"edit-loading"===this.state.mode?o.a.createElement("div",{className:"container"},o.a.createElement("p",null,"Preparing the edit screen...")):"edit-saving"===this.state.mode?o.a.createElement("div",null,"Saving changes..."):o.a.createElement("div",{className:"container"},o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-4"},o.a.createElement("form",{onSubmit:this.handleSubmit},o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Pavadinimas",o.a.createElement("input",{type:"text",required:"required",className:"form-control",value:this.state.title,onChange:this.handleTitleChange}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Apra\u0161ymas",o.a.createElement("input",{type:"text",id:"description",required:"required",className:"form-control",value:this.state.description,onChange:this.handleDescriptionChange}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Nuoroda \u012f paveiksl\u0117l\u012f",o.a.createElement("input",{type:"url",required:"required",className:"form-control",value:this.state.image,onChange:this.handleImageChange}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Tipas",o.a.createElement("input",{type:"text",required:"required",className:"form-control",value:this.state.type,onChange:this.handleTypeChange}))),o.a.createElement("div",{className:"form-group"},o.a.createElement("label",null,"Suaugusiems",o.a.createElement("input",{type:"checkbox",className:"form-control",value:this.state.forAdults,onChange:this.handleForAdultsChange}))),o.a.createElement("button",{type:"submit",className:"btn btn-info"},"I\u0161saugoti"),o.a.createElement("button",{className:"btn btn-light mx-2",onClick:function(){return e.props.history.push("/admin")}},"At\u0161aukti")))))}}]),t}(o.a.Component);k.contextType=f;var x=k;function w(){var e=o.a.useContext(f),t=e.cartItems,a=e.products,n=e.discardCartItem,r=t.map((function(e,t){var r=a.find((function(t){return t.id===e.productId}));if(!r)throw new Error("Produktas turejo buti rastas");return o.a.createElement("div",{className:"row my-2",key:r.id},o.a.createElement("div",{className:"col-2"},t+1),o.a.createElement("img",{className:"col-1 img-fluid img-thumbnail",alt:"",src:r.imageURL}),o.a.createElement("div",{className:"col-2"}," ",r.name),o.a.createElement("div",{className:"col-2"},e.quantity),o.a.createElement("button",{className:"btn btn-info col-2",onClick:function(){return n(r.id)}},"Remove items"))}));return o.a.createElement("div",null,o.a.createElement("div",{className:"row"},o.a.createElement("div",{className:"col-2"},"#"),o.a.createElement("div",{className:"col-2"}),o.a.createElement("div",{className:"col-2"},"Product"),o.a.createElement("div",{className:"col-2"},"Quantity")),r)}a(25);var C=function(e){return o.a.createElement("nav",{className:" mb-2 blue"},o.a.createElement("ul",{className:"nav row mx-auto justify-content-center "},o.a.createElement("li",{className:"nav-item col-2"},o.a.createElement(h.b,{className:"nav-link",to:"/"},"Dovanos")),o.a.createElement("li",{className:"nav-item col-2"},o.a.createElement(h.b,{className:"nav-link",to:"/admin"},"Admin")),o.a.createElement("li",{className:"col-4"}),o.a.createElement("li",{className:"nav-item col-2"})))};function j(e){return{title:e.title,id:e.id,description:e.description,forAdults:e.forAdults,image:e.img,type:e.type}}function A(){return o.a.createElement("div",{className:"jumbotron jumbotron-fluid p-4 my-0 text-white bg-image "},o.a.createElement("div",{className:"col-md-6 px-0"},o.a.createElement("h1",{className:"display-4 font-italic"},"Marvelous page!"),o.a.createElement("p",{className:"lead my-3"},"My site description couse it is totally important")))}var S=function(){var e=Object(n.useState)("loading"),t=Object(l.a)(e,2),a=t[0],r=t[1],c=function(){fetch("http://localhost:8081/dovanos/api/dovanos").then((function(e){if(!e.ok)throw new Error("response status ".concat(e.status));return e.json()})).then((function(e){r(e.map(j))}))};console.log(a);var i={dovanos:a,refreshProducts:c,setDovanos:r};return Object(n.useEffect)(c,[]),o.a.createElement(f.Provider,{value:i},o.a.createElement(A,null),o.a.createElement(C,null),o.a.createElement("div",{className:"container mx-auto"},o.a.createElement(N.d,null,o.a.createElement(N.b,{path:"/",exact:!0,component:g}),o.a.createElement(N.b,{path:"/dovanos",exact:!0,component:g}),o.a.createElement(N.b,{path:"/laiskai",exact:!0,component:w}),o.a.createElement(N.b,{path:"/dovanos/:id",exact:!0,component:b}),o.a.createElement(N.b,{path:"/admin",exact:!0,component:y}),o.a.createElement(N.b,{path:"/admin/dovanos/new",exact:!0,component:x}),o.a.createElement(N.b,{path:"/admin/dovanos/:id",exact:!0,component:x}))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));a(60),a(61);c.a.render(o.a.createElement(h.a,null,o.a.createElement(S,null)),document.getElementById("root"));"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[30,1,2]]]);
//# sourceMappingURL=main.c141f184.chunk.js.map