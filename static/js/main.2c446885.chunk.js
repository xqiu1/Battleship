(this.webpackJsonpbattleship=this.webpackJsonpbattleship||[]).push([[0],{123:function(e,t,a){},125:function(e,t,a){},197:function(e,t,a){"use strict";a.r(t);var n=a(1),r=a.n(n),c=a(20),i=a.n(c),s=(a(123),a(124),a(125),a(58)),l=a(41),o=a(42),h=a(50),p=a(48),u=a(199),b=a(52),d=a(114),j=a(117),O=a(203),f=a(200),y=a(202),v=a(201),m=a(87),x=a(106),P=a(107),k=a(13),S=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).handleGridClick=function(t){t&&t.preventDefault();var a=e.props,n=a.i,r=a.j,c=a.shipSet,i=a.handleFire,s=a.handlePlaceShip;return c?i(n,r):s(n,r)},e.showLabel=function(e){return"S"===e?Object(k.jsx)(x.a,{}):"X"===e?Object(k.jsx)(P.a,{}):e},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this,t=this.props.square;return Object(k.jsx)(m.a,{style:{width:42,height:42},disabled:"label"===t.status,onMouseDown:this.handleGridClick,onKeyUp:function(t){13!==t.keyCode&&32!==t.keyCode||e.handleGridClick()},children:this.showLabel(t.label)})}}]),a}(r.a.Component),g=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={checkedH:!0},e.handlePlaceShip=function(t,a){var n=e.props,r=n.currentPlayer,c=n.currentPlayerName,i=n.opponentName,s=n.updateGame;if(Object(b.validateLocation)(t,a,e.state.checkedH)){for(var l=0;l<r.ship.size;l++)e.state.checkedH?r.ship.position.push([t,a+l]):r.ship.position.push([t+l,a]);r.ship.position.forEach((function(e){var t=Object(d.a)(e,2),a=t[0],n=t[1];r.board[a][n].label="S"})),r.shipSet=!0,s("PlaceShip",c,i,r)}else j.b.error("You can not place your ship outside the board!")},e.handleFire=function(t,a){var n=e.props,r=n.currentPlayerName,c=n.opponent,i=n.opponentName,s=n.updateGame;if("X"===c.board[t][a].label)return j.b.error("You have already fired this location before!"),null;"S"===c.board[t][a].label?(c.board[t][a].label="X",c.ship.hits+=1,s("Fire",r,i,c),j.b.success("Hit!"),c.ship.hits===c.ship.size&&s("GameOver",r,i,{})):(c.board[t][a].label="X",s("Fire",r,i,c),j.b.info("Miss."))},e.showBoard=function(t){return t.map((function(t,a){var n=t.map((function(t,n){return Object(k.jsx)(O.a,{children:Object(k.jsx)(S,{i:a,j:n,square:t,shipSet:e.props.currentPlayer.shipSet,handleFire:e.handleFire,handlePlaceShip:e.handlePlaceShip},"".concat(a).concat(n))})}));return Object(k.jsx)(f.a,{justify:"center",children:n})}))},e.handleCheckbox=function(){e.setState((function(e){return{checkedH:!e.checkedH}}))},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.props,t=e.board,a=e.currentPlayer,n=e.currentPlayerName,r=e.opponentName,c=a.shipSet?Object(k.jsx)(y.a,{message:"Please click a location to hit ".concat(r,"'s ship"),type:"info"}):Object(k.jsxs)("div",{children:[Object(k.jsx)(y.a,{message:"Please click the initial ship location for ".concat(n),type:"info"}),Object(k.jsxs)("div",{style:{marginTop:24},children:["Place the ship:"," ",Object(k.jsx)(v.a,{checked:this.state.checkedH,onChange:this.handleCheckbox,children:"Horizontally"}),Object(k.jsx)(v.a,{checked:!this.state.checkedH,onChange:this.handleCheckbox,children:"Vertically"})]})]});return Object(k.jsxs)("div",{children:[Object(k.jsxs)("h1",{children:[n," ",Object(k.jsx)("span",{children:"\u2728"})]}),Object(k.jsx)("div",{style:{margin:36},children:c}),this.showBoard(t)]})}}]),a}(r.a.Component),C=function(e){Object(h.a)(a,e);var t=Object(p.a)(a);function a(){var e;Object(l.a)(this,a);for(var n=arguments.length,r=new Array(n),c=0;c<n;c++)r[c]=arguments[c];return(e=t.call.apply(t,[this].concat(r))).state={currentPlayer:"player1",player1:Object(b.createPlayer)(),player2:Object(b.createPlayer)(),gameStart:!1,gameOver:!1,winner:null},e.updateGame=function(t,a,n,r){if("GameOver"===t)e.setState({winner:a,gameOver:!0,currentPlayer:a});else if("PlaceShip"===t){var c;e.setState((c={},Object(s.a)(c,a,r),Object(s.a)(c,"currentPlayer",n),c))}else{var i;e.setState((i={},Object(s.a)(i,n,r),Object(s.a)(i,"currentPlayer",n),i))}},e}return Object(o.a)(a,[{key:"render",value:function(){var e=this.state,t=e.currentPlayer,a=e.gameOver,n=e.allShipsPlaced,r=Object(b.whoIsOpponent)(t),c=a?Object(k.jsxs)("h1",{children:["Congratulations ",t," ",Object(k.jsx)("span",{children:"\ud83c\udf89"})," you sunk ",r,"'s battleship."]}):Object(k.jsx)(g,{board:this.state[t].board,currentPlayer:this.state[t],currentPlayerName:t,opponent:this.state[r],opponentName:r,allShipsPlaced:n,updateGame:this.updateGame});return Object(k.jsxs)("div",{children:[Object(k.jsx)(u.a,{title:"Battleship",subTitle:"a simple implementation"}),c]})}}]),a}(r.a.Component);var w=function(){return Object(k.jsx)("div",{className:"App",children:Object(k.jsx)(C,{})})},F=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,204)).then((function(t){var a=t.getCLS,n=t.getFID,r=t.getFCP,c=t.getLCP,i=t.getTTFB;a(e),n(e),r(e),c(e),i(e)}))};i.a.render(Object(k.jsx)(r.a.StrictMode,{children:Object(k.jsx)(w,{})}),document.getElementById("root")),F()},52:function(e,t){var a={0:" ",1:"A",2:"B",3:"C",4:"D",5:"E",6:"F",7:"G",8:"H"},n=function(){for(var e=[],t=0;t<9;t++){for(var n=[],r=0;r<9;r++)0===t?n.push({status:"label",label:a[r]}):0!==t&&0===r?n.push({status:"label",label:t}):n.push({status:"grid",label:" "});e.push(n)}return e};e.exports={createPlayer:function(){return{board:n(),ship:{size:3,position:[],hits:0},shipSet:!1}},whoIsOpponent:function(e){return"player1"===e?"player2":"player1"},validateLocation:function(e,t,a){return a?t+3-1<9:e+3-1<9}}}},[[197,1,2]]]);
//# sourceMappingURL=main.2c446885.chunk.js.map