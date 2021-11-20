"use strict";(self.webpackChunk_ui_tools_storybook=self.webpackChunk_ui_tools_storybook||[]).push([[454],{22454:(e,t,o)=>{o.r(t),o.d(t,{WithToolTipState:()=>z,WithTooltip:()=>z,WithTooltipPure:()=>Y});o(32501),o(22144),o(34769),o(34115),o(43105),o(634),o(58188),o(20796),o(15735),o(6886),o(26936),o(27233),o(28673),o(1939);var r=o(2784),n=o(19688),i=o(35048),a=o.n(i),l=o(31461),c=o(7896),s=o(81665),p=o(28316),d=o(52230),u=o(90934),f=o(75586),h=r.createContext({}),g=function(){for(var e=arguments.length,t=new Array(e),o=0;o<e;o++)t[o]=arguments[o];return function(){for(var e=arguments.length,o=new Array(e),r=0;r<e;r++)o[r]=arguments[r];return t.forEach((function(e){return e&&e.apply(void 0,o)}))}},m=function(){return!("undefined"==typeof window||!window.document||!window.document.createElement)},v=function(e,t){if("function"==typeof e)return e(t);null!=e&&(e.current=t)},y=function(e){function t(){for(var t,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(t=e.call.apply(e,[this].concat(r))||this).observer=void 0,t.tooltipRef=void 0,t.handleOutsideClick=function(e){if(t.tooltipRef&&!t.tooltipRef.contains(e.target)){var o=t.context.parentOutsideClickHandler,r=t.props,n=r.hideTooltip;(0,r.clearScheduled)(),n(),o&&o(e)}},t.handleOutsideRightClick=function(e){if(t.tooltipRef&&!t.tooltipRef.contains(e.target)){var o=t.context.parentOutsideRightClickHandler,r=t.props,n=r.hideTooltip;(0,r.clearScheduled)(),n(),o&&o(e)}},t.addOutsideClickHandler=function(){document.body.addEventListener("touchend",t.handleOutsideClick),document.body.addEventListener("click",t.handleOutsideClick)},t.removeOutsideClickHandler=function(){document.body.removeEventListener("touchend",t.handleOutsideClick),document.body.removeEventListener("click",t.handleOutsideClick)},t.addOutsideRightClickHandler=function(){return document.body.addEventListener("contextmenu",t.handleOutsideRightClick)},t.removeOutsideRightClickHandler=function(){return document.body.removeEventListener("contextmenu",t.handleOutsideRightClick)},t.getTooltipRef=function(e){t.tooltipRef=e,v(t.props.innerRef,e)},t.getArrowProps=function(e){return void 0===e&&(e={}),(0,c.Z)({},e,{style:(0,c.Z)({},e.style,t.props.arrowProps.style)})},t.getTooltipProps=function(e){return void 0===e&&(e={}),(0,c.Z)({},e,t.isTriggeredBy("hover")&&{onMouseEnter:g(t.props.clearScheduled,e.onMouseEnter),onMouseLeave:g(t.props.hideTooltip,e.onMouseLeave)},{style:(0,c.Z)({},e.style,t.props.style)})},t.contextValue={isParentNoneTriggered:"none"===t.props.trigger,addParentOutsideClickHandler:t.addOutsideClickHandler,addParentOutsideRightClickHandler:t.addOutsideRightClickHandler,parentOutsideClickHandler:t.handleOutsideClick,parentOutsideRightClickHandler:t.handleOutsideRightClick,removeParentOutsideClickHandler:t.removeOutsideClickHandler,removeParentOutsideRightClickHandler:t.removeOutsideRightClickHandler},t}(0,s.Z)(t,e);var o=t.prototype;return o.componentDidMount=function(){var e=this;if((this.observer=new MutationObserver((function(){e.props.update()}))).observe(this.tooltipRef,this.props.mutationObserverOptions),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var t=this.context,o=t.removeParentOutsideClickHandler,r=t.removeParentOutsideRightClickHandler;this.addOutsideClickHandler(),this.addOutsideRightClickHandler(),o&&o(),r&&r()}},o.componentDidUpdate=function(){this.props.closeOnReferenceHidden&&this.props.isReferenceHidden&&this.props.hideTooltip()},o.componentWillUnmount=function(){if(this.observer&&this.observer.disconnect(),this.isTriggeredBy("hover")||this.isTriggeredBy("click")||this.isTriggeredBy("right-click")){var e=this.context,t=e.isParentNoneTriggered,o=e.addParentOutsideClickHandler,r=e.addParentOutsideRightClickHandler;this.removeOutsideClickHandler(),this.removeOutsideRightClickHandler(),this.handleOutsideClick=void 0,this.handleOutsideRightClick=void 0,!t&&o&&o(),!t&&r&&r()}},o.render=function(){var e=this.props,t=e.arrowProps,o=e.placement,n=e.tooltip;return r.createElement(h.Provider,{value:this.contextValue},n({arrowRef:t.ref,getArrowProps:this.getArrowProps,getTooltipProps:this.getTooltipProps,placement:o,tooltipRef:this.getTooltipRef}))},o.isTriggeredBy=function(e){var t=this.props.trigger;return t===e||Array.isArray(t)&&t.includes(e)},t}(r.Component);y.contextType=h;var b=function(e){function t(){for(var t,o=arguments.length,r=new Array(o),n=0;n<o;n++)r[n]=arguments[n];return(t=e.call.apply(e,[this].concat(r))||this).state={tooltipShown:t.props.defaultTooltipShown},t.hideTimeout=void 0,t.showTimeout=void 0,t.popperOffset=void 0,t.setTooltipState=function(e){var o=function(){return t.props.onVisibilityChange(e.tooltipShown)};t.isControlled()?o():t.setState(e,o)},t.clearScheduled=function(){clearTimeout(t.hideTimeout),clearTimeout(t.showTimeout)},t.showTooltip=function(e){var o=e.pageX,r=e.pageY;t.clearScheduled();var n={tooltipShown:!0};t.props.followCursor&&(n=(0,c.Z)({},n,{pageX:o,pageY:r})),t.showTimeout=window.setTimeout((function(){return t.setTooltipState(n)}),t.props.delayShow)},t.hideTooltip=function(){t.clearScheduled(),t.hideTimeout=window.setTimeout((function(){return t.setTooltipState({tooltipShown:!1})}),t.props.delayHide)},t.toggleTooltip=function(e){var o=e.pageX,r=e.pageY,n=t.getState()?"hideTooltip":"showTooltip";t[n]({pageX:o,pageY:r})},t.clickToggle=function(e){e.preventDefault();var o=e.pageX,r=e.pageY,n=t.props.followCursor?"showTooltip":"toggleTooltip";t[n]({pageX:o,pageY:r})},t.contextMenuToggle=function(e){e.preventDefault();var o=e.pageX,r=e.pageY,n=t.props.followCursor?"showTooltip":"toggleTooltip";t[n]({pageX:o,pageY:r})},t.getTriggerProps=function(e){return void 0===e&&(e={}),(0,c.Z)({},e,t.isTriggeredBy("click")&&{onClick:g(t.clickToggle,e.onClick),onTouchEnd:g(t.clickToggle,e.onTouchEnd)},t.isTriggeredBy("right-click")&&{onContextMenu:g(t.contextMenuToggle,e.onContextMenu)},t.isTriggeredBy("hover")&&(0,c.Z)({onMouseEnter:g(t.showTooltip,e.onMouseEnter),onMouseLeave:g(t.hideTooltip,e.onMouseLeave)},t.props.followCursor&&{onMouseMove:g(t.showTooltip,e.onMouseMove)}),t.isTriggeredBy("focus")&&{onFocus:g(t.showTooltip,e.onFocus),onBlur:g(t.hideTooltip,e.onBlur)})},t}(0,s.Z)(t,e);var o=t.prototype;return o.componentWillUnmount=function(){this.clearScheduled()},o.render=function(){var e=this,t=this.props,o=t.children,n=t.tooltip,i=t.placement,a=t.trigger,s=t.getTriggerRef,h=t.modifiers,g=t.closeOnReferenceHidden,m=t.usePortal,v=t.portalContainer,b=t.followCursor,w=t.getTooltipRef,O=t.mutationObserverOptions,C=(0,l.Z)(t,["children","tooltip","placement","trigger","getTriggerRef","modifiers","closeOnReferenceHidden","usePortal","portalContainer","followCursor","getTooltipRef","mutationObserverOptions"]),T=r.createElement(d.r,(0,c.Z)({innerRef:w,placement:i,modifiers:[{name:"followCursor",enabled:b,phase:"main",fn:function(t){e.popperOffset=t.state.rects.popper}}].concat(h)},C),(function(t){var o=t.ref,i=t.style,l=t.placement,s=t.arrowProps,p=t.isReferenceHidden,d=t.update;if(b&&e.popperOffset){var u=e.state,f=u.pageX,h=u.pageY,m=e.popperOffset,v=m.width,w=m.height,C=f+v>window.pageXOffset+document.body.offsetWidth?f-v:f,T=h+w>window.pageYOffset+document.body.offsetHeight?h-w:h;i.transform="translate3d("+C+"px, "+T+"px, 0"}return r.createElement(y,(0,c.Z)({arrowProps:s,closeOnReferenceHidden:g,isReferenceHidden:p,placement:l,update:d,style:i,tooltip:n,trigger:a,mutationObserverOptions:O},{clearScheduled:e.clearScheduled,hideTooltip:e.hideTooltip,innerRef:o}))}));return r.createElement(u.dK,null,r.createElement(f.s,{innerRef:s},(function(t){var r=t.ref;return o({getTriggerProps:e.getTriggerProps,triggerRef:r})})),this.getState()&&(m?(0,p.createPortal)(T,v):T))},o.isControlled=function(){return void 0!==this.props.tooltipShown},o.getState=function(){return this.isControlled()?this.props.tooltipShown:this.state.tooltipShown},o.isTriggeredBy=function(e){var t=this.props.trigger;return t===e||Array.isArray(t)&&t.includes(e)},t}(r.Component);b.defaultProps={closeOnReferenceHidden:!0,defaultTooltipShown:!1,delayHide:0,delayShow:0,followCursor:!1,onVisibilityChange:function(){},placement:"right",portalContainer:m()?document.body:null,trigger:"hover",usePortal:m(),mutationObserverOptions:{childList:!0,subtree:!0},modifiers:[]};const w=b;o(48319),o(77950),o(44112),o(18178);var O=o(49224),C=o.n(O),T=o(30457);function k(){return k=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},k.apply(this,arguments)}function R(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}var P,S,x=C()(1e3)((function(e,t,o){var r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:0;return t.split("-")[0]===e?o:r})),E=n.zo.div({position:"absolute",borderStyle:"solid"},(function(e){var t=e.placement,o=0,r=0;switch(!0){case t.startsWith("left")||t.startsWith("right"):r=8;break;case t.startsWith("top")||t.startsWith("bottom"):o=8}return{transform:"translate3d(".concat(o,"px, ").concat(r,"px, 0px)")}}),(function(e){var t=e.theme,o=e.color,r=e.placement;return{bottom:"".concat(x("top",r,-8,"auto"),"px"),top:"".concat(x("bottom",r,-8,"auto"),"px"),right:"".concat(x("left",r,-8,"auto"),"px"),left:"".concat(x("right",r,-8,"auto"),"px"),borderBottomWidth:"".concat(x("top",r,"0",8),"px"),borderTopWidth:"".concat(x("bottom",r,"0",8),"px"),borderRightWidth:"".concat(x("left",r,"0",8),"px"),borderLeftWidth:"".concat(x("right",r,"0",8),"px"),borderTopColor:x("top",r,t.color[o]||o||"light"===t.base?(0,T.tG)(t.background.app):(0,T.r5)(t.background.app),"transparent"),borderBottomColor:x("bottom",r,t.color[o]||o||"light"===t.base?(0,T.tG)(t.background.app):(0,T.r5)(t.background.app),"transparent"),borderLeftColor:x("left",r,t.color[o]||o||"light"===t.base?(0,T.tG)(t.background.app):(0,T.r5)(t.background.app),"transparent"),borderRightColor:x("right",r,t.color[o]||o||"light"===t.base?(0,T.tG)(t.background.app):(0,T.r5)(t.background.app),"transparent")}})),H=n.zo.div((function(e){return{display:e.hidden?"none":"inline-block",zIndex:2147483647}}),(function(e){var t=e.theme,o=e.color;return e.hasChrome?{background:t.color[o]||o||"light"===t.base?(0,T.tG)(t.background.app):(0,T.r5)(t.background.app),filter:"\n            drop-shadow(0px 5px 5px rgba(0,0,0,0.05))\n            drop-shadow(0 1px 3px rgba(0,0,0,0.1))\n          ",borderRadius:2*t.appBorderRadius,fontSize:t.typography.size.s1}:{}})),j=function(e){var t=e.placement,o=e.hasChrome,n=e.children,i=e.arrowProps,a=e.tooltipRef,l=e.arrowRef,c=e.color,s=R(e,["placement","hasChrome","children","arrowProps","tooltipRef","arrowRef","color"]);return r.createElement(H,k({hasChrome:o,placement:t,ref:a},s,{color:c}),o&&r.createElement(E,k({placement:t,ref:l},i,{color:c})),n)};function A(e,t){return function(e){if(Array.isArray(e))return e}(e)||function(e,t){if("undefined"==typeof Symbol||!(Symbol.iterator in Object(e)))return;var o=[],r=!0,n=!1,i=void 0;try{for(var a,l=e[Symbol.iterator]();!(r=(a=l.next()).done)&&(o.push(a.value),!t||o.length!==t);r=!0);}catch(e){n=!0,i=e}finally{try{r||null==l.return||l.return()}finally{if(n)throw i}}return o}(e,t)||function(e,t){if(!e)return;if("string"==typeof e)return B(e,t);var o=Object.prototype.toString.call(e).slice(8,-1);"Object"===o&&e.constructor&&(o=e.constructor.name);if("Map"===o||"Set"===o)return Array.from(e);if("Arguments"===o||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return B(e,t)}(e,t)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function B(e,t){(null==t||t>e.length)&&(t=e.length);for(var o=0,r=new Array(t);o<t;o++)r[o]=e[o];return r}function L(){return L=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var o=arguments[t];for(var r in o)Object.prototype.hasOwnProperty.call(o,r)&&(e[r]=o[r])}return e},L.apply(this,arguments)}function M(e,t){if(null==e)return{};var o,r,n=function(e,t){if(null==e)return{};var o,r,n={},i=Object.keys(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||(n[o]=e[o]);return n}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)o=i[r],t.indexOf(o)>=0||Object.prototype.propertyIsEnumerable.call(e,o)&&(n[o]=e[o])}return n}function W(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}j.displayName="Tooltip",j.defaultProps={color:void 0,arrowRef:void 0,tooltipRef:void 0,hasChrome:!0,placement:"top",arrowProps:{}};var Z=a().document,V=n.zo.div(P||(P=W(["\n  display: inline-block;\n  cursor: ",";\n"])),(function(e){return"hover"===e.mode?"default":"pointer"})),X=n.zo.g(S||(S=W(["\n  cursor: ",";\n"])),(function(e){return"hover"===e.mode?"default":"pointer"})),Y=function(e){var t=e.svg,o=e.trigger,n=(e.closeOnClick,e.placement),i=e.modifiers,a=e.hasChrome,l=e.tooltip,c=e.children,s=e.tooltipShown,p=e.onVisibilityChange,d=M(e,["svg","trigger","closeOnClick","placement","modifiers","hasChrome","tooltip","children","tooltipShown","onVisibilityChange"]),u=t?X:V;return r.createElement(w,{placement:n,trigger:o,modifiers:i,tooltipShown:s,onVisibilityChange:p,tooltip:function(e){var t=e.getTooltipProps,o=e.getArrowProps,n=e.tooltipRef,i=e.arrowRef,c=e.placement;return r.createElement(j,L({hasChrome:a,placement:c,tooltipRef:n,arrowRef:i,arrowProps:o()},t()),"function"==typeof l?l({onHide:function(){return p(!1)}}):l)}},(function(e){var t=e.getTriggerProps,o=e.triggerRef;return r.createElement(u,L({ref:o},t(),d),c)}))};Y.displayName="WithTooltipPure",Y.defaultProps={svg:!1,trigger:"hover",closeOnClick:!1,placement:"top",modifiers:[{name:"preventOverflow",options:{padding:8}},{name:"offset",options:{offset:[8,8]}},{name:"arrow",options:{padding:8}}],hasChrome:!0,tooltipShown:!1};var z=function(e){var t=e.startOpen,o=e.onVisibilityChange,n=M(e,["startOpen","onVisibilityChange"]),i=A((0,r.useState)(t||!1),2),a=i[0],l=i[1],c=(0,r.useCallback)((function(e){o&&!1===o(e)||l(e)}),[o]);return(0,r.useEffect)((function(){var e=function(){return c(!1)};Z.addEventListener("keydown",e,!1);var t=Array.from(Z.getElementsByTagName("iframe")),o=[];return t.forEach((function(t){var r=function(){try{t.contentWindow.document&&(t.contentWindow.document.addEventListener("click",e),o.push((function(){try{t.contentWindow.document.removeEventListener("click",e)}catch(e){}})))}catch(e){}};r(),t.addEventListener("load",r),o.push((function(){t.removeEventListener("load",r)}))})),function(){Z.removeEventListener("keydown",e),o.forEach((function(e){e()}))}})),r.createElement(Y,L({},n,{tooltipShown:a,onVisibilityChange:c}))};z.displayName="WithToolTipState"}}]);