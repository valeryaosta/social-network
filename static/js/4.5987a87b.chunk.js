(this["webpackJsonpmy-app"]=this["webpackJsonpmy-app"]||[]).push([[4],{290:function(e,s,a){e.exports={dialogs:"Dialogs_dialogs__gvNI8",dialogItems:"Dialogs_dialogItems__3DEU6",active:"Dialogs_active__2C5BE",messages:"Dialogs_messages__2RRX9",message:"Dialogs_message__qMEBv"}},291:function(e,s,a){"use strict";a.d(s,"a",(function(){return d}));var t=a(5),n=a(28),i=a(1),c=(a(0),a(11)),o=a(15),r=function(e){return{isAuth:e.authState.isAuth}};function d(e){return Object(o.b)(r)((function(s){var a=s.isAuth,o=Object(n.a)(s,["isAuth"]);return a?Object(i.jsx)(e,Object(t.a)({},o)):Object(i.jsx)(c.a,{to:"/login"})}))}},296:function(e,s,a){"use strict";a.r(s);var t=a(290),n=a.n(t),i=a(127),c=a(1),o=(a(0),a(13)),r=function(e){var s="/dialogs/"+e.id;return Object(c.jsx)("div",{className:n.a.dialogue+" "+n.a.active,children:Object(c.jsx)(o.b,{to:s,children:e.name})})},d=function(e){return Object(c.jsx)("div",{className:n.a.message,children:e.message})},u=a(87),l=a(90),j=a(128),g=a(34),b=Object(u.a)(50),m=Object(j.a)({form:"dialogAddMessageForm"})((function(e){return Object(c.jsxs)("form",{onSubmit:e.handleSubmit,children:[Object(c.jsx)("div",{children:Object(c.jsx)(l.a,{component:g.b,name:"newMessageBody",placeholder:"Enter your message",validate:[u.b,b]})}),Object(c.jsx)("div",{children:Object(c.jsx)("button",{children:"Send"})})]})})),O=function(e){var s=e.dialogsPage.dialogs.map((function(e){return Object(c.jsx)(r,{name:e.name,id:e.id})})),a=e.dialogsPage.messages.map((function(e){return Object(c.jsx)(d,{message:e.message})}));return Object(c.jsxs)("div",{className:n.a.dialogs,children:[Object(c.jsx)("div",{className:n.a.dialogItems,children:s}),Object(c.jsx)("div",{className:n.a.messages,children:Object(c.jsx)("div",{children:a})}),Object(c.jsx)(m,{onSubmit:function(s){e.onSendMessageClick(s.newMessageBody)}})]})},h=a(15),f=a(9),v=a(291);s.default=Object(f.d)(Object(h.b)((function(e){return{dialogsPage:e.dialogsPage}}),(function(e){return{onSendMessageClick:function(s){e(Object(i.a)(s))}}})),v.a)(O)}}]);
//# sourceMappingURL=4.5987a87b.chunk.js.map