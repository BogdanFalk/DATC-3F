(function(t){function e(e){for(var n,s,o=e[0],l=e[1],c=e[2],d=0,v=[];d<o.length;d++)s=o[d],Object.prototype.hasOwnProperty.call(r,s)&&r[s]&&v.push(r[s][0]),r[s]=0;for(n in l)Object.prototype.hasOwnProperty.call(l,n)&&(t[n]=l[n]);u&&u(e);while(v.length)v.shift()();return i.push.apply(i,c||[]),a()}function a(){for(var t,e=0;e<i.length;e++){for(var a=i[e],n=!0,o=1;o<a.length;o++){var l=a[o];0!==r[l]&&(n=!1)}n&&(i.splice(e--,1),t=s(s.s=a[0]))}return t}var n={},r={app:0},i=[];function s(e){if(n[e])return n[e].exports;var a=n[e]={i:e,l:!1,exports:{}};return t[e].call(a.exports,a,a.exports,s),a.l=!0,a.exports}s.m=t,s.c=n,s.d=function(t,e,a){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:a})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var a=Object.create(null);if(s.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var n in t)s.d(a,n,function(e){return t[e]}.bind(null,n));return a},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],l=o.push.bind(o);o.push=e,o=o.slice();for(var c=0;c<o.length;c++)e(o[c]);var u=l;i.push([0,"chunk-vendors"]),a()})({0:function(t,e,a){t.exports=a("56d7")},"01fd":function(t,e,a){},"034f":function(t,e,a){"use strict";var n=a("19b3"),r=a.n(n);r.a},"19b3":function(t,e,a){},"1ccc":function(t,e,a){"use strict";var n=a("01fd"),r=a.n(n);r.a},"2d48":function(t,e,a){"use strict";var n=a("aaea"),r=a.n(n);r.a},"56d7":function(t,e,a){"use strict";a.r(e);a("e260"),a("e6cf"),a("cca6"),a("a79d");var n=a("2b0e"),r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("v-app",{attrs:{id:"vAppId"}},[a("v-content",[a("Home")],1)],1)},i=[],s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"home"},[a("HomeToolbar"),a("v-container",{attrs:{"align-start":"",fluid:"","grid-list-md":""}},[a("v-layout",{attrs:{"align-space-around":"","justify-center":"",column:"","fill-height":""}},[a("v-flex",{attrs:{xs12:""}},[a("HomeCarousel")],1)],1)],1)],1)},o=[],l=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"HomeToolbar"},[a("v-toolbar",{attrs:{color:"indigo darken-4"}},[a("v-toolbar-title",{staticClass:"white--text"},[t._v("Elections")]),a("v-spacer"),a("v-toolbar-items")],1)],1)},c=[],u={name:"HomeToolbar"},d=u,v=a("2877"),f=a("6544"),p=a.n(f),m=a("2fa4"),h=a("71d9"),b=a("2a7f"),g=Object(v["a"])(d,l,c,!1,null,null,null),y=g.exports;p()(g,{VSpacer:m["a"],VToolbar:h["a"],VToolbarItems:b["a"],VToolbarTitle:b["b"]});var C=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"HomeCarousel"},[a("v-carousel",{staticClass:"carousel",attrs:{"hide-delimiters":"",light:"",height:"100%"}},t._l(t.events,(function(e){return a("v-carousel-item",{key:e.eventTitle},[a("h1",{staticClass:"eventTitleHeader"},[t._v(t._s(e.eventTitle))]),a("v-row",{staticClass:"fill-height",attrs:{align:"center",justify:"center"}},[a("v-layout",{attrs:{"align-space-around":"","justify-center":"",row:"","fill-height":""}},["Presidentials"===e.eventTitle?a("div",{staticClass:"CandidatesCard"},t._l(e.eventCandidates,(function(e){return a("v-flex",{key:e.name,attrs:{xs12:"",sm6:"",md12:""}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"344"}},[a("v-img",{staticClass:"white--text align-end",attrs:{height:"200px",src:e.face}}),a("v-card-title",{staticClass:"black--text"},[t._v(t._s(e.name))]),a("v-card-subtitle",{staticClass:"pb-0"},[t._v(t._s(e.party))]),a("v-card-text",{staticClass:"text--primary"},[a("div",[t._v(t._s(e.description))])])],1)],1)})),1):t._e(),"Parliamentary"===e.eventTitle?a("div",{staticClass:"PartiesCard"},t._l(e.eventParties,(function(e){return a("v-flex",{key:e.name,attrs:{xs12:"",sm6:"",md12:""}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"344"}},[a("v-img",{staticClass:"white--text align-end",attrs:{height:"200px",src:e.logo}}),a("v-card-title",{staticClass:"black--text"},[t._v(t._s(e.name))]),a("v-card-text",{staticClass:"text--primary"},[a("div",[t._v(t._s(e.description))])])],1)],1)})),1):t._e(),"Referendum"===e.eventTitle?a("div",{staticClass:"QuestionsCard"},t._l(e.Questions,(function(e){return a("v-flex",{key:e.questionTitle,attrs:{xs12:"",sm6:"",md12:""}},[a("v-card",{staticClass:"mx-auto",attrs:{"max-width":"344"}},[a("v-card-title",{staticClass:"black--text"},[t._v(t._s(e.questionTitle))])],1)],1)})),1):t._e(),a("v-flex",{attrs:{xs12:"",sm6:"",md4:""}},["Referendum"===e.eventTitle?a("v-card",{staticClass:"statistics"},[a("barChartQuestions")],1):a("v-card",{staticClass:"statistics"},[a("PieChart")],1)],1)],1)],1)],1)})),1)],1)},_=[],x=(a("a4d3"),a("e01a"),a("4160"),a("b0c0"),a("159b"),function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"PieChart"}})}),T=[],w=a("e122"),P={data:function(){return{}},mounted:function(){var t={};this.$root.$on("dataForPieChart",(function(e){console.log("Ain't nobody got time for that"),console.log(e),t=e})),setTimeout((function(){var e={chart:{type:"donut"},series:[],labels:[]};console.log("Data:"+t),t.eventCandidates.forEach((function(t){e.series.push(t.numberVotes),e.labels.push(t.name)})),console.log(e);var a=new w["a"](document.querySelector("#PieChart"),e);a.render()}),1500)}},V=P,j=Object(v["a"])(V,x,T,!1,null,null,null),O=j.exports,k=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{attrs:{id:"barChart"}})},E=[],I={name:"barChartQuestions",mounted:function(){var t={chart:{type:"bar"},series:[{name:"Voturi",data:[1e7,25555555]}],xaxis:{categories:["DA","NU"]}},e=new w["a"](document.querySelector("#barChart"),t);e.render()}},q=I,D=(a("1ccc"),Object(v["a"])(q,k,E,!1,null,null,null)),Q=D.exports,S=a("bc3a"),H=a.n(S),$={components:{barChartQuestions:Q,PieChart:O},data:function(){return{colors:["primary","secondary","yellow darken-2","red","orange"],events:[{eventId:1,eventTitle:"Presidentials",eventCandidates:[{id:1,name:"Klaus Iohannis",face:"https://mediacdn.libertatea.ro/unsafe/375x285/smart/filters:contrast(8):quality(80)/https://static4.libertatea.ro/wp-content/uploads/2014/11/klaus_04_146ab53f00.jpg",party:"Party1",description:"Candidates1Desc",numberVotes:22},{id:2,name:"Viorica Dancila",face:"https://www.b1.ro/thumbs/landscape_big/2019/11/18/rezultate-alegeri-2019-exit-poll-alegeri-prezidentiale-2019-rezultate-bec-iohannis-sau-dancila-viorica-dancila-la-dna-401900.jpg",party:"Party2",description:"Candidates2Desc",numberVotes:50},{id:3,name:"John China",face:"https://semantic-ui.com/images/avatar2/large/molly.png",party:"Party3",description:"Candidates3Desc",numberVotes:17}]},{eventId:2,eventTitle:"Referendum",Questions:[{questionId:1,questionTitle:"Qtitle 1?",questionDetails:"Qdetails 1"},{questionId:2,questionTitle:"Qtitle 2?",questionDetails:"Qdetails 2"}]},{eventId:3,eventTitle:"Parliamentary",eventParties:[{id:1,name:"PSD",logo:"https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Partidul_Social_Democrat_logo.svg/1200px-Partidul_Social_Democrat_logo.svg.png",description:"Candidates1Desc",numberVotes:22},{id:2,name:"PNL",face:"https://upload.wikimedia.org/wikipedia/commons/2/24/National_Liberal_Party_Romania.png",description:"Candidates2Desc",numberVotes:50}]}]}},methods:{getAllEvents:function(){var t=this;H.a.post("http://localhost:5000/api/event/getAllEventsWithAssociates").then((function(e){var a=[];console.log(e),e.data.forEach((function(t){console.log(t),t.forEach((function(t){if(console.log(t.type),"presidential"===t.type){var e={};e.eventId=t.id,e.eventTitle="Presidentials",e.eventCandidates=[],t.candidate.forEach((function(t){var a={};a.id=t.id,a.name=t.name,a.face=t.face,a.party=t.party,a.numberVotes=t.votesOut+t.votesIn,e.eventCandidates.push(a)})),a.push(e)}if("referendum"===t.type){var n={};n.eventId=t.id,n.eventTitle="Referendum",n.Questions=[],t.referendum.forEach((function(t){var e={};e.questionId=t.id,e.questionTitle=t.question,n.Questions.push(e)})),a.push(n)}if("parliamentary"===t.type){var r={};r.eventId=t.id,r.eventTitle="Parliamentary",r.eventParties=[],t.party.forEach((function(t){var e={};e.id=t.id,e.name=t.name,e.logo=t.logo,e.description=t.description,e.numberVotes=t.votesIn+t.votesOut,r.eventParties.push(e)})),a.push(r)}}))})),console.log(a),t.events=a}),(function(t){console.log(t)}))}},created:function(){var t=this;this.getAllEvents(),setTimeout((function(){console.log("Emiting data for piechart"),t.$root.$emit("dataForPieChart",t.events[0])}),500)}},A=$,R=(a("2d48"),a("b0af")),F=a("99d9"),L=a("5e66"),M=a("3e35"),z=a("0e8f"),J=a("adda"),N=a("a722"),K=a("0fd9"),U=Object(v["a"])(A,C,_,!1,null,null,null),W=U.exports;p()(U,{VCard:R["a"],VCardSubtitle:F["a"],VCardText:F["b"],VCardTitle:F["c"],VCarousel:L["a"],VCarouselItem:M["a"],VFlex:z["a"],VImg:J["a"],VLayout:N["a"],VRow:K["a"]});var B={name:"Home",components:{HomeToolbar:y,HomeCarousel:W},data:function(){return{}}},G=B,X=a("a523"),Y=Object(v["a"])(G,s,o,!1,null,null,null),Z=Y.exports;p()(Y,{VContainer:X["a"],VFlex:z["a"],VLayout:N["a"]});var tt={name:"App",components:{Home:Z},data:function(){return{}}},et=tt,at=(a("034f"),a("7496")),nt=a("a75b"),rt=Object(v["a"])(et,r,i,!1,null,null,null),it=rt.exports;p()(rt,{VApp:at["a"],VContent:nt["a"]});var st=a("f309");n["a"].use(st["a"]);var ot=new st["a"]({});n["a"].config.productionTip=!1,new n["a"]({vuetify:ot,render:function(t){return t(it)}}).$mount("#app")},aaea:function(t,e,a){}});
//# sourceMappingURL=app.2b6f4c67.js.map